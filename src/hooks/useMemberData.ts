import { useState, useEffect, useCallback } from 'react';
import { MemberLevelKey, MemberLevelConfig, MEMBER_LEVELS } from '../types';
import { supabase } from '../lib/supabase';

export interface MemberData {
  points: number;
  levelKey: MemberLevelKey;
  level: MemberLevelConfig;
  nextLevel: MemberLevelConfig | null;
  progressPercent: number; // 当前等级到下一等级进度 0-100
  /** 是否为管理员手动指定的等级（不受积分限制） */
  isOverride: boolean;
}

/** 逆序查找：匹配第一个 threshold <= 当前积分的等级 */
export const calculateLevel = (points: number): MemberLevelKey => {
  const level = MEMBER_LEVELS.slice().reverse().find((l) => points >= l.threshold);
  return level ? level.key : 'tongMu';
};

const POINTS_KEY = 'unio_member_points';
const OVERRIDE_KEY = 'unio_member_level_override';
const DB_ENABLED_KEY = 'unio_member_db_enabled';

/**
 * 会员数据 hook：积分 → 等级自动计算
 * 优先级：管理员手动指定等级（override，积分不达标也生效） > 按积分自动计算
 * 数据源：登录用户 → Supabase members 表（跨设备同步）；未登录/表未建 → localStorage 降级
 */
export function useMemberData(): {
  memberData: MemberData;
  setPoints: (p: number) => void;
  addPoints: (p: number) => void;
  /** 管理员手动指定等级（null = 恢复积分自动计算） */
  setOverrideLevel: (key: MemberLevelKey | null) => void;
  /** 是否已连接 DB（表已建且登录） */
  dbReady: boolean;
} {
  const [points, setPointsState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(POINTS_KEY);
      if (saved !== null) return parseInt(saved, 10) || 0;
    } catch (e) { /* ignore */ }
    return 1200; // 示例积分（银叶等级演示）
  });
  const [overrideLevel, setOverrideLevelState] = useState<MemberLevelKey | null>(() => {
    try {
      const saved = localStorage.getItem(OVERRIDE_KEY);
      if (saved && MEMBER_LEVELS.some((l) => l.key === saved)) return saved as MemberLevelKey;
    } catch (e) { /* ignore */ }
    return null;
  });
  const [userId, setUserId] = useState<string | null>(null);
  const [dbReady, setDbReady] = useState(false);

  // 启动：获取登录用户 → 尝试从 DB 读取会员数据（表未建/未登录 → 降级 localStorage）
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        if (!mounted) return;
        setUserId(user.id);
        const { data, error } = await supabase
          .from('members')
          .select('points, level_override')
          .eq('user_id', user.id)
          .maybeSingle();
        if (error) {
          // 表未建 → 降级 localStorage
          localStorage.setItem(DB_ENABLED_KEY, '0');
          return;
        }
        if (data) {
          localStorage.setItem(DB_ENABLED_KEY, '1');
          if (mounted) {
            setPointsState((prev) => (data.points !== null && data.points !== undefined ? data.points : prev));
            if (data.level_override && MEMBER_LEVELS.some((l) => l.key === data.level_override)) {
              setOverrideLevelState(data.level_override as MemberLevelKey);
            }
            setDbReady(true);
          }
        } else {
          // 登录但无会员记录 → 创建（首次登录建档）
          try {
            await supabase.from('members').insert({
              user_id: user.id,
              email: user.email,
              nickname: user.email ? user.email.split('@')[0] : null,
              points: 0,
            });
            localStorage.setItem(DB_ENABLED_KEY, '1');
            if (mounted) {
              setPointsState(0);
              setDbReady(true);
            }
          } catch (e) { /* 表未建忽略 */ }
        }
      } catch (e) { /* ignore */ }
    })();
    return () => { mounted = false; };
  }, []);

  /** 写 DB（登录 + 表可用时）；失败/未登录 → localStorage 降级 */
  const persist = useCallback((newPoints: number, reason: string, opPoints: number, opUser: string | null) => {
    try { localStorage.setItem(POINTS_KEY, String(newPoints)); } catch (e) { /* ignore */ }
    if (opUser) {
      supabase
        .from('members')
        .update({ points: newPoints, updated_at: new Date().toISOString() })
        .eq('user_id', opUser)
        .then(() => {}, () => {});
      supabase
        .from('point_logs')
        .insert({
          user_id: opUser,
          email: opUser,
          points_change: opPoints,
          balance_after: newPoints,
          reason,
          operator: 'system',
        })
        .then(() => {}, () => {});
    }
  }, []);

  const setPoints = useCallback((p: number) => {
    setPointsState((prev) => {
      const v = Math.max(0, Math.round(p));
      persist(v, '管理员调整积分', v - prev, userId);
      return v;
    });
  }, [userId, persist]);

  const addPoints = useCallback((p: number) => {
    setPointsState((prev) => {
      const v = Math.max(0, prev + Math.round(p));
      persist(v, p >= 0 ? '积分增加' : '积分扣减', p, userId);
      return v;
    });
  }, [userId, persist]);

  const setOverrideLevel = useCallback((key: MemberLevelKey | null) => {
    setOverrideLevelState(key);
    try {
      if (key) localStorage.setItem(OVERRIDE_KEY, key);
      else localStorage.removeItem(OVERRIDE_KEY);
    } catch (e) { /* ignore */ }
    if (userId) {
      supabase
        .from('members')
        .update({ level_override: key, updated_at: new Date().toISOString() })
        .eq('user_id', userId)
        .then(() => {}, () => {});
    }
  }, [userId]);

  const levelKey = overrideLevel ?? calculateLevel(points);
  const level = MEMBER_LEVELS.find((l) => l.key === levelKey) ?? MEMBER_LEVELS[0];
  const nextLevel = MEMBER_LEVELS.find((l) => l.threshold > points) ?? null;
  const progressPercent = nextLevel
    ? Math.min(100, Math.round(((points - level.threshold) / (nextLevel.threshold - level.threshold)) * 100))
    : 100;

  return {
    memberData: {
      points,
      levelKey,
      level,
      nextLevel,
      progressPercent,
      isOverride: overrideLevel !== null,
    },
    setPoints,
    addPoints,
    setOverrideLevel,
    dbReady,
  };
}

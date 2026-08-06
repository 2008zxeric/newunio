import { useState, useEffect, useCallback } from 'react';
import { MemberLevelKey, MemberLevelConfig, MEMBER_LEVELS } from '../types';

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

/**
 * 会员数据 hook：积分 → 等级自动计算
 * 优先级：管理员手动指定等级（override，积分不达标也生效） > 按积分自动计算
 */
export function useMemberData(): {
  memberData: MemberData;
  setPoints: (p: number) => void;
  addPoints: (p: number) => void;
  /** 管理员手动指定等级（null = 恢复积分自动计算） */
  setOverrideLevel: (key: MemberLevelKey | null) => void;
} {
  const [points, setPointsState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(POINTS_KEY);
      if (saved !== null) return parseInt(saved, 10) || 0;
    } catch (e) { /* ignore */ }
    return 1200; // 示例积分（银叶等级演示）；后台未设置时为 0
  });

  const [overrideLevel, setOverrideLevelState] = useState<MemberLevelKey | null>(() => {
    try {
      const saved = localStorage.getItem(OVERRIDE_KEY);
      if (saved && MEMBER_LEVELS.some((l) => l.key === saved)) return saved as MemberLevelKey;
    } catch (e) { /* ignore */ }
    return null;
  });

  useEffect(() => {
    try { localStorage.setItem(POINTS_KEY, String(points)); } catch (e) { /* ignore */ }
  }, [points]);

  const setPoints = useCallback((p: number) => {
    setPointsState(Math.max(0, Math.floor(p)));
  }, []);

  const addPoints = useCallback((p: number) => {
    setPointsState((prev) => Math.max(0, prev + Math.floor(p)));
  }, []);

  const setOverrideLevel = useCallback((key: MemberLevelKey | null) => {
    setOverrideLevelState(key);
    try {
      if (key) localStorage.setItem(OVERRIDE_KEY, key);
      else localStorage.removeItem(OVERRIDE_KEY);
    } catch (e) { /* ignore */ }
  }, []);

  const levelKey = overrideLevel ?? calculateLevel(points);
  const level = MEMBER_LEVELS.find((l) => l.key === levelKey) || MEMBER_LEVELS[0];
  const idx = MEMBER_LEVELS.findIndex((l) => l.key === levelKey);
  const nextLevel = idx < MEMBER_LEVELS.length - 1 ? MEMBER_LEVELS[idx + 1] : null;
  const progressPercent = nextLevel
    ? Math.min(100, Math.round(((points - level.threshold) / (nextLevel.threshold - level.threshold)) * 100))
    : 100;

  return {
    memberData: { points, levelKey, level, nextLevel, progressPercent, isOverride: overrideLevel !== null },
    setPoints,
    addPoints,
    setOverrideLevel,
  };
}

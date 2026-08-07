import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User, LogOut, Loader2, Mail, KeyRound } from 'lucide-react';
import { LogoWatermark } from './LogoWatermark';

/**
 * 前台用户登录面板（Supabase Auth 邮箱+密码）
 * - 未登录：登录/注册切换表单
 * - 已登录：显示邮箱 + 退出
 * 会话由 supabase.auth 管理（localStorage 持久化）
 */
export function AuthPanel({ onUserChange }: { onUserChange?: (user: any) => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        setUser(data.session.user);
        onUserChange?.(data.session.user);
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      onUserChange?.(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || password.length < 6) {
      setError('请输入邮箱和至少 6 位密码');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      if (mode === 'login') {
        const { error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (err) throw err;
      } else {
        const { data: signUpData, error: err } = await supabase.auth.signUp({ email: email.trim(), password });
        if (err) throw err;
        // 关闭邮箱确认后注册即登录（session 自动建立）；若仍开启确认则提示登录
        if (signUpData?.session) {
          setError('注册成功，已自动登录！');
        } else {
          setError('注册成功！请直接登录（如开启了邮箱确认，请查收确认邮件）。');
        }
      }
    } catch (err: any) {
      setError(err.message || '操作失败');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (user) {
    return (
      <div className="relative flex items-center justify-between p-4 rounded-2xl bg-[#2c2a26] text-[#f6f2eb] border border-[#d2c4ad]/30 overflow-hidden">
        <LogoWatermark size={140} opacity={0.06} />
        <div className="relative flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#d2c4ad]/20 flex items-center justify-center">
            <User className="w-4 h-4 text-[#d2c4ad]" />
          </div>
          <div>
            <p className="text-sm font-serif font-bold text-[#d2c4ad]">{user.email}</p>
            <p className="text-[10px] text-white/50">已登录 · 订单自动同步至本账号</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 text-white/80 text-xs hover:bg-white/20 transition-all"
        >
          <LogOut className="w-3.5 h-3.5" /> 退出
        </button>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-2xl bg-white border border-[#2D2D2A]/10 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <User className="w-4 h-4 text-[#A85852]" />
        <h3 className="font-serif font-bold text-[#2D2D2A]">{mode === 'login' ? '登录 UNIO 账号' : '注册 UNIO 账号'}</h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="邮箱地址"
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#d2c4ad]/50"
          />
        </div>
        <div className="relative">
          <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="密码（至少 6 位）"
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#d2c4ad]/50"
          />
        </div>
        {error && <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-xl bg-[#1C2E20] text-[#E8DAC8] text-sm font-bold hover:bg-[#2a4230] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {mode === 'login' ? '登录' : '注册'}
        </button>
        <button
          type="button"
          onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(null); }}
          className="w-full text-center text-xs text-[#8C7E6A] hover:text-[#2D2D2A] transition-colors"
        >
          {mode === 'login' ? '还没有账号？点击注册' : '已有账号？点击登录'}
        </button>
        <p className="text-[10px] text-slate-400 text-center leading-relaxed">
          登录后订单自动绑定账号，跨设备同步查看订单进度。未登录也可提交订单（按微信联系）。
        </p>
      </form>
    </div>
  );
}

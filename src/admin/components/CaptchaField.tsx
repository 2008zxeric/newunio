import React, { useRef, useEffect } from 'react';

// ============================================
// 后台登录验证码（看图判断真人 · 最基础流程）
// Canvas 自绘：4 位随机字符 + 干扰线 + 噪点
// 纯前端实现，不依赖任何第三方验证码服务
// ============================================

// 排除易混淆字符：0/O、1/I、l
const CAPTCHA_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function genCaptchaCode(len = 4): string {
  let s = '';
  for (let i = 0; i < len; i++) {
    s += CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)];
  }
  return s;
}

/** 绘制验证码到 canvas（浅米色底 + 旋转字符 + 干扰线 + 噪点） */
export function drawCaptcha(canvas: HTMLCanvasElement, code: string): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  // 背景：浅米色渐变（贴合后台暖色系，字符用深色保证清晰）
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, '#f6f2eb');
  grad.addColorStop(1, '#e6ddcc');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // 干扰线 4 条
  ctx.strokeStyle = 'rgba(140,126,106,0.45)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * W, Math.random() * H);
    ctx.lineTo(Math.random() * W, Math.random() * H);
    ctx.stroke();
  }

  // 字符：随机旋转 / 位移 / 颜色
  const chars = code.split('');
  const charW = W / chars.length;
  const colors = ['#2c2a26', '#4A7C59', '#1C39BB', '#8C5B3F', '#7B3F3F'];
  chars.forEach((ch, i) => {
    ctx.save();
    ctx.translate(charW * i + charW / 2 + (Math.random() * 4 - 2), H / 2 + (Math.random() * 6 - 3));
    ctx.rotate((Math.random() - 0.5) * 0.55);
    ctx.font = `bold ${Math.floor(20 + Math.random() * 7)}px Georgia, "Times New Roman", serif`;
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(ch, 0, 0);
    ctx.restore();
  });

  // 噪点 70 个
  for (let i = 0; i < 70; i++) {
    ctx.fillStyle = `rgba(44,42,38,${Math.random() * 0.35})`;
    ctx.beginPath();
    ctx.arc(Math.random() * W, Math.random() * H, Math.random() * 1.4 + 0.3, 0, Math.PI * 2);
    ctx.fill();
  }
}

interface CaptchaFieldProps {
  /** 当前验证码答案（由父组件生成并管理） */
  code: string;
  value: string;
  onChange: (v: string) => void;
  onRefresh: () => void;
}

/** 验证码输入区：左侧 canvas 图片（点击换一张）+ 右侧输入框 */
export default function CaptchaField({ code, value, onChange, onRefresh }: CaptchaFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && code) drawCaptcha(canvasRef.current, code);
  }, [code]);

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-[#b4aca2] tracking-wider uppercase">验证码</label>
      <div className="flex items-stretch gap-2.5">
        <canvas
          ref={canvasRef}
          width={110}
          height={40}
          onClick={onRefresh}
          title="看不清？点击换一张"
          className="h-11 w-[110px] shrink-0 rounded-xl border border-[#d2c4ad]/25 cursor-pointer select-none"
        />
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value.toUpperCase())}
          placeholder="请输入图中字符"
          autoComplete="off"
          maxLength={4}
          className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-white/5 border border-[#d2c4ad]/15 text-white text-sm tracking-[0.25em] placeholder:text-slate-500 placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-[#d2c4ad]/50 focus:border-[#d2c4ad]/50 transition-all hover:border-white/20 uppercase"
        />
      </div>
      <p className="text-[10px] text-[#8C7E6A]/70 flex items-center gap-1">
        <span className="inline-block w-1 h-1 rounded-full bg-[#d2c4ad]/60" />
        点击图片可刷新验证码
      </p>
    </div>
  );
}

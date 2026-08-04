/**
 * 统一打印/导出工具（架构级修复）
 * 解决历史问题：
 * 1. PNG 导出丢二维码/产品图 —— 相对路径图片在 SVG 序列化后无法解析
 *    → 导出前把卡面内所有 <img> 的 src 预加载转成 dataURL
 * 2. 打印空白 —— @media print 多套规则冲突（#root display:none 互相覆盖）
 *    → 打印 = 先生成高清 PNG，插入 #print-image-wrap，window.print()（打印与 PNG 同一渲染结果）
 */

/** 单个图片转 dataURL（同源/CORS 均可；失败返回原 src 兜底） */
async function imgToDataURL(src: string): Promise<string> {
  if (!src || src.startsWith('data:')) return src;
  try {
    // 转绝对 URL（相对路径 /wechat-qr.png → https://host/wechat-qr.png）
    const abs = new URL(src, window.location.origin).href;
    const res = await fetch(abs, { mode: 'cors', cache: 'force-cache' });
    if (!res.ok) return src;
    const blob = await res.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(src);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    return src;
  }
}

/** 克隆元素，并把内部所有 <img> 的 src 替换为 dataURL（含背景图 url()） */
export async function cloneWithEmbeddedImages(el: HTMLElement): Promise<HTMLElement> {
  const clone = el.cloneNode(true) as HTMLElement;
  // <img> 标签
  const imgs = Array.from(clone.querySelectorAll('img'));
  for (const img of imgs) {
    const orig = img.getAttribute('src') || '';
    if (orig.startsWith('data:')) continue;
    const dataUrl = await imgToDataURL(orig);
    if (dataUrl !== orig) {
      img.setAttribute('src', dataUrl);
    }
  }
  // CSS background-image: url(...) —— 逐元素替换 inline style
  const all = [clone, ...Array.from(clone.querySelectorAll('*'))] as HTMLElement[];
  for (const el of all) {
    const style = el.getAttribute('style') || '';
    if (style.includes('url(')) {
      const urls = Array.from(style.matchAll(/url\(['"]?([^'")]+)['"]?\)/g));
      let newStyle = style;
      for (const m of urls) {
        const u = m[1];
        if (u.startsWith('data:') || u.startsWith('#')) continue;
        const dataUrl = await imgToDataURL(u);
        if (dataUrl !== u) {
          newStyle = newStyle.replace(m[0], `url("${dataUrl}")`);
        }
      }
      if (newStyle !== style) el.setAttribute('style', newStyle);
    }
  }
  return clone;
}

/** 收集全站样式（style 标签 + 同源 stylesheet 规则） */
function collectAllCSS(): string {
  let cssText = '';
  const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
  styles.forEach((s) => {
    if (s.tagName === 'STYLE') {
      cssText += (s.textContent || '') + '\n';
    } else if (s.tagName === 'LINK') {
      try {
        const sheet = (s as HTMLLinkElement).sheet;
        const rules = sheet?.cssRules;
        if (rules) {
          for (let i = 0; i < rules.length; i++) {
            cssText += (rules[i] as CSSStyleRule).cssText + '\n';
          }
        }
      } catch (e) {
        // 跨域 stylesheet 忽略
      }
    }
  });
  return cssText;
}

/** 元素 → 高清 PNG dataURL（SVG foreignObject 序列化，兼容 oklab） */
export async function elementToPNGDataURL(
  el: HTMLElement,
  scale = 2,
  bgColor = '#ffffff',
  format: 'png' | 'jpeg' = 'png',
  quality = 0.92
): Promise<string> {
  const width = el.offsetWidth || 600;
  const height = el.offsetHeight || 800;
  const clone = await cloneWithEmbeddedImages(el);
  // 克隆体铺满，避免相对定位内容错位
  clone.style.position = 'absolute';
  clone.style.left = '0';
  clone.style.top = '0';
  clone.style.margin = '0';
  clone.style.width = `${width}px`;
  clone.style.maxWidth = 'none';
  clone.style.transform = 'none';

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('width', String(width * scale));
  svg.setAttribute('height', String(height * scale));
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  const foreign = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
  foreign.setAttribute('width', '100%');
  foreign.setAttribute('height', '100%');
  foreign.setAttribute('x', '0');
  foreign.setAttribute('y', '0');
  foreign.appendChild(clone);
  svg.appendChild(foreign);
  // 样式内联进 SVG（保证 Tailwind 类生效）
  const styleEl = document.createElementNS('http://www.w3.org/2000/svg', 'style');
  styleEl.textContent = collectAllCSS();
  svg.insertBefore(styleEl, svg.firstChild);

  const svgStr = new XMLSerializer().serializeToString(svg);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = width * scale;
        canvas.height = height * scale;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('canvas 2d context unavailable'));
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL(format === 'jpeg' ? 'image/jpeg' : 'image/png', format === 'jpeg' ? quality : undefined));
      } catch (e) {
        reject(e);
      }
    };
    img.onerror = () => reject(new Error('SVG image render failed'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgStr);
  });
}

/** 触发浏览器下载 PNG */
export async function downloadElementAsPNG(
  el: HTMLElement,
  filename: string,
  scale = 2
): Promise<void> {
  const dataUrl = await elementToPNGDataURL(el, scale);
  const a = document.createElement('a');
  a.download = filename;
  a.href = dataUrl;
  a.click();
}

/**
 * 打印元素：先生成高清 PNG → 插入 #print-image-wrap → window.print()
 * 打印与「保存 PNG」完全同一渲染结果（用户拍板方案），且无弹窗
 */
export async function printElementAsPNG(
  el: HTMLElement,
  scale = 2
): Promise<void> {
  const dataUrl = await elementToPNGDataURL(el, scale);
  let wrap = document.getElementById('print-image-wrap') as HTMLElement | null;
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'print-image-wrap';
    document.body.appendChild(wrap);
  }
  wrap.innerHTML = '';
  const img = document.createElement('img');
  img.src = dataUrl;
  img.style.maxWidth = '190mm';
  img.style.maxHeight = '270mm';
  img.style.width = 'auto';
  img.style.height = 'auto';
  wrap.appendChild(img);
  // 等待渲染后打印
  setTimeout(() => {
    window.print();
    // 打印后清理（打印对话框关闭后回调）
    const afterPrint = () => {
      wrap.innerHTML = '';
      window.removeEventListener('afterprint', afterPrint);
    };
    window.addEventListener('afterprint', afterPrint);
  }, 150);
}

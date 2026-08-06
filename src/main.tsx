import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { CartProvider } from './context/CartContext';
import { SettingsProvider } from './context/SettingsContext';

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('[FATAL] #root element not found');
}

createRoot(rootEl).render(
  <StrictMode>
    <HashRouter>
      <SettingsProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </SettingsProvider>
    </HashRouter>
  </StrictMode>
);

// 挂载后隐藏预加载遮罩（prelude overlay）
rootEl.classList.add('app-loaded');

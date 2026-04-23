import { useEffect, useState, useRef } from 'react';
import { useLang } from '../LangContext.jsx';
import { translations } from '../i18n/translations.js';

export default function ProgressBar() {
  const { lang } = useLang();
  const slides = translations[lang].nav.slides;
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const p = total > 0 ? Math.min(Math.max(window.scrollY / total, 0), 1) : 0;
      setProgress(p);

      let found = 0;
      slides.forEach((s, i) => {
        const el = document.querySelector(s.href);
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top <= window.innerHeight * 0.4) found = i;
      });
      setActive(found);
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(update);
        ticking.current = true;
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [slides]);

  const handleClick = (href) => (e) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="progress" aria-hidden="true">
      <div className="progress-track" />
      <div
        className="progress-dot"
        style={{ transform: `translateY(${progress * 100}%) translate(-50%, -50%)` }}
      />
      <div className="progress-marks">
        {slides.map((s, i) => (
          <a
            key={s.href}
            href={s.href}
            onClick={handleClick(s.href)}
            className={`progress-mark ${i === active ? 'active' : ''}`}
            style={{ top: `${((i + 1) / (slides.length + 1)) * 100}%` }}
          >
            <span className="progress-tooltip">{s.label}</span>
          </a>
        ))}
      </div>

      <style>{css}</style>
    </div>
  );
}

const css = `
.progress {
  position: fixed;
  top: 120px;
  bottom: 80px;
  right: 24px;
  width: 14px;
  z-index: 40;
  pointer-events: none;
}
.progress-track {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(0, 0, 0, 0.08);
  transform: translateX(-50%);
  border-radius: 2px;
}
.progress-dot {
  position: absolute;
  left: 50%;
  top: 0;
  width: 10px;
  height: 10px;
  background: var(--brand-blue);
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(1, 113, 225, 0.15);
  transition: transform 120ms linear;
  pointer-events: none;
}
.progress-marks {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.progress-mark {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  cursor: pointer;
}
.progress-mark::before {
  content: '';
  width: 8px;
  height: 2px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  transition: background var(--dur-base) var(--ease-std), width var(--dur-base) var(--ease-std);
}
.progress-mark:hover::before,
.progress-mark.active::before {
  background: var(--brand-blue);
  width: 12px;
}
.progress-tooltip {
  position: absolute;
  right: 22px;
  top: 50%;
  transform: translateY(-50%) translateX(-4px);
  opacity: 0;
  background: var(--black);
  color: var(--white);
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 500;
  padding: 6px 10px;
  border-radius: 6px;
  white-space: nowrap;
  transition: opacity var(--dur-base) var(--ease-std), transform var(--dur-base) var(--ease-std);
  pointer-events: none;
}
.progress-mark:hover .progress-tooltip {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}

@media (max-width: 960px) {
  .progress { display: none; }
}
`;

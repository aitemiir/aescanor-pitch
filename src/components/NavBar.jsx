import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../LangContext.jsx';
import { translations } from '../i18n/translations.js';

export default function NavBar({ onContactClick }) {
  const { lang, setLang } = useLang();
  const t = translations[lang];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'nav-scrolled' : ''}`}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="nav-inner glass">
          <a href="#top" className="ae-wordmark" aria-label="Aescanor Partners">
            <span className="serif">Aescanor</span>
            <span className="sans-blue">Partners</span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {t.nav.slides.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>

          <div className="nav-right">
            <div className="lang-toggle" role="group" aria-label="Language">
              <button
                className={lang === 'ru' ? 'active' : ''}
                onClick={() => setLang('ru')}
                aria-pressed={lang === 'ru'}
              >RU</button>
              <button
                className={lang === 'en' ? 'active' : ''}
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
              >EN</button>
            </div>
            <button type="button" className="btn btn-primary nav-cta" onClick={onContactClick}>{t.nav.cta}</button>
            <button
              className="nav-burger"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button className="nav-overlay-close" onClick={closeMenu} aria-label="Close menu">×</button>
            <nav className="nav-overlay-links">
              {t.nav.slides.map((l) => (
                <a key={l.href} href={l.href} onClick={closeMenu}>{l.label}</a>
              ))}
            </nav>
            <div className="nav-overlay-bottom">
              <div className="lang-toggle">
                <button className={lang === 'ru' ? 'active' : ''} onClick={() => setLang('ru')}>RU</button>
                <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
              </div>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => {
                  closeMenu();
                  onContactClick();
                }}
              >
                {t.nav.cta}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{css}</style>
    </>
  );
}

const css = `
.nav {
  position: fixed;
  top: 16px;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
  padding: 0 16px;
  pointer-events: none;
}
.nav-inner {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 1160px;
  padding: 10px 12px 10px 20px;
  border-radius: 999px;
  transition: box-shadow var(--dur-base) var(--ease-std), background var(--dur-base) var(--ease-std);
}
.nav-scrolled .nav-inner {
  box-shadow: var(--shadow-md);
}
.nav-links {
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 22px;
}
.nav-links a {
  font-size: 13px;
  font-weight: 500;
  color: var(--fg-1);
  padding: 6px 2px;
}
.nav-links a:hover { color: var(--brand-blue); }
.nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
}
.lang-toggle {
  display: inline-flex;
  padding: 3px;
  background: var(--gray-100);
  border-radius: 999px;
}
.lang-toggle button {
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  color: var(--fg-2);
  border-radius: 999px;
  transition: all var(--dur-base) var(--ease-std);
}
.lang-toggle button.active {
  background: var(--black);
  color: var(--white);
}
.nav-cta { padding: 10px 18px; font-size: 14px; }
.nav-burger {
  display: none;
  width: 36px;
  height: 36px;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  padding: 8px;
}
.nav-burger span {
  display: block;
  height: 2px;
  background: var(--fg-1);
  border-radius: 2px;
}

.nav-overlay {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: var(--white);
  padding: 88px 24px 40px;
  display: flex;
  flex-direction: column;
}
.nav-overlay-close {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 40px;
  height: 40px;
  font-size: 32px;
  line-height: 1;
  color: var(--fg-1);
}
.nav-overlay-links {
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
}
.nav-overlay-links a {
  font-family: var(--font-serif);
  font-size: 28px;
  color: var(--fg-1);
}
.nav-overlay-bottom {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid var(--border-1);
}

@media (max-width: 1100px) {
  .nav-links { display: none; }
  .nav-cta { display: none; }
  .nav-right .lang-toggle { display: none; }
  .nav-burger { display: inline-flex; }
}
`;

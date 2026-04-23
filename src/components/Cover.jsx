import { motion } from 'framer-motion';
import { useLang } from '../LangContext.jsx';
import { translations } from '../i18n/translations.js';
import Placeholder from './Placeholder.jsx';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export default function Cover({ onContactClick }) {
  const { lang } = useLang();
  const t = translations[lang].cover;

  return (
    <section className="cover" id="top">
      <div className="cover-bg" aria-hidden="true" />
      <motion.div
        className="cover-inner"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp} className="eyebrow cover-eyebrow">{t.eyebrow}</motion.div>

        <motion.h1 variants={fadeUp} className="cover-brand">{t.brand}</motion.h1>

        <motion.p variants={fadeUp} className="cover-headline">{t.headline}</motion.p>

        <motion.div variants={fadeUp} className="cover-ctas">
          <a href="#problem" className="btn btn-primary btn-lg">{t.ctaPrimary} ↓</a>
          <button type="button" onClick={onContactClick} className="btn btn-ghost btn-lg">{t.ctaSecondary}</button>
        </motion.div>

        <motion.div variants={fadeUp} className="cover-meta">
          {t.meta.map((m, i) => (
            <span key={i} className="cover-chip">
              {m.type === 'placeholder' ? (
                <Placeholder>{m.value}</Placeholder>
              ) : (
                m.value
              )}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <style>{css}</style>
    </section>
  );
}

const css = `
.cover {
  position: relative;
  min-height: 100vh;
  padding: 140px 24px 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.cover-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(800px 500px at 70% 20%, #CFE3F8 0%, transparent 65%),
    radial-gradient(600px 500px at 10% 80%, #EAF3FC 0%, transparent 70%),
    #fff;
  z-index: -1;
}
.cover-inner {
  max-width: 1000px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.cover-eyebrow {
  color: var(--brand-blue);
  margin-bottom: 8px;
}
.cover-brand {
  font-family: var(--font-serif);
  font-size: clamp(44px, 6.5vw, 80px);
  line-height: 1;
  margin: 0;
  letter-spacing: -0.02em;
}
.cover-headline {
  font-family: var(--font-serif);
  font-size: clamp(22px, 2.8vw, 34px);
  line-height: 1.3;
  color: var(--fg-1);
  max-width: 820px;
  margin: 8px 0 24px;
  letter-spacing: -0.01em;
}
.cover-ctas {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 32px;
}
.cover-meta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}
.cover-chip {
  display: inline-flex;
  align-items: center;
  padding: 8px 14px;
  background: var(--gray-100);
  border-radius: 999px;
  font-size: 13px;
  color: var(--fg-2);
}
.cover-chip .ph {
  padding: 0 6px;
  background: rgba(1, 113, 225, 0.08);
}

@media (max-width: 768px) {
  .cover { min-height: auto; padding: 120px 24px 64px; }
}
`;

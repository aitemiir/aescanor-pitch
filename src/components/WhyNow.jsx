import { motion } from 'framer-motion';
import { useLang } from '../LangContext.jsx';
import { translations } from '../i18n/translations.js';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function WhyNow() {
  const { lang } = useLang();
  const t = translations[lang].whyNow;

  return (
    <section className="section section-muted" id="why-now">
      <div className="section-inner">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
        >
          <motion.div variants={fadeUp} className="eyebrow">{t.eyebrow}</motion.div>

          <div className="wn-grid">
            <div className="wn-left">
              <motion.h2 variants={fadeUp} className="section-title">{t.headline}</motion.h2>
              <motion.p variants={fadeUp} className="wn-lede">{t.lede}</motion.p>
            </div>

            <div className="wn-right">
              {t.trends.map((tr, i) => (
                <motion.div key={i} variants={fadeUp} className="card wn-card">
                  <div className="wn-value">{tr.value}</div>
                  <div className="wn-label">{tr.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{css}</style>
    </section>
  );
}

const css = `
.wn-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 64px;
  align-items: start;
}
.wn-left { display: flex; flex-direction: column; gap: 24px; }
.wn-lede {
  font-size: clamp(16px, 1.4vw, 19px);
  color: var(--fg-2);
  line-height: 1.6;
}
.wn-right { display: flex; flex-direction: column; gap: 16px; }
.wn-card { padding: 28px; display: flex; flex-direction: column; gap: 8px; }
.wn-value {
  font-family: var(--font-metric);
  font-size: clamp(36px, 3.8vw, 48px);
  color: var(--brand-blue);
  line-height: 1;
  letter-spacing: -0.02em;
}
.wn-label {
  font-size: 14px;
  color: var(--fg-2);
  line-height: 1.5;
}

@media (max-width: 900px) {
  .wn-grid { grid-template-columns: 1fr; gap: 40px; }
}
`;

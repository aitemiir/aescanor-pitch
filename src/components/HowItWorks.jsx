import { motion } from 'framer-motion';
import { useLang } from '../LangContext.jsx';
import { translations } from '../i18n/translations.js';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function HowItWorks() {
  const { lang } = useLang();
  const t = translations[lang].howItWorks;

  return (
    <section className="section section-muted" id="how">
      <div className="section-inner">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={fadeUp} className="eyebrow">{t.eyebrow}</motion.div>
          <motion.h2 variants={fadeUp} className="section-title">{t.headline}</motion.h2>

          <div className="steps-grid">
            {t.steps.map((s) => (
              <motion.div key={s.n} variants={fadeUp} className="step-card">
                <div className="step-top" />
                <div className="step-num">{s.n}</div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-body">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{css}</style>
    </section>
  );
}

const css = `
.steps-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 24px;
  margin-top: 24px;
}
.step-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 18px;
}
.step-top {
  height: 2px;
  background: var(--border-1);
  margin-bottom: 8px;
}
.step-num {
  font-family: var(--font-serif);
  font-size: 32px;
  color: var(--brand-blue);
  line-height: 1;
}
.step-title {
  font-family: var(--font-sans);
  font-size: 18px;
  font-weight: 600;
  color: var(--fg-1);
  line-height: 1.3;
  margin: 0;
}
.step-body {
  font-size: 14px;
  color: var(--fg-2);
  line-height: 1.6;
}

@media (max-width: 960px) {
  .steps-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .steps-grid { grid-template-columns: 1fr; }
}
`;

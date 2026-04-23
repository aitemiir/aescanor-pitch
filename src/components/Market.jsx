import { motion } from 'framer-motion';
import { useLang } from '../LangContext.jsx';
import { translations } from '../i18n/translations.js';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Market() {
  const { lang } = useLang();
  const t = translations[lang].market;

  return (
    <section className="section" id="market">
      <div className="section-inner">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
        >
          <motion.div variants={fadeUp} className="eyebrow">{t.eyebrow}</motion.div>
          <motion.h2 variants={fadeUp} className="section-title">{t.headline}</motion.h2>

          <div className="mkt-cards">
            {t.cards.map((c, i) => (
              <motion.div
                key={c.tag}
                variants={fadeUp}
                className={`card mkt-card ${c.highlight ? 'mkt-card-highlight' : ''}`}
              >
                <span className={`pill ${c.highlight ? 'pill-blue' : ''}`}>{c.tag}</span>
                <div className="mkt-value">{c.value}</div>
                <div className="mkt-label">{c.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.p variants={fadeUp} className="mkt-paragraph">{t.paragraph}</motion.p>
        </motion.div>
      </div>

      <style>{css}</style>
    </section>
  );
}

const css = `
.mkt-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 56px;
}
.mkt-card {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-1);
  transition: transform var(--dur-base) var(--ease-std);
}
.mkt-card-highlight {
  border: 2px solid var(--brand-blue);
  transform: translateY(-4px);
}
.mkt-value {
  font-family: var(--font-metric);
  font-size: clamp(44px, 5vw, 64px);
  color: var(--fg-1);
  line-height: 1;
  letter-spacing: -0.02em;
}
.mkt-card-highlight .mkt-value { color: var(--brand-blue); }
.mkt-label {
  font-size: 14px;
  color: var(--fg-2);
  line-height: 1.5;
}
.mkt-paragraph {
  font-size: clamp(15px, 1.3vw, 17px);
  color: var(--fg-2);
  line-height: 1.7;
  max-width: 820px;
}

@media (max-width: 900px) {
  .mkt-cards { grid-template-columns: 1fr; }
  .mkt-card-highlight { transform: none; }
}
`;

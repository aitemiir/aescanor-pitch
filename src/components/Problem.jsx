import { motion } from 'framer-motion';
import { useLang } from '../LangContext.jsx';
import { translations } from '../i18n/translations.js';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Problem() {
  const { lang } = useLang();
  const t = translations[lang].problem;

  return (
    <section className="section section-muted" id="problem">
      <div className="section-inner">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
        >
          <div className="problem-layout">
            <motion.div variants={fadeUp} className="problem-left">
              <div className="big-num" aria-hidden="true">{t.number}</div>
              <div className="eyebrow">{t.eyebrow}</div>
            </motion.div>

            <div className="problem-right">
              <motion.h2 variants={fadeUp} className="section-title">{t.headline}</motion.h2>
              <div className="problem-cards">
                {t.cards.map((c, i) => (
                  <motion.div key={i} variants={fadeUp} className="card problem-card">
                    <div className="problem-num-mini">{`0${i + 1}`}</div>
                    <div className="problem-card-body">
                      <h3>{c.title}</h3>
                      <p>{c.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div variants={fadeUp} className="problem-stat">
            {t.statText}
          </motion.div>
        </motion.div>
      </div>

      <style>{css}</style>
    </section>
  );
}

const css = `
.problem-layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 48px;
  align-items: start;
  margin-bottom: 64px;
}
.problem-left {
  position: sticky;
  top: 120px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.big-num {
  font-family: var(--font-metric);
  font-size: clamp(104px, 16vw, 188px);
  font-weight: 600;
  color: color-mix(in srgb, var(--brand-blue) 16%, white);
  line-height: 0.9;
  letter-spacing: -0.06em;
}
.problem-right { display: flex; flex-direction: column; gap: 32px; }
.problem-cards { display: flex; flex-direction: column; gap: 16px; }
.problem-card {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  padding: 24px 28px;
  border: 1px solid rgba(1, 113, 225, 0.08);
}
.problem-num-mini {
  font-family: var(--font-metric);
  font-size: 20px;
  font-weight: 700;
  color: var(--brand-blue);
  line-height: 1;
  flex-shrink: 0;
  padding-top: 4px;
  min-width: 36px;
}
.problem-card-body h3 {
  font-family: var(--font-sans);
  font-size: 18px;
  font-weight: 600;
  color: var(--fg-1);
  margin: 0 0 6px;
}
.problem-card-body p {
  font-size: 15px;
  color: var(--fg-2);
  line-height: 1.6;
}
.problem-stat {
  background: var(--black);
  color: var(--white);
  padding: 36px 32px;
  border-radius: var(--r-card);
  font-family: var(--font-metric);
  font-size: clamp(20px, 2.2vw, 28px);
  line-height: 1.35;
  text-align: center;
  letter-spacing: -0.01em;
}

@media (max-width: 900px) {
  .problem-layout { grid-template-columns: 1fr; gap: 24px; }
  .problem-left { position: static; flex-direction: row; align-items: baseline; gap: 16px; }
  .big-num { font-size: 88px; }
}
`;

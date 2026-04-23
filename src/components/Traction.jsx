import { motion } from 'framer-motion';
import { useLang } from '../LangContext.jsx';
import { translations } from '../i18n/translations.js';
import Placeholder from './Placeholder.jsx';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Traction() {
  const { lang } = useLang();
  const t = translations[lang].traction;

  return (
    <section className="section" id="traction">
      <div className="section-inner">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.div variants={fadeUp} className="eyebrow">{t.eyebrow}</motion.div>
          <motion.h2 variants={fadeUp} className="section-title">{t.headline}</motion.h2>

          <div className="tr-metrics">
            {t.metrics.map((m, i) => (
              <motion.div key={i} variants={fadeUp} className="tr-metric">
                <div className="tr-metric-value">
                  {m.placeholder ? <Placeholder>{m.value}</Placeholder> : m.value}
                </div>
                <div className="tr-metric-label">{m.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="tr-timeline-wrap">
            {t.timelineIntro ? <div className="tr-intro">{t.timelineIntro}</div> : null}
            <h3 className="tr-sub">{t.timelineTitle}</h3>
            <div className="tr-timeline">
              <div className="tr-nodes">
                {t.timeline.map((m, i) => (
                  <div key={i} className="tr-node">
                    <div className="tr-node-head">
                      <div className="tr-dot" />
                      <div className="tr-date">
                        {m.placeholder ? <Placeholder>{m.date}</Placeholder> : m.date}
                      </div>
                    </div>
                    <div className="tr-label">{m.label}</div>
                    {m.body ? <div className="tr-body">{m.body}</div> : null}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="tr-feedback">
            <h3 className="tr-sub">{t.feedbackTitle}</h3>
            <div className="tr-quotes">
              {t.quotes.map((q, i) => (
                <motion.div key={i} variants={fadeUp} className="tr-quote">
                  <div className="tr-quote-text">{q.text}</div>
                  <div className="tr-quote-meta">
                    <span className="tr-quote-role">{q.role}</span>
                    <span className="tr-quote-company">{q.company}</span>
                  </div>
                  {q.placeholder && <span className="tr-quote-flag"><Placeholder>placeholder</Placeholder></span>}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{css}</style>
    </section>
  );
}

const css = `
.tr-metrics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 32px 0;
  border-top: 1px solid var(--border-1);
  border-bottom: 1px solid var(--border-1);
  margin-bottom: 56px;
}
.tr-metric {
  padding: 0 16px;
  border-right: 1px solid var(--border-1);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.tr-metric:last-child { border-right: none; }
.tr-metric-value {
  font-family: var(--font-metric);
  font-size: clamp(32px, 3.6vw, 48px);
  color: var(--fg-1);
  line-height: 1;
}
.tr-metric-label {
  font-size: 13px;
  color: var(--fg-2);
  line-height: 1.5;
}

.tr-sub {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--fg-3);
  margin: 0 0 20px;
}

.tr-timeline-wrap { margin-bottom: 56px; }
.tr-intro {
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 1.5;
  color: var(--fg-1);
}
.tr-timeline {
  position: relative;
}
.tr-nodes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}
.tr-node {
  min-height: 100%;
  padding: 18px;
  border: 1px solid var(--border-1);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.78);
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.tr-node-head {
  display: flex;
  align-items: center;
  gap: 10px;
}
.tr-dot {
  width: 14px;
  height: 14px;
  background: var(--white);
  border: 2px solid var(--brand-blue);
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(1, 113, 225, 0.12);
}
.tr-date {
  font-size: 12px;
  font-weight: 600;
  color: var(--brand-blue);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.tr-label {
  font-size: 16px;
  font-weight: 600;
  color: var(--fg-1);
  line-height: 1.4;
}
.tr-body {
  font-size: 13px;
  color: var(--fg-2);
  line-height: 1.55;
}

.tr-quotes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.tr-quote {
  position: relative;
  background: var(--black);
  color: var(--white);
  padding: 32px 28px;
  border-radius: var(--r-card);
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.tr-quote-text {
  font-family: var(--font-serif);
  font-size: clamp(18px, 1.8vw, 22px);
  line-height: 1.4;
  color: var(--white);
  font-style: italic;
}
.tr-quote-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-family: var(--font-sans);
}
.tr-quote-role {
  font-size: 13px;
  font-weight: 600;
  color: var(--blue-300);
}
.tr-quote-company {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}
.tr-quote-flag {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 10px;
}
.tr-quote-flag .ph {
  background: rgba(111, 176, 239, 0.14);
  color: var(--blue-300);
  border-color: rgba(111, 176, 239, 0.5);
  font-size: 10px;
  padding: 1px 6px;
}

@media (max-width: 960px) {
  .tr-metrics { grid-template-columns: repeat(2, 1fr); gap: 24px; }
  .tr-metric:nth-child(2) { border-right: none; }
  .tr-nodes { grid-template-columns: 1fr; gap: 24px; }
  .tr-quotes { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .tr-metrics { grid-template-columns: 1fr; }
  .tr-metric { border-right: none; border-bottom: 1px solid var(--border-1); padding-bottom: 20px; }
  .tr-metric:last-child { border-bottom: none; padding-bottom: 0; }
}
`;

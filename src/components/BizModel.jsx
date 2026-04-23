import { motion } from 'framer-motion';
import { useLang } from '../LangContext.jsx';
import { translations } from '../i18n/translations.js';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function BizModel() {
  const { lang } = useLang();
  const t = translations[lang].bizModel;

  return (
    <section className="section" id="model">
      <div className="section-inner">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.div variants={fadeUp} className="eyebrow">{t.eyebrow}</motion.div>
          <motion.h2 variants={fadeUp} className="section-title">{t.headline}</motion.h2>

          <div className="bm-grid">
            <div className="bm-left">
              <ul className="bm-streams">
                {t.streams.map((s, i) => (
                  <motion.li key={i} variants={fadeUp}>
                    <strong>{s.title}</strong>
                    <span>{s.body}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="bm-right">
              {t.tiers.map((tier, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className={`card bm-tier ${tier.popular ? 'bm-tier-popular' : ''}`}
                >
                  {tier.popular && <span className="bm-badge">{tier.popularLabel}</span>}
                  <h3 className="bm-tier-name">{tier.name}</h3>
                  <div className="bm-tier-price">{tier.price}</div>
                  <div className="bm-tier-feature">{tier.feature}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bm-metrics">
            {t.metrics.map((m, i) => (
              <motion.div key={i} variants={fadeUp} className="bm-metric">
                <div className="bm-metric-value">{m.value}</div>
                <div className="bm-metric-label">{m.label}</div>
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
.bm-grid {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 48px;
  margin-bottom: 48px;
  align-items: start;
}
.bm-streams {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.bm-streams li {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-left: 16px;
  position: relative;
}
.bm-streams li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px;
  width: 6px;
  height: 6px;
  background: var(--brand-blue);
  border-radius: 50%;
}
.bm-streams strong {
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 600;
  color: var(--fg-1);
}
.bm-streams span {
  font-size: 14px;
  color: var(--fg-2);
  line-height: 1.55;
}

.bm-right {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  align-items: stretch;
}
.bm-tier {
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  text-align: center;
}
.bm-tier-popular {
  border: 2px solid var(--brand-blue);
  box-shadow: var(--shadow-md);
  transform: translateY(-6px);
}
.bm-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--brand-blue);
  color: var(--white);
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  letter-spacing: 0.04em;
  white-space: nowrap;
}
.bm-tier-name {
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 600;
  color: var(--fg-1);
  margin: 0;
}
.bm-tier-price {
  font-family: var(--font-metric);
  font-size: 22px;
  color: var(--brand-blue);
  line-height: 1.15;
  letter-spacing: -0.01em;
}
.bm-tier-feature {
  font-size: 13px;
  color: var(--fg-2);
  line-height: 1.5;
}

.bm-metrics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 32px 0;
  border-top: 1px solid var(--border-1);
  border-bottom: 1px solid var(--border-1);
}
.bm-metric {
  padding: 0 16px;
  border-right: 1px solid var(--border-1);
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.bm-metric:last-child { border-right: none; }
.bm-metric-value {
  font-family: var(--font-metric);
  font-size: clamp(28px, 3vw, 40px);
  color: var(--fg-1);
  line-height: 1;
}
.bm-metric-label {
  font-size: 13px;
  color: var(--fg-2);
}

@media (max-width: 960px) {
  .bm-grid { grid-template-columns: 1fr; gap: 32px; }
  .bm-right { grid-template-columns: 1fr; gap: 24px; }
  .bm-tier-popular { transform: none; }
  .bm-metrics { grid-template-columns: repeat(2, 1fr); gap: 24px; }
  .bm-metric:nth-child(2) { border-right: none; }
}
@media (max-width: 600px) {
  .bm-metrics { grid-template-columns: 1fr; }
  .bm-metric { border-right: none; border-bottom: 1px solid var(--border-1); padding-bottom: 20px; }
  .bm-metric:last-child { border-bottom: none; padding-bottom: 0; }
}
`;

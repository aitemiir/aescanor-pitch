import { motion } from 'framer-motion';
import { useLang } from '../LangContext.jsx';
import { translations } from '../i18n/translations.js';
import OperationsMap from './OperationsMap.jsx';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Solution() {
  const { lang } = useLang();
  const t = translations[lang].solution;

  return (
    <section className="section" id="solution">
      <div className="section-inner sol-wrap">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
        >
          <motion.div variants={fadeUp} className="eyebrow">{t.eyebrow}</motion.div>
          <motion.h2 variants={fadeUp} className="sol-headline">{t.headline}</motion.h2>

          <div className="sol-pillars">
            {t.pillars.map((p, i) => (
              <motion.div key={i} variants={fadeUp} className="sol-pillar">
                <div className="sol-pillar-num">{`0${i + 1}`}</div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="sol-map-wrap">
            <OperationsMap />
          </motion.div>
        </motion.div>
      </div>

      <style>{css}</style>
    </section>
  );
}

const css = `
.sol-wrap { max-width: 960px; text-align: center; margin: 0 auto; }
.sol-headline {
  font-family: var(--font-serif);
  font-size: clamp(28px, 3.6vw, 44px);
  line-height: 1.25;
  color: var(--fg-1);
  max-width: 820px;
  margin: 0 auto 56px;
  letter-spacing: -0.01em;
}
.sol-pillars {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 64px;
}
.sol-pillar { text-align: left; }
.sol-pillar-num {
  font-family: var(--font-serif);
  font-size: 20px;
  color: var(--brand-blue);
  margin-bottom: 12px;
}
.sol-pillar h3 {
  font-family: var(--font-sans);
  font-size: 20px;
  font-weight: 600;
  color: var(--fg-1);
  margin: 0 0 8px;
  line-height: 1.3;
}
.sol-pillar p {
  font-size: 15px;
  color: var(--fg-2);
  line-height: 1.55;
  margin: 0;
}
.sol-map-wrap { margin-top: 8px; }

@media (max-width: 768px) {
  .sol-pillars { grid-template-columns: 1fr; gap: 24px; }
}
`;

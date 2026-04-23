import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLang } from '../LangContext.jsx';
import { translations } from '../i18n/translations.js';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Team() {
  const { lang } = useLang();
  const t = translations[lang].team;

  return (
    <section className="section section-dark team-section" id="team">
      <div className="section-inner">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.div variants={fadeUp} className="eyebrow eyebrow-dark">{t.eyebrow}</motion.div>
          <motion.h2 variants={fadeUp} className="section-title section-title-dark">{t.headline}</motion.h2>

          <div className="team-grid">
            {t.members.map((m, i) => (
              <motion.div key={i} variants={fadeUp} className="team-card">
                <TeamAvatar member={m} />
                <div className="team-name">
                  {m.name}
                </div>
                <div className="team-role">{m.role}</div>
                <p className="team-bio">{m.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{css}</style>
    </section>
  );
}

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
}

function TeamAvatar({ member }) {
  const [imageError, setImageError] = useState(false);
  const showImage = member.photo && !imageError;

  return (
    <div className="team-avatar" aria-hidden="true">
      {showImage ? (
        <img
          src={member.photo}
          alt={member.name}
          className="team-avatar-image"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="team-avatar-inner">
          <span className="team-avatar-initials">{getInitials(member.name)}</span>
        </div>
      )}
    </div>
  );
}

const css = `
.team-section { padding: 120px 24px; }
.eyebrow-dark { color: var(--blue-300); }
.section-title-dark { color: var(--white); }

.team-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 360px));
  justify-content: center;
  gap: 20px;
  margin-top: 32px;
  margin-bottom: 48px;
}
.team-card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--r-card);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  backdrop-filter: blur(8px);
}
.team-avatar {
  width: 100%;
  aspect-ratio: 4 / 3.95;
  margin-bottom: 10px;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.team-avatar-inner {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at top, rgba(111, 176, 239, 0.22), rgba(255, 255, 255, 0.05));
  display: flex;
  align-items: center;
  justify-content: center;
}
.team-avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.team-avatar-initials {
  font-family: var(--font-metric);
  font-size: 48px;
  font-weight: 600;
  color: var(--blue-300);
}

.team-name {
  font-family: var(--font-sans);
  font-size: 20px;
  font-weight: 600;
  color: var(--white);
}
.team-role {
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--blue-300);
}
.team-bio {
  font-family: var(--font-sans);
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.55;
  margin: 0;
}

@media (max-width: 960px) {
  .team-grid { grid-template-columns: minmax(0, 420px); }
}
`;

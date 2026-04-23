import { useLang } from '../LangContext.jsx';
import { translations } from '../i18n/translations.js';

export default function Footer() {
  const { lang } = useLang();
  const t = translations[lang].footer;

  return (
    <footer className="footer">
      <div className="footer-inner">
        <a href="#top" className="ae-wordmark on-dark">
          <span className="serif">Aescanor</span>
          <span className="sans-blue">Partners</span>
        </a>
        <div className="footer-tagline">{t.tagline}</div>

        <div className="footer-contact">
          <span className="footer-contact-label">{t.contactLabel}</span>
          <a href={`mailto:${t.email}`} className="footer-email">{t.email}</a>
          <a href={`tel:${t.phone.replace(/\+/g, '')}`} className="footer-email">{t.phone}</a>
        </div>

        <div className="footer-legal">{t.legal}</div>
      </div>

      <style>{css}</style>
    </footer>
  );
}

const css = `
.footer {
  background: var(--black);
  color: var(--white);
  padding: 48px 24px 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
.footer-inner {
  max-width: var(--maxw);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
}
.footer-tagline {
  font-family: var(--font-serif);
  font-size: 15px;
  color: rgba(255, 255, 255, 0.65);
  letter-spacing: -0.01em;
  font-style: italic;
}
.footer-contact {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 8px;
}
.footer-contact-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
}
.footer-email {
  color: var(--white);
  font-size: 15px;
  font-weight: 500;
  transition: color var(--dur-base) var(--ease-std);
}
.footer-email:hover { color: var(--blue-300); }
.footer-legal {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 20px;
  width: 100%;
  max-width: 480px;
}
`;

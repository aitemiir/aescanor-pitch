import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '../LangContext.jsx';
import { translations } from '../i18n/translations.js';

const endpoint = import.meta.env.VITE_LEAD_FORM_ENDPOINT;

export default function ContactModal({ open, onClose }) {
  const { lang } = useLang();
  const t = translations[lang].contactForm;
  const [form, setForm] = useState({ name: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setForm({ name: '', phone: '' });
      setErrors({});
      setStatus('idle');
      setMessage('');
    }
  }, [open]);

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = t.nameLabel;
    if (!form.phone.trim()) nextErrors.phone = t.phoneLabel;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    if (!endpoint) {
      setStatus('error');
      setMessage(t.missingEndpoint);
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          lang,
          source: t.sourceLabel,
          page: window.location.href,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error('Request failed');

      setStatus('success');
      setMessage(t.success);
      setForm({ name: '', phone: '' });
    } catch {
      setStatus('error');
      setMessage(t.error);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="contact-modal-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button className="contact-modal-backdrop" aria-label={t.close} onClick={onClose} />
          <motion.div
            className="contact-modal-card"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
          >
            <button className="contact-modal-close" type="button" onClick={onClose} aria-label={t.close}>×</button>
            <div className="contact-modal-pill">{t.sourceLabel}</div>
            <h3 id="contact-modal-title" className="contact-modal-title">{t.title}</h3>
            <p className="contact-modal-subtitle">{t.subtitle}</p>

            <form className="contact-modal-form" onSubmit={onSubmit}>
              <div className="field">
                <label htmlFor="contact-name">{t.nameLabel}</label>
                <input
                  id="contact-name"
                  className={`input${errors.name ? ' is-invalid' : ''}`}
                  placeholder={t.namePlaceholder}
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                />
              </div>

              <div className="field">
                <label htmlFor="contact-phone">{t.phoneLabel}</label>
                <input
                  id="contact-phone"
                  className={`input${errors.phone ? ' is-invalid' : ''}`}
                  placeholder={t.phonePlaceholder}
                  value={form.phone}
                  onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                  inputMode="tel"
                />
              </div>

              {message ? <div className={`contact-modal-message ${status}`}>{message}</div> : null}

              <button className="btn btn-primary btn-full contact-modal-submit" type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? t.sending : t.submit}
              </button>
            </form>
          </motion.div>

          <style>{css}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const css = `
.contact-modal-root {
  position: fixed;
  inset: 0;
  z-index: 120;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.contact-modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(6, 17, 32, 0.54);
  backdrop-filter: blur(8px);
}
.contact-modal-card {
  position: relative;
  width: min(100%, 460px);
  padding: 28px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 30px 80px rgba(8, 15, 30, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.75);
}
.contact-modal-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--gray-100);
  color: var(--fg-1);
  font-size: 24px;
  line-height: 1;
}
.contact-modal-pill {
  display: inline-flex;
  align-items: center;
  padding: 7px 12px;
  border-radius: 999px;
  background: var(--blue-50);
  color: var(--brand-blue);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.contact-modal-title {
  margin-top: 18px;
  font-size: clamp(30px, 4vw, 40px);
}
.contact-modal-subtitle {
  margin-top: 10px;
  font-size: 15px;
  line-height: 1.6;
  color: var(--fg-2);
}
.contact-modal-form {
  margin-top: 22px;
}
.contact-modal-message {
  margin: 6px 0 14px;
  padding: 12px 14px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.5;
}
.contact-modal-message.success {
  background: #edf9f0;
  color: #136c2e;
}
.contact-modal-message.error {
  background: #fff2f1;
  color: #b42318;
}
.contact-modal-submit {
  margin-top: 8px;
  min-height: 52px;
}

@media (max-width: 640px) {
  .contact-modal-root {
    align-items: flex-end;
    padding: 0;
  }
  .contact-modal-card {
    width: 100%;
    border-radius: 28px 28px 0 0;
    padding: 24px 20px 28px;
  }
}
`;

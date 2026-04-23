import { useLang } from '../LangContext.jsx';
import { translations } from '../i18n/translations.js';

export default function Placeholder({ children, as = 'span', className = '', ...rest }) {
  const { lang } = useLang();
  const title = translations[lang].placeholderTitle;
  const Tag = as;
  return (
    <>
      <Tag className={`ph ${className}`.trim()} title={title} {...rest}>
        {children}
      </Tag>
      <style>{css}</style>
    </>
  );
}

const css = `
.ph {
  display: inline-block;
  padding: 1px 8px;
  background: rgba(1, 113, 225, 0.08);
  color: var(--brand-blue);
  border: 1px dashed rgba(1, 113, 225, 0.55);
  border-radius: 6px;
  font-family: var(--font-sans);
  font-weight: 500;
  letter-spacing: 0;
  cursor: help;
  line-height: 1.3;
}
.ph.ph-block {
  display: block;
  padding: 12px 16px;
  border-radius: 10px;
}
.ph.ph-quiet {
  background: transparent;
  border-style: dashed;
  border-color: rgba(1, 113, 225, 0.35);
}
.ph.ph-dark {
  background: rgba(111, 176, 239, 0.14);
  color: var(--blue-300);
  border-color: rgba(111, 176, 239, 0.5);
}
`;

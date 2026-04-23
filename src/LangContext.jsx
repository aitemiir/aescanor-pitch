import { createContext, useContext, useEffect, useState } from 'react';

export const LangContext = createContext({ lang: 'ru', setLang: () => {} });

export const useLang = () => useContext(LangContext);

export function LangProvider({ children }) {
  const [lang, setLang] = useState('ru');

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

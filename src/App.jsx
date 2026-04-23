import { useEffect, useState } from 'react';
import { useLang } from './LangContext.jsx';
import { translations } from './i18n/translations.js';
import NavBar from './components/NavBar.jsx';
import ProgressBar from './components/ProgressBar.jsx';
import Cover from './components/Cover.jsx';
import Problem from './components/Problem.jsx';
import Solution from './components/Solution.jsx';
import WhyNow from './components/WhyNow.jsx';
import Market from './components/Market.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import BizModel from './components/BizModel.jsx';
import Traction from './components/Traction.jsx';
import Team from './components/Team.jsx';
import Footer from './components/Footer.jsx';
import ContactModal from './components/ContactModal.jsx';

export default function App() {
  const { lang } = useLang();
  const t = translations[lang];
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    document.title = t.meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t.meta.description);
  }, [t]);

  return (
    <>
      <NavBar onContactClick={() => setContactOpen(true)} />
      <ProgressBar />
      <main>
        <Cover onContactClick={() => setContactOpen(true)} />
        <Problem />
        <Solution />
        <WhyNow />
        <Market />
        <HowItWorks />
        <BizModel />
        <Traction />
        <Team />
      </main>
      <Footer />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}

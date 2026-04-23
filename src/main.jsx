import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LangProvider } from './LangContext.jsx';
import App from './App.jsx';

import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>
);

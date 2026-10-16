import React from 'react'
import ReactDOM from 'react-dom/client'
// CSS chung nạp trước để CSS của từng component (import trong component) đè được.
import './styles.css'
import App from './App.jsx'
import { I18nProvider } from './i18n/I18nProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </React.StrictMode>,
)

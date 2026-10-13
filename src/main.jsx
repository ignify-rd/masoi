import React from 'react'
import ReactDOM from 'react-dom/client'
// CSS chung nạp trước để CSS của từng component (import trong component) đè được.
import './styles.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

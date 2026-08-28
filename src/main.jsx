import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Global Google Client ID Configuration
window.GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '921200467070-djn651tah3a6ai3vbeo820q1oqsd84lh.apps.googleusercontent.com';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


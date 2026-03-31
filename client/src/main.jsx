import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { API_BASE_URL } from './config.js'

if (import.meta.env.PROD && API_BASE_URL?.startsWith('http')) {
  try {
    const apiOrigin = new URL(API_BASE_URL).origin
    const pre = document.createElement('link')
    pre.rel = 'preconnect'
    pre.href = apiOrigin
    pre.crossOrigin = 'anonymous'
    document.head.appendChild(pre)
    const dns = document.createElement('link')
    dns.rel = 'dns-prefetch'
    dns.href = apiOrigin
    document.head.appendChild(dns)
  } catch {
    /* ignore invalid API_BASE_URL */
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

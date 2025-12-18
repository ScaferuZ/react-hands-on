import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { ToastProvider, ToastViewport } from './components/ui/use-toast'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider>
      <App />
      <ToastViewport />
    </ToastProvider>
  </React.StrictMode>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/css/main.css'
import './assets/css/animate.min.css'
import 'react-loading-skeleton/dist/skeleton.css'


import App from './App.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

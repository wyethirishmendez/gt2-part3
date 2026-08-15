import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< HEAD
import { BrowserRouter } from 'react-router'
=======
>>>>>>> 2d3a340683bebfcb6d08dcdbb92eb81023aaf73f
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
<<<<<<< HEAD
    <BrowserRouter>
      <App />
    </BrowserRouter>
=======
    <App />
>>>>>>> 2d3a340683bebfcb6d08dcdbb92eb81023aaf73f
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { configurePdfWorker } from '../src/index'
import './index.css'
import { App } from './App'

configurePdfWorker()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

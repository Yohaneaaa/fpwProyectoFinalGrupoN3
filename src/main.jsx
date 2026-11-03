import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import './css/juegos.css'
import { Enrutador } from './routes/routes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Enrutador />
  </StrictMode>,
)

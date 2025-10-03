import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import About from './About.tsx'
import FullCalendarComponent from './Calendar'
import Payments from './Payments'
import { BrowserRouter as Router, Routes, Route } from'react-router-dom'
import PujaList from './Puja'

const routes = (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<About />} />
      <Route path="/events/calendar" element={<FullCalendarComponent />} />  
      <Route path="/services/payments" element={<Payments/>} />
      <Route path="/events/puja" element={<PujaList/>} />
    </Routes>
  </Router>

)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {routes}
  </StrictMode>
)

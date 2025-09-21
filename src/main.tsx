import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import About from './About.tsx'
import FullCalendarComponent from './Calendar'
import { BrowserRouter as Router, Routes, Route } from'react-router-dom'

const routes = (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<About />} />
      <Route path="/events/calendar" element={<FullCalendarComponent />} />   
    </Routes>
  </Router>

)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {routes}
  </StrictMode>
)

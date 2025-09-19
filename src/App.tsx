import { useState } from 'react'
import './App.css'

function App() {
  const [isAboutOpen, setAboutOpen] = useState(false);
  const [isContactOpen, setContactOpen] = useState(false);

  return (
    <>
    <header className="app-header">
      <div className="logo-sharadha">
        <img src="/sharadha.webp" alt="SharadhaPeetham logo" />
      </div>
      <div className='pagetitle'>
          <h1>SharadhaPeetham</h1>
      </div>
      <div className='tabs-container'>
        <div className="tab">
          <div className="dropdown">
            <button onClick={() => setAboutOpen(!isAboutOpen)} className="tabs">
              About
            </button>
            {isAboutOpen && (
              <div className="dropdown-menu">
                <a href="https://sringeri.net/history" className="dropdown-item">History</a>
                <a href="https://sringeri.net/jagadgurus" className="dropdown-item">Guru Parampara</a>
              </div>
            )}
          </div>
        </div>
        <div className="tab">
        <div className="dropdown">
          <button onClick={() => setContactOpen(!isContactOpen)} className="tabs">
            Contact
            </button>
          {isContactOpen && (
            <div className="dropdown-menu">
                <a href="https://sringeri.net/contact" className="dropdown-item">Phone</a>
                <a href="https://sringeri.net/contact" className="dropdown-item">Email</a>
              </div>
            )}
        </div>
        </div>
        <div className="tab">
        <div className="dropdown">
          <button className="tabs">
            Contact
          </button>
        </div>
        </div>
        <div className="tab">
        <div className="dropdown">
          <button className="tabs">
            Contact
          </button>
        </div>
        </div>
        <div className="tab">
        <div className="dropdown">
          <button className="tabs">
            Contact
          </button>
        </div>
        </div>
      </div>
    </header>
    <p>Welcome to SharadhaPeetham, a temple dedicated to the Sharadhamba devi</p>
    <div className="logo-container">
    </div>
        <div className="logo">
            <img src="/sringeri.webp" alt="Sharadhamba logo" />
        </div>
    </>
  )
}

export default App

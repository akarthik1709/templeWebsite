import { useState, useEffect, useRef } from 'react';
import './App.css';
import CarouselComponent from './Carousel';
export default function App() {
  const [isAboutOpen, setAboutOpen] = useState(false);
  const [isContactOpen, setContactOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const array_test = ["src/assets/sringeri.webp", "src/assets/shankara.jpeg"]

  // You do not need state for the initial slide; this should be handled inside the CarouselComponent.
  const [isInitial, setIsInitial] = useState(true);

  // The logic to set isInitial to false should be handled in a useEffect hook.
  useEffect(() => {
    // This part is likely not needed if the carousel handles its own state,
    // but if it's required for the carousel component, this is the correct syntax.
    // setIsInitial(false);
    
    function handleClickOutside(event: MouseEvent) {
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setAboutOpen(false);
      }
      if (contactRef.current && !contactRef.current.contains(event.target as Node)) {
        setContactOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [aboutRef, contactRef]);

  // Removed the incorrect useState call. It was a major error.

  return (
    <>
      <div className="bg-image"></div>
      <header className="app-header">
        <div className="logo-sharadha">
          <img src="/sharadha.webp" alt="SharadhaPeetham logo" />
        </div>
        <div className='pagetitle'>
          <h1>SharadhaPeetham</h1>
        </div>
        <div className='tabs-container'>
          <div className="tab">
            <div className="dropdown" ref={aboutRef}>
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
            <div className="dropdown" ref={contactRef}>
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
        <p className="text-xl text-center my-8">
          Welcome to SharadhaPeetham, a temple dedicated to the Sharadhamba devi
        </p>
        <div className="carousel-container">
          <div className="carousel-images">
          <CarouselComponent/>
        </div>
        </div>
        <div className="text-center my-8">
          <p>
            SharadhaPeetham is a temple located in the heart of the city of Sringeri, India. It was built in 1997 by the Sharadhamba devi, who is the patron deity of the temple.
          </p>
        </div>
        <footer className="footer">
          <p>2025 SharadhaPeetham. All rights reserved.</p>
        </footer>
    </>
  );
}
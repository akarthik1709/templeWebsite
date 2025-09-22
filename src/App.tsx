import { useState, useEffect, useRef } from 'react';
import './App.css';
import CarouselComponent from './Carousel';
import { Link } from'react-router-dom';
export default function App() {
  const [isAboutOpen, setAboutOpen] = useState(false);
  const [isContactOpen, setContactOpen] = useState(false);
  const [isEventsOpen, setEventsOpen] = useState(false);
  const [isServicesOpen, setServicesOpen] = useState(false);
  const [isResourcesOpen, setResourcesOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  //const resourcesRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    
    function handleClickOutside(event: MouseEvent) {
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setAboutOpen(false);
      }
      if (contactRef.current && !contactRef.current.contains(event.target as Node )) {
        setContactOpen(false);
      }
      if (eventsRef.current && !eventsRef.current.contains(event.target as Node )) {
        setEventsOpen(false);
      }
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node )) {
        setServicesOpen(false);
      }

    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [aboutRef, contactRef, eventsRef, servicesRef]);


  return (
    <div style={{ display: 'block', flexDirection: 'column' }}>
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
                  <a href="/about" className="dropdown-item">Mutt History</a>
                  <a href="/about" className="dropdown-item">Details on Sri Dwithiya Chandrasekara Bharathi Adistana</a>
                  <a href='/Tkudalu Stala Purana cum appeal- english version_021419.pdf' className="dropdown-item">Sthala Purana</a>
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
            <div className="dropdown" ref={eventsRef}>
              <button onClick={() => setEventsOpen(!isEventsOpen)} className="tabs">
                Events
              </button>
              {isEventsOpen && (
                <div className="dropdown-menu">
                  <Link to="/events/calendar" className="dropdown-item">Calendar </Link>
                  <a href="/events" className="dropdown-item">Past Events</a>
                  <a href="/events" className="dropdown-item">Upcoming Events</a>
                  <a href="/events" className="dropdown-item">Meetings</a>
                  <a href="/events" className="dropdown-item">Aksharabhyasa</a>
                  <a href="/events" className="dropdown-item">Poojas</a>
                  <a href="/events" className="dropdown-item">Navarathri Pooja</a>
                  <a href="/events" className="dropdown-item">Shankara Jayanti</a>
                  <a href="/events" className="dropdown-item">Shankara Aradhane</a>
                  <a href="/events" className="dropdown-item">Bhajans</a>
                  <a href="/events" className="dropdown-item">Sri Sri Vidushekara Bharathi's visit to Mutt</a>
                </div>
              )}
            </div>
          </div>
          <div className="tab">
            <div className="dropdown" ref={servicesRef}>
              <button onClick={()=> setServicesOpen(!isServicesOpen)} className="tabs">
                Services
              </button>
              {isServicesOpen && (
                <div className="dropdown-menu">
                  <Link to="/services/payments" className="dropdown-item">Online Payment</Link>
                </div>
              )}
            </div>
          </div>
          <div className="tab">
            <div className="dropdown">
              <button  onClick={()=> setResourcesOpen(!isResourcesOpen)} className="tabs">
                Resources
              </button>
              {isResourcesOpen && (
                <div className="dropdown-menu">
                  <a href="https://sringeri.net/contact" className="dropdown-item">LN Sastry Book</a>
                  <a href="https://sringeri.net/contact" className="dropdown-item">Sri Sringeri Vignetts</a>

                </div>
              )}
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
        {/*This is the about section below the carousel */}

        <div className="about-section">
  <h2 className="about-heading">About SharadhaPeetham</h2>
  <div className="about-container">
    <p className="about-text">
    Sri Narasimha Bharati Mahaswami (1389-1408 AD) was the 14th pontiff in the line of Sri Sringeri,
          Jagadguru, who had two disciples.
          The first of that disciple was Sri Chandrasekhara Bharati (II) and the second was Sri Purushottama
          Bharati.
          Shri Chandrasekhara Bharati Swamy (II) was crowned as the 15th Pontiff in the presence of Shri Krishna
          Devaraya of Hampe.
          After 1408 Shri Chandrasekhara Bharati Swamy (II) went to the Sringeri mutt and took over the
          administration of Sringeri Samsthanam, built the adhistanam of his guru Sri Narasimha Bharati and
          settled there for some time and then moved over to Tirumakudalu kshetra, the confluence of Kaveri,
          Kapila and Spatika sarovara, which is about 30 km from Mysore city, along with his brother monk
          Purushottama Bharati.
          According to Tirumakudalu history, there was a saint named Sri Achyutaranya the disciple of Sri
          Vidyaranya.
          Sri Achyutaranya invited the Sri Chandrasekhara Bharati (II) who was the head of administration of Sri
          Sringeri Samsthanam to come to Tirumakudalu for Chaturmasa. Accordingly, Sri Chandrashekhar
          Bharati (II) accepted the invite and stayed there for 6 months and focused on yoga and penance in
          the ashram of Sri Achyutharanya.
          According to Sri Sringeri vignettes Book, Sri ChandraShekara Bharati(II) installed SriChakra in the
          temples of Tirumakudalu, Satyagala, Shivana Samudra, Nanjangudu, and attained Kaivalya in
          Tirumakudalu Kshetra.
          The then emperors of Vijayanagara, Sri Devaraya, with all due respect, built an in a great way for Sri
          Chandrasekhara Bharati (II)and arranged pujakaryas and built a 25-column Shankara Mutt and
          installed a Shiva Linga on it facing south and called it Sri Shankareshwara and which is now
          popularly known as Sri Sringeri Shankara M utt.
          This adhistanam of Sri Chandra Shekara Bharathi (II) in the Shankara Math is located towards north of
          the old Tirumakudalu Brahmaswatta.
          Then after, Sri Purushottam Bharathi who had accompanied Sri Chandrasekhara Bharati (II) was invited
          to Hampe by the King of Vijayanagara with all the royal honors.
          There Sri Purushottam Bharathi was crowned in Sri Sringeri Samsthanam. Later Sri Purushottam
          Bharathi arrived at Sringeri and accepted the authority of Sringeri Samsthanam.
          Sri Jagadguru MahaSannidhanam Sri Sri Bharathi Theertha Mahaswami came to Sri Sringeri
          Tirumakudalu Sankara Mutt in 1984 and inspected the adhistanam of Sri Chandrasekhara Swami (II)
          and blessed the group of devotees who had gathered there saying that it belongs to our Mutt and it
          should be developed.
 
    </p>
  </div>
</div>
          <div className="audio-container">
            <h3 className='audio-heading'>Click Here to play Audio</h3>
            <audio controls>
              <source src="/tirumakudalu sthala purana-manavi. (1).m4a" type="audio/mp4"/>
              Your browser does not support the audio element.
            </audio>
        </div>
          <div className="map-section">
          <h2 className='map-heading'>Map</h2>
          <div className="map-container">
          </div>

        </div>
        <div className="news-section">
          <h2 className='news-heading'>News</h2>
          <div className="news-container">
          </div>
        </div>
        <footer className="footer">
          <p>2025 SharadhaPeetham. All rights reserved.</p>
          <div className="social-media-icons">
            <a href="https://www.facebook.com/SharadhaPeetham">
              <img src="/facebook.svg" alt="Facebook" style={{
                width: 32,
                height: 32,
              }}/>
            </a>
            <a href="https://www.instagram.com/sharadhapeetham">
              <img src="/instagram.svg" alt="Instagram" style={{
                width: 32,
                height: 32,
              }} />
            </a>
            <a href="https://www.twitter.com/SharadhaPeetham">
              <img src="/twitter.svg" alt="Twitter" style={{
                width: 32,
                height: 32,
              }}/>
            </a>
            <a href="https://www.linkedin.com/company/sharadha-peetham">
              <img src="/linkedin.svg" alt="LinkedIn" style={{
                width: 32,
                height: 32,
                gap: 10,
              }}/>
            </a>
          </div>
        </footer>
    </div>
  );
}
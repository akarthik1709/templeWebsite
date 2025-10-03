import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import App from './App';

function PujaList() {
  const [isAboutOpen, setAboutOpen] = useState(false);
  const [isContactOpen, setContactOpen] = useState(false);
  const [isEventsOpen, setEventsOpen] = useState(false);
  const [isServicesOpen, setServicesOpen] = useState(false);
  const [isResourcesOpen, setResourcesOpen] = useState(false);
  const [ismembershipOpen, setmembershipOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const membershipRef = useRef<HTMLDivElement>(null);



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
      if (resourcesRef.current &&!resourcesRef.current.contains(event.target as Node )) {
        setResourcesOpen(false);
      }
      if (membershipRef.current &&!membershipRef.current.contains(event.target as Node )) {
        setmembershipOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [aboutRef, contactRef, eventsRef, servicesRef, resourcesRef, membershipRef]);
    return (
        <div>
            <header className="app-header">
        <div className="logo-sharadha">
          <img src="/sharadha.webp" alt="SharadhaPeetham logo" onClick={()=> window.location.href="/"}/>
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
                  <Link to="/events/puja" className="dropdown-item">Poojas</Link>
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
            <div className="dropdown" ref={resourcesRef}>
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
          <div className="tab">
            <div className="dropdown" ref={membershipRef}>
              <button  onClick={()=> setmembershipOpen(!ismembershipOpen)} className="tabs">
                Membership Details
              </button>
              {ismembershipOpen && (
                <div className="dropdown-menu">
                  <a href="https://forms.gle/JNHy2iGtwjozoPi3A" className="dropdown-item">Membership</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
            <h1>Puja List</h1>
            <div className='puja-container'>

            <table className='puja-table'>
                <thead className='puja-header'>
                    <tr>
                        <th>Date</th>
                        <th>Details of Pradosha</th>
                        <th>Masa and Thithi</th>
                    
                    </tr>
                </thead>
                <tbody className='puja-tbody'>
                    <tr>
                        <td>January 11</td>
                        <td>ಶನಿ ಪ್ರದ ೋಷ ಉಪ್ವಾಸ </td>
                        <td>ಈ ದಿನವು ಪೌಷ ಮಾಸದ ಶುಕ್ಲ ಪ್ಕ್ಷದ ತ್ರಯೋದಶಿ ತಿಥಿ</td>
                    </tr>
                    <tr>
                        <td>ಜನವರಿ 27 ರಂದು ಉಪ್ವಾಸ.</td> 
                        <td>ಸ ೋಮ ಪ್ರದ ೋಷ </td>
                        <td>ಈ ದಿನ ಮಾಘ ಮಾಸದ ಕ್ೃಷಣ ಪ್ಕ್ಷದ ತ್ರಯೋದಶಿ ತಿಥಿ</td>
                    </tr>
                    <tr>
                    <td>ಫ ಬ್ರವರಿ 09 ರಂದು</td> 
                    <td>ರವಿ ಪ್ರದ ೋಷ ಉಪ್ವಾಸ.</td> 
                    <td>ಈ ದಿನ ಮಾಘ ಮಾಸದ ಶುಕ್ಲ ಪ್ಕ್ಷದ ತ್ರಯೋದಶಿ ತಿಥಿ.</td>
                    </tr>
                    <tr>
                    <td>ಫ ಬ್ರವರಿ 25 ರಂದು</td> 
                    <td>ಭೌಮ್ ಪ್ರದ ೋಷ ಉಪ್ವಾಸ .</td> 
                    <td>ಈ ದಿನ ಫಾಲ್ುುಣ ಮಾಸದ ಕ್ೃಷಣ ಪ್ಕ್ಷದ ತ್ರಯೋದಶಿ ತಿಥಿ.</td>
                    </tr>
                    <tr>
                    <td>ಮಾರ್ಚ್ 11 ರಂದು</td> 
                    <td>ಭೌಮ್ ಪ್ರದ ೋಷ ಉಪ್ವಾಸ .</td> 
                    <td>ಈ ದಿನ ಫಾಲ್ುುಣ ಮಾಸದ ಶುಕ್ಲ ಪ್ಕ್ಷದ ತ್ರಯೋದಶಿ.</td>
                    </tr>
                    <tr>
                    <td>ಮಾರ್ಚ್ 27 ರಂದು</td> 
                    <td>ಗುರು ಪ್ರದ ೋಷ ಉಪ್ವಾಸ.</td> 
                    <td>ಈ ದಿನ ಚ ೈತ್ರ ಮಾಸದ ಕ್ೃಷಣ ಪ್ಕ್ಷದ ತ್ರಯೋದಶಿ.</td>
                    </tr>
                    <tr>
                    <td>ಏಪ್ರರಲ್ 10 ರಂದು</td> 
                    <td>ಗುರು ಪ್ರದ ೋಷ ಉಪ್ವಾಸ.</td> 
                    <td>ಈ ದಿನ ಚ ೈತ್ರ ಮಾಸದ ಶುಕ್ಲ ಪ್ಕ್ಷದ ತ್ರಯೋದಶಿ.</td>
                    </tr>
                    <tr>
                    <td>ಏಪ್ರರಲ್ 25 ರಂದು</td> 
                    <td>ಶುಕ್ರ ಪ್ರದ ೋಷ ಉಪ್ವಾಸ.</td> 
                    <td>ಈ ದಿನ ವ ೈಶಾಖ ಮಾಸದ ಕ್ೃಷಣ ಪ್ಕ್ಷದ ತ್ರಯೋದಶಿ.</td>
                    </tr>
                    <tr>
                    <td>ಮೋ 9 ರಂದು</td> 
                    <td>ಶುಕ್ರ ಪ್ರದ ೋಷ ಉಪ್ವಾಸ .</td> 
                    <td>ಈ ದಿನ ವ ೈಶಾಖ ಮಾಸದ ಶುಕ್ಲ ಪ್ಕ್ಷದ ತ್ರಯೋದಶಿ.</td>
                    </tr>
                    <tr>
                    <td>ಜನ್ 08 ರಂದು</td> 
                    <td>ರವಿ ಪ್ರದ ೋಷ ಉಪ್ವಾಸ.</td> 
                    <td>ಈ ದಿನ ಜ ಯೋಷಠ ಮಾಸದ ಶುಕ್ಲ ಪ್ಕ್ಷದ ತ್ರಯೋದಶಿ.</td>
                    </tr>
                    <tr>
                    <td>ಜ ನ್ 23 ಸ ೋಮವಾರದಂದು </td>
                    <td>ಸ ೋಮ ಪ್ರದ ೋಷ.</td> 
                    <td>ಈ ದಿನ ಆಷಾಢ ಮಾಸದ ಕ್ೃಷಣ ಪ್ಕ್ಷದ ತ್ರಯೋದಶಿ ತಿಥಿ</td>
                    </tr>
                    <tr>
                    <td>ಜುಲ ೈ 08 ರಂದು</td> 
                    <td>ಭೌಮ ಪ್ರದ ೋಷ ಉಪ್ವಾಸ.</td> 
                    <td>ಈ ದಿನ ಆಷಾಢ ಮಾಸದ ಶುಕ್ಲ ಪ್ಕ್ಷದ ತ್ರಯೋದಶಿ</td>
                    </tr>
                    <tr>
                    <td>ಜುಲ ೈ 22 ರಂದು</td> 
                    <td>ಭೌಮ ಪ್ರದ ೋಷ ಉಪ್ವಾಸ.</td> 
                    <td>ಈ ದಿನ ಸಾವನ ಮಾಸದ ಕ್ೃಷಣ ಪ್ಕ್ಷದ ತ್ರಯೋದಶಿ.</td>
                    </tr>
                    <tr>
                    <td>ಆಗಸ್ಟ್ 06 ರಂದು</td> 
                    <td>ಬ್ುದಧ ಪ್ರದ ೋಷ ಉಪ್ವಾಸ.</td> 
                    <td>ಈ ದಿನ ಸಾವನ ಮಾಸದ ಶುಕ್ಲ ಪ್ಕ್ಷದ ತ್ರಯೋದಶಿ.</td>
                    </tr>
                    <tr>
                    <td>ಆಗಸ್ಟ್ 20 ರಂದು</td> 
                    <td>ಬ್ುದಧ ಪ್ರದ ೋಷ ಉಪ್ವಾಸ </td>
                    <td>ಈ ದಿನ ಭಾದರಪ್ದ ಮಾಸದ ಕ್ೃಷಣ ಪ್ಕ್ಷದ ತ್ರಯೋದಶಿ.</td>
                    </tr>
                    <tr>
                    <td>ಸ ಪ ್ಂಬ್ರ್ 05 ರಂದು</td> 
                    <td>ಶುಕ್ರ ಪ್ರದ ೋಷ ಉಪ್ವಾಸ.</td> 
                    <td>ಈ ದಿನ ಭಾದರಪ್ದ ಮಾಸದ ಶುಕ್ಲ ಪ್ಕ್ಷದ ತ್ರಯೋದಶಿ.</td>
                    </tr>
                    <tr>
                    <td>ಸ ಪ ್ಂಬ್ರ್ 19 ರಂದು</td> 
                    <td>ಶುಕ್ರ ಪ್ರದ ೋಷ ಉಪ್ವಾಸ .</td> 
                    <td>ಈ ದಿನ ಅಶಿಿನ್ ಮಾಸದ ಕ್ೃಷಣ ಪ್ಕ್ಷದ ತ್ರಯೋದಶಿ.</td>
                    </tr>
                    <tr>
                    <td>ಅಕ ್ೋಬ್ರ್ 4 ರಂದು</td> 
                    <td>ಶನಿ ಪ್ರದ ೋಷ ಉಪ್ವಾಸ.</td> 
                    <td>ಈ ದಿನ ಅಶಿಿನ್ ಮಾಸದ ಶುಕ್ಲ ಪ್ಕ್ಷದ ತ್ರಯೋದಶಿ.</td>
                    </tr>
                    <tr>
                    <td>ಅಕ ್ೋಬ್ರ್ 18 ರಂದು</td> 
                    <td>ಶನಿ ಪ್ರದ ೋಷ ಉಪ್ವಾಸ.</td> 
                    <td>ಈ ದಿನ ಕಾತಿ್ಕ್ ಮಾಸದ ಕ್ೃಷಣ ಪ್ಕ್ಷದ ತ್ರಯೋದಶಿ.</td>
                    </tr>
                    <tr>
                    <td>ನವ ಂಬ್ರ್ 3 ರಂದು</td> 
                    <td>ಸ ೋಮ ಪ್ರದ ೋಷ ಉಪ್ವಾಸ.</td> 
                    <td>ಈ ದಿನ ಕಾತಿ್ಕ್ ಮಾಸದ ಶುಕ್ಲ ಪ್ಕ್ಷದ ತ್ರಯೋದಶಿ.</td>
                    </tr>
                    <tr>
                    <td>ನವ ಂಬ್ರ್ 17 ರಂದು</td> 
                    <td>ಸ ೋಮ ಪ್ರದ ೋಷ ಉಪ್ವಾಸ</td> 
                    <td>ಈ ದಿನ ಮಾಗ್ಶಿೋಷ್ ಮಾಸದ ಕ್ೃಷಣ ಪ್ಕ್ಷದ ತ್ರಯೋದಶಿ.</td>
                    </tr>
                    <tr>
                    <td>ಡಿಸ ಂಬ್ರ್ 2 ರಂದು</td> 
                    <td>ಭೌಮ ಪ್ರದ ೋಷ ಉಪ್ವಾಸ</td> 
                    <td>ಈ ದಿನ ಮಾಗ್ಶಿೋಷ್ ಮಾಸದ ಶುಕ್ಲ ಪ್ಕ್ಷದ ತ್ರಯೋದಶಿ</td>
                    </tr>
                    <tr>
                    <td>ಡಿಸ ಂಬ್ರ್ 17 ರಂದು</td> 
                    <td>ಭೌಮ್ ಪ್ರದ ೋಷ ಉಪ್ವಾಸ</td> 
                    <td>ಈ ದಿನ ಪೌಷ ಮಾಸದ ಕ್ೃಷಣ ಪ್ಕ್ಷದ ತ್ರಯೋದಶಿ.</td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default PujaList;
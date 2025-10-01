import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { type DateClickArg } from "@fullcalendar/interaction";
import type { EventContentArg } from "@fullcalendar/core";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FullCalendarComponent() {
  const handleDateClick = (arg: DateClickArg) => {
    alert(arg.dateStr);
  };
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

    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [aboutRef, contactRef, eventsRef, servicesRef, membershipRef]);


  return (
      <><header className="app-header">
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
            <button onClick={() => setServicesOpen(!isServicesOpen)} className="tabs">
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
            <button onClick={() => setResourcesOpen(!isResourcesOpen)} className="tabs">
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
    </header><div className="calendar">
        <h1>Calendar</h1>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          dateClick={handleDateClick}
          eventContent={renderEventContent}
          events={[
            {
              title: "Navarathri Day1-Shaila putri Puja\
                   -Red saree- flower decoration", date: "2025-09-22"
            },
            {
              title: "Navarathri Day2 :  brahma \
           charini Puja-Peacock green-Lemon\
           decoration", date: "2025-09-23"
            },
            {
              title: "Navarathri Day3-Chandraghnata \
          Puja-Royal Blue – Yellow- Fruits\
          decoration", date: "2025-09-24"
            },
            {
              title: "Navarathri Day4 Khushmanda Puja\
          -Peacock green-Lemon decoration", date: "2025-09-25"
            },
            {
              title: "Navarathri Day5 Skandamatha Puja\
          -green –Saree decoration", date: "2025-09-26"
            },
            {
              title: "Navarathri Day6 Katyaini Puja-grey\
          -Vegetable decoration", date: "2025-09-27"
            },
            {
              title: "Navarathri Day7 Kalarathri Puja-Orange\
          -Bangles decoration", date: "2025-09-28"
            },
            {
              title: "Navarathri Day8 Durgastami, Saraswathi\
           Puja—white -Veena- Flower decoration", date: "2025-09-29"
            },
            {
              title: "Navarathri Day9 Mahanavami, Ayudha Puja-Pink\
          –Flower decoration", date: "2025-09-30"
            },
            {
              title: "Navarathri Day10 Viajaya Dashami\
          -Marron-Lotus Flower decoration", date: "2025-10-01"
            },
          ]} />
      </div></>
  );
}

function renderEventContent(eventInfo: EventContentArg) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
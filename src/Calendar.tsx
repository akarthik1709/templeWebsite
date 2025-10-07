import React, { useRef, useState, useEffect } from "react";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { type DateClickArg } from "@fullcalendar/interaction";
import type { EventContentArg } from "@fullcalendar/core";
import { Link } from "react-router-dom";
//import rbac from "react-rbac"

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
  const [files, setfiles] = useState([]);
  let fileEventsFile = null;


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

      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node )) {
        setResourcesOpen(false);
      }
      if (membershipRef.current && !membershipRef.current.contains(event.target as Node )) {
        setmembershipOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [aboutRef, contactRef, eventsRef, servicesRef, resourcesRef, membershipRef]);

  const MyUploadButton = ({setfiles}) => 
    <UploadButton uploader={uploader} 
                  options={options}
                  onComplete={setfiles}>
      {({onClick}) =>
        <button className="upload-button" onClick={onClick}>
          Upload a file...
        </button>
      }
    </UploadButton>
  console.log("Button", MyUploadButton);
  const MyUploadedFiles = ({files}) => files.map( (file: { filePath: any; accountId: any; }) => {
    });
  
  const uploader = Uploader({
    apiKey : "public_G22nhxh8DvUGKZRXRn61b5d2rNaX"
  })
  const options = {multi: true}
  for (var i =0; i < files.length; i ++){
    console.log("Files", files[i].fileUrl);
    fileEventsFile = files[i].fileUrl;
    localStorage["file"] = fileEventsFile
  }
  return (
      <>
      <header className="app-header">
      <div className="logo-sharadha">
        <img src="/sharadha.webp" alt="SharadhaPeetham logo" onClick={()=> window.location.href="/"} />
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
        <h1 className="calendar-header">Calendar </h1>
        <div className="file-upload-container">
        {files.length
        ?<MyUploadedFiles files={files}/>
        :<MyUploadButton setfiles={setfiles}/>              
        }
      </div>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          dateClick={handleDateClick}
          eventContent={renderEventContent}
          events={fileEventsFile} />
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
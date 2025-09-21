import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { type DateClickArg } from "@fullcalendar/interaction";
import type { EventContentArg } from "@fullcalendar/core";

export default function FullCalendarComponent() {
  const handleDateClick = (arg: DateClickArg) => {
    alert(arg.dateStr);
  };

  return (
    <div className="calendar">
      <h1>Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        dateClick={handleDateClick}
        eventContent={renderEventContent}
        events={[
          { title: "Navarathri Day1-Shaila putri Puja\
                   -Red saree- flower decoration", date: "2025-09-22" },
 { title: "Navarathri Day2 :  brahma \
           charini Puja-Peacock green-Lemon\
           decoration", date: "2025-09-23"},
{ title: "Navarathri Day3-Chandraghnata \
          Puja-Royal Blue – Yellow- Fruits\
          decoration", date: "2025-09-24" },
 { title: "Navarathri Day4 Khushmanda Puja\
          -Peacock green-Lemon decoration", date: "2025-09-25" },
{ title: "Navarathri Day5 Skandamatha Puja\
          -green –Saree decoration", date: "2025-09-26" },
{ title: "Navarathri Day6 Katyaini Puja-grey\
          -Vegetable decoration", date: "2025-09-27" },
{ title: "Navarathri Day7 Kalarathri Puja-Orange\
          -Bangles decoration", date: "2025-09-28" },
 { title: "Navarathri Day8 Durgastami, Saraswathi\
           Puja—white -Veena- Flower decoration", date: "2025-09-29" },
{ title: "Navarathri Day9 Mahanavami, Ayudha Puja-Pink\
          –Flower decoration", date: "2025-09-30" },
 { title: "Navarathri Day10 Viajaya Dashami\
          -Marron-Lotus Flower decoration", date: "2025-10-01" },
        ]}
      />
    </div>
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
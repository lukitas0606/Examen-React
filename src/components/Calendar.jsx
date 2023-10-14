import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function CalendarComponent() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('https://api.victorsanmartin.com/feriados/en.json')
      .then((response) => response.json())
      .then((data) => {
        // Procesa los datos para convertirlos en el formato necesario para el calendario
        const formattedEvents = data.data.map((feriado) => ({
          title: feriado.title,
          start: moment(feriado.date).toDate(), 
          end: moment(feriado.date).toDate(), 
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error('Error al cargar los feriados:', error);
      });
  }, []);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
      />
    </div>
  );
}

export default CalendarComponent;
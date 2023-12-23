import React, { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import CalendarPopUp from '../components/calendarPopUp/CalendarPopUp'
import { getEvents } from '../api/calendar';
import moment from 'moment';

function CalendarEmployees() {

    const [events, setEvents] = useState(null);

    useEffect(()=>{
        takeAllEvents();
    }, [])

    const takeAllEvents = async () => {
        const response = await getEvents();
        const formattedEvents = response.data.map((event) => convertirEvento(event));
        setEvents(formattedEvents);
    }

    const convertirEvento = (eventFromApi) => {
        const { clientName, day, startHour, endHour, _id } = eventFromApi;
    
        const start = moment(`${day} ${startHour}`, 'YYYY-MM-DD HH:mm');
        const end = moment(`${day} ${endHour}`, 'YYYY-MM-DD HH:mm');
    
        return {
          title: clientName,
          start: start.toDate(),
          end: end.toDate(),
          id: _id
        };
      };

    return (
        <div>
            <Header page='calendar' />
            <CalendarPopUp events={events} setEvents={setEvents} takeAllEvents={takeAllEvents} />
        </div>
    )
}

export default CalendarEmployees
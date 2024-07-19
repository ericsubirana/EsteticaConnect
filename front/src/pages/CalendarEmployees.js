import React, { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import CalendarPopUp from '../components/calendarPopUp/CalendarPopUp'
import { getEvents, getContacts } from '../api/calendar';
import moment from 'moment';

function CalendarEmployees() {

    const [events, setEvents] = useState(null);
    const [contacts, setContacts] = useState(null);

    useEffect(()=>{
        takeAllEvents();
        takeAllContacts();
    }, [])

    const takeAllEvents = async () => {
        const response = await getEvents();
        const formattedEvents = response.data.map((event) => convertirEvento(event));
        setEvents(formattedEvents);
    }

    const takeAllContacts = async () => 
    {
        const response = await getContacts();
        setContacts(response)
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
            <CalendarPopUp events={events} contacts={contacts} setEvents={setEvents} takeAllEvents={takeAllEvents} />
        </div>
    )
}

export default CalendarEmployees
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { insertEvent, getSpecificEvent, updateEvent, deleteEvent } from '../../api/calendar';

import './calendarpopup.css';

const localizer = momentLocalizer(moment);

function CalendarPopUp(props) {
  const { handleSubmit, control, setValue } = useForm();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);


  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
  };

  const handleEventClick = async (event) => {
    const response = await getSpecificEvent(event.id);
    setSelectedEvent(response.data);
  };

  const closeEvent = async () => {
    setSelectedEvent(null);
  }

  const onSubmit = async (data, e) => {
    if (data.startTime >= data.endTime) {
      toast.error('El tiempo inicial no puede ser más grande que el final', { autoClose: 1000, closeOnClick: true });
      toast.clearWaitingQueue();
    }
    else {
      try {
        data.day = moment(selectedDate);
        await insertEvent(data);
        setValue('clientName', '');
        setValue('clientPhoneNumber', '');
        setValue('description', '');
        setValue('startHour', '');
        setValue('endHour', '');
        setSelectedDate(null);
        props.takeAllEvents();//actualitzem el calendari amb el nou event
      } catch (error) {
        toast.error('Error insertando evento', { autoClose: 1000, closeOnClick: true });
        toast.clearWaitingQueue();
      }
    }
  };

  return (
    <div>
      <div style={{ margin: '100px', marginTop: '180px' }}>
        <Calendar
          localizer={localizer}
          events={props.events || []}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 800 }}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleEventClick}
        />
      </div>
      {selectedDate && (
        <div className="popupCalendar">
          <div className="centerPopUp">
            <h2>Ingrese detalles</h2>
            <p>Fecha seleccionada: {moment(selectedDate).format('MMMM Do YYYY')}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p>Nombre cliente</p>
              <Controller
                name="clientName"
                control={control}
                render={({ field }) => <input {...field} type="text" placeholder="Nombre cliente" required />}
              />
              <p>IMPORTANTE! Si quieres que un día antes se avise al cliente: </p>
              <Controller
                name="clientPhoneNumber"
                control={control}
                render={({ field }) => <input {...field} type="number" placeholder="Número teléfono cliente" />}
              />
              <p>Descripción :</p>
              <Controller
                name="description"
                control={control}
                render={({ field }) => <input {...field} type="text" placeholder="Descripción tratamiento" />}
              />
              <p>Hora que empieza</p>
              <Controller
                name="startHour"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <input {...field} type="time" onChange={(e) => setValue('startHour', e.target.value)} required />
                )}
              />
              <p>Hora que acaba</p>
              <Controller
                name="endHour"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <input {...field} type="time" onChange={(e) => setValue('endHour', e.target.value)} required />
                )}
              />
              <button type="submit">Guardar</button>
              <button onClick={() => setSelectedDate(null)}>Cerrar</button>
            </form>
          </div>
        </div>
      )}
      {console.log(selectedEvent)}
      {selectedEvent && (
        <div className='popupCalendar'>
          <div className='centerPopUp'>
            {selectedEvent[0].clientName}
            {selectedEvent[0].clientPhoneNumber}
            {selectedEvent[0].description}
            {selectedEvent[0].startHour}
            {selectedEvent[0].endHour}
            <button type='button' onClick={closeEvent}>Cerrar</button>
          </div>
        </div>
      )}
      <ToastContainer position="top-center" limit={1} />
    </div>
  );
}

export default CalendarPopUp;

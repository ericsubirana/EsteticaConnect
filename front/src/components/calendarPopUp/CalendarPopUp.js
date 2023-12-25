import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment-timezone';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { insertEvent, getSpecificEvent, updateEvent, deleteEvent } from '../../api/calendar';
import { IoMdClose } from "react-icons/io";

import './calendarpopup.css';

const localizer = momentLocalizer(moment);

function CalendarPopUp(props) {
  const { handleSubmit, control, setValue, reset } = useForm();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const state = {
    button: 1
  };


  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
  };

  const handleEventClick = async (event) => {
    const response = await getSpecificEvent(event.id);
    setSelectedEvent(response.data);
  };

  const closeEvent = async () => {
    setSelectedEvent(null);
    setTimeout(() => reset(), 0);
  }

  const onSubmit = async (data, e) => {
    if (data.startHour >= data.endHour) {
      toast.error('El tiempo inicial no puede ser más grande que el final', { autoClose: 1000, closeOnClick: true });
      toast.clearWaitingQueue();
    }
    else {
      try {
        moment.tz.setDefault('UTC');
        data.day = moment(selectedDate);
        console.log(data.day)
        await insertEvent(data);
        reset();
        setSelectedDate(null);
        props.takeAllEvents();//actualitzem el calendari amb el nou event
      } catch (error) {
        toast.error('Error insertando evento', { autoClose: 1000, closeOnClick: true });
        toast.clearWaitingQueue();
      }
    }
  };

  const onUpdateOrDelete = async (data, e) => {
    if (data.startHour >= data.endHour) {
      toast.error('El tiempo inicial no puede ser más grande que el final', { autoClose: 1000, closeOnClick: true });
      toast.clearWaitingQueue();
    }
    else {
      try {
        if (state.button === 1) {
          const id = selectedEvent[0]._id;
          data.day = selectedEvent[0].day;
          const response = await updateEvent({ id, values: data });
          reset();
          setSelectedDate(null);
          setSelectedEvent(null);
          props.takeAllEvents();//actualitzem el calendari segons faci falta
          toast.success(response.data.message, { autoClose: 1000, closeOnClick: true });
          toast.clearWaitingQueue();
        }
        else {
          const id = selectedEvent[0]._id;
          const response = await deleteEvent(id);
          reset();
          setSelectedDate(null);
          setSelectedEvent(null);
          props.takeAllEvents();
          toast.success(response.data.message, { autoClose: 1000, closeOnClick: true });
          toast.clearWaitingQueue();
        }
      } catch (error) {
        toast.error('Error actualizando/borrando evento', { autoClose: 1000, closeOnClick: true });
        toast.clearWaitingQueue();
      }
    }
  };

  return (
    <div>
      <div className='allCalendarStyle'>
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
            <div className='maginstPopUp'>
              <h2>Ingrese detalles</h2>
              <p>Fecha seleccionada : {moment(selectedDate).format('MMMM Do YYYY')}</p>
              <form className='widthFormPopUp' onSubmit={handleSubmit(onSubmit)}>
                <div className='namePhone'>
                  <div className='clientNamePopUp'>
                    <p>Nombre cliente :</p>
                    <Controller
                      name="clientName"
                      control={control}
                      render={({ field }) => <input {...field} type="text" placeholder="Nombre cliente" required />}
                    />
                  </div>
                  <div>
                    <p>Teléfono : </p>
                    <Controller
                      name="clientPhoneNumber"
                      control={control}
                      render={({ field }) => <input {...field} type="number" placeholder="Número teléfono cliente" />}
                    />
                  </div>
                </div>
                <div className='descCalendar'>
                  <p>Descripción :</p>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <input {...field} type="text" placeholder="Descripción tratamiento" />}
                  />
                </div>
                <div className='horasPopUp'>
                  <div className='calendarStartHour'>
                    <p>Hora inicio :</p>
                    <Controller
                      name="startHour"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="time"
                          onChange={(e) => setValue('startHour', e.target.value)}
                          required />
                      )}
                    />
                  </div>
                  <div>
                    <p>Hora final :</p>
                    <Controller
                      name="endHour"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="time"
                          onChange={(e) => setValue('endHour', e.target.value)} required />
                      )}
                    />
                  </div>
                </div>
                <div className='centerbuttonSave'>
                  <button className='saveEvent' type="submit">Guardar</button>
                </div>
                <button className='closeEvent' onClick={() => setSelectedDate(null)}><IoMdClose size={20} /></button>
              </form>
            </div>
          </div>
        </div>
      )}
      {selectedEvent && (
        <div className='popupCalendar'>
          <div className='centerPopUp'>
            <div className='maginstPopUp'>
              <h2>Ingrese detalles</h2>
              <p>Fecha : {moment(selectedEvent[0].day).format('MMMM Do YYYY')}</p>
              <form className='widthFormPopUp' onSubmit={handleSubmit(onUpdateOrDelete)}>
                <div className='namePhone'>
                  <div className='clientNamePopUp'>
                    <p>Nombre cliente :</p>
                    {setValue('clientName', selectedEvent[0].clientName)}
                    <Controller
                      name="clientName"
                      control={control}
                      render={({ field }) => <input {...field} type="text" required />}
                    />
                  </div>
                  <div>
                    <p>Teléfono : </p>
                    {setValue('clientPhoneNumber', selectedEvent[0].clientPhoneNumber)}
                    <Controller
                      name="clientPhoneNumber"
                      control={control}
                      render={({ field }) => <input {...field} type="number" />}
                    />
                  </div>
                </div>
                <div className='descCalendar'>
                  <p>Descripción :</p>
                  {setValue('description', selectedEvent[0].description)}
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <input {...field} type="text" />}
                  />
                </div>
                <div className='horasPopUp'>
                  <div className='calendarStartHour'>
                    <p>Hora inicio :</p>
                    {setValue('startHour', selectedEvent[0].startHour)}
                    <Controller
                      name="startHour"
                      control={control}
                      defaultValue={selectedEvent[0].startHour}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="time"
                          onChange={(e) => setValue('startHour', e.target.value)}
                          required
                        />
                      )}
                    />
                  </div>
                  <div>
                    <p>Hora final :</p>
                    {setValue('endHour', selectedEvent[0].endHour)}
                    <Controller
                      name="endHour"
                      control={control}
                      defaultValue={selectedEvent[0].endHour}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="time"
                          onChange={(e) => setValue('endHour', e.target.value)}
                          required />
                      )}
                    />
                  </div>
                </div>
                <button className='closeEvent' type='button' onClick={closeEvent}><IoMdClose size={20} /></button>
                <div className='updateDeleteButtons'>
                  <button  className='saveEventUpdate' type="submit" name='btn1' onClick={() => (state.button = 1)}>Actualizar</button>
                  <button className='saveEvent' type='submit' name='btn2' onClick={() => (state.button = 2)}>Borrar</button>
                </div>
              </form>
            </div>

          </div>
        </div>
      )}
      <ToastContainer position="top-center" limit={1} />
    </div>
  );
}

export default CalendarPopUp;
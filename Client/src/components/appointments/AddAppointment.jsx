import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AddAppointment = () => {
  const [date, setDate] = useState(new Date());
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [appointments, setAppointments] = useState([]);

  // Fetch the user from local storage
  const user = JSON.parse(sessionStorage.getItem("user"));
  const patientId = user.idNumber;

  // Fetch all busy appointments when the component mounts
  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3030/appointments');
        setAppointments(response.data);
      } catch (err) {
        console.error('Error fetching appointments:', err);
      }
    };

    fetchAllAppointments();
  }, []);

  // Filter available time slots based on the selected date
  useEffect(() => {
    const formattedDate = date.toISOString().split('T')[0];
    const bookedSlots = appointments
      .filter(appointment => appointment.date === formattedDate)
      .map(appointment => appointment.timeSlot);
    const allTimeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30'];
    const emptySlots = allTimeSlots.filter(slot => !bookedSlots.includes(slot));
    setAvailableTimeSlots(emptySlots);
  }, [date, appointments]);

  // Handle date change
  const handleDateChange = (date) => {
    setDate(date);
  };

  // Handle time slot selection
  const handleTimeSlotSelect = (slot) => {
    setSelectedTimeSlot(slot);
  };

  // Handle appointment submission
  const handleAppointmentSubmit = async () => {
    const formattedDate = date.toISOString().split('T')[0];
    const confirmBooking = window.confirm(`Are you sure you want to book an appointment on ${formattedDate} at ${selectedTimeSlot}?`);
    if (confirmBooking) {
      try {
        await axios.post(`http://localhost:3030/appointments/${patientId}`, {
          date: formattedDate,
          timeSlot: selectedTimeSlot,
        });
        alert('Appointment booked successfully!');
        // Update appointments state to include the new booking
        setAppointments(prev => [...prev, { date: formattedDate, timeSlot: selectedTimeSlot }]);
      } catch (err) {
        console.error('Error booking appointment:', err);
      }
    }
  };

  // Disable past dates, limit date selection to one month from today, and disable Saturdays
  const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
      const today = new Date();
      const oneMonthFromToday = new Date();
      oneMonthFromToday.setMonth(today.getMonth() + 1);
      return date < today || date > oneMonthFromToday || date.getDay() === 6; // Disable past dates, dates beyond one month, and Saturdays
    }
    return false;
  };

  return (
    <div>
      <h1>Add Appointment</h1>
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileDisabled={tileDisabled}
      />
      <div>
        <h2>Available Time Slots on {date.toDateString()}</h2>
        {availableTimeSlots.length > 0 ? (
          <div>
            {availableTimeSlots.map((slot, index) => (
              <button 
                key={index}
                onClick={() => handleTimeSlotSelect(slot)}
                style={{
                  margin: '5px',
                  padding: '10px',
                  backgroundColor: selectedTimeSlot === slot ? 'lightblue' : 'white',
                  border: '1px solid black',
                }}
              >
                {slot}
              </button>
            ))}
          </div>
        ) : (
          <p>No available time slots for this day.</p>
        )}
      </div>
      {selectedTimeSlot && (
        <button onClick={handleAppointmentSubmit}>Book Appointment</button>
      )}
    </div>
  );
};

export default AddAppointment;

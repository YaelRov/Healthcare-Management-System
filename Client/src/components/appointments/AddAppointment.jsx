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
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  console.log(user);
  const patientId = user.idNumber;

  // Fetch all busy appointments when the component mounts
  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const userId = JSON.parse(sessionStorage.getItem("currentUser")).idNumber;
        const response = await axios.get("http://localhost:3030/appointments",  {
          withCredentials: true,
          headers: {
            'user-id': userId // <-- הוספת ה-ID ב-header
          }
        });
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
            const user = JSON.parse(sessionStorage.getItem("currentUser"));
            const userId = user.idNumber;
            const response = await axios.post(`http://localhost:3030/appointments/${userId}`, {
                date: formattedDate,
                timeSlot: selectedTimeSlot,
            }, {
                withCredentials: true, // Important for sending cookies
                headers: {
                    'User-Id': userId,
                },
            });
    
            alert('Appointment booked successfully!');
            // Update appointments state to include the new booking
            const newAppointment = { date: formattedDate, timeSlot: selectedTimeSlot };
            setAppointments(prev => [...prev, newAppointment]);

            // Update the session storage with the new appointment
            user.appointments.push(newAppointment);
            sessionStorage.setItem("currentUser", JSON.stringify(user));

            // Refresh the page
            window.location.reload();
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
                  color: 'black',
                  backgroundColor: selectedTimeSlot === slot ? '#e29578' : '#ffddd2',//'#d7896b' || #edf6f9
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

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AddAppointment = () => {
  const [date, setDate] = useState(new Date());
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [reason, setReason] = useState(''); // State to manage the reason input

  // Fetch the user from local storage
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  const patientId = user.idNumber;

  // Fetch all busy appointments when the component mounts
  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const userId = JSON.parse(sessionStorage.getItem("currentUser")).idNumber;
        const response = await axios.get("http://localhost:3030/appointments", {
          withCredentials: true,
          headers: {
            'user-id': userId
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
      .filter(appointment => appointment.date.split('T')[0] === formattedDate)
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

  // Handle reason input change
  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  // Handle appointment submission
const handleAppointmentSubmit = async () => {
  // Combine the date and time slot and convert to UTC
  const [hours, minutes] = selectedTimeSlot.split(':').map(Number);
  const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes);

  // Convert localDate to UTC
  const utcDate = new Date(Date.UTC(
    localDate.getUTCFullYear(),
    localDate.getUTCMonth(),
    localDate.getUTCDate(),
    localDate.getUTCHours(),
    localDate.getUTCMinutes()
  ));

  const confirmBooking = window.confirm(`Are you sure you want to book an appointment on ${date.toDateString()} at ${selectedTimeSlot}?`);
  if (confirmBooking) {
    try {
      const user = JSON.parse(sessionStorage.getItem("currentUser"));
      const userId = user.idNumber;

      const response = await axios.post(`http://localhost:3030/appointments/${userId}`, {
        date: utcDate.toISOString(),
        timeSlot: selectedTimeSlot,
        reason: reason, // Include reason in the request body
      }, {
        withCredentials: true, // Important for sending cookies
        headers: {
          'user-Id': userId,
        },
      });

      alert('Appointment booked successfully!');
      // Update appointments state to include the new booking
      const newAppointment = { date: utcDate.toISOString(), timeSlot: selectedTimeSlot, reason: reason };
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


  // Disable dates before tomorrow and Saturdays
  const tileDisabled = ({ date, view }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to midnight
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Tomorrow's date

    // Disable dates before tomorrow or Saturdays
    return date < tomorrow || date.getDay() === 6;
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
                  backgroundColor: selectedTimeSlot === slot ? '#d7896b' : '#edf6f9',
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
        <div>
          <input
            type="text"
            value={reason}
            onChange={handleReasonChange}
            placeholder="Reason for appointment"
            style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
          />
          <button onClick={handleAppointmentSubmit}>Book Appointment</button>
        </div>
      )}
    </div>
  );
};

export default AddAppointment;

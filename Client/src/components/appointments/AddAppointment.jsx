import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AddAppointment = () => {
  const [date, setDate] = useState(new Date());
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  // Fetch available appointments when the date changes
  useEffect(() => {
    const fetchAppointments = async () => {
      const formattedDate = date.toISOString().split('T')[0];
      const response = await axios.get(`http://localhost:3030/appointments/${formattedDate}`);
      const bookedSlots = response.data;
      const allTimeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
      const emptySlots = allTimeSlots.filter(slot => !bookedSlots.includes(slot));
      setAvailableTimeSlots(emptySlots);
    };

    fetchAppointments();
  }, [date]);

  // Handle date change
  const handleDateChange = (date) => {
    setDate(date);
  };

  // Handle time slot selection
  const handleTimeSlotSelect = (e) => {
    setSelectedTimeSlot(e.target.value);
  };

  // Handle appointment submission
  const handleAppointmentSubmit = async () => {
    const formattedDate = date.toISOString().split('T')[0];
    await axios.post('http://localhost:3030/appointments', {
      date: formattedDate,
      reason: selectedTimeSlot,
    });
    alert('Appointment booked successfully!');
  };

  return (
    <div>
      <h1>Add Appointment</h1>
      <Calendar onChange={handleDateChange} value={date} />
      <div>
        <h2>Available Time Slots on {date.toDateString()}</h2>
        {availableTimeSlots.length > 0 ? (
          <select onChange={handleTimeSlotSelect} value={selectedTimeSlot}>
            <option value="">Select a time slot</option>
            {availableTimeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
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
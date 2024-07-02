import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AddAppointment = () => {
  const [date, setDate] = useState(new Date());
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [appointments, setAppointments] = useState([]);
   const [allAppointments, setAllAppointments] = useState([]); // כל התורים

  const [reason, setReason] = useState(''); // State to manage the reason input
const [formattedDate,setFormattedDate]=useState();
  // Fetch the user from local storage
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  const patientId = user.idNumber;
 

  // Fetch all busy appointments when the component mounts
  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const userId = JSON.parse(sessionStorage.getItem("currentUser")).idNumber;
        const responseAll = await axios.get("http://localhost:3030/appointments",  {
          withCredentials: true,
          headers: {
            'user-id': userId
          }
        });
        console.log(`type: ${typeof responseAll.data}`);
        console.log(`response.data=${responseAll.data}`)

        if (responseAll.data) {
          const dateStrings = JSON.stringify(responseAll.data).split(",");
          const dateStrings1=dateStrings.slice(1,-1);
          const appointmentsArray = dateStrings1.map((dateString) => {
              const [datePart, timePart] = dateString.trim().split("T");
              const date = datePart.slice(1, 12); // Remove the surrounding quotes
              const timeSlot = timePart.slice(0, 5);
              return { date, timeSlot };
          });
      
          console.log(`appointmentsArray[0].timeSlot=${appointmentsArray[13].timeSlot}`);
          console.log(`appointmentsArray[0].timePart=${appointmentsArray[0].timePart}`);
          console.log(`appointmentsArray[0].date=${appointmentsArray[13].date}`);
          
          setAllAppointments(appointmentsArray);
      } else {
          setAllAppointments([]);
      }
      
       
          // date: new Date(appointment.date), // Convert date string to Date object
    
        const currentUser= JSON.parse(sessionStorage.getItem("currentUser"))
        setAppointments(currentUser.appointments)
      } catch (err) {
        console.error('Error fetching appointments:', err);
      }
    };

    fetchAllAppointments();
  }, []);

  const checkIfAppointmentExists = (selectedDate, selectedTime) => {
    
    for (let i = 0; i < allAppointments.length; i++) {
      if (allAppointments[i].date === selectedDate && allAppointments[i].timeSlot === selectedTime) {
        
        return true; // קיים תואם במערך
      }
    }
    return false; // לא נמצא תואם במערך
  };
  
  // פונקציה שמעבור על המערך appointmentsArray ומושבתת את השעות שכבר נתפסו
  const disableBookedTimeSlots = () => {
    // כל השעות האפשריות בהתחלה
    const disabledTimeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30'];
  
    // סינון התורים התפוסים עבור התאריך הנבחר
    const bookedSlotsForDate = allAppointments.filter(appointment => appointment.date === formattedDate);
  
    // הסרת התורים התפוסים מהמערך disabledTimeSlots
    bookedSlotsForDate.forEach(appointment => {
      const index = disabledTimeSlots.indexOf(appointment.timeSlot);
      if (index > -1) {
        disabledTimeSlots.splice(index, 1); // הסרת התור התפוס מהמערך
      }
    });
    console.log("bookedSlotsForDate", JSON.stringify(bookedSlotsForDate));

    return disabledTimeSlots; // החזרת המערך המעודכן עם השעות הפנויות
  };
  
  
  // useEffect(() => {
  //   const fetchAllAppointments = async () => {
  //     try {
  //       const user = JSON.parse(sessionStorage.getItem("currentUser"));
  //       const userId = user.idNumber;
  //       const response = await axios.get(`http://localhost:3030/appointments`, {
  //         withCredentials: true, // Important for sending cookies
  //         headers: {
  //           'user-id': userId,
  //         },
  //       });
  //       setAllAppointments(response.data);
  //       console.log(`response.data=${response.data}`)
  //     } catch (err) {
  //       console.error('Error fetching appointments:', err);
  //     }
  //   };
  //   fetchAllAppointments();
  // }, []);

  // Filter available time slots based on the selected date
   // Filter available time slots based on the selected date
   useEffect(() => {
     const formattedDate1 = date.toISOString().split('T')[0]
     setFormattedDate(formattedDate1);
     const bookedSlots = appointments
     .filter(appointment => appointment.date.split('T')[0]  === formattedDate)
     .map(appointment => appointment.timeSlot);
    const allTimeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30'];

    // בדיקה האם קיימים תורים לתאריך שנבחר
    const hasAppointmentsForDate = allAppointments.some(appointment => appointment.date === formattedDate);

    if (hasAppointmentsForDate) {
      // אם כן, קבל את השעות התפוסות ועדכן את הזמנים הפנויים
      const disabledSlots = disableBookedTimeSlots();
      // const availableTimeSlots = allTimeSlots.filter(slot => !disabledSlots.includes(slot));
      setAvailableTimeSlots(disabledSlots);
      console.log("availableTimeSlots= "+availableTimeSlots)
    } else {
      // אם לא, הצג את כל השעות האפשריות
      setAvailableTimeSlots(allTimeSlots);
    }
  }, [date,appointments, allAppointments]);
  // Handle date change
  const handleDateChange = (date) => {
    // Set the time to midnight in the local time zone to avoid timezone issues
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    setDate(localDate);
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
    // Handle appointment submission
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
      {/* {selectedTimeSlot && ( */}
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
      {/* )} */}
    </div>
  );
};

export default AddAppointment;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AddAppointment from "./AddAppointment";
export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the user ID from the URL

  // Fetch the user's appointments from the server
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/appointments/${id}`);
        setAppointments(response.data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    fetchAppointments();
  }, [id]);

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleCancelClick = () => {
    setShowAddForm(false);
  };

  const handleAddAppointment = () => {
    navigate(`/${id}/appointments/add`);
  };

  return (
    <div>
      <h1>My Appointments</h1>
      {appointments.length > 0 ? (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>{appointment.date} - {appointment.time}</li>
          ))}
        </ul>
      ) : (
        <p>No appointments found.</p>
      )}
      {showAddForm ? (
        <div>
          <button onClick={handleCancelClick}>❌</button>
          <AddAppointment />
        </div>
      ) : (
        <button onClick={handleAddClick}>Add Appointment</button>
      )}
    </div>
  );
}

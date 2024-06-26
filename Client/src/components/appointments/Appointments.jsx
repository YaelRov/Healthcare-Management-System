import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddAppointment from "./AddAppointment";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the user ID from the URL

  // Fetch the user's appointments from local storage
  useEffect(() => {
    const fetchAppointments = () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser && currentUser.idNumber.toString() === id) {
          setAppointments(currentUser.appointments);
        } else {
          console.error("No current user or user ID mismatch.");
        }
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
            <li key={appointment._id}>
              <p><strong>Date:</strong> {new Date(appointment.date).toLocaleString()}</p>
              <p><strong>Reason:</strong> {appointment.reason}</p>
            </li>
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

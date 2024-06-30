// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// export default function AddPatient()
// {
//     return(
//         <div>
//             <h1>my AddPatient</h1>
//         </div>
//     )
// }

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddPatient() {
  const [formData, setFormData] = useState({
    idNumber: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    address: {
      city: "",
      number: "",
      street: ""
    },
    phoneNumber: "",
    email: "",
    profile: "0" // Default to patient (0)
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData(prevData => ({
        ...prevData,
        address: { ...prevData.address, [addressField]: value }
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = JSON.parse(sessionStorage.getItem("currentUser")).idNumber;
      const response = await axios.post("http://localhost:3030/users", formData, {
        withCredentials: true,
        headers: {
          'user-id': userId // <-- הוספת ה-ID ב-header
        }
      });      if (response.status === 201) { // Assuming your server returns 201 Created on success
        alert("Patient added successfully!");
        navigate("/users"); // Or any other appropriate route
      } else {
        console.error("Error adding patient:", response.data);
      }
    } catch (err) {
      console.error("Error adding patient:", err);
    }
  };

  return (
    <div className="container">
    <div className="profile-container">
      <h1>Add Patient</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="idNumber">ID Number:</label>
          <input type="text" id="idNumber" name="idNumber" value={formData.idNumber} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
        </div>
        {/* Address Fields */}
        <div>
          <label htmlFor="address.street">Street:</label>
          <input type="text" id="address.street" name="address.street" value={formData.address.street} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="address.number">Number:</label>
          <input type="text" id="address.number" name="address.number" value={formData.address.number} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="address.city">City:</label>
          <input type="text" id="address.city" name="address.city" value={formData.address.city} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="profile">Profile:</label>
          <select id="profile" name="profile" value={formData.profile} onChange={handleChange}>
            <option value="0">Patient</option>
            <option value="1">Doctor</option>
          </select>
        </div>
        <button type="submit">Add Patient</button>
      </form>
    </div>
    </div>
  );
}

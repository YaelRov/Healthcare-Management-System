import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function AddInquiry() {
  const [inquiryText, setInquiryText] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Get the user ID from the URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmInquiry = window.confirm("Are you sure you want to submit this inquiry?");
    if (confirmInquiry) {
        try {
            const user = JSON.parse(sessionStorage.getItem("currentUser"));
            const userId = user.idNumber;
            const response = await axios.post(`http://localhost:3030/inquiries/${userId}`, {
                inquiryText: inquiryText
            }, {
                withCredentials: true, // Important for sending cookies
                headers: {
                    'user-id': userId,
                },
            });

            alert('Inquiry added successfully!');

            // Update inquiries state to include the new inquiry
            const newInquiry = {
                _id: response.data._id, // Assuming the response contains the new inquiry's ID
                patientId: userId,
                dateInquiry: new Date().toISOString(), // Assuming the current date and time
                inquiryText: inquiryText,
                status: "pending" // Assuming the initial status is "pending"
            };
            setInquiries(prev => [...prev, newInquiry]);

            // Update the session storage with the new inquiry
            user.inquiries.push(newInquiry);
            sessionStorage.setItem("currentUser", JSON.stringify(user));

            // Optionally refresh the page or navigate to inquiries page
            window.location.reload(); // Refresh the page
            // navigate(`/${userId}/inquiries`); // Or navigate to inquiries page
        } catch (err) {
            console.error('Error adding inquiry:', err);
        }
    }
};


  return (
    <div>
      <h1>Add Inquiry</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inquiryText}
          onChange={(e) => setInquiryText(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

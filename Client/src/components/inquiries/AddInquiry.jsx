import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function AddInquiry() {
  const [inquiryText, setInquiryText] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Get the user ID from the URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3030/inquiries/${userId}`, {
        inquiryText: inquiryText
      });
      alert('Inquiry added successfully!');
      navigate(`/${id}/inquiries`); // Redirect to inquiries page after adding
    } catch (err) {
      console.error('Error adding inquiry:', err);
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

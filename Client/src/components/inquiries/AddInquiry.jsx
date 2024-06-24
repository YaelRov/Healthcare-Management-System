import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddInquiry() {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      await axios.post('http://localhost:3030/inquiries', {
        userId: user.id,
        content: content
      });
      alert('Inquiry added successfully!');
      navigate('/inquiries'); // Redirect to inquiries page after adding
    } catch (err) {
      console.error('Error adding inquiry:', err);
    }
  };

  return (
    <div>
      <h1>Add Inquiry</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AddInquiry from "./AddInquiry";

export default function Inquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the user ID from the URL

  // Fetch the user's inquiries from the server
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/inquiries/${id}`);
        setInquiries(response.data);
      } catch (err) {
        console.error("Error fetching inquiries:", err);
      }
    };

    fetchInquiries();
  }, [id]);

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleCancelClick = () => {
    setShowAddForm(false);
  };

  const handleAddInquiry = () => {
    navigate(`/${id}/inquiries/add`);
  };

  return (
    <div>
      <h1>My Inquiries</h1>
      {inquiries.length > 0 ? (
        <ul>
          {inquiries.map((inquiry) => (
            <li key={inquiry.id}>{inquiry.content}</li>
          ))}
        </ul>
      ) : (
        <p>No inquiries found.</p>
      )}
      {showAddForm ? (
        <div>
          <button onClick={handleCancelClick}>❌</button>
          <AddInquiry />
        </div>
      ) : (
        <button onClick={handleAddClick}>Add Inquiry</button>
      )}
    </div>
  );
}

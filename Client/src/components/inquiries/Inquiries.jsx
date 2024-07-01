import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddInquiry from "./AddInquiry";
import axios from "axios";

export default function Inquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the user ID from the URL

  // Fetch the user's inquiries from local storage
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        const userId = currentUser.idNumber;
  
        // Check if the user ID from sessionStorage matches the ID in the URL
        if (currentUser && userId.toString() === id) {
          if (currentUser.profile === 0) {
            // Fetch inquiries for the current user
            const userInquiries = currentUser.inquiries || [];
            setInquiries(userInquiries);
          } else if (currentUser.profile === 1) {
            // Fetch all inquiries for all users
            const response = await axios.get(`http://localhost:3030/inquiries`, {
              withCredentials: true,
              headers: {
                'User-Id': userId,
              },
            });
            setInquiries(response.data); // Assuming response.data is an array of inquiries
          } else {
            console.error("No such user profile");
          }
        } else {
          console.error("No current user or user ID mismatch.");
        }
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
    <div className="container">
      <h1 style={{ marginBottom: "1rem" }}>My Inquiries</h1>
      <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
        {inquiries.length > 0 ? (
          inquiries.map((inquiry) => (
            <div key={inquiry._id} className="inquiry-container">
              <p><strong>Date:</strong> {new Date(inquiry.dateInquiry).toLocaleString()}</p>
              <p><strong>Question:</strong> {inquiry.inquiryText}</p>
              {inquiry.answerText && (
                <p><strong>Answer:</strong> {inquiry.answerText}</p>
              )}
              <p><strong>Status:</strong> {inquiry.status}</p>
            </div>
          ))
        ) : (
          <p>No inquiries found.</p>
        )}
      </div>
      <button onClick={handleAddClick} style={{ marginTop: "1rem" }}>Add Inquiry</button>
      {showAddForm && (
        <div style={{ marginTop: "1rem" }}>
          <button onClick={handleCancelClick}>❌</button>
          <AddInquiry />
        </div>
      )}
    </div>
  );
}

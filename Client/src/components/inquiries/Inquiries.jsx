import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddInquiry from "./AddInquiry";

export default function Inquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the user ID from the URL

  // Fetch the user's inquiries from local storage
  useEffect(() => {
    const fetchInquiries = () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser && currentUser.idNumber.toString() === id) {
          setInquiries(currentUser.inquiries);
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
    <div>
      <h1>My Inquiries</h1>
      {inquiries.length > 0 ? (
        <ul>
          {inquiries.map((inquiry) => (
            <li key={inquiry._id}>
              <p><strong>Date:</strong> {new Date(inquiry.dateInquiry).toLocaleString()}</p>
              <p><strong>Question:</strong> {inquiry.inquiryText}</p>
              {inquiry.answerText && (
                <p><strong>Answer:</strong> {inquiry.answerText}</p>
              )}
              <p><strong>Status:</strong> {inquiry.status}</p>
            </li>
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

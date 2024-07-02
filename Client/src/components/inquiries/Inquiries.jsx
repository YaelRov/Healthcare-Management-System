import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddInquiry from "./AddInquiry";
import axios from "axios";
import AnswerInquiry from "./AnswerInquiry";


export default function Inquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingInquiry, setEditingInquiry] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  // Fetch the user's inquiries from local session
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
                'user-id': userId,
              },
            });
            setInquiries(response.data);
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

  const handleAnswerSubmit = (inquiryId, answerText) => {
    const updatedInquiries = inquiries.map(inquiry =>
      inquiry._id === inquiryId ? { ...inquiry, answerText, status: 'answered' } : inquiry
    );
    setInquiries(updatedInquiries);
    currentUser.inquiries = updatedInquiries;
    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
    setEditingInquiry(null);
  };

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleCancelClick = () => {
    setShowAddForm(false);
  };

  return (
    <div className="container">
      {currentUser.profile === 0 ? (
        <h1 style={{ marginBottom: "1rem" }}>My Inquiries</h1>
      ) : (
        <h1 style={{ marginBottom: "1rem" }}>All Inquiries</h1>
      )}

      {/* Display inquiries */}
      <div className="inquiries-list">
        {inquiries.length > 0 ? (
          inquiries.map((inquiry) => (
            <div key={inquiry._id} className="inquiry-item">
              {/* Inquiry details */}
              <p><strong>Date:</strong> {new Date(inquiry.dateInquiry).toLocaleString()}</p>
              <p><strong>Question:</strong> {inquiry.inquiryText}</p>
              {inquiry.answerText && (
                <p><strong>Answer:</strong> {inquiry.answerText}</p>
              )}
              <p><strong>Status:</strong> {inquiry.status}</p>

              {/* Answer button or AnswerInquiry component for doctors */}
              {currentUser.profile === 1 && (
                <div>
                  {editingInquiry === inquiry._id ? (
                    <AnswerInquiry
                      inquiry={inquiry}
                      onAnswerSubmit={handleAnswerSubmit}
                      onCancel={() => setEditingInquiry(null)}
                      userIdToEdit={inquiry.patientId} // Pass userIdToEdit as prop
                    />
                  ) : (
                    <button onClick={() => setEditingInquiry(inquiry._id)}>Answer</button>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No inquiries found.</p>
        )}
      </div>

      {/* Add Inquiry button for patients (profile 0) */}
      {currentUser.profile === 0 && (
        <button onClick={handleAddClick} style={{ marginTop: "1rem" }}>Add Inquiry</button>
      )}

      {/* AddInquiry form if showAddForm is true */}
      {showAddForm && (
        <div style={{ marginTop: "1rem" }}>
          <button onClick={handleCancelClick}>❌</button>
          <AddInquiry />
        </div>
      )}
    </div>
  );
}
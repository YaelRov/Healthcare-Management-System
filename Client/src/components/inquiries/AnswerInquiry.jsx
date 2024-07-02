import React, { useState } from 'react';
import axios from 'axios';

function AnswerInquiry({ inquiry, onAnswerSubmit, onCancel, userIdToEdit }) {
  const [answerText, setAnswerText] = useState(inquiry.answerText || '');
  const [errorMessage, setErrorMessage] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (answerText.trim() === '') {
      setErrorMessage('Please enter an answer');
      return;
    }

    try {
      const userId = JSON.parse(sessionStorage.getItem("currentUser")).idNumber;

      const response = await axios.put(`http://localhost:3030/inquiries/${userIdToEdit}/${inquiry._id}`, {
        answerText,
        status: 'answered'
      }, {
        withCredentials: true,
        headers: {
          'user-id': userId,
        },
      });

      if (response.status !== 200) {
        throw new Error("Server error");
      }

      onAnswerSubmit(inquiry._id, answerText);
      setErrorMessage('');
    } catch (err) {
      console.error("Error answering inquiry:", err);
      setErrorMessage(err.response?.data?.message || 'Failed to submit answer. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
        placeholder="Enter your answer here"
      />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* הצגת הודעת שגיאה */}
      <div>
        <button type="submit">Submit Answer</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default AnswerInquiry;

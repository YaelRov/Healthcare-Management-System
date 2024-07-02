import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (storedUser) {
      setUserId(storedUser.idNumber);
    }
  }, []);


  return (
    <div className="container central-container">
      <div className="profile-container">
      <h1 className="profile-title">Welcome to Dr. Salomon's Clinic</h1>
        <h3>
          Welcome to our state-of-the-art clinic, where we provide comprehensive medical services tailored to your needs.
          Our team of experienced doctors and specialists are dedicated to delivering the highest quality care in a compassionate and supportive environment.
        </h3>
     
      </div>
    </div>
  );
}

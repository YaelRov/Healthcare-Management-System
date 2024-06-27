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
    <>
      <h1>Welcome to DR Salomon Clinic</h1>

    
      <div>
        <h2>About Our Clinic</h2>
        <p>
          Welcome to our state-of-the-art clinic, where we provide comprehensive medical services tailored to your needs.
          Our team of experienced doctors and specialists are dedicated to delivering the highest quality care in a compassionate and supportive environment.
        </p>
     
      </div>
    </>
  );
}

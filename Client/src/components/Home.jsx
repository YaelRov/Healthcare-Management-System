

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

  const handleProfileClick = () => {
    if (userId) {
      navigate(`/${userId}/myProfile`);
    } else {
      // Handle the case where the user is not logged in (e.g., redirect to login page)
      console.error("User not logged in");
      // For example:
      // navigate('/login');
    }
  };

  return (
    <div>
      <h1>Welcome to DR Salomon Clinic</h1>
      <p>For your personal area, click here:</p>
      <button onClick={handleProfileClick} disabled={!userId}>
        My Profile
      </button>
    </div>
  );
}

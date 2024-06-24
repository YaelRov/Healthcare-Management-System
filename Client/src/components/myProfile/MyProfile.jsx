
import React, { useEffect, useState } from 'react';

export default function MyProfile() {
  const [curUser, setCurUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [usersEmail, setUsersEmail] = useState("");
  const [usersPhone, setUsersPhone] = useState("");
  const [usersStreet, setUsersStreet] = useState("");
  const [usersNumber, setUsersNumber] = useState("");
  const [usersCity, setUsersCity] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true); // Start loading
      setError(null);     // Clear any previous error

      try {
        console.log("jjj");
        const userDataString = localStorage.getItem("currentUser");
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          console.log(userData);
          setCurUser(userData);
          console.log(curUser);
          setUsersEmail(userData.email.email);
          console.log(usersEmail);
          setUsersPhone(userData.phoneNumber);
          console.log(usersPhone);
          setUsersStreet(userData.address?.street || "");
          console.log(usersStreet)
          setUsersNumber(userData.address?.number || "");
          console.log(usersNumber)
          setUsersCity(userData.address?.city || "");
          console.log(usersCity)
        } else {
          setError("User data not found in local storage.");
          console.error("User data not found in local storage.");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        setError("Error loading user data.");
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

     fetchUserData();
  }); 
  
  function handleDetailsUpdate() {
    
    setIsEditing(false);
    updateDetails();
}

function updateDetails() {
  fetch(`http://localhost:3030/users/${curUser.idNumber}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedObj),
      headers: {
          'Content-type': 'application/json; charset=UTF-8',
      },
  })
      .then((response) => response.json())
      .then((json) => console.log(json));
}
console.log(curUser);
  return (
    curUser && (
      <div className="profile-container">
        <h1 className="profile-title">My Profile</h1>
        <div className="profile-details">
          <p className="profile-item">
            <b>ID Number:</b> {curUser.idNumber}
          </p>
          <p className="profile-item">
            <b>First Name:</b> {curUser.firstName}
          </p>
          <p className="profile-item">
            <b>Last Name:</b> {curUser.lastName}
          </p>
          <p className="profile-item">
            <b>Date of Birth:</b>{" "}
            {new Date(curUser.dateOfBirth).toLocaleDateString()}
          </p>
          <>
            {isEditing ? (<><input
              type="text"
              value={usersEmail}
              onChange={(e) => setUsersEmail(e.target.value)}
            />
              <input
                type="text"
                value={usersPhone}
                onChange={(e) => setUsersPhone(e.target.value)}
              />
              <input
                type="text"
                value={usersStreet}
                onChange={(e) => setUsersStreet(e.target.value)}
              />
              <input
                type="text"
                value={usersNumber}
                onChange={(e) => setUsersNumber(e.target.value)}
              />
              <input
                type="text"
                value={usersCity}
                onChange={(e) => setUsersCity(e.target.value)}
              />
              <button onClick={handleDetailsUpdate}>Save✔️</button>
            </>) : (<><p className="profile-item">
              <b>Email:</b> {curUser.email.email}
            </p>
              <p className="profile-item">
                <b>Phone Number:</b> {curUser.phoneNumber}
              </p>
              <p className="profile-item">
                <b>Address:</b>
                <br />
                {curUser?.address?.street}, {curUser?.address?.number}, {curUser?.address?.city}

              </p>
              <button className="edit-button" onClick={() => setIsEditing(true)}>
                Edit 🖋️
              </button></>)}</>
        </div>
      </div>
    )
  );
}



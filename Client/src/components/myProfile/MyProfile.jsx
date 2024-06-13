import React, { useEffect, useState } from 'react';

export default function MyProfile() {
  const [curUser, setCurUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [usersEmail, setUsersEmail] = useState();
  const [usersPhone, setUsersPhone] = useState();
  const [usersStreet, setUsersStreet] = useState();
  const [usersNumber, setUsersNumber] = useState();
  const [usersCity, setUsersCity] = useState();

  useEffect(() => {
    // Check if currentUser is not set in localStorage
    if (!localStorage.getItem("currentUser")) {
      const initialUser = {
        idNumber: 300000000,
        firstName: "Patient1",
        lastName: "Lastname1",
        dateOfBirth: new Date("1980-01-14T22:00:00.000+00:00"),
        address: {
          city: "Tel Aviv",
          street: "Dizengoff",
          number: 69,
        },
        phoneNumber: "0526119419",
        email: "patient1@example.com",
        profile: "patient",
        // Add other user data if needed
      };
      localStorage.setItem("currentUser", JSON.stringify(initialUser));
    }

    const userFromStorage = JSON.parse(localStorage.getItem("currentUser"));
    setCurUser(userFromStorage);
    setUsersEmail(userFromStorage.email);
    setUsersPhone(userFromStorage.phoneNumber);
    setUsersStreet(userFromStorage.address.street);
    setUsersNumber(userFromStorage.address.number);
    setUsersCity(userFromStorage.address.city);
  }, []);

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
              <b>Email:</b> {curUser.email}
            </p>
              <p className="profile-item">
                <b>Phone Number:</b> {curUser.phoneNumber}
              </p>
              <p className="profile-item">
                <b>Address:</b>
                <br />
                {curUser.address.street}, {curUser.address.number}, {curUser.address.city}
              </p>
              <button className="edit-button" onClick={() => setIsEditing(true)}>
                Edit 🖋️
              </button></>)}</>
        </div>
      </div>
    )
  );
}

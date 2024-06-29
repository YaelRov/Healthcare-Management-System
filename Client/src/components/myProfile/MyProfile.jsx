import React, { useEffect, useState } from 'react';
import axios from "axios";

export default function MyProfile() {
  const [curUser, setCurUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataString = sessionStorage.getItem("currentUser");
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setCurUser(userData);
        } else {
          console.error("User data not found in local storage.");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleDetailsUpdate = () => {
    setIsEditing(false);
    updateDetails();
  }

  const updateDetails = async () => {
    try {
      const userId=curUser.idNumber;
      const response = await axios.put(`http://localhost:3030/users/${userId}`, {
        idNumber: curUser.idNumber,
        email: curUser.email.email,
        phoneNumber: curUser.phoneNumber,
        address: {
          city: curUser.address.city,
          number: curUser.address.number,
          street: curUser.address.street
        }
      });

      if (response.status === 200) {
        sessionStorage.setItem("currentUser", JSON.stringify(curUser));
      } else {
        console.error("Error updating user details:", response.data);
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  return (
    curUser && (
      <div className="container">
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
              <b>Date of Birth:</b> {new Date(curUser.dateOfBirth).toLocaleDateString()}
            </p>
            {isEditing ? (
              <>
                <input
                  type="text"
                  defaultValue={curUser.email.email}
                  onChange={(e) => setCurUser({ ...curUser, email: { email: e.target.value } })}
                />
                <input
                  type="text"
                  defaultValue={curUser.phoneNumber}
                  onChange={(e) => setCurUser({ ...curUser, phoneNumber: e.target.value })}
                />
                <input
                  type="text"
                  defaultValue={curUser.address?.street || ""}
                  onChange={(e) => setCurUser({ ...curUser, address: { ...curUser.address, street: e.target.value } })}
                />
                <input
                  type="text"
                  defaultValue={curUser.address?.number || ""}
                  onChange={(e) => setCurUser({ ...curUser, address: { ...curUser.address, number: e.target.value } })}
                />
                <input
                  type="text"
                  defaultValue={curUser.address?.city || ""}
                  onChange={(e) => setCurUser({ ...curUser, address: { ...curUser.address, city: e.target.value } })}
                />
                <button onClick={handleDetailsUpdate}>Save ✔️</button>
              </>
            ) : (
              <>
                <p className="profile-item">
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
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    )
  );
}

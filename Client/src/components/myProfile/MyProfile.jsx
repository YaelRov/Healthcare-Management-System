
import React, { useEffect, useState } from 'react';
import axios from "axios";

export default function MyProfile() {
  const [curUser, setCurUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  // const [usersEmail, setUsersEmail] = useState("");
  // const [usersPhone, setUsersPhone] = useState("");
  // const [usersStreet, setUsersStreet] = useState("");
  // const [usersNumber, setUsersNumber] = useState("");
  // const [usersCity, setUsersCity] = useState("");
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      // setIsLoading(true); // Start loading
      // setError(null);     // Clear any previous error

      try {
        const userDataString = localStorage.getItem("currentUser");
        if (userDataString) {
          const userData = JSON.parse(userDataString)
          setCurUser(userData);
          setUsersEmail(userData.email.email);    
          setUsersPhone(userData.phoneNumber);
          setUsersStreet(userData.address?.street || "");
          setUsersNumber(userData.address?.number || "");
          setUsersCity(userData.address?.city || "");
        } else {
          setError("User data not found in local storage.");
          console.error("User data not found in local storage.");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        setError("Error loading user data.");
      } finally {
        // setIsLoading(false); // Stop loading
      }
    };

     fetchUserData();
    }, []);
  
  function handleDetailsUpdate() {
    console.log("handleDetailsUpdate");
    setIsEditing(false);
    updateDetails();
}

const updateDetails = async () => {
  console.log(curUser);
 
  try {
    console.log(`http://localhost:3030/users/${curUser.idNumber}`);
    console.log(`idNumber=${ curUser.idNumber} email=${curUser.email.email} phoneNumber${curUser.phoneNumber}
      city=${curUser.address.city} number=${curUser.address.number} street${curUser.address.street}
      `)
    const response = await axios.put(`http://localhost:3030/users/${curUser.idNumber}`, {
      idNumber: curUser.idNumber,
      email: curUser.email.email,

      phoneNumber: curUser.phoneNumber,
      address: {
        city:curUser.address.city,
        number:curUser.address.number,
        street:curUser.address.street
        
      }
    });
    

    console.log(`response.status=${response.status}`);
    if (response.status === 200) { // Check if the request was successful
      // const updatedUserData = response.data; // Access the updated user data from the response

      // setCurUser(updatedUserData); // Update state with the new data
      localStorage.setItem("currentUser", JSON.stringify(curUser)); // Save in localStorage
    } else {
      // Handle unsuccessful responses here
      console.error("Error updating user details:", response.data);
    }
  } catch (error) {
    // Handle errors from the network request
    console.error("Error updating user details:", error);
  }
};


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
            ) : (<><p className="profile-item">
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



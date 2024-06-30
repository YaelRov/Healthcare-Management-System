import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LogIn() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordSent, setPasswordSent] = useState(false);
    const navigate = useNavigate();

    const handleSendPassword = async () => {
        if (userId) {
            try {
                setPasswordSent(true);
                const response = await axios.get(`http://localhost:3030/login/${userId}`,

                    {
                        withCredentials: true, // Important for sending cookies
                        headers: {
                            'user-id': userId,
                        },
                    });

                    return response;
                    
            } catch (error) {
                console.error("Error sending password:", error);
            }
        }
    };

    const handlePasswordChange = async (event) => {
        const enteredPassword = event.target.value;
        setPassword(enteredPassword);

        if (enteredPassword.length === 6) {
            try {
           
                const response = await axios.post(`http://localhost:3030/login/${userId}`,
                {
                    password: enteredPassword 
                },

                    {
                        withCredentials: true, // Important for sending cookies
                        headers: {
                            'user-id': userId,
                        },
                    });

                if (response.data.success) {
                    sessionStorage.setItem("currentUser", JSON.stringify(response.data.user)); // Save user data to sessionStorage
                    navigate(`/${userId}/home`); 
                } else {
                    alert("Error: " + response.data.message);
                }
            } catch (error) {
                console.error("Error logging in:", error);
                alert("Error logging in");
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <div className="input-group">
                    <label>User ID:</label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </div>
                <button onClick={handleSendPassword}>Send me password to my email</button>
                {passwordSent && (
                    <div className="input-group">
                        <label>6-digit Password:</label>
                        <input
                            type="text"
                            value={password}
                            onChange={handlePasswordChange}
                            maxLength="6"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

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
                // navigate(`/login/${userId}`);
                setPasswordSent(true);
                console.log(userId);
                await axios.get(`http://localhost:3030/login/${userId}`);
                console.log("button clicked");
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
                console.log(`password= ${enteredPassword} userId= ${userId}`);
                const response = await axios.post(`http://localhost:3030/login/${userId}`, { password: enteredPassword });
                console.log(response);
                if (response.data.success) {
                

                    localStorage.setItem("currentUser", JSON.stringify(response.data.user)); // Save user data to localStorage
                    navigate(`/${userId}/myProfile`);
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
        <div>
            <div>
                <label>
                    User ID:
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </label>
                <button onClick={handleSendPassword}>Send me password to my email</button>
            </div>
            {passwordSent && (
                <div>
                    <label>
                        6-digit Password:
                        <input
                            type="text"
                            value={password}
                            onChange={handlePasswordChange}
                            maxLength="6"
                        />
                    </label>
                </div>
            )}
        </div>
    );
}
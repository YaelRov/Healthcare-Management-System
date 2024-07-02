import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useParams } from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the user ID from the URL

    const [profile, setProfile] = useState(0);

    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "red",
    };

    const logOutFunc = () => {
        sessionStorage.removeItem("currentUser");
        window.history.replaceState(null, '', '/');
        navigate('/login', { replace: true });
    };

    useEffect(() => {
        const getProfile = async () =>  {
            try {
                const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
                if (currentUser) {
                    setProfile(currentUser.profile);
                } else {
                    console.error("No current user.");
                }
            } catch (err) {
                console.error("Error getting profile:", err);
            }
        };

        getProfile();
    }, [id]);

    return (
        <>
            <header>
                <nav className='navbar'>
                    <NavLink
                        to="myProfile"
                        className={({ isActive }) => isActive ? "links active" : "links"}
                    >
                        My Profile
                    </NavLink>
                    <NavLink
                        to="inquiries"
                        className={({ isActive }) => isActive ? "links active" : "links"}
                    >
                        Inquiries
                    </NavLink>
                    <NavLink
                        to="appointments"
                        className={({ isActive }) => isActive ? "links active" : "links"}
                    >
                        Appointment
                    </NavLink>
                   
                    {profile === 1 && (
                        <NavLink
                            to="addPatient"
                            className={({ isActive }) => isActive ? "links active" : "links"}
                        >
                            Add Patient
                        </NavLink>
                    )}
                    <NavLink
                        to="home"
                        className={({ isActive }) => isActive ? "links active" : "links"}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/login"
                        onClick={logOutFunc}
                        className={({ isActive }) => isActive ? "links active" : "links"}
                    >
                        Log Out
                    </NavLink>
                </nav>
            </header>
            <Outlet />
        </>
    );
}

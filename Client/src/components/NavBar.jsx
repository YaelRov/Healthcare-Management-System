import React from 'react'
import { Outlet, NavLink, useNavigate } from "react-router-dom"
import styles from './NavBar.module.css';


export default function NavBar() {
    const navigate = useNavigate();
    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "red",

    }
    const logOutFunc = () => {
        localStorage.removeItem("currentUser");
        window.history.replaceState(null, '', '/');
        navigate('/login', { replace: true });
    }

    return (
        <>
            <header>
                <nav className='navbar'>
                    <NavLink
                        to="myProfile"//*
                        style={({ isActive }) => isActive ? activeStyle : null}
                        className='links'
                    >
                        my profile
                    </NavLink>
                    <NavLink
                        to="inquiries"
                        style={({ isActive }) => isActive ? activeStyle : null}
                        className='links'
                    >
                        inquiries
                    </NavLink>
                    <NavLink
                        to="appointments"
                        style={({ isActive }) => isActive ? activeStyle : null}
                        className='links'
                    >
                        appointment
                    </NavLink>
                    <NavLink
                        to="medicalfiles"
                        style={({ isActive }) => isActive ? activeStyle : null}
                        className='links'
                    >
                        medical files
                    </NavLink>
                    <NavLink
                        to="addPatient"//*
                        style={({ isActive }) => isActive ? activeStyle : null}
                        className='links'
                    >
                        add patient
                    </NavLink>
                    <NavLink
                        to="home"
                        style={({ isActive }) => isActive ? activeStyle : null}
                        className='links'
                    >home </NavLink>
                    <NavLink
                        to="/login"
                        onClick={logOutFunc}
                        style={({ isActive }) => isActive ? activeStyle : null}
                        className='links'
                    > log out</NavLink>
                </nav>
            </header>
            <Outlet />
        </>
    )
}

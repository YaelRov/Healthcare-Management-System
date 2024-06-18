import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddAppointment from "./AddAppointment";
import axios from "axios";
export default function Appointments()
{
    async function funClick()
    {
        const response = await axios.get('http://localhost:3030/appointments');
                console.log(response);
    }
    return(
        
        <div>
          
            <h1>my Appointments</h1>
            <button onClick={funClick}>click</button>
            <AddAppointment/>
        </div>
    )
}
import React from "react";
import Welcome from './components/Welcome';
import Home from './components/Home';
import FirstPageNav from './components/FirstPageNav';
import NavBar from './components/NavBar';
import Inquiries from './components/inquiries/Inquiries';
import AddPatient from './components/addPatient/AddPatient';
import Medicalfiles from './components/medicalfiles/Medicalfiles';
import MyProfile from './components/myProfile/MyProfile';
import Appointments from './components/appointments/Appointments';
import AddAppointment from './components/appointments/AddAppointment'; // Import AddAppointment component
import AddInquiry from './components/inquiries/AddInquiry'; // Import AddInquiry component
import LogIn from './components/login/LogIn';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function MyClinic() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<h1>error</h1>} />
        <Route path="/" element={<FirstPageNav />}>
          <Route path="" element={<Welcome />} />
          <Route path="login" element={<LogIn />} />
        </Route>
        <Route path="/:id" element={<NavBar />}>
          <Route index element={<Home />} />
          {/* <Route path="myProfile" element={<MyProfile />} /> */}
          <Route path="/:id/myProfile" element={<MyProfile />} />
          <Route path="inquiries">
            <Route index element={<Inquiries />} />
            <Route path="add" element={<AddInquiry />} /> 
          </Route>
          <Route path="appointments">
            <Route index element={<Appointments />} />
            <Route path="add" element={<AddAppointment />} /> 
          </Route>
          <Route path="medicalfiles" element={<Medicalfiles />} />
          <Route path="addPatient" element={<AddPatient />} />
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

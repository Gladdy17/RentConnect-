import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import LoginPage from "./components/LoginPage";
import TenantDashboard from "./components/TenantDashboard";
import ViewApplications from "./components/ViewApplications";
import RentalProperties from "./components/RentalProperties";
import AddProperty from './components/AddProperty';
import RenterApplicationForm from "./components/TenantDashboard/RenterApplicationForm";
import SignUp from "./components/SignUp";
import MyProperties from "./components/MyProperties";
import LandlordApplications from "./components/TenantDashboard/LandlordApplications";
import LandlordApplicationDetails from "./components/TenantDashboard/LandlordApplicationsDetails";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [User, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});

  return (
    <Routes>
      {/* Entry Route: Redirect based on login */}
      <Route
        path="/"
        element={
          User && User.id ? (
            <Navigate to="/dashboard" />
          ) : (
            <LoginPage setLoggedIn={setLoggedIn} setUser={setUser} />
          )
        }
      />

      {/* Dashboard layout wrapper */}
      <Route
        path="/dashboard/*"
        element={<TenantDashboard User={User} setLoggedIn={setLoggedIn} />}
      >
        {/* Nested routes inside dashboard layout */}
        <Route path="view-properties" element={<RentalProperties User={User} />} />
        <Route path="view-applications" element={<ViewApplications User={User}/>} />
        <Route path="renter-application" element={<RenterApplicationForm />} />
        <Route path="add-property" element={<AddProperty User={User}/>} />
        <Route path="my-properties" element={<MyProperties User={User}/>}/>
        <Route path="landlord-applications" element={<LandlordApplications />} />
        <Route path="application/:id" element={<LandlordApplicationDetails />} />
        <Route path="account-settings" element={<div>Account Settings</div>} />
        <Route index element={<div>Welcome to your dashboard!</div>} />
      </Route>

      {/* Sign Up route (outside dashboard layout) */}
      <Route path="/sign-up" element={<SignUp setUser={setUser}/>} />
      <Route path="login" element={<LoginPage setUser={setUser}/> } />
    </Routes>
  );
}

export default App;
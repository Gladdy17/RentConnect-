import React from "react";
import "../styles/Sidenav.css";
import MyProfBtn from "./Button Components/MyProfBtn";
import ViewPropertyBtn from "./Button Components/ViewPropertyBtn";
import AccountSettingsBtn from "./Button Components/AccountSettingsBtn";
import MyProperties from "./Button Components/MyProperties";
import MyApplicationsBtn from "./Button Components/MyApplicationsBtn";
import LandlordApplicationsBtn from "./Button Components/LandlordApplicationsBtn";

function Sidenav({ User }) {
  return (
    <div className="sidenav_container">
      {User.role === "tenant" ? (
        <div className="tenant">
          <MyProfBtn to="/dashboard" />
          <ViewPropertyBtn to="/dashboard/view-properties" />
          <MyApplicationsBtn to="/dashboard/view-applications" />
          <AccountSettingsBtn to="/dashboard/account-settings" />
        </div>
      ) : (
        <div className="landlord">
          <MyProfBtn to="/dashboard" />
          <MyProperties to="/dashboard/my-properties" />
          <LandlordApplicationsBtn to="/dashboard/landlord-applications" />
          <AccountSettingsBtn to="/dashboard/account-settings" />
        </div>
      )}
    </div>
  );
}

export default Sidenav;
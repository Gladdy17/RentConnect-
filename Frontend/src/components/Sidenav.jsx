import React from "react";
import "../styles/Sidenav.css";
import MyProfBtn from "./ButtonComponents/MyProfBtn";
import ViewPropertyBtn from "./ButtonComponents/ViewPropertyBtn";
import AccountSettingsBtn from "./ButtonComponents/AccountSettingsBtn";
import MyProperties from "./ButtonComponents/MyProperties";
import MyApplicationsBtn from "./ButtonComponents/MyApplicationsBtn";

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
          <AccountSettingsBtn to="/dashboard/account-settings" />
        </div>
      )}
    </div>
  );
}

export default Sidenav;
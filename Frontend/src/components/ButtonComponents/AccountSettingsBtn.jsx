import React from "react";
import { Link } from "react-router-dom";
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

function AccountSettingsBtn() {
  return (
    <Link to="/dashboard/account-settings" className="sidenav_button">
      <SettingsRoundedIcon className="sidenav_icon account_settings_icon" sx={{ fontSize: 40 }} />
      <h1 className="sidenav_header">Account Settings</h1>
    </Link>
  );
}

export default AccountSettingsBtn;
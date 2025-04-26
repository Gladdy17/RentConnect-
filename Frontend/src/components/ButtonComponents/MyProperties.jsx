import React from "react";
import { Link } from "react-router-dom";
import HomeWorkIcon from '@mui/icons-material/HomeWork';

function MyPropertiesBtn({ onClick }) {
  return (
    <Link to="/dashboard/my-properties" className="sidenav_button my_properties_btn">
      <HomeWorkIcon className="sidenav_icon my_properties_icon" sx={{ fontSize: 40 }} />
      <h1 className="sidenav_header">My Properties</h1>
    </Link>
  )
}

export default MyPropertiesBtn
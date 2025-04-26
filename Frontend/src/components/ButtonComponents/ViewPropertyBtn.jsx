import React from "react";
import { Link } from "react-router-dom";
import HouseRoundedIcon from '@mui/icons-material/HouseRounded';

function ViewPropertyBtn() {
  return (
    <Link to="/dashboard/view-properties" className="sidenav_button">
      <HouseRoundedIcon className="sidenav_icon view_properties_button" sx={{ fontSize: 40 }} />
      <h1 className="sidenav_header">View Properties</h1>
    </Link>
  );
}

export default ViewPropertyBtn;
import React from "react";
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import { useNavigate } from "react-router-dom";

function LandlordApplicationsBtn({ to }) {
  const navigate = useNavigate();

  return (
    <div className="sidenav_button" onClick={() => navigate(to)}>
      <AssignmentTurnedInRoundedIcon className="sidenav_icon" sx={{ fontSize: 40 }} />
      <h1 className="sidenav_header">My Applications</h1>
    </div>
  );
}

export default LandlordApplicationsBtn;
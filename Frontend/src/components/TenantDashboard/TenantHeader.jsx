import React from "react";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import StarRating from "../StarRating"
import "../../styles/TenantHeader.css";
import { useNavigate } from "react-router-dom";

function TenantHeader({rating}) {

  const navigateUser = useNavigate()

  return (
    <div className="dashboard_header">
      <div className="header_background"></div>
      <div className="header_content">
        <div className="tenant_header_logo">
          <img src="../src/assets/react.svg" alt="" />
        </div>
        <div className="header_user_info">
          <div className="user_info">
            <h1>Tenant Name</h1>
            <StarRating 
            rating={rating}
            />
            <h3>( Average {rating} from 6 reviews )</h3>
            <h2 className="location">Edmonton, AB</h2>
          </div>
        </div>
        <div className="header_icons">
            <EditRoundedIcon className="header_icon" sx={{fontSize: 35}} 
            style={{cursor: "pointer"}}
            onClick={() => navigateUser('/dashboard/edit-profile')}
            />
            <ShareRoundedIcon className="header_icon" sx={{fontSize: 35}}
            style={{cursor: "pointer"}} 
            onClick={async () => {
              await navigator.clipboard.writeText('https://www.RentConnect.ca/tenant?my_page')
            }}
            />
          </div>
      </div>
    </div>
  )
}

export default TenantHeader;
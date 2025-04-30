import React from "react";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import StarRating from "../StarRating"
import ShareableLink from "./ShareableLink";
import "../../styles/TenantHeader.css";

function TenantHeader({ User, rating, feedbackAmount }) {


  return (
    <div className="dashboard_header">
      <div className="header_content">
        <div className="header_user_info">
          <div className="user_info">
            <h1>{User.first_name} {User.last_name}</h1>
            <StarRating rating={rating}/>
            <h3>( Average {Math.round(rating * 10) /10 } from {feedbackAmount} reviews )</h3>          
            </div>
        </div>
        {/* <div className="header_icons">
            <EditRoundedIcon className="header_icon" sx={{fontSize: 35}} 
            style={{cursor: "pointer"}}
            onClick={() => console.log("edit page")}
            />
            <ShareRoundedIcon className="header_icon" sx={{fontSize: 35}}
            style={{cursor: "pointer"}} 
            onClick={async () => {
              await navigator.clipboard.writeText('https://www.RentConnect.ca/tenant?my_page')
            }}
            /> */}
          {/* </div> */}
          <ShareableLink />
      </div>
    </div>
  )
}

export default TenantHeader;
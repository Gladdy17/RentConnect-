import React from "react";
import StarRating from "./StarRating";

function UserReview({rating}) {
  return(
    <div className="user_review_container">
      <div className="reviewer_info">
        <img src="null" alt="" />
        <h3>User Name</h3>
        <StarRating 
        rating={rating}
        />
      </div>
      <div className="review content">
        <p>This dude wrecked my place</p>
      </div>
    </div>
  )
}

export default UserReview;
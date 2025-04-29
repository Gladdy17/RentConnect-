import React, { useEffect, useState } from "react";
import TenantHeader from "./TenantHeader";
import ShareableLink from "./ShareableLink";
import Landlordreviews from "./LandLordReviews"
import "../../styles/TenantProfilePage.css";
import { getAllFeedbacks } from "../../api/feedBackEndpoints";

function TenantProfilePage({ User }) {

  const [feedback, setFeedback] = useState([])

  console.log("User", User)

  const getFeedback = async () => {
    try {
      const data = await getAllFeedbacks();
      console.log("Fetched feedback data:", data); // Debugging log
      const filteredFeedback = data.filter((feedback) => feedback.recipient_id === User.id);
      console.log("Filtered feedback:", filteredFeedback); // Debugging log
      setFeedback(filteredFeedback);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  useEffect(() => {
    if(User && User.id) {
    getFeedback(User.id)
    }
  }, [User])
  
  const averageRating = (feedback) => {
    if(!feedback || feedback.length === 0) return 0

    const ratingSum = feedback.reduce((prev, curr) =>  prev + curr.rating, 0)
    return ratingSum / feedback.length
  }

  const rating = averageRating(feedback)

  return(
    <div className="tenant_profile_page">
      <TenantHeader 
        User={User}
        rating={rating}
        feedbackAmount = {feedback.length}
      />
      <Landlordreviews feedback={feedback} />
    </div>
  )
}

export default TenantProfilePage;
import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { getUserById } from "../api/userEndpoints";
import '../styles/UserReview.css'

function UserReview({ rating, message, author_id, createdAt }) {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    if (author_id) {
      const fetchAuthorData = async () => {
        try {
          const data = await getUserById(author_id);
          setAuthor(data);
        } catch (error) {
          console.error("Error fetching author data:", error);
        }
      };

      fetchAuthorData();
    }
  }, [author_id]);

  return (
    <div className="user_review_container">
      <div className="reviewer_info">
        <h4>{new Date(createdAt).toLocaleDateString()}</h4>
        <StarRating rating={rating} />
      </div>
      <div className="review_content">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default UserReview;
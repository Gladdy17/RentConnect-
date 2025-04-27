import React from "react";
import UserReview from "../UserReview";
import { FormControl, TextField } from '@mui/material';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';

function LandlordReviews({rating}) {

  const [reviewButtonActive, setReviewButtonActive] = React.useState(false)
  const [review, setReview] = React.useState({
    rating: 0,
    review: ""
  })

  const handleChange = (event) => {
    setReview({
      ...review,
      review: event.target.value,
    });
  };

  const handleStarClick = (index) => {
    setReview({
      ...review,
      rating: index + 1,
    });
  };;

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("review submitted", review)
  }
 
  return (
    <>
      <div className="review_header">
        <h1>Reviews</h1>
        <button onClick={() => setReviewButtonActive(!reviewButtonActive)}>Leave a review</button>
      </div>
      {/* Renders stars based on review value */}
        {reviewButtonActive &&
          <div className="review_form">
          <form id="review_form">
          {[...Array(5)].map((_, index) => (
              index < review.rating ? (
                <StarRateRoundedIcon
                  key={index}
                  className="star_icon star filled"
                  sx={{ fontSize: 30 }}
                  onClick={() => handleStarClick(index)}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <StarOutlineRoundedIcon
                  key={index}
                  className="star_icon star_empty"
                  sx={{ fontSize: 30 }}
                  onClick={() => handleStarClick(index)}
                  style={{ cursor: "pointer" }}
                />
              )
            ))}
            <FormControl margin="normal">
              <TextField
              className="outlined-multiline-static"
                id="review"
                label="Write a review"
                multiline
                maxRows={8}
                variant="standard"
                value={review.userReview}
                onChange={handleChange}
              />
            </FormControl>
              <button type="submit" onClick={handleSubmit}>Submit review</button>
          </form>
          </div>
        }
      <UserReview 
        rating={rating}
      />
  </>
  )
}
export default LandlordReviews;
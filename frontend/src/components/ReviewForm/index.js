import { useCallback, useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";

import StarRatingInput from "../StarRatingInput";
import { getSingleSpotThunk } from "../../store/spots";
import { createSpotReviewThunk } from "../../store/reviews";

const ReviewForm = ({ reviewObj, formType }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState({});
  const [review, setReview] = useState(reviewObj?.review);
  const [stars, setStars] = useState(reviewObj?.stars);
  const [attemptSubmitted, setAttemptSubmitted] = useState(false);

  const validateErrors = useCallback(() => {
    const errorHandler = {};
    if (review.length < 10)
      errorHandler.review = "Review must be at least 10 characters.";
    if (!stars) errorHandler.stars = "Please set a rating.";
    if (attemptSubmitted) setErrors(errorHandler);
    if (Object.keys(errorHandler).length !== 0) {
      return false;
    }
    return true;
  }, [attemptSubmitted, review, stars]);

  useEffect(() => {
    validateErrors();
  }, [validateErrors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAttemptSubmitted(true);
    if (!validateErrors()) {
      return;
    }

    const _reviewObj = {
      ...reviewObj,
      review,
      stars,
    };

    const spotId = state.spots.singleSpot.id;

    if (formType === "Submit Your Review")
      dispatch(createSpotReviewThunk(_reviewObj, spotId));

    dispatch(getSingleSpotThunk(spotId));

    // DO I NEED THIS?
    // IMPORTANT: Need to await this, otherwise the closeForm will happen first
    // and the review will get updated at the same time as closing form. the
    // review will not get updated after form is closed.
    // await dispatch(onSubmit({ ...review, rating }));
    closeModal();
  };

  const onChange = (number) => {
    setStars(parseInt(number));
  };

  const disabled = review.length < 10;

  return (
    <form onSubmit={handleSubmit}>
      <div className="errors">{errors.review}</div>
      <div className="errors">{errors.stars}</div>
      <textarea
        name="description"
        onChange={(e) => setReview(e.target.value)}
        value={review}
        placeholder="Leave your review here..."
      ></textarea>
      <StarRatingInput rating={stars} disabled={false} onChange={onChange} />
      <button type="submit" disabled={disabled}>
        {formType}
      </button>
    </form>
  );
};

export default ReviewForm;

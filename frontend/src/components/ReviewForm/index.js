import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";

import StarRatingInput from "../StarRatingInput";
import { createSpotReviewThunk } from "../../store/reviews";

const ReviewForm = ({ reviewObj, formType }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState({});
  const [review, setReview] = useState(reviewObj?.review);
  const [stars, setStars] = useState(reviewObj?.stars);

  const spot = state.spots.singleSpot;

  useEffect(() => {
    // TODO: Fix this
    if (review.length < 10)
      errors.review = "Review must be at least 10 characters.";
    if (!stars) errors.stars = "Please set a rating.";
  }, [review, stars]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    let _reviewObj = {
      ...reviewObj,
      review,
      stars,
    };

    const spotId = state.spots.singleSpot.id;

    if (formType === "Submit Your Review") {
      const newReview = await dispatch(
        createSpotReviewThunk(_reviewObj, spotId)
      );
    }

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

import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";

import { createSpotReviewThunk } from "../../store/reviews";

const ReviewForm = ({ reviewObj, formType }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState({});
  const [review, setReview] = useState(reviewObj?.review);
  const [stars, setStars] = useState(reviewObj?.stars);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    reviewObj = {
      ...reviewObj,
      review,
      stars,
    };

    const spotId = state.spots.singleSpot.id;

    if (formType === "Submit Your Review") {
      const newReview = await dispatch(
        createSpotReviewThunk(reviewObj, spotId)
      );
    }

    // IMPORTANT: Need to await this, otherwise the closeForm will happen first
    // and the review will get updated at the same time as closing form. the
    // review will not get updated after form is closed.
    // await dispatch(onSubmit({ ...review, rating }));
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="description"
        onChange={(e) => setReview(e.target.value)}
        value={review}
      ></textarea>
      <label>
        <input
          type="number"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
        />
      </label>
      <button type="submit">{formType}</button>
    </form>
  );
};

export default ReviewForm;

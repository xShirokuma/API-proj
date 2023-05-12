import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEWS = "reviews/getSpotReviews";
const POST_SPOT_REVIEW = "reviews/postSpotReview";

//action creators
const getSpotReviews = (reviews) => {
  return {
    type: GET_SPOT_REVIEWS,
    reviews,
  };
};

const postSpotReview = (review) => {
  return {
    type: POST_SPOT_REVIEW,
    review,
  };
};

//thunks
export const getSpotReviewsThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/spots/${id}/reviews`);

  if (res.ok) {
    const reviewsObj = await res.json();
    dispatch(getSpotReviews(reviewsObj.Reviews));
  }
};

export const createSpotReviewThunk = (review, spotId) => async (dispatch) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  };

  const res = await csrfFetch(`api/spots/${spotId}/reviews`, options);

  if (res.ok) {
    const newReview = await res.json();
    dispatch(postSpotReview(newReview));
    return newReview;
  }
};

const initialState = {
  spot: {},
  user: {},
};

const reviewsReducer = (state = initialState, action) => {
  const reviewsState = { ...state };
  switch (action.type) {
    case GET_SPOT_REVIEWS:
      reviewsState.spot = {};
      reviewsState.user = {};
      action.reviews.forEach((review) => {
        reviewsState.spot[review.id] = review;
      });
      console.log(reviewsState);
      return reviewsState;
    case POST_SPOT_REVIEW:
      reviewsState.spot[action.review.spotId] = action.review;
      reviewsState.user[action.review.userId] = action.review;
      return reviewsState;
    default:
      return reviewsState;
  }
};

export default reviewsReducer;

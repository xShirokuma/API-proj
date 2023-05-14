import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEWS = "reviews/getSpotReviews";
const POST_SPOT_REVIEW = "reviews/postSpotReview";
const DELETE_REVIEW = "reviews/deleteReview";

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

const deleteReview = (id) => {
  return {
    type: DELETE_REVIEW,
    id,
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

  const postres = await csrfFetch(`/api/spots/${spotId}/reviews`, options);

  const res = await fetch(`/api/spots/${spotId}/reviews`);

  if (res.ok) {
    const reviewsObj = await res.json();
    dispatch(getSpotReviews(reviewsObj.Reviews));
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const deleteReviewThunk = (id) => async (dispatch) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await csrfFetch(`/api/reviews/${id}`, options);

  if (res.ok) {
    dispatch(deleteReview(id));
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
      reviewsState.user = { ...state.user };
      action.reviews.forEach((review) => {
        reviewsState.spot[review.id] = review;
      });
      return reviewsState;
    case POST_SPOT_REVIEW:
      reviewsState.spot = { ...state.user };
      reviewsState.user = { ...state.user };
      reviewsState.spot[action.review.spotId] = action.review;
      reviewsState.user[action.review.userId] = action.review;
      return reviewsState;
    case DELETE_REVIEW:
      reviewsState.spot = { ...state.spot };
      reviewsState.user = { ...state.user };
      delete reviewsState.spot[action.id];
      delete reviewsState.user[action.id];
      return reviewsState;
    default:
      return reviewsState;
  }
};

export default reviewsReducer;

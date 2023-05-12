import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEWS = "reviews/getSpotReviews";

//action creators
const getSpotReviews = (reviews) => {
  return {
    type: GET_SPOT_REVIEWS,
    reviews,
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
    default:
      return reviewsState;
  }
};

export default reviewsReducer;

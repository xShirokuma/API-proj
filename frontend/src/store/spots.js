import { csrfFetch } from "./csrf";

// action types
const GET_SPOTS = "spots/getSpots";
const GET_SPOT = "spots/getSpot";
const POST_SPOT = "spots/postSpot";
const POST_SPOT_IMAGE = "spots/postSpotImage";

// action creators
const getSpots = (spots) => {
  return {
    type: GET_SPOTS,
    spots,
  };
};

const getSpot = (spot) => {
  return {
    type: GET_SPOT,
    spot,
  };
};

const postSpot = (spot) => {
  return {
    type: POST_SPOT,
    spot,
  };
};

const postSpotImage = (spotImage) => {
  return {
    type: POST_SPOT_IMAGE,
    spotImage,
  };
};

// thunks
export const getAllSpots = () => async (dispatch) => {
  const res = await fetch("/api/spots");
  if (res.ok) {
    const spotsObj = await res.json();
    dispatch(getSpots(spotsObj.Spots));
  }
};

export const getSingleSpot = (id) => async (dispatch) => {
  const res = await fetch(`/api/spots/${id}`);
  if (res.ok) {
    const spot = await res.json();
    dispatch(getSpot(spot));
  }
};

export const createSpot = (spot) => async (dispatch) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spot),
  };

  const res = await csrfFetch("/api/spots", options);

  if (res.ok) {
    const newSpot = await res.json();
    dispatch(postSpot(spot));
    return newSpot;
  }
};

export const createSpotImages = (spotImages, id) => async (dispatch) => {
  for (const spotImage of spotImages) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(spotImage),
    };

    const res = await csrfFetch(`/api/spots/${id}/images`, options);

    if (res.ok) {
      dispatch(postSpotImage(spotImage));
    }
  }
};

const initialState = {
  allSpots: {},
  singleSpot: {},
};

const spotsReducer = (state = initialState, action) => {
  let spotsState = { ...state };
  switch (action.type) {
    case GET_SPOTS:
      action.spots.forEach((spot) => {
        spotsState.allSpots[spot.id] = spot;
      });
      return spotsState;
    case GET_SPOT:
      spotsState.singleSpot = action.spot;
      return spotsState;
    case POST_SPOT:
      spotsState.allSpots[action.spot.id] = action.spot;
      spotsState.singleSpot = action.spot;
      return spotsState;
    case POST_SPOT_IMAGE:
      spotsState.singleSpot.SpotImages.push(action.spotImage);
      return spotsState;
    default:
      return state;
  }
};

export default spotsReducer;

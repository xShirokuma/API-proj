import { csrfFetch } from "./csrf";

// action types
const GET_SPOTS = "spots/getSpots";
const GET_SPOT = "spots/getSpot";
const POST_SPOT = "spots/postSpot";
const POST_SPOT_IMAGE = "spots/postSpotImage";
const DELETE_SPOT = "spots/deleteSpot";
const DELETE_SPOT_IMAGE = "spots/deleteSpotImage";

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

const deleteSpot = (id) => {
  return {
    type: DELETE_SPOT,
    id,
  };
};

// thunks
export const getAllSpotsThunk = () => async (dispatch) => {
  const res = await fetch("/api/spots");
  if (res.ok) {
    const spotsObj = await res.json();
    dispatch(getSpots(spotsObj.Spots));
  }
};

export const getSingleSpotThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/spots/${id}`);
  if (res.ok) {
    const spot = await res.json();
    dispatch(getSpot(spot));
  }
};

export const getUserSpotsThunk = () => async (dispatch) => {
  const res = await fetch("/api/spots/current");
  if (res.ok) {
    const spotsObj = await res.json();
    dispatch(getSpots(spotsObj.Spots));
  }
};

export const createSpotThunk = (spot) => async (dispatch) => {
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

export const createSpotImageThunk = (spotImage, id) => async (dispatch) => {
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
};

export const updateSpotThunk = (spot) => async (dispatch) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spot),
  };

  const res = await csrfFetch(`/api/spots/${spot.id}`, options);

  if (res.ok) {
    const updatedSpot = await res.json();
    dispatch(postSpot(spot));
    return updatedSpot;
  }
};

export const deleteSpotThunk = (id) => async (dispatch) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await csrfFetch(`/api/spots/${id}`, options);

  if (res.ok) {
    dispatch(deleteSpot(id));
  }
};

const initialState = {
  allSpots: {},
  singleSpot: {},
};

const spotsReducer = (state = initialState, action) => {
  const spotsState = { ...state };
  switch (action.type) {
    case GET_SPOTS:
      spotsState.allSpots = {};
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
      if (!spotsState.singleSpot.SpotImages)
        spotsState.singleSpot.SpotImages = [];
      spotsState.singleSpot.SpotImages.push(action.spotImage);
      return spotsState;
    case DELETE_SPOT:
      delete spotsState.allSpots[action.id];
      const newState = {
        ...spotsState,
        singleSpot: { ...spotsState.singleSpot },
        allSpots: { ...spotsState.allSpots },
      };
      return newState;
    case DELETE_SPOT_IMAGE:
    default:
      return state;
  }
};

export default spotsReducer;

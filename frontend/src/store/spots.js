// action types
const GET_SPOTS = "spots/getSpots";
const GET_SPOT = "spots/getSpot";

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
    const spotObj = await res.json();
    dispatch();
  }
};

const initialState = { spots: null };

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOTS:
      const spotsState = {};
      action.spots.forEach((spot) => {
        spotsState[spot.id] = spot;
      });
      return spotsState;
    case GET_SPOT:
      return { ...state, [action.spot.id]: action.spot };
    default:
      return state;
  }
};

export default spotsReducer;

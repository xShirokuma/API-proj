import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSpotThunk,
  getSingleSpotThunk,
  getUserSpotsThunk,
} from "../../store/spots";
import SpotItem from "../SpotItem";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from "../DeleteSpotModal";

import "./ManageSpots.css";

const ManageSpots = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const userSpots = useSelector((state) => state.spots.allSpots);
  const dispatch = useDispatch();
  const history = useHistory();

  const spots = Object.values(userSpots);

  useEffect(() => {
    dispatch(getUserSpotsThunk(sessionUser));
  }, [dispatch]);

  const createNewSpot = () => {
    history.push("/spots/new");
  };

  const updateSpot = (id) => {
    console.log(id);
    history.push(`/spots/${id}/edit`);
  };

  return (
    <>
      <h1>Manage Your Spots</h1>
      <button onClick={createNewSpot}>Create a New Spot</button>
      <div className="spots-container">
        {spots.map((spot) => (
          <div>
            <SpotItem spot={spot} key={spot.id} />
            <div>
              <button onClick={() => updateSpot(spot.id)}>Update</button>
              <OpenModalButton
                buttonText="Delete"
                modalComponent={<DeleteSpotModal id={spot.id} />}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ManageSpots;

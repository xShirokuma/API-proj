import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getSingleSpot } from "../../store/spots";

import "./SpotDetails.css";

const SpotDetails = () => {
  const spotsObj = useSelector((state) => state.spots);
  const dispatch = useDispatch();
  const { id } = useParams();

  const spot = spotsObj.singleSpot;

  useEffect(() => {
    dispatch(getSingleSpot(id));
  }, [dispatch, id]);

  if (!spot) return;

  return (
    <div className="spot-details-container">
      <h2>{spot.name}</h2>
      <h3>
        {spot.city}, {spot.state}, {spot.country}
      </h3>
    </div>
  );
};

export default SpotDetails;

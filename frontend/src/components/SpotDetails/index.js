import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getSingleSpotThunk } from "../../store/spots";

import "./SpotDetails.css";

const SpotDetails = () => {
  const spotsObj = useSelector((state) => state.spots);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleSpotThunk(id));
  }, [dispatch, id]);

  const spot = spotsObj.singleSpot;
  console.log(spot);
  if (!spot) return;
  if (!spot.SpotImages) return;
  const spotImages = [...spot.SpotImages];
  console.log(spotImages);

  return (
    <div className="spot-details-container">
      <h2>{spot.name}</h2>
      <h3>
        {spot.city}, {spot.state}, {spot.country}
      </h3>
      <div className="spot-images-container">
        <div className="spot-preview-images">
          <img src={spotImages[0]?.url}></img>
        </div>
        <div className="spot-alt-images"></div>
      </div>
    </div>
  );
};

export default SpotDetails;

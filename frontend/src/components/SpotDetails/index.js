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

  if (!spot) return;
  if (!spot.SpotImages) return;
  const spotImages = [...spot?.SpotImages];
  if (!spot.Owner) return;
  const { firstName, lastName } = spot?.Owner;

  return (
    <div className="spot-details-container">
      <h2>{spot.name}</h2>
      <h3>
        {spot.city}, {spot.state}, {spot.country}
      </h3>
      <div className="spot-images-container">
        <div className="spot-preview-image">
          <img src={spotImages[0]?.url} referrerPolicy="no-referrer"></img>
        </div>
        <div className="img1">
          <img src={spotImages[1]?.url} referrerPolicy="no-referrer"></img>
        </div>
        <div className="img2">
          <img src={spotImages[2]?.url} referrerpolicy="no-referrer"></img>
        </div>
        <div className="img3">
          <img src={spotImages[3]?.url} referrerPolicy="no-referrer"></img>
        </div>
        <div className="img4">
          <img src={spotImages[4]?.url} referrerPolicy="no-referrer"></img>
        </div>
      </div>
      <div className="about-container">
        <div className="description-container">
          <h2>
            Hosted by {firstName} {lastName}
          </h2>
          <p>{spot.description}</p>
        </div>
        <div className="booking-container">
          <div className="booking-stats">
            <div className="price">${spot.price} / night</div>
            <div className="ratings-reviews-container">
              <div className="rating">
                <i className="fa-solid fa-star">{spot.avgStarRating} ·</i>
              </div>
              <div className="reviews">{spot.numReviews} reviews</div>
            </div>
          </div>
          <div className="booking-button-container">
            <button>Reserve</button>
          </div>
        </div>
      </div>
      <div className="reviews-container"></div>
    </div>
  );
};

export default SpotDetails;

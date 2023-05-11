import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import SpotIndexItem from "../SpotIndexItem";
import { getAllSpots } from "../../store/spots";

import "./SpotIndex.css";

const SpotIndex = () => {
  const spotsObj = useSelector((state) => state.spots);
  const spots = Object.values(spotsObj.allSpots);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  if (spots[0] === null) return;

  return (
    <div className="spots-container">
      {spots.map((spot) => (
        <SpotIndexItem spot={spot} key={spot.id} />
      ))}
    </div>
  );
};

export default SpotIndex;

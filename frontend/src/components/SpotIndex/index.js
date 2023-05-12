import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import SpotItem from "../SpotItem";
import { getAllSpotsThunk } from "../../store/spots";

import "./SpotIndex.css";

const SpotIndex = () => {
  const spotsObj = useSelector((state) => state.spots);
  const spots = Object.values(spotsObj.allSpots);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  if (spots[0] === null) return;

  return (
    <div className="spots-container">
      {spots.map((spot) => (
        <SpotItem spot={spot} key={spot.id} />
      ))}
    </div>
  );
};

export default SpotIndex;

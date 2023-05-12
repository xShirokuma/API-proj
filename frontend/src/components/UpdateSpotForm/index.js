import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SpotForm from "../SpotForm";
import { useDispatch, useSelector } from "react-redux";
import { getSingleSpotThunk } from "../../store/spots";

import "./UpdateSpotForm.css";

const UpdateSpotForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const allSpotsObj = useSelector((state) => state.spots.allSpots);

  const spot = allSpotsObj[id];

  useEffect(() => {
    dispatch(getSingleSpotThunk(id));
  }, [dispatch, id]);

  return (
    <div>
      <h2>Update a Spot</h2>
      <SpotForm spot={spot} formType="Update Spot" />
    </div>
  );
};

export default UpdateSpotForm;

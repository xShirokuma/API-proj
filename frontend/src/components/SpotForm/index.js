import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  createSpotThunk,
  createSpotImageThunk,
  updateSpotThunk,
} from "../../store/spots";

import "./SpotForm.css";

const SpotForm = ({ spot, formType }) => {
  // const singleSpotObj = useSelector((state) => state.spots.singleSpot);
  const dispatch = useDispatch();
  const history = useHistory();

  const [country, setCountry] = useState(spot?.country);
  const [state, setState] = useState(spot?.state);
  const [city, setCity] = useState(spot?.city);
  const [address, setAddress] = useState(spot?.address);
  const [description, setDescription] = useState(spot?.description);
  const [name, setName] = useState(spot?.name);
  const [price, setPrice] = useState(spot?.price);
  const [previewImage, setPreviewImage] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");
  const [attemptSubmitted, setAttemptSubmitted] = useState(false);

  const [errors, setErrors] = useState({});

  const validateErrors = useCallback(() => {
    const errorHandler = {};
    if (!country.length) errorHandler.country = "Country is required";
    if (!state.length) errorHandler.state = "State is required";
    if (!city.length) errorHandler.city = "City is required";
    if (!address.length) errorHandler.address = "Address is required";
    if (description.length < 30)
      errorHandler.description = "Description must be at least 30 characters";
    if (!name.length) errorHandler.name = "Name is required";
    if (price < 1 || isNaN(price)) errorHandler.price = "Price is required";

    if (formType !== "Update Spot") {
      if (!previewImage.length)
        errorHandler.preview = "Preview image is required";
    }
    if (attemptSubmitted) setErrors(errorHandler);
    if (Object.keys(errorHandler).length !== 0) {
      return false;
    } else return true;
  }, [
    attemptSubmitted,
    country,
    state,
    city,
    address,
    description,
    name,
    price,
    previewImage,
    formType,
  ]);

  useEffect(() => {
    validateErrors();
  }, [validateErrors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAttemptSubmitted(true);
    if (!validateErrors()) {
      return;
    }

    spot = {
      ...spot,
      country,
      state,
      city,
      address,
      description,
      name,
      price,
    };

    const img = {
      spotId: "",
      url: "",
      preview: true,
    };

    const spotImages = [];
    let spotId;

    if (formType === "Create Spot") {
      console.log(`spotform98: ${spot}`);
      for (const key of Object.keys(spot)) {
        console.log(`${key}: ${spot.key}`);
      }
      const newSpot = await dispatch(createSpotThunk(spot));

      console.log(`newSpot Return: ${newSpot}`);

      spotId = newSpot.id;

      img.spotId = spotId;

      //set preview img
      img.url = previewImage;
      spotImages.push({ ...img });

      //set other imgs
      img.preview = false;

      if (img1) {
        img.url = img1;
        spotImages.push({ ...img });
      }
      if (img2) {
        img.url = img2;
        spotImages.push({ ...img });
      }
      if (img3) {
        img.url = img3;
        spotImages.push({ ...img });
      }
      if (img4) {
        img.url = img4;
        spotImages.push({ ...img });
      }

      for (const spotImage of spotImages) {
        dispatch(createSpotImageThunk(spotImage, spotId));
      }
    }

    if (formType === "Update Spot") {
      dispatch(updateSpotThunk(spot));
      spotId = spot.id;
    }

    if (spotId) history.push(`/spots/${spotId}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Where's your place located?</h3>
      <h5>
        Guests will only get your exact address once they booked a reservation.
      </h5>
      <label>
        <div className="errors">{errors.country}</div>
        Country
        <input
          className="country"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </label>
      <div className="errors">{errors.address}</div>
      <label>
        Street Address
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <div className="errors">{errors.city}</div>
      <label>
        City
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      <div className="errors">{errors.state}</div>
      <label>
        State
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </label>
      <h3>Describe your place to guests</h3>
      <h4>
        Mention the best features of your space, any special amenities like fast
        wifi or parking, and what you love about the neighborhood.
      </h4>
      <textarea
        name="description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder="Please write at least 30 characters"
      ></textarea>
      <div className="errors">{errors.description}</div>
      <h3>Create a title for your spot</h3>
      <h4>
        Catch guests' attention with a spot title that highlights what makes
        your place special.
      </h4>
      <label>
        Name
        <input
          type="text"
          value={name}
          placeholder="Name of your spot"
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <div className="errors">{errors.name}</div>
      <h3>Set a base price for your spot</h3>
      <h4>
        Competitive pricing can help your listing stand out and rank higher in
        search results.
      </h4>
      <label>
        $
        <input
          type="number"
          value={price}
          placeholder="Price per night (USD)"
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <div className="errors">{errors.price}</div>
      {formType === "Create Spot" && (
        <>
          <h3>Liven up your spot with photos</h3>
          <h4>Submit a link to at least one photo to publish your spot.</h4>
          <label>
            Preview Img
            <input
              type="text"
              value={previewImage}
              placeholder="Preview Image URL"
              onChange={(e) => setPreviewImage(e.target.value)}
            />
          </label>
          <div className="errors">{errors.previewImage}</div>
          <label>
            Img1
            <input
              type="text"
              value={img1}
              placeholder="Image URL"
              onChange={(e) => setImg1(e.target.value)}
            />
          </label>
          <div className="errors">{errors.img1}</div>
          <label>
            Img2
            <input
              type="text"
              value={img2}
              placeholder="Image URL"
              onChange={(e) => setImg2(e.target.value)}
            />
          </label>
          <div className="errors">{errors.img2}</div>
          <label>
            Img3
            <input
              type="text"
              value={img3}
              placeholder="Image URL"
              onChange={(e) => setImg3(e.target.value)}
            />
          </label>
          <div className="errors">{errors.img3}</div>
          <label>
            Img4
            <input
              type="text"
              value={img4}
              placeholder="Image URL"
              onChange={(e) => setImg4(e.target.value)}
            />
          </label>
          <div className="errors">{errors.img4}</div>
        </>
      )}
      <button type="submit">{formType}</button>
    </form>
  );
};

export default SpotForm;

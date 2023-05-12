import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  createSpotThunk,
  createSpotImageThunk,
  updateSpotThunk,
} from "../../store/spots";

import "./SpotForm.css";

const SpotForm = ({ spot, formType }) => {
  const singleSpotObj = useSelector((state) => state.spots.singleSpot);
  const dispatch = useDispatch();
  const history = useHistory();

  console.log(spot);

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

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

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
      const newSpot = await dispatch(createSpotThunk(spot));
      spotId = newSpot.id;

      img.spotId = spotId;

      //set preview img
      img.url = previewImage;
      spotImages.push({ ...img });

      //set other imgs
      img.preview = false;
      console.log(`img1: ${img1}`);
      if (img1) {
        console.log(`img1 test`);
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

      console.log(spotImages);

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
        Guests will only get your exact address once they book a reservation.
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
              onChange={(e) => setPreviewImage(e.target.value)}
            />
          </label>
          <div className="errors">{errors.previewImage}</div>
          <label>
            Img1
            <input
              type="text"
              value={img1}
              onChange={(e) => setImg1(e.target.value)}
            />
          </label>
          <div className="errors">{errors.img1}</div>
          <label>
            Img2
            <input
              type="text"
              value={img2}
              onChange={(e) => setImg2(e.target.value)}
            />
          </label>
          <div className="errors">{errors.img2}</div>
          <label>
            Img3
            <input
              type="text"
              value={img3}
              onChange={(e) => setImg3(e.target.value)}
            />
          </label>
          <div className="errors">{errors.img3}</div>
          <label>
            Img4
            <input
              type="text"
              value={img4}
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

import { Link } from "react-router-dom";

import "./SpotItem.css";

const SpotItem = ({ spot }) => {
  let rating;
  if (!spot.avgRating) rating = "New";
  else rating = spot?.avgRating?.toFixed(2);

  return (
    <Link
      className="spot-link"
      title={spot.name}
      key={spot?.id}
      to={`/spots/${spot?.id}`}
    >
      <img
        src={spot?.previewImage}
        alt="preview"
        referrerPolicy="no-referrer"
      ></img>
      <div className="row-1">
        <h4>
          {spot?.city}, {spot?.state}
        </h4>
        <h4 className="rating">
          <i className="fa-solid fa-star"></i>
          {rating}
        </h4>
      </div>
      <h4>${spot?.price}</h4>
    </Link>
  );
};

export default SpotItem;

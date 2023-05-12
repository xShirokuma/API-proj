import { Link } from "react-router-dom";

import "./SpotItem.css";

const SpotItem = ({ spot }) => {
  return (
    <Link className="spot-link" key={spot.id} to={`/spots/${spot.id}`}>
      <img
        src={spot.previewImage}
        alt="preview"
        referrerPolicy="no-referrer"
      ></img>
      <div className="row-1">
        <h4>
          {spot.city}, {spot.state}
        </h4>
        <h4>{spot.avgRating}</h4>
      </div>
      <h4>${spot.price}</h4>
    </Link>
  );
};

export default SpotItem;

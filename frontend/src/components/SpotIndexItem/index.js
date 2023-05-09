import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./SpotIndexItem.css";

const SpotIndexItem = ({ spot }) => {
  const dispatch = useDispatch();
  return (
    <Link className="spot-link" to={`/spots/${spot.id}`}>
      <img src={spot.previewImage}></img>
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

export default SpotIndexItem;

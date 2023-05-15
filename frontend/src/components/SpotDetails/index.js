import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ReviewItem from "../ReviewItem";
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from "../CreateReviewModal";
import { getSingleSpotThunk } from "../../store/spots";
import { getSpotReviewsThunk } from "../../store/reviews";

import "./SpotDetails.css";
import DeleteReviewModal from "../DeleteReviewModal";

function ReviewsContainer({ numReviews, avgStarRating }) {
  return (
    <div className="reviews">
      {numReviews === 0 && "New"}
      {console.log(avgStarRating)}
      {numReviews === 1 && `${avgStarRating.toFixed(2)} · ${numReviews} Review`}
      {numReviews > 1 && `${avgStarRating.toFixed(2)} · ${numReviews} Reviews`}
    </div>
  );
}

const SpotDetails = () => {
  const state = useSelector((state) => state);
  const sessionState = state.session;
  const spotsState = state.spots;
  const reviewsState = state.reviews;
  const dispatch = useDispatch();
  const { id } = useParams();

  const spot = spotsState.singleSpot;
  const userId = sessionState?.user?.id;
  const ownerId = spot.ownerId;
  const reviews = Object.values(reviewsState.spot);

  useEffect(() => {
    dispatch(getSingleSpotThunk(id));
    dispatch(getSpotReviewsThunk(id));
  }, [dispatch, id]);

  if (!spot) return;
  if (!reviews) return;
  if (!spot.SpotImages) return;
  if (!spot.Owner) return;
  const spotImages = [...spot?.SpotImages];
  const { firstName, lastName } = spot?.Owner;

  // const numReviews = spot.numReviews;
  // let rating;
  // let numReviewsText = "";
  // if (numReviews < 1) rating = "New";
  // else {
  //   rating = spot.avgStarRating.toFixed(2);
  //   if (numReviews === 1) numReviewsText = "Review";
  //   else numReviewsText = "Reviews";
  // }

  const userIsSpotOwner = () => {
    if (userId === ownerId) return true;
    return false;
  };

  const userHasPostedReview = () => {
    if (reviews.find((review) => review.userId === userId)) return true;
    return false;
  };

  const userIsReviewOwner = (review) => {
    if (userId === review.userId) return true;
    return false;
  };

  const spotHasReviews = () => {
    return reviews.length;
  };

  const reviewButtonText = spotHasReviews()
    ? "Post Your Review"
    : "Be the first to post a review!";

  return (
    <div className="spot-details-container">
      <h2>{spot.name}</h2>
      <h3>
        {spot.city}, {spot.state}, {spot.country}
      </h3>
      <div className="spot-images-container">
        <div className="spot-preview-image">
          <img
            src={spotImages[0]?.url}
            alt="spot preview"
            referrerPolicy="no-referrer"
          ></img>
        </div>
        <div className="spot-small-img">
          <img
            src={spotImages[1]?.url}
            alt="spot alt"
            referrerPolicy="no-referrer"
          ></img>
        </div>
        <div className="spot-small-img">
          <img
            src={spotImages[2]?.url}
            alt="spot alt"
            referrerPolicy="no-referrer"
          ></img>
        </div>
        <div className="spot-small-img">
          <img
            src={spotImages[3]?.url}
            alt="spot alt"
            referrerPolicy="no-referrer"
          ></img>
        </div>
        <div className="spot-small-img">
          <img
            src={spotImages[4]?.url}
            alt="spot alt"
            referrerPolicy="no-referrer"
          ></img>
        </div>
      </div>
      <div className="about-container">
        <div className="description-container">
          <h2>
            Hosted by {firstName} {lastName}
          </h2>
          <p>{spot.description}</p>
        </div>
        <div>
          <div className="booking-container">
            <div className="booking-stats">
              <div className="price">
                <span id="price">${spot.price}</span>night
              </div>
              <div className="ratings-reviews-container">
                <div className="rating">
                  <i className="fa-solid fa-star"></i>
                </div>
                <div className="reviews">
                  <ReviewsContainer
                    numReviews={spot.numReviews}
                    avgStarRating={spot.avgStarRating}
                  />
                </div>
              </div>
            </div>
            <div className="booking-button-container">
              <button onClick={() => window.alert("Feature coming soon!")}>
                Reserve
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="reviews-container">
        <div className="ratings-reviews-container" id="review-one-forreal">
          <div className="rating">
            <i className="fa-solid fa-star"></i>
          </div>
          <ReviewsContainer
            numReviews={spot.numReviews}
            avgStarRating={spot.avgStarRating}
          />
        </div>
      </div>
      <div className="reviews-create-button">
        {sessionState.user && !userIsSpotOwner() && !userHasPostedReview() && (
          <OpenModalButton
            buttonText={reviewButtonText}
            modalComponent={<CreateReviewModal formType="Submit Your Review" />}
          />
        )}
      </div>
      <div className="all-reviews">
        {reviews.reverse().map((review) => (
          <div className={`review-container`}>
            <ReviewItem reviewObj={review} key={`reviewitem-${review.id}`} />
            {sessionState.user && userIsReviewOwner(review) && (
              <OpenModalButton
                key={`review-delete-button-${review.id}`}
                buttonText="Delete"
                modalComponent={
                  <DeleteReviewModal id={review.id} spotId={spot.id} />
                }
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpotDetails;

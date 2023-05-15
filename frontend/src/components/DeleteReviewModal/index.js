import { useDispatch } from "react-redux";

import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/reviews";
import { getSingleSpotThunk } from "../../store/spots";

import "./DeleteReviewModal.css";

const DeleteReviewModal = ({ id, spotId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const deleteReview = (id) => {
    return dispatch(deleteReviewThunk(id))
      .then(dispatch(getSingleSpotThunk(spotId)))
      .then(closeModal);
  };

  return (
    <div className="delete-review-modal">
      <h2>Confirm Delete</h2>
      <h3>Are you sure you want to delete this review?</h3>
      <button className="delete-review" onClick={() => deleteReview(id)}>
        Yes (Delete Review)
      </button>
      <button className="cancel-delete-review" onClick={() => closeModal()}>
        No (Keep Review)
      </button>
    </div>
  );
};

export default DeleteReviewModal;

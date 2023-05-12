import { useDispatch, useSelector } from "react-redux";

import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/reviews";

import "./DeleteReviewModal.css";

const DeleteReviewModal = ({ id }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const deleteReview = (id) => {
    return dispatch(deleteReviewThunk(id)).then(closeModal);
  };

  return (
    <div className="delete-review-modal">
      <h2>Confirm Delete</h2>
      <h3>Are you sure you want to delete this review?</h3>
      <button onClick={() => deleteReview(id)}>Yes (Delete Review)</button>
      <button onClick={() => closeModal()}>No (Keep Review)</button>
    </div>
  );
};

export default DeleteReviewModal;

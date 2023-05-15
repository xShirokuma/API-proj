import ReviewForm from "../ReviewForm";
import "./CreateReviewModal.css";

const CreateReviewModal = ({ formType }) => {
  const reviewObj = {
    stars: 0,
    review: "",
  };

  return (
    <div className="create-review-modal">
      <h2>How was your stay?</h2>
      <ReviewForm reviewObj={reviewObj} formType={formType} />
    </div>
  );
};

export default CreateReviewModal;

import "./ReviewItem.css";

const ReviewItem = ({ reviewObj }) => {
  if (!reviewObj) return;

  const { review, createdAt } = reviewObj;
  const { firstName, lastName } = reviewObj?.User;

  return (
    <div className="review-item">
      <div className="review-user">{firstName}</div>
      <div className="review-timestamp">{createdAt}</div>
      <div className="review-review">{review}</div>
    </div>
  );
};

export default ReviewItem;

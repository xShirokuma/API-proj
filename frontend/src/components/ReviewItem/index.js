import "./ReviewItem.css";

const ReviewItem = ({ reviewObj }) => {
  const { review, stars, createdAt } = reviewObj;
  const { firstName, lastName } = reviewObj.User;

  return (
    <div className="review-item">
      <div className="review-user">
        {firstName} {lastName}
      </div>
      <div className="review-timestamp">{createdAt}</div>
      <div className="review-review">{review}</div>
    </div>
  );
};

export default ReviewItem;

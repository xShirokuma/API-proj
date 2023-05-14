import "./ReviewItem.css";

const ReviewItem = ({ reviewObj }) => {
  if (!reviewObj) return;
  const { review, createdAt } = reviewObj;
  const { firstName } = reviewObj.User;

  const calendar = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "Septempber",
    "10": "October",
    "11": "November",
    "12": "December",
  };

  const reviewDateArr = createdAt.slice(0, 7).split("-");
  const timestamp = `${calendar[reviewDateArr[1]]} ${reviewDateArr[0]}`;

  return (
    <div className="review-item">
      <div className="review-user">{firstName}</div>
      <div className="review-timestamp">{timestamp}</div>
      <div className="review-review">{review}</div>
    </div>
  );
};

export default ReviewItem;

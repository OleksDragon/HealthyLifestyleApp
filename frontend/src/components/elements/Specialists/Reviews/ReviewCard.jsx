import { StarFill } from "../Reviews/StarFill";
import { StarEmpty } from "../Reviews/StarEmpty";
import "../Reviews/ReviewCard.css";

export const ReviewCard = ({ image, name, text, rating }) => {
  return (
    <div className="review-card">
      <div className="review-card-bg" />
      <div className="review-card-gradient" />

      <p className="review-card-text">{text}</p>

      <div className="review-card-name">{name}</div>

       <div className="review-card-stars">
        {[...Array(5)].map((_, i) =>
          i < rating ? (
            <StarFill key={i} className="review-card-star-icon" color="#D6FF00" />
          ) : (
            <StarEmpty key={i} className="review-card-star-icon" color="#D6FF00" />
          )
        )}
      </div>

      {image && <img className="review-card-image" alt={name} src={image} />}
    </div>
  );
};

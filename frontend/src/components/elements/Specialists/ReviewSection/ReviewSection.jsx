import { ReviewCard } from "../Reviews/ReviewCard";
import reviewImg1 from '../../../../assets/specialists-img/image-1.png';
import reviewImg2 from '../../../../assets/specialists-img/image.png';
import reviewImg3 from '../../../../assets/specialists-img/image-2.png';

const reviewsData = [
  {
    id: 1,
    name: "Владислав Мороз",
    text:
      "Дуже задоволений роботою тренера! Завдяки його програмі я набрав помітну м’язову масу за кілька місяців",
    rating: 5,
    image: reviewImg1, // або null, якщо нема
  },
  {
    id: 2,
    name: "Роман Бондар",
    text:
      "Робота непогана, мотивація є, але інколи не вистачає уваги до дрібних деталей",
    rating: 4,
    image: reviewImg2,
  },
  {
    id: 3,
    name: "Ірина Мельник",
    text:
      "Тренер хороший, але іноді здається, що вправ забагато для мене. Прогрес є, але повільний",
    rating: 4,
    image: reviewImg3,
  },
];
const ReviewSection = () => {
  return (
    <div className="reviews-container">
      {reviewsData.map((review) => (
        <ReviewCard
          key={review.id}
          name={review.name}
          text={review.text}
          rating={review.rating}
          image={review.image}
        />
      ))}
    </div>
  );
};

export default ReviewSection;
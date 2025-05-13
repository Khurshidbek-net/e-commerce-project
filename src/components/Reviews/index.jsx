// ReviewCard.jsx
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import './Review.scss'
import { GreenTickIcon } from '../../assets/icons';
const ReviewCard = ({reviews}) => {
  const { name, rating, date, review } = reviews;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div  className='review-card'>
      <div className='review-stars'>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} color="gold" />
        ))}
        {hasHalfStar && <FaStarHalfAlt color="gold" />}
      </div>
      <div className='review-header'>
        <strong>{name}</strong>
        <GreenTickIcon color='green' className='verified-icon' />
      </div>
      <p className='review-text'>"{review}"</p>
      <p className='review-date'>Posted on {date}</p>
    </div>
  );
};

export default ReviewCard;

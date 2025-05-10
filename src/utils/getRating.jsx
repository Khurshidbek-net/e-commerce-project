import { FaStar, FaStarHalf } from 'react-icons/fa';
export const getRating = (rating) => {
  const res = [];

  for (let i = 0; i < Math.floor(rating); i++) {
    res.push(
      <FaStar
        color="gold"
        key={`full-${i}`}
        className="product-rating-star"
      />
    );
  }

  if (rating % 1 > 0.4) {
    res.push(
      <FaStarHalf
        color="gold"
        key="half"
        className="product-rating-star"
      />
    );
  }
  return res;
};


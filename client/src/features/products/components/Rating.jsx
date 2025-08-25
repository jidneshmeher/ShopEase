import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

export default function Rating({ rating = 0}) {
  
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push(<FaStar key={i} className="text-yellow-400" />);
      else if (rating > i - 1 && rating < i) stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      else stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
    return stars;
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex space-x-1">{renderStars()}</div>
    </div>
  );
};
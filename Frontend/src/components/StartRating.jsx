import React from 'react';

const StarRating = ({ averageRating }) => {
  const roundedRating = Math.round(averageRating * 2) / 2; // Round to nearest 0.5
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const renderStars = () => {
    const stars = [];

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="text-yellow-400">&#9733;</span>); // Filled star
    }

    // Half star
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">&#9733;<span style={{ position: 'absolute', overflow: 'hidden', width: '0.5em' }}>&#9734;</span></span>); // Half star using overlay
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">&#9734;</span>); // Empty star
    }

    return stars;
  };

  return (
    <div className="flex items-center">
      {renderStars()}
      <span className="ml-2 text-sm text-gray-600">({averageRating})</span>
    </div>
  );
};

export default StarRating;
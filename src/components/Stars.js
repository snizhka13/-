import React, { useState } from 'react';

const StarRating = () => {
  const [rating, setRating] = useState(0); 
  const [hover, setHover] = useState(0); 

  return (
    <div className="container4">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input 
              type="radio" 
              name="rating" 
              value={ratingValue} 
              onClick={() => setRating(ratingValue)}
              style={{ display: 'none' }}
            />
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill={ratingValue <= (hover || rating) ? "#ffe75f" : "#faf6d1 "}
              xmlns="http://www.w3.org/2000/svg"
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
              style={{ cursor: 'pointer' }}
            >
              <path d="M12 .587l3.668 7.431L23 9.587l-5.5 5.362L18.98 23 12 19.412 5.02 23l1.48-8.051L1 9.587l7.332-1.569L12 .587z" />
            </svg>
          </label>
        );
      })}
      <p style={{color: "rgb(118, 118, 118)", fontWeight: 500}}>Твоя оцінка - {rating}</p>
    </div>
  );
}

export default StarRating;

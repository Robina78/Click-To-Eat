import React from 'react';
import "./RestaurantRating.css";
import Rating from 'react-rating';

export default function RestaurantRating({restaurant}) {
    return (
        <div className="rating">
           <Rating
                emptySymbol="far fa-star"
                fullSymbol="fas fa-star"
                style={{color: "red", fontSize: "17px"}}
                fractions={2}
                readonly
                initialRating={restaurant.rating}
            /> 
            <p  className="mt-3" style={{fontSize:'13px'}}>{restaurant.review_count} Reviews</p>
        </div>
    );
}

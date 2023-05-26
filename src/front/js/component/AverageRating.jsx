import React from 'react';
import ReactStars from "react-rating-stars-component";

export function calculateAverageRating(reviews) {
    const totalReviews = reviews.length;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

    return averageRating;
}

const AverageRating = ({ reviews }) => {
    const averageRating = calculateAverageRating(reviews);

    return (

            <div className="card card-filter p-2" style={{width: "18rem"}}>
                <h6>Valoración media</h6>
                <ReactStars
                    count={5}
                    size={24}
                    activeColor="#ffd700"
                    color="#ddd"
                    edit={false}
                    isHalf={true}
                    value={averageRating}
                />
                <p>{averageRating.toFixed(2)} estrellas (de {reviews.length} opiniones)</p>
            </div>

    );
};

export default AverageRating;

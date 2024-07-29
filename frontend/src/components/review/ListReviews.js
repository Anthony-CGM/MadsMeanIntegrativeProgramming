import React from 'react'
const ListReviews = ({ reviews }) => {
    return (
        <div className="reviews w-75">
            <h1>Other's Reviews:</h1>
            <hr/>
            {reviews && reviews.map(review => (
                
                <div key={review._id} class="review-card my-3">
                    <h2 className="review_comment">Comment: {review.comment}</h2>
                    <div className="rating-outer">
                        <div className="rating-inner" style={{ width: `${(review.rating / 5) * 100}%` }}></div>
                    </div>
                    <p className="review_user">by {review.name}</p>
                    <hr />
                </div>
            ))}
        </div>
    )
}

export default ListReviews
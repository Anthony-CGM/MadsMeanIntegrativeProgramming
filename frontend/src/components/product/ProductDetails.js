import React, { Fragment, useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import { useParams } from 'react-router-dom';

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ListReviews from '../review/ListReviews';


import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, clearErrors, newReview } from '../../actions/productActions'
import { addItemToCart } from '../../actions/cartActions'
import { NEW_REVIEW_RESET } from '../../constants/productConstants'
const ProductDetails = () => {
    const dispatch = useDispatch();
    let { id } = useParams();
    const [quantity, setQuantity] = useState(1)
    const { loading, error, product } = useSelector(state => state.productDetails);
    const { error: reviewError, success } = useSelector(state => state.newReview)
    const { user } = useSelector(state => state.auth)
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const notify = (error = '') => toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER
    });
    const successMsg = (message = '') => toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });
    useEffect(() => {
        dispatch(getProductDetails(id))
        if (error) {
            notify(error)
            dispatch(clearErrors())
        }
        if (reviewError) {
            dispatch(clearErrors())
        }
        if (success) {
            successMsg('Review posted successfully')
            dispatch({ type: NEW_REVIEW_RESET })
        }
    }, [dispatch, error, reviewError, success, id]);

    const increaseQty = () => {
        const count = document.querySelector('.count')
        if (count.valueAsNumber >= product.stock) return;
        const qty = count.valueAsNumber + 1;
        setQuantity(qty)
    }
    const decreaseQty = () => {
        const count = document.querySelector('.count')
        if (count.valueAsNumber <= 1) return;
        const qty = count.valueAsNumber - 1;
        setQuantity(qty)
    }
    const addToCart = () => {
        dispatch(addItemToCart(id, quantity));
        // alert.success('Item Added to Cart')

        toast.success('Item added to cart!', {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 2000
          });
    }
    function setUserRatings() {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.starValue = index + 1;
            ['click', 'mouseover', 'mouseout'].forEach(function (e) {
                star.addEventListener(e, showRatings);
            })
        })

        function showRatings(e) {
            stars.forEach((star, index) => {
                if (e.type === 'click') {
                    if (index < this.starValue) {
                        star.classList.add('orange');
                        setRating(this.starValue)
                    } else {
                        star.classList.remove('orange')
                    }
                }
                if (e.type === 'mouseover') {
                    if (index < this.starValue) {
                        star.classList.add('yellow');
                    } else {
                        star.classList.remove('yellow')
                    }
                }
                if (e.type === 'mouseout') {
                    star.classList.remove('yellow')
                }
            })
        }
    }
    const reviewHandler = () => {
        const formData = new FormData();
        formData.set('rating', rating);
        formData.set('comment', comment);
        formData.set('productId', id);
        dispatch(newReview(formData));
    }
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={product.name} />

                    <div className="row d-flex justify-content-around image-zoom">
                        <div className="col-6 col-lg-3 img-fluid" id="product_image" style={{ marginTop: "10%", left: "10%", background: 'linear-gradient(to bottom right, rgba(255, 105, 180, 0.5), rgba(0, 191, 255, 0.5))', borderRadius: "20px" }} >
                            <br />
                            <Carousel pause='hover'>
                                {product.images && product.images.map(image => (
                                    <Carousel.Item key={image.public_id}>
                                        <img className="d-block w-100 border" src={image.url} alt={product.title} />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                            <hr color='white' style={{ height: "5px" }} />

                            <strong><h4 className="mt-2 inline-flex">Description:</h4></strong>
                            <p>{product.description}</p>
                            <hr color='white' style={{ height: "5px" }} />
                            <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

                            <hr color='white' style={{ height: "5px" }} />
                        </div>
                        <div className="col-12 col-lg-5 mt-5" style={{ right: "5%" }} >

                            <h3 style={{ marginTop: "20%", fontSize: "40px" }}>{product.name}</h3>
                            <p id="product_id" style={{ fontSize: "20px" }} >Product # {product._id}</p>

                            <hr color='white' style={{ height: "5px" }} />

                            <div className="rating-outer" >
                                <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                            </div>
                            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                            <hr color='white' style={{ height: "5px" }} />

                            <p id="product_price">₱{product.price}</p>


                            {user && user.role === "user" && (
                                <div className="stockCounter d-inline">
                                    <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                                    <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                    <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                                </div>
                            )}

                            {user && user.role === "user" && (
                                <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" onClick={addToCart} >Add to Cart</button>
                            )}

                            <hr color='white' style={{ height: "5px" }} />
                            <p style={{ fontSize: "20px" }}>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'} >{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

                            <hr color='white' style={{ height: "5px" }} />


                            {user ? <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal" onClick={setUserRatings}>
                                Submit Your Review

                            </button>
                                :
                                <div className="alert alert-danger mt-5" type='alert'>Login to purchase and post your review.</div>
                            }


                            {product.reviews && product.reviews.length > 0 && (
                                <div>
                                    <br /><br /><br />

                                    <ListReviews reviews={product.reviews} />
                                </div>
                            )}




                            <div className="row mt-2 mb-5">
                                <div className="rating w-50">

                                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <ul className="stars" >
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                    </ul>

                                                    <textarea
                                                        name="review"
                                                        id="review" className="form-control mt-3"
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    >

                                                    </textarea>

                                                    <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close" onClick={reviewHandler}>Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* {product.reviews && product.reviews.length > 0 && (

                            <ListReviews reviews={product.reviews} />

                        )} */}
                    </div>

                </Fragment>
            )
            }
        </Fragment >
    )

}

export default ProductDetails
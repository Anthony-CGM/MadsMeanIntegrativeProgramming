import React, { Fragment, useState, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'
import Toast from '../layout/Toast'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { getProductReviews, deleteReview, clearErrors } from '../../actions/productActions'
// import { getProductReviews, clearErrors,  } from '../../actions/productActions'
import { DELETE_REVIEW_RESET } from '../../constants/productConstants'


const ProductReviews = () => {
    const [productId, setProductId] = useState('')
    const dispatch = useDispatch();
    
    const { error, reviews } = useSelector(state => state.productReviews);
    const { isDeleted, error: deleteError } = useSelector(state => state.review)

    useEffect(() => {
        if (error) {
            Toast('error fetching reviews', 'error')
            dispatch(clearErrors())
        }

        if (deleteError) {
            Toast(deleteError, 'error');
            dispatch(clearErrors())
        }

        if (productId !== '') {
            dispatch(getProductReviews(productId))
        }

        if (isDeleted) {
            Toast('Review deleted successfully', 'success');
            dispatch({ type: DELETE_REVIEW_RESET })
        }



        }, [dispatch, error, productId, isDeleted, deleteError])
    

    const deleteReviewHandler = (id) => {
        Swal.fire({
            title: 'Delete Review',
            icon: 'info',
            text: 'Do you want to delete this review?',
            confirmButtonText: 'Delete',
            showCancelButton: true
          }).then((result) => {
            if (result.isConfirmed){
                dispatch(deleteReview(id, productId))
            }
          })
       
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getProductReviews(productId))
    }

    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Review ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        reviews.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.name,

                actions:
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteReviewHandler(review._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                   







                   
            })
        })

        return data;
    }

    return (
        <Fragment>
            <MetaData title={'Product Reviews'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-9" style={{ marginTop: "10%", marginBottom: "10%"}}>
                    <Fragment>
                        <div className="row justify-content-center mt-5" >
                            <div className="col-5" style={{background: 'linear-gradient(to bottom right, rgba(255, 105, 180, 0.5), rgba(0, 191, 255, 0.5))', borderRadius:"10px", height:"200px", width:"250px"}}
>
                                <form onSubmit={submitHandler}>
                                    <div className="form-group">
                                        <br/>
                                        <label htmlFor="productId_field" >Enter Product ID</label>
                                        <input
                                            type="text"
                                            id="productId_field"
                                            className="form-control"
                                            value={productId}
                                            onChange={(e) => setProductId(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        id="search_button"
                                        type="submit"
                                        className="btn btn-primary btn-block py-2"
                                        style={{ backgroundImage:"radial-gradient(circle, #87CEFA, #FFC0CB)", border:"solid 3px"}}

                                    >
                                        SEARCH
                                    </button>
                                </ form>
                            </div>
                        </div>
                       {reviews && reviews.length > 0 ? (
                            <MDBDataTable
                                data={setReviews()}
                                className="px-3"
                                style={{color:"white" , border: "5px solid", background: 'linear-gradient(to bottom right, rgba(255, 105, 180, 0.5), rgba(0, 191, 255, 0.5))' }}
                                bordered
                                striped
                                // hover
                            />
                        ) : (
                            <p className="mt-5 text-center">No Reviews.</p>
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

export default ProductReviews
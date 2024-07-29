import React, { Fragment } from 'react'
import { Link } from "react-router-dom";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBRipple,
  MDBBtn,
} from "mdb-react-ui-kit";

const Product = ({ product }) => {

  return (

    <MDBCol md="12" lg="4" className="col-sm-10 col-md-4 col-lg-4 my-0 " style={{ paddingTop: "2%" }}>
      <br></br>


      <MDBCard className='border' style={{ background: 'linear-gradient(to bottom right, rgba(255, 105, 180, 0.5), rgba(0, 191, 255, 0.5))' }}>
        <div className="d-flex justify-content-center bg-gradient align-items-center" style={{ backgroundImage: 'radial-gradient(circle, #87CEFA, #FFC0CB)' }}>
          <h5 className="medium text-dark mb-0 text-center">
            Category: {product.category}
          </h5>

        </div>

        <div className='px-2'>
          <div class="image-zoom">

            <MDBCardImage
              src={product.images[0].url}
              position="bottom"
              height="200px"
              alt="product"
            />
          </div>
        </div>

        <MDBCardBody>
          <div className="d-flex justify-content-between">
          </div>
          <div className="d-flex justify-content-around mb-1">
            <h5 className="text-white mb-0">{product.name}</h5>
            <h5 className="text-white mb-0 ">₱{product.price}</h5>
          </div>

        </MDBCardBody>
        <div class="d-flex justify-content-between mb-2">
          <p class="text-white mb-0">
            Available: <span class="fw-bold">{product.stock}</span>
          </p>
          <div className="ratings mt-auto ">
            <div className="rating-outer text-white mb-0">
              <div
                className="rating-inner text-white mb-0"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews mb-0" >({product.numOfReviews} review/s)</span>
          </div>
        </div>
        <div class="image-zoom">
          <Link to={`product/${product._id}`} id="view_btn" className="btn btn-block d-flex justify-content-center bg-gradient align-items-center" style={{ backgroundImage: 'radial-gradient(circle, #87CEFA, #FFC0CB)' }} >
            View Details
          </Link>
        </div>
      </MDBCard>
    </MDBCol>
  );
};

export default Product
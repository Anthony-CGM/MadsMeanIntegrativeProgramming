import React, { Fragment } from 'react'
import Loader from '../layout/Loader'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, removeItemFromCart } from '../../actions/cartActions'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import Toast from '../layout/Toast'

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
const Cart = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { cartItems } = useSelector(state => state.cart)
    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (newQty > stock) return;
        dispatch(addItemToCart(id, newQty))
    }
    const decreaseQty = (id, quantity) => {
        const newQty = quantity - 1;
        if (newQty <= 0) return;
        dispatch(addItemToCart(id, newQty))
    }

    const removeCartItemHandler = (id) => {
        Swal.fire({
            title: 'Delete Item from Cart',
            icon: 'info',
            text: 'Do you want to delete this item?',
            confirmButtonText: 'Delete',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(removeItemFromCart(id))
                Toast('Item selected from cart deleted successfully', 'success');
            }
        })

    }

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping')
    }

    return (
        <Fragment>
            <br></br> <br></br>
            <br></br> <br></br>
            <br></br> <br></br>
            <MetaData title={'Your Cart'} />
            {cartItems.length === 0 ? <h2 className="col-1 col-lg-6" style={{ position: "absolute", textAlign: "center", marginTop: "5%", left: "53%", transform: "translate(-50%,-50%)", background: 'linear-gradient(to bottom right, rgba(255, 105, 180, 0.5), rgba(0, 191, 255, 0.5))', borderRadius: "20px" }}>No product/s selected for purchase, hurry grab one now!</h2> : (
                <Fragment>
                    <div className="row d-flex justify-content-between w-75">
                        <div className="col-1 col-lg-8" style={{ position: "absolute", left: "20%", background: 'linear-gradient(to bottom right, rgba(255, 105, 180, 0.5), rgba(0, 191, 255, 0.5))', borderRadius: "20px" }}>
                            {/* <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2> */}
                            {cartItems.map(item => (
                                <Fragment key={item.product}>
                                    <hr color='white' style={{ height: "5px" }} />
                                    <div className="cart-item" >
                                        <div className="row">
                                            <div className="col-4 col-lg-3" >
                                                <img src={item.image} alt="Laptop" height="180" width="250" />
                                            </div>
                                            <div className="col-5 col-lg-3" style={{ color: 'white', fontSize: "25px" }}>
                                                <Link style={{ color: "white" }} to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>
                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price" style={{ fontSize: "40px" }} >₱{item.price}</p>
                                            </div>
                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">
                                                    <span className="btn btn-danger minus" style={{ fontSize: "30px" }} onClick={() => decreaseQty(item.product, item.quantity)}>-</span>

                                                    <input type="number" className="form-control count d-inline" style={{ fontSize: "40px" }} value={item.quantity} readOnly />
                                                    <span className="btn btn-primary plus" style={{ fontSize: "30px" }} onClick={() => increaseQty(item.product, item.quantity, item.stock)}>+</span>

                                                </div>
                                            </div>
                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                {/* <i id="delete_cart_item" className="fa fa-trash btn btn-danger" style={{ fontSize: "50px" }} onClick={() => removeCartItemHandler(item.product)}></i> */}
                                                <i id="delete_cart_item" className="fa fa-trash btn btn-danger" style={{ fontSize: "50px" }} onClick={() => {
                                                    // if (window.confirm("Are you sure you want to delete this item?")) {
                                                        removeCartItemHandler(item.product);
                                                    // }
                                                }}>
                                                </i>
                                            </div>
                                        </div>
                                    </div>
                                    <hr color='white' style={{ height: "5px" }} />
                                </Fragment>
                            ))}
                        </div>

                        {/* <div className="col-9 col-lg-3 my-1"> */}
                        {/* <summary></summary> */}
                        {/* <div id="order_summary" style={{ border: "solid 3px", borderRadius: "20px", background: 'linear-gradient(to bottom right, rgba(255, 105, 180, 0.5), rgba(0, 191, 255, 0.5))', borderRadius: "20px" }} >
                                <h2>Your Cart: <b>{cartItems.length} items</b></h2>
                                <hr color='white' style={{ height: "5px" }} />
                                <h4>Order Summary</h4>
                                <hr color='white' style={{ height: "5px" }} />
                                <h4><p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (Units)</span></p></h4>
                                <h4><p>Est. total: <span className="order-summary-values">₱{cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</span></p></h4>
                                <hr color='white' style={{ height: "5px" }} />
                                <button id="checkout_btn" className="btn btn-block d-flex justify-content-center bg-gradient align-items-center" style={{ backgroundImage: 'radial-gradient(circle, #87CEFA, #FFC0CB)', border: 'solid 3px', borderColor: 'white', color: 'white' }} onClick={checkoutHandler} >Check out</button>
                            </div> */}
                        <div className="col-9 col-lg-3 my-1">

                            <div id="order_summary" class="book">
                                <h3 style={{ paddingLeft: "10px" }}>Your Cart: <b>{cartItems.length} items</b></h3>
                                <hr color='white' style={{ height: "5px" }} />
                                <h4 style={{ paddingLeft: "10px" }}>Order Summary</h4>
                                <hr color='white' style={{ height: "5px" }} />
                                <h4 style={{ paddingLeft: "10px" }}><p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (Units)</span></p></h4>
                                <h4 style={{ paddingLeft: "10px" }}><p>Est. total: <br /> <span className="order-summary-values">₱{cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</span></p></h4>
                                <br />
                                <hr color='white' style={{ height: "5px" }} />
                                <button id="checkout_btn" className="btn btn-block d-flex justify-content-center bg-gradient align-items-center" style={{ backgroundImage: 'radial-gradient(circle, #87CEFA, #FFC0CB)', border: 'solid 3px', borderColor: 'white', color: 'white' }} onClick={checkoutHandler} >Check out</button>

                                <div class="cover" style={{ backgroundImage: "radial-gradient(circle, #87CEFA, #FFC0CB)", border: "solid 3px" }}>
                                    <h2>Check out now!</h2>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* </div> */}
                </Fragment>
            )
            }
        </Fragment >
    )
}

export default Cart


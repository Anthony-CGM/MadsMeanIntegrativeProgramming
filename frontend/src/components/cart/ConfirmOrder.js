import React, { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import { useSelector } from 'react-redux'

const ConfirmOrder = () => {
    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)
    let navigate = useNavigate();
    // Calculate Order Prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shippingPrice = itemsPrice > 200 ? 0 : 25
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2))
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)

    const processToPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            shippingPrice,
            taxPrice,
            totalPrice
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate('/payment')
    }
    return (
        <Fragment>
            <MetaData title={'Confirm Order'} />
            <CheckoutSteps shipping confirmOrder />
            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-7 mt-5 order-confirm w-75" style={{ position: "absolute", left: "27%", background: 'linear-gradient(to bottom right, rgba(255, 105, 180, 0.5), rgba(0, 191, 255, 0.5))', borderRadius: "20px" }}>
                    <br />
                    <h1 className="mb-3"><b>Shipping Info</b></h1>
                    <hr color='white' style={{ height: "5px" }} />
                    <h3><p><b>Customer Name:</b> {user && user.name}</p></h3>
                    <h3><p><b>Phone:</b> {shippingInfo.phoneNo}</p></h3>
                    <h3><p className="mb-4"><b>Address:</b> {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}</p></h3>
                    <hr color='white' style={{ height: "5px" }} />

                    <b><h3 className="mt-4">Your Cart Items:</h3></b>
                    {cartItems.map(item => (
                        <Fragment key={item.product}>
                            <hr color='white' style={{ height: "5px" }} />
                            <div className="cart-item my-1" >
                                <div className="row">
                                    <div className="col-4 col-lg-3">
                                        <img src={item.image} alt="Laptop" height="180" width="250" />
                                    </div>
                                    <div className="col-5 col-lg-3" style={{ color: 'white', fontSize: "20px" }}>
                                        <Link style={{ color: "white" }} to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>

                                    <div className="col-4 col-lg-6 mt-4 mt-lg-0" style={{ color: 'white', fontSize: "30px" }}>
                                        <p>{item.quantity} x ₱{item.price} = <b>₱{(item.quantity * item.price).toFixed(2)}</b></p>
                                    </div>
                                </div>
                            </div>
                            <hr color='white' style={{ height: "5px" }} />
                        </Fragment>

                    ))}
                </div>



                <div className="col-9 col-lg-3 my-5">
                    <div id="order_summary" style={{ border: "solid 3px", borderRadius: "20px", background: 'linear-gradient(to bottom right, rgba(255, 105, 180, 0.5), rgba(0, 191, 255, 0.5))' }}>
                        <h2><b>Order Summary</b></h2>
                        <hr color='white' style={{ height: "5px" }} />
                        <h4><p>Subtotal:  <span className="order-summary-values">₱{itemsPrice}</span></p></h4>
                        <h4><p>Shipping: <span className="order-summary-values">₱{shippingPrice}</span></p></h4>
                        <h4><p>Tax:  <span className="order-summary-values">₱{taxPrice}</span></p></h4>
                        <hr color='white' style={{ height: "5px" }} />
                        <h4><p>Total: <span className="order-summary-values">₱{totalPrice}</span></p></h4>
                        <hr color='white' style={{ height: "5px" }} />
                        <button id="checkout_btn" className="btn btn-primary btn-block" onClick={processToPayment}>Proceed to Payment</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ConfirmOrder


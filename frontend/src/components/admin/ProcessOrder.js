import React, { Fragment, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, updateOrder, clearErrors } from '../../actions/orderActions'
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants'

const ProcessOrder = () => {
    const [status, setStatus] = useState('');
    const dispatch = useDispatch();
    let { id } = useParams();
    const { loading, order = {} } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order
    const { error, isUpdated } = useSelector(state => state.order)
    const orderId = id;
    const errMsg = (message = '') => toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });

    const successMsg = (message = '') => toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });

    useEffect(() => {
        dispatch(getOrderDetails(orderId))
        if (error) {
            errMsg(error);
            dispatch(clearErrors())
        }

        if (isUpdated) {
            successMsg('Order updated successfully');
            dispatch({ type: UPDATE_ORDER_RESET })
        }

    }, [dispatch, error, isUpdated, orderId])

    const updateOrderHandler = (id) => {

        const formData = new FormData();
        formData.set('status', status);
        dispatch(updateOrder(id, formData))
    }

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

    return (
        <Fragment>
            <MetaData title={`Process Order # ${order && order._id}`} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10" style={{ marginTop: "10%" }}>
                    <Fragment>
                        {loading ? <Loader /> : (
                            <div className="row d-flex ">
                                <div className="col-12 col-lg-7 order-details" style={{fontSize:"20px", background: 'linear-gradient(to bottom right, rgba(255, 105, 180, 0.5), rgba(0, 191, 255, 0.5))', borderRadius:"30px", marginBottom:"5%"}}>
                                   <br/>
                                    <h2 className="my-2">Order # {order._id}</h2>
                                    <hr color='white' style={{ height: "5px" }} />

                                    <h4 className="mb-4">Shipping Info</h4>
                                    <p><b>Name:</b> {user && user.name}</p>
                                    <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                                    <p className="mb-4"><b>Address:</b> {shippingDetails}</p>
                                    <p><b>Amount:</b> ₱{totalPrice}</p>

                                    <hr color='white' style={{ height: "5px" }} />
                                    <div className='row my-2'>
                                        <div className="col-4 col-lg-2">
                                            <h4 className="my-4">Payment</h4>
                                            <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "PAID" : "NOT PAID"}</b></p>
                                        </div>

                                        <div className="col-5 col-lg-5">
                                            <h4 className="my-4">Stripe ID</h4>
                                            <p><b>{paymentInfo && paymentInfo.id}</b></p>
                                        </div>

                                        <div className="col-5 col-lg-5 " >
                                            <h4 className="my-4">Order Status:</h4>
                                            <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>
                                        </div>
                                    </div>
                                    <hr color='white' style={{ height: "5px" }} />

                                    <h4 className="my-4">Order Items:</h4>
                                    <hr color='white' style={{ height: "5px" }} />
                                    <div className="cart-item my-1">
                                        {orderItems && orderItems.map(item => (
                                            <div key={item.product} className="row my-5">
                                                <div className="col-4 col-lg-2">
                                                    <img src={item.image} alt={item.name} height="45" width="65" />
                                                </div>

                                                <div className="col-5 col-lg-5">
                                                    <Link style={{color:"white"}} to={`/products/${item.product}`}>{item.name}</Link>
                                                </div>

                                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                    <p>₱{item.price}</p>
                                                </div>

                                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                    <p>{item.quantity} Piece(s)</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <hr />
                                </div>

                                <div style={{marginLeft:"30px",borderRadius:"30px", paddingLeft:"20px",paddingRight:"20px", height:"200px", width:"420px", background: 'linear-gradient(to bottom right, rgba(255, 105, 180, 0.5), rgba(0, 191, 255, 0.5))', border:"solid 3px"  }}
>
                                    <h4 className="my-4">Status</h4>
                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            name='status'
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>

                                    <button className="btn btn-primary btn-block" style={{ backgroundImage:"radial-gradient(circle, #87CEFA, #FFC0CB)", border:"solid 3px"}} onClick={() => updateOrderHandler(order._id)}>
                                        Update Status
                                    </button>
                                </div>
                            </div>
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

export default ProcessOrder
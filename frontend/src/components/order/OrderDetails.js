import React, { Fragment, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';


// import { useAlert } from "react-alert";

import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, clearErrors } from '../../actions/orderActions';

const OrderDetails = () => {
    //   const alert = useAlert();

    const dispatch = useDispatch();

    const { loading, error, order = {} } = useSelector(
        (state) => state.orderDetails
    );

    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        user,
        totalPrice,
        orderStatus,
    } = order;

    let { id } = useParams();

    useEffect(() => {
        dispatch(getOrderDetails(id));

        if (error) {
            //   alert.error(error);

            dispatch(clearErrors());
        }
    }, [dispatch, error, id]);

    const shippingDetails =
        shippingInfo &&
        `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

    const isPaid =
        paymentInfo && paymentInfo.status === 'succeeded' ? true : false;

    const pdfExportComponent = useRef(null);
    const contentArea = useRef(null);

    const handleExportWithMethod = (event) => {
        const contentElement = contentArea.current;
        // Set the font color of the content to black
        contentElement.style.color = "black";
        // Call the savePDF function with the updated content element
        savePDF(contentElement, { paperSize: "A4", scale: 0.6 });
    };
    // const handleExportWithMethod = (event) => {
    //     const contentArea = document.getElementById('contentArea'); // get the content area element
    //     contentArea.style.backgroundColor = 'black'; // set the background color to black
    //     savePDF(contentArea, { paperSize: "A4", scale: 0.6 }); // export the PDF
    //   };

    return (
        <Fragment>
            <MetaData title={'Order Details'} />
            {loading ? (
                <Loader />
            ) : (
                <Fragment>

                    <div className='container'>

                        <div className='app-content'>
                            <PDFExport ref={pdfExportComponent} paperSize="A4">
                                <div ref={contentArea}>
                                    <div className="receipt-body" style={{ marginTop: "120px", fontSize: "20px", background: 'linear-gradient(to bottom right, rgba(255, 105, 180, 0.5), rgba(0, 191, 255, 0.5))', borderRadius: "30px", marginBottom: "5%" }}>
                                        <br />
                                        <div className="receipt-header">
                                            <h1 className="text-center"><b>Official Receipt</b></h1>
                                            <p className="text-center">Order # {order._id}</p>

                                        </div>
                                        <hr color='white' style={{ height: "5px" }} />

                                        <div className="row mb-4 ">
                                            <div className="col-6">
                                                <h4 style={{ marginLeft: "20px" }}>Shipping Information:</h4>
                                                <p style={{ marginLeft: "40px" }}>
                                                    <strong>Name:</strong> {user && user.name}
                                                </p>
                                                <p style={{ marginLeft: "40px" }}>
                                                    <strong>Phone:</strong> {shippingInfo && shippingInfo.phoneNo}
                                                </p>
                                                <p style={{ marginLeft: "40px" }}>
                                                    <strong>Address:</strong> {shippingDetails}
                                                </p>
                                            </div>

                                            <div className="col-6">
                                                <h4 style={{ marginLeft: "20px" }}>Payment Information:</h4>
                                                <p style={{ marginLeft: "50px" }}>
                                                    <strong>Payment Status:</strong> {isPaid ? 'Paid' : 'Not Paid'}
                                                </p>
                                                <p style={{ marginLeft: "50px" }}>
                                                    <strong>Total Amount:</strong> ₱{totalPrice}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-12">
                                                <hr color='white' style={{ height: "5px" }} />
                                                <h4 className="text-center">Ordered Items</h4>
                                                <hr color='white' style={{ height: "5px" }} />
                                            </div>
                                        </div>

                                        {orderItems &&
                                            orderItems.map((item) => (
                                                <div className="row mb-3" key={item.product}>
                                                    <div className="col-2 text-center">
                                                        <img src={item.image} alt={item.name} height="120" width="150" style={{ marginLeft: "30px" }} />
                                                    </div>
                                                    <div className="col-6">
                                                        <h5 style={{ marginLeft: "40px" }}>{item.name}</h5>

                                                        <p style={{ marginLeft: "40px" }}>Price: ₱{item.price}</p>
                                                        <p style={{ marginLeft: "40px" }}>Quantity: {item.quantity}</p>
                                                    </div>
                                                    <div className="col-4 text-right" style={{ marginLeft: "-30px" }}>
                                                        <p>Subtotal: ₱{item.quantity * item.price}</p>
                                                    </div>
                                                </div>
                                            ))}

                                        <div className="row">
                                            <div className="col-12 text-right">
                                                <hr color='white' style={{ height: "5px" }} />
                                                <h4 >Total: ₱{totalPrice}</h4>
                                                <hr color='white' style={{ height: "5px" }} />

                                            </div>

                                        </div>

                                        <div className="receipt-footer mt-5">
                                            <p className="text-center">
                                                Thank you for your purchase!
                                                <br />
                                                TechDepot est. 2023
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </PDFExport>
                        </div>

                        <button style={{ fontSize: "25px", marginLeft: "470px", backgroundImage: "radial-gradient(circle, #87CEFA, #FFC0CB)", border: "solid 3px", borderColor: "white", color: "white" }}
                            onClick={handleExportWithMethod}>Export as pdf</button>

                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default OrderDetails;
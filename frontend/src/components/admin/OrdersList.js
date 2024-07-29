
import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'
import Toast from '../layout/Toast'


import {
    allOrders,
    clearErrors,
    deleteOrder,
} from "../../actions/orderActions";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrdersList = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { loading, error, orders } = useSelector((state) => state.allOrders);
    const { isDeleted } = useSelector((state) => state.order);
    const errMsg = (message = "") =>
        toast.error(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    const successMsg = (message = "") =>
        toast.success(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    useEffect(() => {
        dispatch(allOrders());
        if (error) {
            errMsg(error);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            // successMsg("Order deleted successfully");
            navigate("/admin/orders");
            Toast('Order Deleted Successfully', 'success');
            dispatch({ type: DELETE_ORDER_RESET });
        }
    }, [dispatch, error, navigate, isDeleted]);

    const deleteOrderHandler = (id) => {
        Swal.fire({
            title: 'Delete Order',
            icon: 'info',
            text: 'Do you want to delete this order?',
            confirmButtonText: 'Delete',
            showCancelButton: true
          }).then((result) => {
            if (result.isConfirmed){
                dispatch(deleteOrder(id))
            }
          })
       
    }

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: "Order ID",
                    field: "id",
                    sort: "asc",
                },

                {
                    label: "No of Items",
                    field: "numofItems",
                    sort: "asc",
                },

                {
                    label: "Amount",
                    field: "amount",
                    sort: "asc",
                },

                {
                    label: "Status",
                    field: "status",
                    sort: "asc",
                },

                {
                    label: "Actions",
                    field: "actions",
                },
            ],
            rows: [],
        };

        orders.forEach((order) => {
            data.rows.push({
                id: order._id,
                numofItems: order.orderItems.length,
                amount: `₱${order.totalPrice}`,

                status:
                    order.orderStatus &&
                        String(order.orderStatus).includes("Delivered") ? (
                        <p style={{ color: "khaki", fontWeight: 'bolder', fontSize: '1.2rem' }}>{order.orderStatus}</p>
                    ) : (
                        <p style={{ color: "red", fontWeight: 'bolder', fontSize: '1.2rem' }}>{order.orderStatus}</p>
                    ),

                actions: (
                    <Fragment>
                        {/* <Link to={`/admin/order/${order._id}`} className="btn btn-primary py-1 px-2">

                        <i className="fa fa-eye"></i>

                    </Link>

                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteOrderHandler(order._id)}>

                        <i className="fa fa-trash"></i>

                    </button> */}

                        <div class="dropdown">
                            <button class="dropbtn">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="30px"
                                    width="40px"
                                    fill="#fff"
                                    viewBox="0 0 448 512"
                                >
                                    <path d="M384 480c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0zM224 352c-6.7 0-13-2.8-17.6-7.7l-104-112c-6.5-7-8.2-17.2-4.4-25.9s12.5-14.4 22-14.4l208 0c9.5 0 18.2 5.7 22 14.4s2.1 18.9-4.4 25.9l-104 112c-4.5 4.9-10.9 7.7-17.6 7.7z" />
                                </svg>
                            </button>
                            <div class="dropdown-content">
                                <Link
                                    style={{ color: "#073470" }}
                                    to={`/admin/order/${order._id}`}
                                >
                                    &nbsp; &nbsp; Edit &nbsp; &nbsp;
                                </Link>
                                <br />
                                <a
                                    style={{ color: "#073470" }}
                                    onClick={() => {
                                        // if (window.confirm("Are you sure you want to delete this order?")) {
                                            deleteOrderHandler(order._id);
                                            // toast.success("Order deleted successfully!", {
                                                // position: toast.POSITION.BOTTOM_CENTER,
                                                // autoClose: 2000
                                            // });
                                        // }
                                    }}>
                                    &nbsp; Delete &nbsp;
                                </a>
                            </div>
                        </div>
                    </Fragment>
                ),
            });
        });

        return data;
    };

    return (
        <Fragment>
            <MetaData title={"All Orders"} />

            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div
                    className="col-md-9"
                    style={{ marginTop: "10%", marginBottom: "10%" }}
                >
                    <Fragment>
                        <h1 className="my-8">All Orders</h1>

                        {loading ? (
                            <Loader />
                        ) : (
                            <MDBDataTable
                                data={setOrders()}
                                className="px-3"
                                style={{
                                    color: "white",
                                    border: "5px solid",
                                    background:
                                        "linear-gradient(to bottom right, rgba(255, 105, 180, 0.5), rgba(0, 191, 255, 0.5))",
                                }}
                                bordered
                                striped
                            // hover
                            />
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default OrdersList;
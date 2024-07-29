import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { myOrders, clearErrors } from '../../actions/orderActions'
const ListOrders = () => {
    const dispatch = useDispatch();
    const { loading, error, orders } = useSelector(state => state.myOrders);
    useEffect(() => {
        dispatch(myOrders());
        if (error) {
            dispatch(clearErrors())

        }
    }, [dispatch, error])
    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Num of Items',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        }
        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `₱${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'khaki' }}><b>{order.orderStatus}</b></p>
                    : <p style={{ color: 'red' }}><b>{order.orderStatus}</b></p>,
                actions:
                    <Link to={`/order/${order._id}`} className="btn btn-primary">
                        <i className="fa fa-eye"></i>
                    </Link>
            })

        })
        return data;
    }

    return (
        <Fragment>

            <MetaData title={'My Orders'} />
       
            <div className='w-75' style={{marginTop:"10%", marginLeft:"13%",  justifyContent: "center", alignItems: "center"}}>
            <h1 className="my-5 ">My Orders</h1>

            {loading ? <Loader /> : (

                <MDBDataTable
                    data={setOrders()}
                    className="px-3"
                    style={{color:"white" , border: "5px solid", background: 'linear-gradient(to bottom right, rgba(255, 105, 180, 0.5), rgba(0, 191, 255, 0.5))' }}
                    bordered
                    striped
                    // hover

                />

            )}
</div>
        </Fragment>

    )

}



export default ListOrders


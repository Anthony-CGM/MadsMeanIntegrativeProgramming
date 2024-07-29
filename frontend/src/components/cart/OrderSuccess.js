import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'

const OrderSuccess = () => {
    sessionStorage.clear();
    localStorage.clear();
    return (
        <Fragment>
            <MetaData title={'Order Success'} />
            <div className="row justify-content-center" style={{ marginTop: "8%", paddingLeft: "5%" }}>
                <div className="col-6 mt-5 text-center">

                    <img className="my-5 img-fluid d-block mx-auto" src="https://media.giphy.com/media/Q81NcsY6YxK7jxnr4v/giphy.gif" alt="Order Success"style={{borderRadius:"50px"}} width="400" height="400" />
                    <h2 style={{background: 'linear-gradient(to bottom right, rgba(255, 105, 180, 0.5), rgba(0, 191, 255, 0.5))', borderRadius:"20px"}}>Your Order has been placed successfully.</h2>
                    <h3><Link to="/orders/me">Go to Orders</Link></h3>
                </div>

            </div>
        </Fragment>
    )
}
export default OrderSuccess
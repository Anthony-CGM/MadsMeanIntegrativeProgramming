import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'
import UserSalesChart from './UserSalesChart';
import MonthlySalesChart from './MonthlySalesChart';
import ProductSalesChart from './ProductSalesChart';
import { useDispatch, useSelector } from 'react-redux'

import { getAdminProducts } from '../../actions/productActions'
import { allOrders } from '../../actions/orderActions'

import { allUsers, userSales } from '../../actions/userActions'
import { monthlySalesChart, productSalesChart } from '../../actions/chartActions'

const Dashboard = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.products)
    const { users } = useSelector(state => state.allUsers)
    const { orders, totalAmount, loading } = useSelector(state => state.allOrders)
    const { customerSales, } = useSelector(state => state.customerSales)
    const { salesPerMonth, } = useSelector(state => state.salesPerMonth)
    const { productSales, } = useSelector(state => state.productSales)
    let outOfStock = 0;
    products.forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1;
        }
    })

    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(allOrders())
        dispatch(allUsers())
        dispatch(userSales())
        dispatch(monthlySalesChart())
        dispatch(productSalesChart())

    }, [dispatch])

    return (
        <Fragment>
            <div className="row">
                <div style={{ marginLeft: '150px' }}>
                    <Sidebar />
                </div>
                <div className="col-12 col-md-11" style={{ marginTop: '20px' }}>
                    <h1 className="my-4">Dashboard</h1>
                    {loading ? <Loader /> : (
                        <Fragment>
                            <MetaData title={'Admin Dashboard'} />
                            <div className="row pr-3" style={{ position: 'relative', float: 'right', width: '280px' }}>


                                <div class="carddash" style={{ backgroundImage:"radial-gradient(circle, #87CEFA, #FFC0CB)", border:"solid 3px"}}
>
                                    <div class="carddash-details" >
                                        <p class="text-titledash">Total Sales</p>
                                        <h3 class="text-bodydash" style={{color:"black"}}>₱{totalAmount && totalAmount.toFixed(2)}</h3>
                                    </div>
                                </div>

                                <div class="carddash" style={{ backgroundImage:"radial-gradient(circle, #87CEFA, #FFC0CB)", border:"solid 3px"}}>
                                    <div class="carddash-details">
                                        <p class="text-titledash">Products</p>
                                        <h3 class="text-bodydash" style={{color:"black"}}>{products && products.length}</h3>
                                    </div>
                                    <Link to="/admin/products"><button class="carddash-button">More info</button></Link>
                                </div>

                                <div class="carddash" style={{ backgroundImage:"radial-gradient(circle, #87CEFA, #FFC0CB)", border:"solid 3px"}}>
                                    <div class="carddash-details">
                                        <p class="text-titledash">Orders</p>
                                        <h3 class="text-bodydash" style={{color:"black"}}>{orders && orders.length}</h3>
                                    </div>
                                    <Link to="/admin/orders"><button class="carddash-button">More info</button></Link>
                                </div>

                                <div class="carddash" style={{ backgroundImage:"radial-gradient(circle, #87CEFA, #FFC0CB)", border:"solid 3px"}}>
                                    <div class="carddash-details">
                                        <p class="text-titledash">Users</p>
                                        <h3 class="text-bodydash" style={{color:"black"}}>{users && users.length}</h3>
                                    </div>
                                    <Link to="/admin/users"><button class="carddash-button">More info</button></Link>
                                </div>

                                <div class="carddash" style={{ backgroundImage:"radial-gradient(circle, #87CEFA, #FFC0CB)", border:"solid 3px"}}> 
                                    <div class="carddash-details">
                                        <p class="text-titledash">Out of Stock</p>
                                        <h3 class="text-bodydash" style={{color:"black"}}>{outOfStock}</h3>
                                    </div>
                                    <Link to="/admin/products"><button class="carddash-button">More info</button></Link>
                                </div>
                            </div>

                            <Fragment>
                                <div className="row pr-4" style={{ position: 'absolute', float: 'left', width: '1700px', height: '50px', marginTop: '3.5rem' }}>

                                    <MonthlySalesChart data={salesPerMonth} />
                                </div>
                                <div className="row pr-4" style={{ position: 'relative', float: 'left', width: '1000px', height: '50px', marginTop: '45rem' }}>

                                    <UserSalesChart data={customerSales} />
                                </div>

                                <div className="row pr-3"  style={{ position: 'relative', float: 'right', width: '800px', marginRight: '-10px', paddingLeft: '-10px', marginTop: '1rem' }}>

                                    <ProductSalesChart data={productSales} />

                                </div>
                            </Fragment>
                        </Fragment>



                    )}
                </div>

            </div>

        </Fragment >

    )

}



export default Dashboard
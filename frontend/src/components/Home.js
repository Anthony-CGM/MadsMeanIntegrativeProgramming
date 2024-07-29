import React, { Fragment, useEffect, useState } from 'react'
import MetaData from './layout/MetaData'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Slider, { Range, createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import Product from './product/Product'
import Loader from './layout/Loader'
import image from './layout/slideShow.gif';

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

const Home = () => {
    const dispatch = useDispatch();
    const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products);


    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 1000])
    const [category, setCategory] = useState('');
    let { keyword } = useParams()

    const notify = (error = '') => toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER
    });
    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    const Range = createSliderWithTooltip(Slider.Range);
    const categories = [
        '',
        'Hand Tools',
        'Cables and Wires',
        'Connectors',
        'Enclosures and Storage',
        'Personal Protective Equipment',
        'Test and Measurement',
        "Lighting",
        'Automation and Control',
        'Semiconductors',
        'Switches',
        'Passive Components',
        'Fasteners and Fixings'
    ]

    useEffect(() => {
        if (error) {
            // return alert.error(error)
            notify(error)
        }
        dispatch(getProducts(keyword, currentPage, price, category))
    }, [dispatch, error, currentPage, keyword, price, category]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }
    let count = productsCount;

    if (keyword) {
        let count = filteredProductsCount
    }
    console.log(keyword, count, filteredProductsCount, resPerPage)
    return (
        <Fragment>

            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Tech Depot'} />
                    {/* <h1 id="products_heading">Latest Products</h1> */}
                    <div style={{ marginTop: '120px', marginLeft: '330px', marginBottom: '-60px' }}>
                        <img src={image} alt="My Image" style={{ height: '450px', width: '1200px'}} />
                    </div>
                    <section id="products" className="container mt-5">
                        {/* <div className="row">
                            {products && products.map(product => (
                                <Product key={product._id} product={product} />
                            ))}
                        </div> */}

                        <div className="row">
                            {keyword ? (
                                <Fragment>

                                    <div className="col-6 col-md-3 mt-5 mb-5" style={{ paddingTop: "10%" }} >
                                        <div className="px-5">
                                            <Range
                                                marks={{
                                                    1: `₱1`,
                                                    1000: `₱1000`,
                                                    2000: `₱2000`,
                                                    3000: `₱3000`
                                                }}
                                                min={1}
                                                max={3000}
                                                defaultValue={[1, 3000]}
                                                tipFormatter={value => `₱${value}`}
                                                tipProps={{
                                                    placement: "top",
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={price => setPrice(price)}
                                            />

                                            <hr className="my-5" />
                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    Categories
                                                </h4>
                                                <ul className="pl-0">
                                                    {categories.map(category => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none'
                                                            }}
                                                            key={category}
                                                            onClick={() => setCategory(category)}
                                                        >
                                                            {category}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>


                                        </div>
                                    </div>

                                    <div className="col-6 col-md-9" style={{ paddingTop: "5%" }} >
                                        <div className="row">
                                            {products.map(product => (
                                                <Product key={product._id} product={product} col={4} />
                                            ))}
                                        </div>
                                    </div>

                                </Fragment>
                            ) :
                                (
                                    products.map(product => (
                                        <Product key={product._id} product={product} col={3} />
                                    ))
                                )
                            }
                        </div>
                    </section>

                    {productsCount && (
                        resPerPage <= count && (
                            <div className="d-flex justify-content-center mt-5" >
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText={'Next'}
                                    prevPageText={'Prev'}
                                    firstPageText={'First'}
                                    lastPageText={'Last'}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                />
                            </div>
                        )
                    )}

                </Fragment>
            )
            }
        </Fragment>

    )

}

export default Home
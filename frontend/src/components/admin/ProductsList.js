import React, { Fragment, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar'
import Swal from 'sweetalert2'
import Toast from '../layout/Toast'

import { useDispatch, useSelector } from 'react-redux'

import {
    getAdminProducts,
    deleteProduct,
    clearErrors
} from '../../actions/productActions'

import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'
const ProductsList = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate()
    const { loading, error, products } = useSelector(state => state.products);
    const { error: deleteError, isDeleted } = useSelector(state => state.product)
    useEffect(() => {
        dispatch(getAdminProducts());
        if (error) {
            dispatch(clearErrors())
        }
        if (deleteError) {
            dispatch(clearErrors())
        }
        if (isDeleted) {

            navigate('/admin/products');
            Toast('Product Deleted Successfully', 'success');
            dispatch({ type: DELETE_PRODUCT_RESET })

        }



    }, [dispatch, error, navigate, isDeleted, deleteError])


    // [dispatch, alert, error, deleteError, isDeleted, navigate])
    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `₱${product.price}`,
                stock: product.stock,
                actions: <Fragment>
                    {/* <Link to={`/admin/product/${product._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link> */}
                    {/* <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(product._id)}>
                        <i className="fa fa-trash"></i>
                    </button> */}

                    {/* <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => {
                        if (window.confirm("Are you sure you want to delete this product?")) {
                            deleteProductHandler(product._id);
                            toast.success("Product deleted successfully!", {
                                position: toast.POSITION.BOTTOM_CENTER,
                                autoClose: 2000
                            });
                        }
                    }}>
                        <i className="fa fa-trash"></i>
                    </button> */}

                    <div class='dropdown'>
                        <button class='dropbtn'><svg xmlns="http://www.w3.org/2000/svg" height="30px" width="40px" fill='#fff' viewBox="0 0 448 512"><path d="M384 480c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0zM224 352c-6.7 0-13-2.8-17.6-7.7l-104-112c-6.5-7-8.2-17.2-4.4-25.9s12.5-14.4 22-14.4l208 0c9.5 0 18.2 5.7 22 14.4s2.1 18.9-4.4 25.9l-104 112c-4.5 4.9-10.9 7.7-17.6 7.7z" /></svg></button>
                        <div class='dropdown-content'>

                            <Link style={{ color: "#073470" }} to={`/admin/product/${product._id}`}>
                                &nbsp; &nbsp;  Edit &nbsp; &nbsp;
                            </Link>
                            <br />
                            <a style={{ color: "#073470" }} onClick={() => {
                                // if (window.confirm("Are you sure you want to delete this product?")) {
                                    deleteProductHandler(product._id);
                                    // toast.success("Product deleted successfully!", {
                                        // position: toast.POSITION.BOTTOM_CENTER,
                                        // autoClose: 2000
                                    // });
                                // }
                            }}> 
                                &nbsp;  Delete &nbsp;
                            </a>

                        </div>
                    </div>


                </Fragment>
            })
        })
        return data;
    }
    const deleteProductHandler = (id) => {

        Swal.fire({
            title: 'Delete Product',
            icon: 'info',
            text: 'Do you want to delete this product?',
            confirmButtonText: 'Delete',
            showCancelButton: true
          }).then((result) => {
            if (result.isConfirmed){
                dispatch(deleteProduct(id))
            }
          })
       
    }

    return (
        <Fragment>
            <MetaData title={'All Products'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-9" style={{ marginTop: "10%", marginBottom: "10%" }}>
                    <Fragment>
                        <h1 className="my-8">Product Lists</h1>
                        {loading ? <Loader /> : (

                            <MDBDataTable
                                data={setProducts()}
                                className="px-3"
                                style={{ color: "white", border: "5px solid", background: 'linear-gradient(to bottom right, rgba(255, 105, 180, 0.5), rgba(0, 191, 255, 0.5))' }}
                                bordered
                                striped
                                // hover
                            />
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}
export default ProductsList
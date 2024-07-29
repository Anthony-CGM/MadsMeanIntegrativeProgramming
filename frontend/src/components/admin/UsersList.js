
import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { allUsers, clearErrors, deleteUser } from '../../actions/userActions'
import { DELETE_USER_RESET } from '../../constants/userConstants'
import Swal from 'sweetalert2'
import Toast from '../layout/Toast'

const UsersList = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { loading, error, users } = useSelector(state => state.allUsers);
    const { isDeleted } = useSelector(state => state.user)
    const errMsg = (message = '') => toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });
    const successMsg = (message = '') => toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });

    useEffect(() => {
        dispatch(allUsers());
        if (error) {
            errMsg(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            // successMsg('User deleted successfully');
            navigate('/admin/users');
            Toast('User Deleted Successfully', 'success');
            dispatch({ type: DELETE_USER_RESET })
        }
    }, [dispatch, error, isDeleted, navigate])

    const deleteUserHandler = (id) => {
        Swal.fire({
            title: 'Delete User',
            icon: 'info',
            text: 'Do you want to delete this user?',
            confirmButtonText: 'Delete',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUser(id))
            }
        })

    }

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Avatar',
                    field: 'avatar',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },

                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },

                {
                    label: 'Actions',
                    field: 'actions',
                },


            ],
            rows: []

        }

        users.forEach(user => {

            data.rows.push({

                id: user._id,
                avatar: <img src={user.avatar.url} alt={user.name} title={user.name} />,

                name: user.name,

                email: user.email,

                role: user.role,


                actions: <Fragment>

                    {/* <Link to={`/admin/user/${user._id}`} className="btn btn-primary py-1 px-2">

                        <i className="fa fa-pencil"></i>

                    </Link>

                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteUserHandler(user._id)}>

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
                                to={`/admin/user/${user._id}`}
                            >
                                &nbsp; &nbsp; Edit &nbsp; &nbsp;
                            </Link>
                            <br />
                            <a
                                style={{ color: "#073470" }}
                                onClick={() => {
                                    // if (window.confirm("Are you sure you want to delete this user?")) {
                                        deleteUserHandler(user._id);
                                        // toast.success("User deleted successfully!", {
                                            // position: toast.POSITION.BOTTOM_CENTER,
                                            // autoClose: 2000
                                        // });
                                    // }
                                }}>
                                &nbsp; Delete &nbsp;
                            </a>
                        </div>
                    </div>

                    {/* <button className="btn btn-danger py-1 px-2 ml-2">

                        <i className="fa fa-trash"></i>

                    </button>*/}

                </Fragment>

            })

        })

        return data;

    }



    return (

        <Fragment>

            <MetaData title={'All Users'} />

            <div className="row">

                <div className="col-12 col-md-2">

                    <Sidebar />

                </div>

                <div className="col-md-9" style={{ marginTop: "10%", marginBottom: "10%" }}>

                    <Fragment>

                        <h1 className="my-8">All Users</h1>

                        {loading ? <Loader /> : (

                            <MDBDataTable
                                data={setUsers()}
                                style={{ color: "white", border: "5px solid", background: 'linear-gradient(to bottom right, rgba(255, 105, 180, 0.5), rgba(0, 191, 255, 0.5))' }}
                                className="px-3"
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



export default UsersList
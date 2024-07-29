import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, clearErrors } from '../../actions/userActions'

const NewPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { error, success } = useSelector(state => state.forgotPassword)
    let { token } = useParams();

    useEffect(() => {
        if (error) {
            // alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            // alert.success('Password updated successfully')
            // toast.success("Password updated successfully");
            navigate('/login')
            // success("Password updated successfully");
        }
    }, [dispatch, error, success, navigate])
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);
        dispatch(resetPassword(token, formData))
    }



    return (

        <Fragment>



            <MetaData title={'New Password Reset'} />



            <div className="row wrapper">

                <div className="col-10 col-lg-5">

                    <form className="shadow-lg" style={{ background: 'linear-gradient(to bottom right, rgba(255, 105, 180, 0.5), rgba(0, 191, 255, 0.5))', marginTop: "10%", borderRadius: "30px" }} onSubmit={submitHandler}>

                        <h1 className="mb-3">New Password</h1>



                        <div className="form-group">

                            <label htmlFor="password_field">Password</label>

                            <input

                                type="password"

                                id="password_field"

                                className="form-control"

                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}

                            />

                        </div>



                        <div className="form-group">

                            <label htmlFor="confirm_password_field">Confirm Password</label>

                            <input

                                type="password"

                                id="confirm_password_field"

                                className="form-control"
                                required
                                value={confirmPassword}

                                onChange={(e) => setConfirmPassword(e.target.value)}

                            />

                        </div>



                        <button

                            id="new_password_button"
                            type="submit"
                            style={{ backgroundImage: "radial-gradient(circle, #87CEFA, #FFC0CB)", border: "solid 3px" }}
                            className="btn btn-block py-3">
                            Set Password
                        </button>



                    </form>

                </div>

            </div>



        </Fragment>

    )

}



export default NewPassword
import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { updateProfile, loadUser, clearErrors } from '../../actions/userActions'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'
import { Link } from "react-router-dom";


const UpdateProfile = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const { error, isUpdated, loading } = useSelector(state => state.user)

    // console.log(error)
    useEffect(() => {
        console.log(isUpdated)
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url)
        }
        if (error) {
            // alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            // alert.success('User updated successfully')
            dispatch(loadUser());
            navigate('/me', { replace: true })
            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }
    }, [dispatch, error, isUpdated, navigate, user])
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('avatar', avatar);
        dispatch(updateProfile(formData))

        toast.success('Profile successfully updated!', {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 2000
        });
    };
    const onChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };
    return (
        <Fragment>
            <MetaData title={"Update Profile"} />
            <div className="row wrapper" style={{ marginTop: "10%" }}>
                <div className="col-10 col-lg-5">
                    <form
                        className="shadow-lg"
                        style={{
                            background:
                                "linear-gradient(to bottom right, rgba(255, 105, 180, 0.5), rgba(0, 191, 255, 0.5))",
                            borderRadius: "30px",
                        }}
                        onSubmit={submitHandler}
                        encType="multipart/form-data"
                    >
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>

                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>

                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="avatar_upload">Avatar</label>

                            <div className="d-flex align-items-center">
                                <div>
                                    <figure className="avatars mr-3 item-rtl">
                                        <img
                                            src={avatarPreview}
                                            className="rounded-circle"
                                            alt="Avatar Preview"
                                        />
                                    </figure>
                                </div>

                                <div className="custom-file">
                                    <input
                                        type="file"
                                        name="avatar"
                                        className="custom-file-input"
                                        id="customFile"
                                        accept="image/*"
                                        onChange={onChange}
                                        required
                                    />

                                    <label className="custom-file-label" htmlFor="customFile">
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={loading ? true : false} >Update</button> */}
                        <button
                            type="submit"
                            className="btn update-btn btn-block mt-4 mb-3"
                            style={{
                                backgroundImage: "radial-gradient(circle, #87CEFA, #FFC0CB)",
                                border: "solid 3px",
                            }}
                            disabled={loading ? true : false}
                        // onClick={() => {
                        //   // Perform update logic here
                        //   // ...

                        //   // Display confirmation message
                        //   alert("Your information has been successfully updated.");
                        // }}
                        >
                            Update
                        </button>

                        <Link
                            style={{
                                backgroundImage: "radial-gradient(circle, #87CEFA, #FFC0CB)",
                                border: "solid 3px",
                            }}
                            to="/password/update"
                            className="btn btn-primary btn-block mt-3"
                        >
                            Change Password
                        </Link>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateProfile;
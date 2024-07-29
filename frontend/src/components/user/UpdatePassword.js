
import { useForm } from "react-hook-form";
import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearErrors } from "../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

function UpdatePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { error, isUpdated, loading } = useSelector((state) => state.user);
    const success = (message = "") =>
        toast.success(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });
    const notify = (error = "") =>
        toast.error(error, {
            position: toast.POSITION.BOTTOM_CENTER,
        });
    useEffect(() => {
        if (error) {
            console.log(error);
            notify(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            success("Password updated successfully");
            navigate("/me");
            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }
    }, [dispatch, error, navigate, isUpdated]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
    } = useForm();

    const submitHandler = (data) => {
        const formData = new FormData();
        formData.set("oldPassword", data.oldPassword);
        formData.set("password", data.password);
        dispatch(updatePassword(formData));
        reset();
    };
    return (
        <Fragment>
            <MetaData title={"Change Password"} />

            <div className="row wrapper" style={{ marginTop: "10%" }}>
                <div className="col-10 col-lg-5">
                    <form
                        className="shadow-lg"
                        onSubmit={handleSubmit(submitHandler)}
                        style={{
                            background:
                                "linear-gradient(to bottom right, rgba(255, 105, 180, 0.5), rgba(0, 191, 255, 0.5))",
                            borderRadius: "30px",
                        }}
                    >
                        <h1 className="mt-2 mb-5">Update Password</h1>

                        {/* <div className="form-group">

                            <label htmlFor="old_password_field">Old Password</label>

                            <input

                                type="password"

                                id="old_password_field"

                                className="form-control"

                                value={oldPassword}

                                onChange={(e) => setOldPassword(e.target.value)}

                            />

                        </div> */}

                        <div className="form-group">
                            <label htmlFor="old_password_field">Old Password:</label>
                            <input
                                type="password"
                                className={`form-control ${errors.oldPassword && "is-invalid"}`}
                                {...register("oldPassword", {
                                    required: "Old Password is Required",
                                })}
                                onKeyUp={() => {
                                    trigger("oldPassword");
                                }}
                            />
                            {errors.oldPassword && (
                                <div className="invalid-feedback">
                                    {errors.oldPassword.message}
                                </div>
                            )}
                        </div>

                        {/* <div className="form-group">
              <label htmlFor="new_password_field">New Password</label>

              <input
                type="password"
                id="new_password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div> */}

                        <div className="form-group">
                            <label htmlFor="new_password_field">New Password:</label>
                            <input
                                type="password"
                                className={`form-control ${errors.password && "is-invalid"}`}
                                {...register("password", {
                                    required: "New Password is Required",
                                })}
                                onKeyUp={() => {
                                    trigger("password");
                                }}
                            />
                            {errors.password && (
                                <div className="invalid-feedback">
                                    {errors.password.message}
                                </div>
                            )}
                        </div>

                        {/* <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              style={{
                backgroundImage: "radial-gradient(circle, #87CEFA, #FFC0CB)",
                border: "solid 3px",
              }}
              disabled={loading ? true : false}
            >
              Update Password
            </button> */}

                        <input
                            type="submit"
                            className="btn btn-block py-3"
                            style={{
                                backgroundImage: "radial-gradient(circle, #87CEFA, #FFC0CB)",
                                border: "solid 3px",
                            }}
                            disabled={loading ? true : false}
                            value="UPDATE PASSWORD"
                        />

                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default UpdatePassword;
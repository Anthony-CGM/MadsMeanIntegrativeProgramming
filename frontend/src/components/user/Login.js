import { useForm } from "react-hook-form";
import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userActions";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let location = useLocation();
    const { isAuthenticated, error, loading, success } = useSelector(
        (state) => state.auth
    );

    const redirect = new URLSearchParams(location.search).get("redirect");

    const notify = (error = "") =>
        toast.error(error, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    useEffect(() => {
        if (isAuthenticated && redirect === "shipping") {
            navigate(`/${redirect}`, { replace: true });
        } else if (isAuthenticated) {
            navigate("/");
            toast.success("Account logged-in successfully.", {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
        if (error) {
            notify(error);
            dispatch(clearErrors());
        }
    }, [dispatch, isAuthenticated, error, navigate, success, redirect]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
    } = useForm();

    const submitHandler = (data) => {
        dispatch(login(data.email, data.password));
        reset();
    };

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={"Login"} />
                    <div className="row wrapper" style={{ marginTop: "10%" }}>
                        <div className="col-10 col-lg-5">
                            <form
                                className="shadow-lg"
                                style={{
                                    background:
                                        "linear-gradient(to bottom right, rgba(255, 105, 180, 0.5), rgba(0, 191, 255, 0.5))",
                                    borderRadius: "30px",
                                }}
                                onSubmit={handleSubmit(submitHandler)}
                            >
                                <h1 className="mb-3">Login</h1>

                                <div className="form-group">
                                    <label htmlFor="email_field">Email:</label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email && "is-invalid"}`}
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address",
                                            },
                                        })}
                                        onKeyUp={() => {
                                            trigger("email");
                                        }}
                                    />
                                    {errors.email && (
                                        <div className="invalid-feedback">
                                            {errors.email.message}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password_field">Password:</label>
                                    <input
                                        type="password"
                                        className={`form-control ${errors.password && "is-invalid"
                                            }`}
                                        {...register("password", {
                                            required: "Password is required",
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

                                {/* <div className="form-group">
                  <label className="col-form-label">Password:</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password && "invalid"}`}
                    {...register("password", {
                      required: "Password is Required",
                    })}
                    onKeyUp={() => {
                      trigger("password");
                    }}
                  />
                  {errors.password && (
                    <small className="text-danger">
                      {errors.password.message}
                    </small>
                  )}
                </div> */}

                                {/* <button
              type="submit"
              className="btn btn-block py-3"
              style={{
                backgroundImage: "radial-gradient(circle, #87CEFA, #FFC0CB)",
                border: "solid 3px",
              }}
              onClick={() => {}}
            >
              LOGIN
            </button> */}

                                <Link style={{ color: "white" }} to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>

                                <input
                                    type="submit"
                                    className="btn btn-block py-3"
                                    style={{
                                        backgroundImage:
                                            "radial-gradient(circle, #87CEFA, #FFC0CB)",
                                        border: "solid 3px",
                                    }}
                                    onClick={() => { }}
                                    value="LOGIN"
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default Login;
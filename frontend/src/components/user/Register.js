
import { useForm } from "react-hook-form";
import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { register as registers, clearErrors } from "../../actions/userActions";

function Register() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(
        "/images/default_avatar.jpg"
    );

    // const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, error, loading } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
            toast.success("Registered successfully!", {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }

        if (error) {
            //   notify(error);
            dispatch(clearErrors());
        }
    }, [dispatch, isAuthenticated, error, navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
    } = useForm();

    const submitHandler = (data) => {
        const formData = new FormData();
        formData.set("name", data.name);
        formData.set("email", data.email);
        formData.set("password", data.password);
        formData.set("avatar", avatar);
        dispatch(registers(formData));
        reset();
    };

    //   const submitHandler = (e) => {

    //     const formData = new FormData();
    //     formData.set("name", name);
    //     formData.set("email", email);
    //     formData.set("password", password);
    //     formData.set("avatar", avatar);

    //     dispatch(register(formData));
    //   };

    const onChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    return (
        <Fragment>
            <MetaData title={"Register User"} />

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
                        <h1 className="mb-3">Register</h1>

                        {/* <div className="form-group">
                <label htmlFor="email_field">Name</label>
                <input
                  type="name"
                  id="name_field"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={onChange}
                />
              </div> */}

                        <div className="form-group">
                            <label htmlFor="name_field">Name:</label>
                            <input
                                type="name"
                                className={`form-control ${errors.name && "is-invalid"}`}
                                {...register("name", {
                                    required: "Name is required",
                                })}
                                onKeyUp={() => {
                                    trigger("name");
                                }}
                            />
                            {errors.name && (
                                <div className="invalid-feedback">{errors.name.message}</div>
                            )}
                        </div>

                        {/* <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
              </div> */}

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
                                <div className="invalid-feedback">{errors.email.message}</div>
                            )}
                        </div>

                        {/* <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChange}
                />
              </div> */}

                        <div className="form-group">
                            <label htmlFor="password_field">Password:</label>
                            <input
                                type="password"
                                className={`form-control ${errors.password && "is-invalid"}`}
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

                        <div className="form-group">
                            <label htmlFor="avatar_upload">Avatar</label>
                            <div className="d-flex align-items-center">
                                <div>
                                    <figure className="avatar mr-3 item-rtl">
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
                                        accept="images/*"
                                        onChange={onChange}
                                        required
                                    />
                                    {/* <input
                    type="file"
                    accept="images/*"
                    className={`custom-file-input ${
                      errors.avatar && "is-invalid"
                    }`}
                    {...register("avatar", {
                      required: "Avatar is Required",
                    })}
                    onKeyUp={() => {
                      trigger("avatar");
                    }}
                  /> */}

                                    <label className="custom-file-label" htmlFor="customFile">
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>

                        <input
                            type="submit"
                            className="btn btn-block py-3"
                            style={{
                                backgroundImage: "radial-gradient(circle, #87CEFA, #FFC0CB)",
                                border: "solid 3px",
                            }}
                            disabled={loading ? true : false}
                            value="REGISTER"
                        />

                        {/* <button
                id="register_button"
                type="submit"
                className="btn btn-block py-3"
                style={{
                  backgroundImage: "radial-gradient(circle, #87CEFA, #FFC0CB)",
                  border: "solid 3px",
                }}
                disabled={loading ? true : false}
              >
                REGISTER
              </button> */}
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default Register;
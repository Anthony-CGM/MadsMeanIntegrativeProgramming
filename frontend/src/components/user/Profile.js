import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

const Profile = () => {
    const { user, loading } = useSelector((state) => state.auth);
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={"Profile"} />

                    <div class="flip-cardusr">
                        <div class="flip-cardusr-inner">
                            <div class="flip-cardusr-front">
                              
                  <img
                    class="profile-image"
                    src={user.avatar.url}
                    alt={user.name}
                  />
                  <div class="nameusr">{user.name}</div>
             
                            </div>

                            <div class="flip-cardusr-back">
                                <div class="descriptionusr">
                                    <br />
                                    <h4>Email Address</h4>
                                    <p class="descriptionnusr">{user.email}</p>

                                    <hr style={{ borderTop: '1px solid #fff' }} />

                                    <h4>Joined On</h4>
                                    <p class="descriptionusr">
                                        {String(user.createdAt).substring(0, 10)}
                                    </p>
                                    <hr style={{ borderTop: '1px solid #fff', marginTop: '-2px' }} />
                                    <h4>Role</h4>
                                    <p class="descriptionnusr">{user.role}</p>
                                    <div class="socialbarusr">
                                        <a href="#" id="edit" >
                                            <Link
                                                to="/me/update"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16"
                                                    height="16" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
                                            </Link>
                                        </a>
                                        {user.role !== "admin" && (
                                            <a href="#" id="Orders">
                                                <Link
                                                    to="/orders/me"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor" width="15"
                                                        height="15" viewBox="0 0 512 512"
                                                    >
                                                        <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                                                    </svg>
                                                </Link>
                                            </a>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};
export default Profile
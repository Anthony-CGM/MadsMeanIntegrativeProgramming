import React, { Fragment } from "react";
import "../../App.css";
import Search from "./Search";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { logout } from "../../actions/userActions";
const Header = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const logoutHandler = () => {
    dispatch(logout());
    toast.success('Account successfully logged-out!', {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2000
    });
};


  return (

    <Fragment>
      <nav className="navbar row">
        <div
          className="navbar-brand"
          style={{ position: "relative", margin: "0px 890px" }}
        >
          <Link to="/">
            <img src="/images/logo2sz.png" />
          </Link>
        </div>
        <div>
          <Search/>
        </div>

        <div>


          {user && user.role === "user" && (
            <div>
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <div class="svg-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  style={{ height: "3rem", width: "3rem" }}
                >
                  {" "}
                  <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                </svg>

                <span class="text-overlay" id="cart_count">
                  {cartItems.length}
                </span>
              </div>
            </Link>
            </div>
          )}



          {user ? (
            <div class="navuser">
              <input type="checkbox" />
              <span>
                <figure className="avatar avatar-navuser">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
              </span>
              {/* <span></span> */}
              <li style={{ color: "black" }}>{user && user.name}</li>

              <div class="menu">
                {user && user.role === "admin" && (
                  <li>
                    <Link className="dropdown-item" to="/dashboard">
                      Dashboard
                    </Link>
                  </li>
                )}

                {user && user.role === "user" && (
                <li>
                  <Link className="dropdown-item" to="/orders/me">
                    Orders
                  </Link>
                </li>
                )}

                <li>
                  <Link className="dropdown-item" to="/me">
                    Profile
                  </Link>
                </li>

                <li>
                  <Link
                    className="dropdown-item text-danger"
                    to="/"
                    onClick={logoutHandler}
                  >
                    Logout
                  </Link>
                </li>

              </div>
            </div>
          ) : (
            !loading && (
              <div>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <span class="loginbtn">Log in |</span>
                </Link>

                <Link to="/register" style={{ textDecoration: "none" }}>
                  <span class="loginbtn"> Register</span>
                </Link>
              </div>
            )
          )}
        </div>
      </nav>

      {/* <nav
        style={{
          backgroundColor: "white",
          height: "2.5rem",
          position: "fixed",
          top: "5.4rem",
          width: "100%",
          zIndex: "100",
          boxShadow: "0 5px 8px -0.5px #010819",
          textAlign: "center",
        }}
      >
        <div style={{ margin: "0 auto" }}>
          <button class="btnctg">Hand Tools</button>
          <button class="btnctg">Cables & Wires</button>
          <button class="btnctg">Connectors</button>
          <button class="btnctg">Enclosures & Storage</button>
          <button class="btnctg">Personal Protective Equipment</button>
          <button class="btnctg">Test & Measurement</button>
          <button class="btnctg">Lighting</button>
          <button class="btnctg">Automation & Control</button>
          <button class="btnctg">Semiconductors</button>
          <button class="btnctg">Switches</button>
          <button class="btnctg">Passive Components</button>
          <button class="btnctg">Fasteners & Fixings</button>
        </div>
      </nav> */}
    </Fragment>
  );
};

export default Header

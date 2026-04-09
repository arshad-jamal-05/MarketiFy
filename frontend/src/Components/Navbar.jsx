import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSetting } from "../Redux/ActionCreators/SettingActionCreators";

export default function Navbar() {
  let [settingData, setSettingData] = useState({
    siteName: import.meta.env.VITE_APP_SITE_NAME,
    address: import.meta.env.VITE_APP_ADDRESS,
    email: import.meta.env.VITE_APP_EMAIL,
    phone: import.meta.env.VITE_APP_PHONE,
    map1: import.meta.env.VITE_APP_MAP_URL1,
    whatsapp: import.meta.env.VITE_APP_WHATSAPP,
    facebook: import.meta.env.VITE_APP_FACEBOOK,
    twitter: import.meta.env.VITE_APP_TWITTER,
    linkedin: import.meta.env.VITE_APP_LINKEDIN,
    instagram: import.meta.env.VITE_APP_INSTAGRAM,
  });

  let SettingStateData = useSelector((state) => state.SettingStateData);
  let dispatch = useDispatch();

  let navigate = useNavigate();
  function logOut() {
    localStorage.clear();
    navigate("/login");
  }

  useEffect(() => {
    (() => {
      dispatch(getSetting());
      if (SettingStateData.length) {
        let item = SettingStateData[0];
        setSettingData({
          siteName: item.siteName ? item.siteName : settingData.siteName,
          address: item.address ? item.address : settingData.address,
          email: item.email ? item.email : settingData.email,
          phone: item.phone ? item.phone : settingData.phone,
          map1: item.map1 ? item.map1 : settingData.map1,
          whatsapp: item.whatsapp ? item.whatsapp : settingData.whatsapp,
          facebook: item.facebook ? item.facebook : settingData.facebook,
          twitter: item.twitter ? item.twitter : settingData.twitter,
          linkedin: item.linkedin ? item.linkedin : settingData.linkedin,
          instagram: item.instagram ? item.instagram : settingData.instagram,
        });
      }
    })();
  }, [SettingStateData.length]);

  return (
    <>
      <div className="container-fluid py-2 border-bottom d-none d-lg-block">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-9 col-6 text-center text-lg-start mb-2 mb-lg-0">
              <div className="d-inline-flex align-items-center">
                <Link
                  target="_blank"
                  rel="noreferror"
                  className="text-decoration-none text-body px-3"
                  to={settingData.map1}
                >
                  <i className="bi bi-geo-alt-fill me-2"></i>
                  <span className="d-none d-xl-inline-block">
                    {settingData.address}
                  </span>
                </Link>
                {/* <span className="text-body">|</span> */}
                <Link
                  target="_blank"
                  rel="noreferror"
                  className="text-decoration-none text-body px-3"
                  to={`mailto:${settingData.email}`}
                >
                  <i className="bi bi-envelope-fill me-2"></i>
                  <span className="d-none d-xl-inline-block">
                    {settingData.email}
                  </span>
                </Link>
                {/* <span className="text-body">|</span> */}
                <Link
                  target="_blank"
                  rel="noreferror"
                  className="text-decoration-none text-body px-3"
                  to={`tel:${settingData.phone}`}
                >
                  <i className="bi bi-telephone-fill me-2"></i>
                  <span className="d-none d-xl-inline-block">
                    {settingData.phone}
                  </span>
                </Link>
                {/* <span className="text-body">|</span> */}
                <Link
                  target="_blank"
                  rel="noreferror"
                  className="text-decoration-none text-body px-3"
                  to={`https://wa.me/${settingData.whatsapp}`}
                >
                  <i className="bi bi-whatsapp me-2"></i>
                  <span className="d-none d-xl-inline-block">
                    {settingData.whatsapp}
                  </span>
                </Link>
                {/* <span className="text-body">|</span> */}
              </div>
            </div>
            <div className="col-xl-3 col-6 text-center text-lg-end">
              <div className="d-inline-flex align-items-center">
                <Link
                  className="text-body px-2"
                  to={settingData.facebook}
                  target="_blank"
                >
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link
                  className="text-body px-2"
                  to={settingData.twitter}
                  target="_blank"
                >
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link
                  className="text-body px-2"
                  to={settingData.linkedin}
                  target="_blank"
                >
                  <i className="fab fa-linkedin-in"></i>
                </Link>
                <Link
                  className="text-body px-2"
                  to={settingData.instagram}
                  target="_blank"
                >
                  <i className="fab fa-instagram"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid sticky-top bg-white shadow-sm">
        <div className="container">
          <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0">
            <Link to="" className="navbar-brand">
              <h1 className="m-0 text-uppercase text-primary">
                {/* <i className="bi bi-cart-check me-2"></i>{settingData.siteName} */}
                <i className="bi bi-bag-check me-2"></i>
                {settingData.siteName}
              </h1>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav ms-auto py-0">
                <NavLink to="" className="nav-item nav-link">
                  Home
                </NavLink>
                <NavLink to="/about" className="nav-item nav-link">
                  About
                </NavLink>
                <NavLink to="/shop" className="nav-item nav-link">
                  Shop
                </NavLink>
                <NavLink to="/features" className="nav-item nav-link">
                  Features
                </NavLink>
                <NavLink to="/faq" className="nav-item nav-link">
                  FAQs
                </NavLink>
                <NavLink to="/testimonial" className="nav-item nav-link">
                  Testimonial
                </NavLink>
                <NavLink to="/contactus" className="nav-item nav-link">
                  Contact Us
                </NavLink>
                {/* <NavLink to="/admin" className="nav-item nav-link">
                  Admin
                </NavLink> */}
                {localStorage.getItem("login") ? (
                  <div className="nav-item dropdown">
                    <Link
                      to="#"
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      {localStorage.getItem("name")}
                    </Link>
                    <div className="dropdown-menu m-0">
                      <Link to="/profile" className="dropdown-item">
                        Profile
                      </Link>
                      {localStorage.getItem("role") !== "Buyer" ? (
                        <Link to="/admin" className="dropdown-item">
                          Admin Dashboard
                        </Link>
                      ) : null}
                      <Link
                        to="/profile?option=Orders"
                        className="dropdown-item"
                      >
                        Orders
                      </Link>
                      <Link
                        to="/profile?option=Wishlist"
                        className="dropdown-item"
                      >
                        Wishlist
                      </Link>
                      <Link to="/cart" className="dropdown-item">
                        Cart
                      </Link>
                      <Link to="/checkout" className="dropdown-item">
                        Checkout
                      </Link>
                      <button onClick={logOut} className="dropdown-item">
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      LogIn
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

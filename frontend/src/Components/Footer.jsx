import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSetting } from "../Redux/ActionCreators/SettingActionCreators";
import { getNewsletter, createNewsletter } from "../Redux/ActionCreators/NewsletterActionCreators";

export default function Footer() {
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
  let [email,setEmail] = useState("");
  let [message,setMessage] = useState("");

  let SettingStateData = useSelector((state) => state.SettingStateData);
  let NewsletterStateData = useSelector((state) => state.NewsletterStateData);
  let dispatch = useDispatch();

  function postData(e){
    e.preventDefault();

    if(email ==="" || email.length<15){
      setMessage("Please Enter A Valid Email Address");
    } else {
      let item = NewsletterStateData.find((x)=>x.email === email);
      if(item){
        setMessage("This Email Address Is Already Registered");
      } else {
        dispatch(createNewsletter({email:email,status:true}));
        setMessage("Thanks To Subscribed to Our Newsletter Service");
      }
    }
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

  // useEffect(()=>{
  //   (()=>{
  //     dispatch(getNewsletter());
  //   })()
  // },[NewsletterStateData.length])

  return (
    <>
      <div className="container-fluid bg-dark text-light mt-5 py-5">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <h4 className="d-inline-block text-primary text-uppercase border-bottom border-5 border-secondary mb-4">
                <Link to="/">
                  <i className="bi bi-bag-check me-2"></i>
                  {settingData.siteName}
                </Link>
              </h4>
              <p className="mb-4">
                Marketify is an eCommerce marketplace offering quality products,
                great value, and smooth online shopping.
              </p>
              <Link
                to={settingData.map1}
                target="_blank"
                className="d-block mb-2"
              >
                <i className="bi bi-geo-alt-fill text-primary me-2"></i>
                {settingData.address}
              </Link>
              <Link
                to={`mailto:${settingData.email}`}
                target="_blank"
                className="d-block mb-2"
              >
                <i className="bi bi-envelope-fill text-primary me-2"></i>
                {settingData.email}
              </Link>
              <Link
                to={`tel:${settingData.phone}`}
                target="_blank"
                className="d-block mb-2"
              >
                <i className="bi bi-telephone-fill text-primary me-2"></i>
                {settingData.phone}
              </Link>
              <Link
                to={`https://wa.me/${settingData.whatsapp}`}
                target="_blank"
                className="d-block mb-2"
              >
                <i className="bi bi-whatsapp text-primary me-2"></i>
                {settingData.whatsapp}
              </Link>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="d-inline-block text-primary text-uppercase border-bottom border-5 border-secondary mb-4">
                Popular Links
              </h4>
              <div className="d-flex flex-column justify-content-start">
                <Link className="text-light mb-2" to="/">
                  <i className="fa fa-angle-right me-2"></i>Home
                </Link>
                <Link className="text-light mb-2" to="/about">
                  <i className="fa fa-angle-right me-2"></i>About Us
                </Link>
                <Link className="text-light mb-2" to="/shop">
                  <i className="fa fa-angle-right me-2"></i>Shop
                </Link>
                <Link className="text-light mb-2" to="/features">
                  <i className="fa fa-angle-right me-2"></i>Features
                </Link>
                <Link className="text-light mb-2" to="/faq">
                  <i className="fa fa-angle-right me-2"></i>FAQs
                </Link>
                <Link className="text-light mb-2" to="/testimonial">
                  <i className="fa fa-angle-right me-2"></i>Testimonial
                </Link>
                <Link className="text-light" to="/contactus">
                  <i className="fa fa-angle-right me-2"></i>Contact Us
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="d-inline-block text-primary text-uppercase border-bottom border-5 border-secondary mb-4">
                Consumer Policy
              </h4>
              <div className="d-flex flex-column justify-content-start">
                <Link className="text-light mb-2" to="/privacypolicy">
                  <i className="fa fa-angle-right me-2"></i>Privacy Policy
                </Link>
                <Link className="text-light mb-2" to="/termsandcondition">
                  <i className="fa fa-angle-right me-2"></i>Terms and Condition
                </Link>
                <Link className="text-light mb-2" to="/cancellationpolicy">
                  <i className="fa fa-angle-right me-2"></i>Cancellation Policy
                </Link>
                <Link className="text-light mb-2" to="/returnpolicy">
                  <i className="fa fa-angle-right me-2"></i>Return Policy
                </Link>
                <Link className="text-light mb-2" to="/refundpolicy">
                  <i className="fa fa-angle-right me-2"></i>Refund Policy
                </Link>
                <Link className="text-light mb-2" to="/termsofuse">
                  <i className="fa fa-angle-right me-2"></i>Terms Of Use
                </Link>
                <Link className="text-light mb-2" to="/grievance">
                  <i className="fa fa-angle-right me-2"></i>Grievance Redressal
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="d-inline-block text-primary text-uppercase border-bottom border-5 border-secondary mb-4">
                Newsletter
              </h4>
              <p className="mb-4">
                Subscribe to our newsletter for exclusive deals, new arrivals,
                updates, and smart shopping tips delivered straight to your
                inbox.
              </p>
              <form onSubmit={postData}>
                <div className="input-group">
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="form-control p-3 border-0"
                    placeholder="Your Email Address"
                  />
                  <button className="btn btn-primary">Sign Up</button>
                </div>
                {message?<p>{message}</p>:null}
              </form>
              <h6 className="mt-5 text-primary text-uppercase mt-4 mb-3">
                Follow Us
              </h6>
              <div className="d-flex">
                <Link
                  className="btn btn-lg btn-primary btn-lg-square rounded-circle me-2"
                  to={settingData.twitter}
                  target="_blank"
                >
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link
                  className="btn btn-lg btn-primary btn-lg-square rounded-circle me-2"
                  to={settingData.facebook}
                  target="_blank"
                >
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link
                  className="btn btn-lg btn-primary btn-lg-square rounded-circle me-2"
                  to={settingData.linkedin}
                  target="_blank"
                >
                  <i className="fab fa-linkedin-in"></i>
                </Link>
                <Link
                  className="btn btn-lg btn-primary btn-lg-square rounded-circle"
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
      <div className="container-fluid bg-dark text-light border-top border-secondary py-4">
        <div className="container">
          <div className="row g-5">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-md-0">
                &copy;{" "}
                <Link className="text-primary" to="">
                  {settingData.siteName}
                </Link>
                . All Rights Reserved.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <p className="mb-0">
                Designed by{" "}
                <Link
                  className="text-primary"
                  to="https://github.com/arshad-jamal-05"
                  target="_blank"
                >
                  Arshad Jamal
                </Link>
                . Distributed by{" "}
                <Link to="/" target="_blank">
                  {settingData.siteName}
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

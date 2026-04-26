import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSetting } from "../Redux/ActionCreators/SettingActionCreators";
import {
  getContactUs,
  createContactUs,
} from "../Redux/ActionCreators/ContactUsActionCreators";
import FormValidator from "../Validators/FormValidator";

let dataOptions = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};
let errorMessageOptions = {
  name: "Name is required",
  email: "Email Address is required",
  phone: "Phone Number is required",
  subject: "Subject is required",
  message: "Message is required",
};

export default function ContactUsPage() {
  let [data, setData] = useState(dataOptions);
  let [errorMessage, setErrorMessage] = useState(errorMessageOptions);
  let [show, setShow] = useState(false);
  let [message, setMessage] = useState("");
  let [settingData, setSettingData] = useState({
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

  function getInputData(e) {
    let { name, value } = e.target;
    // setData({ ...data, [name]: FormValidator(e) });
    setErrorMessage({ ...errorMessage, [name]: FormValidator(e) });
    setData({ ...data, [name]: value });
  }

  function postData(e) {
    e.preventDefault();
    let error = Object.values(errorMessage).find((x) => x !== "");
    if (error) {
      setShow(true);
    } else {
      dispatch(createContactUs({ ...data, status: true, date: new Date() }));
      setMessage(
        "Thanks to Contact Us, Our Team Will Contact You Soon to Resolve Your Query.",
      );
      setData(dataOptions);
      setErrorMessage(errorMessageOptions);
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

  return (
    <div className="container-fluid pt-5">
      <div className="container">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: "500px" }}>
          <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">
            Any Questions?
          </h5>
          <h1 className="display-4">Please Feel Free To Contact Us</h1>
        </div>
        <div className="row g-5 mb-5">
          <div className="col-lg-4">
            <div
              className="bg-light rounded d-flex flex-column align-items-center justify-content-center text-center"
              style={{ height: "200px" }}
            >
              <div
                className="d-flex align-items-center justify-content-center bg-primary rounded-circle mb-4"
                style={{
                  width: "100px",
                  height: "70px",
                  transform: "rotate(-15deg)",
                }}
              >
                <i
                  className="fa fa-2x fa-location-arrow text-white"
                  style={{ transform: "rotate(15deg)" }}
                ></i>
              </div>
              <Link to={settingData.map1} target="_blank" className="mb-0">
                {settingData.address}
              </Link>
            </div>
          </div>
          <div className="col-lg-4">
            <div
              className="bg-light rounded d-flex flex-column align-items-center justify-content-center text-center"
              style={{ height: "200px" }}
            >
              <div
                className="d-flex align-items-center justify-content-center bg-primary rounded-circle mb-4"
                style={{
                  width: "100px",
                  height: "70px",
                  transform: "rotate(-15deg)",
                }}
              >
                <i
                  className="fa fa-2x fa-phone text-white"
                  style={{ transform: "rotate(15deg)" }}
                ></i>
              </div>
              <Link
                to={`tel:${settingData.phone}`}
                target="_blank"
                className="mb-0"
              >
                {settingData.phone}
              </Link>
            </div>
          </div>
          <div className="col-lg-4">
            <div
              className="bg-light rounded d-flex flex-column align-items-center justify-content-center text-center"
              style={{ height: "200px" }}
            >
              <div
                className="d-flex align-items-center justify-content-center bg-primary rounded-circle mb-4"
                style={{
                  width: "100px",
                  height: "70px",
                  transform: "rotate(-15deg)",
                }}
              >
                <i
                  className="fa fa-2x fa-envelope-open text-white"
                  style={{ transform: "rotate(15deg)" }}
                ></i>
              </div>
              <Link
                to={`mailto:${settingData.email}`}
                target="_blank"
                className="mb-0"
              >
                {settingData.email}
              </Link>
            </div>
          </div>
          <div className="col-lg-4">
            <div
              className="bg-light rounded d-flex flex-column align-items-center justify-content-center text-center"
              style={{ height: "200px" }}
            >
              <div
                className="d-flex align-items-center justify-content-center bg-primary rounded-circle mb-4"
                style={{
                  width: "100px",
                  height: "70px",
                  transform: "rotate(-15deg)",
                }}
              >
                <i
                  className="fa fa-2x bi bi-whatsapp text-white"
                  style={{ transform: "rotate(15deg)" }}
                ></i>
              </div>
              <Link
                to={`https://wa.me/${settingData.whatsapp}`}
                target="_blank"
                className="mb-0"
              >
                {settingData.whatsapp}
              </Link>
            </div>
          </div>
          <div className="col-lg-4">
            <div
              className="bg-light rounded d-flex flex-column align-items-center justify-content-center text-center"
              style={{ height: "200px" }}
            >
              <div
                className="d-flex align-items-center justify-content-center bg-primary rounded-circle mb-4"
                style={{
                  width: "100px",
                  height: "70px",
                  transform: "rotate(-15deg)",
                }}
              >
                <i
                  className="fa fa-2x bi bi-facebook text-white"
                  style={{ transform: "rotate(15deg)" }}
                ></i>
              </div>
              <Link
                to={`${settingData.facebook}`}
                target="_blank"
                className="mb-0"
              >
                Facebook
              </Link>
            </div>
          </div>
          <div className="col-lg-4">
            <div
              className="bg-light rounded d-flex flex-column align-items-center justify-content-center text-center"
              style={{ height: "200px" }}
            >
              <div
                className="d-flex align-items-center justify-content-center bg-primary rounded-circle mb-4"
                style={{
                  width: "100px",
                  height: "70px",
                  transform: "rotate(-15deg)",
                }}
              >
                <i
                  className="fa fa-2x bi bi-twitter text-white"
                  style={{ transform: "rotate(15deg)" }}
                ></i>
              </div>
              <Link
                to={`${settingData.twitter}`}
                target="_blank"
                className="mb-0"
              >
                Twitter
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12" style={{ height: "500px" }}>
            <div className="position-relative h-100">
              <iframe
                className="position-relative w-100 h-100"
                src={settingData.map1}
              ></iframe>
            </div>
          </div>
        </div>
        <div
          className="row justify-content-center position-relative"
          style={{ marginTop: "-200px", zIndex: 1 }}
        >
          <div className="col-lg-8">
            <div className="bg-white rounded p-5 m-5 mb-0">
              {message ? (
                <p className="text-success text-center">{message}</p>
              ) : null}
              <form onSubmit={postData}>
                <div className="row g-3">
                  <div className="col-12">
                    <input
                      type="text"
                      name="name"
                      value={data.name}
                      onChange={getInputData}
                      className={`form-control bg-light ${show && errorMessage.name ? "border-danger" : "border-primary"} border-0`}
                      placeholder="Your Name"
                      style={{ height: "55px" }}
                    />
                    {show && errorMessage.name ? (
                      <p className="text-danger">{errorMessage.name}</p>
                    ) : null}
                  </div>
                  <div className="col-12">
                    <input
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={getInputData}
                      className={`form-control bg-light ${show && errorMessage.email ? "border-danger" : "border-primary"} border-0`}
                      placeholder="Your Email"
                      style={{ height: "55px" }}
                    />
                    {show && errorMessage.email ? (
                      <p className="text-danger">{errorMessage.email}</p>
                    ) : null}
                  </div>
                  <div className="col-12">
                    <input
                      type="tel"
                      name="phone"
                      pattern="[6-9]{1}[0-9]{9}"
                      maxLength={10}
                      minLength={10}
                      value={data.phone}
                      onChange={getInputData}
                      className={`form-control bg-light ${show && errorMessage.phone ? "border-danger" : "border-primary"} border-0`}
                      placeholder="Your Phone Number"
                      style={{ height: "55px" }}
                    />
                    {show && errorMessage.phone ? (
                      <p className="text-danger">{errorMessage.phone}</p>
                    ) : null}
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      name="subject"
                      value={data.subject}
                      onChange={getInputData}
                      className={`form-control bg-light ${show && errorMessage.subject ? "border-danger" : "border-primary"} border-0`}
                      placeholder="Subject"
                      style={{ height: "55px" }}
                    />
                    {show && errorMessage.subject ? (
                      <p className="text-danger">{errorMessage.subject}</p>
                    ) : null}
                  </div>
                  <div className="col-12">
                    <textarea
                      name="message"
                      value={data.message}
                      onChange={getInputData}
                      className={`form-control bg-light ${show && errorMessage.message ? "border-danger" : "border-primary"} border-0`}
                      rows="5"
                      placeholder="Message"
                    ></textarea>
                    {show && errorMessage.message ? (
                      <p className="text-danger">{errorMessage.message}</p>
                    ) : null}
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormValidator from "../../Validators/FormValidator";

export default function SignUpPage() {
  let [data, setData] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    cpassword: "",
  });

  let [errorMessage, setErrorMessage] = useState({
    name: "Name is Required",
    username: "Username is Required",
    phone: "Phone Number is Required",
    email: "Email Address is Required",
    password: "Password is Required",
  });

  let [show, setShow] = useState(false);

  let navigate = useNavigate("");

  function getInputData(e) {
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
    setErrorMessage({ ...errorMessage, [name]: FormValidator(e) });
  }

  async function postData(e) {
    e.preventDefault();
    let error = Object.values(errorMessage).find((x) => x !== "");
    if (error) {
      setShow(true);
    } else {
      if (data.password !== data.cpassword) {
        setErrorMessage({
          ...errorMessage,
          password: "Password and Confirm Password Does Not Matched",
        });
        setShow(true);
        return;
      }

      let response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_SERVER}/api/user`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "authorization": import.meta.env.VITE_APP_PUBLIC_TOKEN,
          },
          body: JSON.stringify({
            name: data.name,
            username: data.username,
            phone: data.phone,
            email: data.email,
            password: data.password,
            role: "Buyer",
            status: true,
          }),
        },
      );
      response = await response.json();
      if (response.result === "Done") {
        navigate("/login");
      } else {
        setShow(true);
        setErrorMessage({
          ...errorMessage,
          ...response.reason,
        });
      }
    }
  }

  return (
    <div className="container-fluid">
      <div className="container my-3">
        <div className="col-lg-8 col-md-10 col-sm-11 m-auto">
          <h5 className="bg-primary text-center p-2 text-light rounded">
            Create Your Free Account
          </h5>
          <form onSubmit={postData}>
            <div className="row">
              <div className="col-lg-6 mb-3">
                <label>Name*</label>
                <input
                  type="text"
                  name="name"
                  onChange={getInputData}
                  placeholder="Full Name"
                  className={`form-control ${show && errorMessage.name ? "border-danger" : "border-primary"}`}
                />
                {show && errorMessage.name ? (
                  <p className="text-danger">{errorMessage.name}</p>
                ) : null}
              </div>
              <div className="col-lg-6 mb-3">
                <label>Username*</label>
                <input
                  type="text"
                  name="username"
                  onChange={getInputData}
                  placeholder="Username"
                  className={`form-control ${show && errorMessage.username ? "border-danger" : "border-primary"}`}
                />
                {show && errorMessage.username ? (
                  <p className="text-danger">{errorMessage.username}</p>
                ) : null}
              </div>
              <div className="col-lg-6 mb-3">
                <label>Phone Number*</label>
                <input
                  type="tel"
                  name="phone"
                  onChange={getInputData}
                  placeholder="Phone Number"
                  pattern="[6-9]{1}[0-9]{9}"
                  maxLength={10}
                  minLength={10}
                  className={`form-control ${show && errorMessage.phone ? "border-danger" : "border-primary"}`}
                />
                {show && errorMessage.phone ? (
                  <p className="text-danger">{errorMessage.phone}</p>
                ) : null}
              </div>
              <div className="col-lg-6 mb-3">
                <label>Email Address*</label>
                <input
                  type="email"
                  name="email"
                  onChange={getInputData}
                  placeholder="Email Address"
                  className={`form-control ${show && errorMessage.email ? "border-danger" : "border-primary"}`}
                />
                {show && errorMessage.email ? (
                  <p className="text-danger">{errorMessage.email}</p>
                ) : null}
              </div>
              <div className="col-lg-6 mb-3">
                <label>Password*</label>
                <input
                  type="password"
                  name="password"
                  onChange={getInputData}
                  placeholder="Password"
                  className={`form-control ${show && errorMessage.password ? "border-danger" : "border-primary"}`}
                />
                {show && errorMessage.password ? (
                  <p className="text-danger">{errorMessage.password}</p>
                ) : null}
              </div>
              <div className="col-lg-6 mb-3">
                <label>Confirm Password*</label>
                <input
                  type="password"
                  name="cpassword"
                  onChange={getInputData}
                  placeholder="Confirm Password"
                  className={`form-control ${show && errorMessage.password ? "border-danger" : "border-primary"}`}
                />
              </div>
              <div className="col-12 mb-3">
                <button type="submit" className="btn btn-primary w-100">
                  SignUp
                </button>
              </div>
            </div>
          </form>
          <Link to="/login">Already Have An Account? LogIn </Link>
        </div>
      </div>
    </div>
  );
}

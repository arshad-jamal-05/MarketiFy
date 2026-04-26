import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ForgetPassword2Page() {
  let [otp, setOtp] = useState("");

  let [errorMessage, setErrorMessage] = useState("");

  let navigate = useNavigate();

  function getInputData(e) {
    setOtp(e.target.value);
  }

  async function postData(e) {
    e.preventDefault();
    let response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND_SERVER}/api/user/forget-password-2`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: import.meta.env.VITE_APP_PUBLIC_TOKEN,
        },
        body: JSON.stringify({
          username: sessionStorage.getItem("forget-password-username"),
          otp: otp,
        }),
      },
    );
    response = await response.json();

    if (response.result === "Done") {
      navigate("/forget-password-3");
    } else {
      setErrorMessage(response.reason);
    }
  }

  return (
    <div className="container-fluid">
      <div className="container my-3">
        <div className="col-lg-8 col-md-10 col-sm-11 m-auto">
          <h5 className="bg-primary text-center p-2 text-light rounded">
            Recover Your Account
          </h5>
          <form onSubmit={postData}>
            <div className="row">
              <div className="col-12 mb-3">
                <label>OTP*</label>
                <input
                  type="text"
                  name="otp"
                  onChange={getInputData}
                  placeholder="Enter OTP Which Is Sent Your Registered Email Address"
                  className={`form-control ${errorMessage ? "border-danger" : "border-primary"}`}
                />
                {errorMessage ? (
                  <p className="text-danger">{errorMessage}</p>
                ) : null}
              </div>
              <div className="col-12 mb-3">
                <button type="submit" className="btn btn-primary w-100">
                  Submit OTP
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

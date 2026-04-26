import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ForgetPassword1Page() {
  let [username, setUsername] = useState("");

  let [errorMessage, setErrorMessage] = useState("");

  let navigate = useNavigate();

  function getInputData(e) {
    setUsername(e.target.value);
  }

  async function postData(e) {
    e.preventDefault();
    let response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND_SERVER}/api/user/forget-password-1`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: import.meta.env.VITE_APP_PUBLIC_TOKEN,
        },
        body: JSON.stringify({ username: username }),
      },
    );
    response = await response.json();

    if (response.result === "Done") {
      sessionStorage.setItem("forget-password-username", username);
      navigate("/forget-password-2");
    } else {
      setErrorMessage(
        "User Not Found ! Please Provide Correct Username or Email Address",
      );
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
                <label>Username*</label>
                <input
                  type="text"
                  name="username"
                  onChange={getInputData}
                  placeholder="Username Or Email Address"
                  className={`form-control ${errorMessage ? "border-danger" : "border-primary"}`}
                />
                {errorMessage ? (
                  <p className="text-danger">{errorMessage}</p>
                ) : null}
              </div>
              <div className="col-12 mb-3">
                <button type="submit" className="btn btn-primary w-100">
                  Send OTP
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

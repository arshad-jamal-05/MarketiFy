import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ForgetPassword3Page() {
  let [password, setPassword] = useState("");
  let [cpassword, setCPassword] = useState("");

  let [errorMessage, setErrorMessage] = useState("");

  let navigate = useNavigate();

  function getInputData(e) {
    if (e.target.name === "password") {
      setPassword(e.target.value);
    } else {
      setCPassword(e.target.value);
    }
  }

  async function postData(e) {
    e.preventDefault();
    if(password !== cpassword){
      setErrorMessage("Password And Confirm Password Does Not Matched");
      return;
    }
    let response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND_SERVER}/api/user/forget-password-3`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: import.meta.env.VITE_APP_PUBLIC_TOKEN,
        },
        body: JSON.stringify({
          username: sessionStorage.getItem("forget-password-username"),
          password: password,
        }),
      },
    );
    response = await response.json();

    if (response.result === "Done") {
      sessionStorage.removeItem("forget-password-username");
      navigate("/login");
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
                <label>Password*</label>
                <input
                  type="password"
                  name="password"
                  onChange={getInputData}
                  placeholder="Enter New Password"
                  className={`form-control ${errorMessage ? "border-danger" : "border-primary"}`}
                />
                {errorMessage ? (
                  <p className="text-danger">{errorMessage}</p>
                ) : null}
              </div>
              <div className="col-12 mb-3">
                <label>Confirm Password*</label>
                <input
                  type="password"
                  name="cpassword"
                  onChange={getInputData}
                  placeholder="Confirm New Password"
                  className={`form-control ${errorMessage ? "border-danger" : "border-primary"}`}
                />
                {errorMessage ? (
                  <p className="text-danger">{errorMessage}</p>
                ) : null}
              </div>
              <div className="col-12 mb-3">
                <button type="submit" className="btn btn-primary w-100">
                  Change Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

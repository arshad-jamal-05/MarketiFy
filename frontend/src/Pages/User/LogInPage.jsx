import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LogInPage() {
  let [data, setData] = useState({
    username: "",
    password: "",
  });

  let [errorMessage, setErrorMessage] = useState("");

  let navigate = useNavigate();

  function getInputData(e) {
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function postData(e) {
    e.preventDefault();
    let response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND_SERVER}/api/user/login`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "authorization": import.meta.env.VITE_APP_PUBLIC_TOKEN,
        },
        body: JSON.stringify({...data}),
      },
    );
    response = await response.json();

    if (response.result === "Done") {
      if (response.result === "Done" && response.data.status === false) {
        setErrorMessage(
          "Your Account Has Been Blocked Due To Some Unauthorized Activity, Please Contact Us To Recover Your Account",
        );
      } else {
        localStorage.setItem("login", true);
        localStorage.setItem("userid", response.data._id);
        localStorage.setItem("token", response.token);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("role", response.data.role);
        if (response.data.role === "Buyer") {
          navigate("/profile");
        } else if (
          response.data.role === "Admin" ||
          response.data.role === "Super Admin"
        ) {
          navigate("/admin");
        } else {
          navigate("/login");
        }
      }
    } else {
      setErrorMessage("Invalid Username Or Password");
    }
  }

  return (
    <div className="container-fluid">
      <div className="container my-3">
        <div className="col-lg-8 col-md-10 col-sm-11 m-auto">
          <h5 className="bg-primary text-center p-2 text-light rounded">
            LogIn To Your Account
          </h5>
          {/* {errorMessage ? (
            <p className="text-danger">{errorMessage}</p>
          ) : null} */}
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
                <label>Password*</label>
                <input
                  type="password"
                  name="password"
                  onChange={getInputData}
                  placeholder="Password"
                  className={`form-control ${errorMessage ? "border-danger" : "border-primary"}`}
                />
              </div>
              <div className="col-12 mb-3">
                <button type="submit" className="btn btn-primary w-100">
                  LogIn
                </button>
              </div>
            </div>
          </form>
          <div className="d-flex justify-content-between">
            <Link to="#">Forget Password?</Link>
            <Link to="/signup">Don't Have An Account? SignUp</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

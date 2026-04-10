import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  createUser,
} from "../../../Redux/ActionCreators/UserActionCreators";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import FormValidator from "../../../Validators/FormValidator";

export default function AdminUserCreatePage() {
  let [data, setData] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    role: "Admin",
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

  let UserStateData = useSelector((state) => state.UserStateData);
  let dispatch = useDispatch();

  let navigate = useNavigate();

  function getInputData(e) {
    let { name, value } = e.target;

    setData({
      ...data,
      [name]: name === "status" ? (value === "1" ? true : false) : value,
    });

    setErrorMessage({
      ...errorMessage,
      [name]: FormValidator(e),
    });
  }

  function postData(e) {
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

      let item = UserStateData.find(
        (x) =>
          x.username.toLocaleLowerCase() ===
            data.username.toLocaleLowerCase() ||
          x.email.toLocaleLowerCase() === data.email.toLocaleLowerCase(),
      );
      if (item) {
        setShow(true);
        setErrorMessage({
          ...errorMessage,
          username:
            item.username.toLocaleLowerCase() ===
            data.username.toLocaleLowerCase()
              ? "Username Already Taken"
              : "",
          email:
            item.email.toLocaleLowerCase() === data.email.toLocaleLowerCase()
              ? "Email Address Already Taken"
              : "",
        });
      } else {
        dispatch(
          createUser({
            // ...data,
            name: data.name,
            username: data.username,
            phone: data.phone,
            email: data.email,
            password: data.password,
            role: data.role,
            status: true,
            option: "Admin",
          }),
        );
        navigate("/admin/users");
      }
    }
  }

  useEffect(() => {
    (() => {
      dispatch(getUser());
    })();
  }, [UserStateData.length]);

  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-lg-3">
          <AdminSidebar />
        </div>
        <div className="col-lg-9">
          <h5 className="bg-primary text-center p-2 text-light">
            Create User
            <Link to="/admin/users">
              <i className="bi bi-arrow-left text-light fs-4 float-end"></i>
            </Link>
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
              <div className="col-lg-6 mb-3">
                <label>Role*</label>
                <select
                  name="role"
                  value={data.role}
                  onChange={getInputData}
                  className="form-select border-primary"
                >
                  <option>Admin</option>
                  <option>Super Admin</option>
                </select>
              </div>
              <div className="col-lg-6 mb-3">
                <label>Status*</label>
                <select
                  name="status"
                  onChange={getInputData}
                  className="form-select border-primary"
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
              <div className="col-12 mb-3">
                <button type="submit" className="btn btn-primary w-100">
                  SignUp
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

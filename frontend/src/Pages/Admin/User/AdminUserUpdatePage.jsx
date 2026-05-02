import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  updateUser,
} from "../../../Redux/ActionCreators/UserActionCreators";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import FormValidator from "../../../Validators/FormValidator";

export default function AdminUserUpdatePage() {
  let { _id } = useParams();

  let [data, setData] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    role: "Admin",
  });

  let [errorMessage, setErrorMessage] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
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
      let item = UserStateData.find(
        (x) =>
          x._id !== id &&
          (x.username.toLocaleLowerCase() ===
            data.username.toLocaleLowerCase() ||
            x.email.toLocaleLowerCase() === data.email.toLocaleLowerCase()),
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
          updateUser({
            ...data,
          }),
        );
        navigate("/admin/users");
      }
    }
  }

  useEffect(() => {
    (() => {
      dispatch(getUser());
      if (UserStateData) {
        let item = UserStateData.find((x) => x._id === _id);
        if (item) {
          setData({ ...data, ...item });
        } else {
          navigate("/admin/users");
        }
      }
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
            Update User
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
                  value={data.name}
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
                  value={data.username}
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
                  value={data.phone}
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
                  value={data.email}
                  onChange={getInputData}
                  placeholder="Email Address"
                  className={`form-control ${show && errorMessage.email ? "border-danger" : "border-primary"}`}
                />
                {show && errorMessage.email ? (
                  <p className="text-danger">{errorMessage.email}</p>
                ) : null}
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
                <label>Status</label>
                <select
                  name="status"
                  value={data.status ? "1" : "0"}
                  onChange={getInputData}
                  className="form-select border-primary"
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
              <div className="col-12 mb-3">
                <button type="submit" className="btn btn-primary w-100">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getFeatures,
  createFeatures,
} from "../../../Redux/ActionCreators/FeaturesActionCreators";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import FormValidator from "../../../Validators/FormValidator";

export default function AdminFeaturesCreatePage() {
  let [data, setData] = useState({
    name: "",
    icon: "",
    shortDescription: "",
    status: true,
  });

  let [errorMessage, setErrorMessage] = useState({
    name: "Name is required",
    icon: "Icon is required",
    shortDescription: "Short Description is required",
  });

  let [show, setShow] = useState(false);

  let FeaturesStateData = useSelector((state) => state.FeaturesStateData);
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
      let item = FeaturesStateData.find(
        (x) => x.name?.toLowerCase() === data.name?.toLowerCase(),
      );
      if (item) {
        setErrorMessage({
          ...errorMessage,
          name: "Features With This Name Already Exists",
        });
        setShow(true);
      } else {
        dispatch(createFeatures({ ...data }));
        navigate("/admin/features");
      }
    }
  }

  useEffect(() => {
    (() => {
      dispatch(getFeatures());
    })();
  }, [FeaturesStateData.length]);

  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-lg-3">
          <AdminSidebar />
        </div>
        <div className="col-lg-9">
          <h5 className="bg-primary text-center p-2 text-light">
            Create Features
            <Link to="/admin/features">
              <i className="bi bi-arrow-left text-light fs-4 float-end"></i>
            </Link>
          </h5>
          <form onSubmit={postData}>
            <div className="row">
              <div className="col-12 mb-3">
                <label>Name*</label>
                <input
                  type="text"
                  name="name"
                  onChange={getInputData}
                  placeholder="Features Name"
                  className={`form-control ${show && errorMessage.name ? "border-danger" : "border-primary"}`}
                />
                {show && errorMessage.name ? (
                  <p className="text-danger">{errorMessage.name}</p>
                ) : null}
              </div>
              <div className="col-12 mb-3">
                <label>Short Description*</label>
                <textarea
                  name="shortDescription"
                  onChange={getInputData}
                  placeholder="Short Description"
                  rows={4}
                  className={`form-control ${show && errorMessage.shortDescription ? "border-danger" : "border-primary"}`}
                ></textarea>
                {show && errorMessage.shortDescription ? (
                  <p className="text-danger">{errorMessage.shortDescription}</p>
                ) : null}
              </div>
              <div className="col-lg-6 mb-3">
                <label>Icon*</label>
                <input
                  type="text"
                  name="icon"
                  placeholder="Icon Tag eg. <i class='bi bi-list'></i>"
                  onChange={getInputData}
                  className={`form-control ${show && errorMessage.icon ? "border-danger" : "border-primary"}`}
                />
                {show && errorMessage.icon ? (
                  <p className="text-danger">{errorMessage.icon}</p>
                ) : null}
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
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

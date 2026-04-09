import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getFAQ,
  createFAQ,
} from "../../../Redux/ActionCreators/FAQActionCreators";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import FormValidator from "../../../Validators/FormValidator";

export default function AdminFAQCreatePage() {
  let [data, setData] = useState({
    question: "",
    answer: "",
    status: true,
  });

  let [errorMessage, setErrorMessage] = useState({
    question: "Question is Required",
    answer: "Answer is Required",
  });

  let [show, setShow] = useState(false);

  let FAQStateData = useSelector((state) => state.FAQStateData);
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
      let item = FAQStateData.find(
        (x) => x.question?.toLowerCase() === data.question?.toLowerCase(),
      );
      if (item) {
        setErrorMessage({
          ...errorMessage,
          name: "FAQ With This Question Already Exists",
        });
        setShow(true);
      } else {
        dispatch(createFAQ({ ...data }));
        navigate("/admin/faq");
      }
    }
  }

  useEffect(() => {
    (() => {
      dispatch(getFAQ());
    })();
  }, [FAQStateData.length]);

  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-lg-3">
          <AdminSidebar />
        </div>
        <div className="col-lg-9">
          <h5 className="bg-primary text-center p-2 text-light">
            Create FAQ
            <Link to="/admin/faq">
              <i className="bi bi-arrow-left text-light fs-4 float-end"></i>
            </Link>
          </h5>
          <form onSubmit={postData}>
            <div className="row">
              <div className="col-12 mb-3">
                <label>Question*</label>
                <input
                  type="text"
                  name="question"
                  placeholder="Question"
                  onChange={getInputData}
                  className={`form-control ${show && errorMessage.question ? "border-danger" : "border-primary"}`}
                />
                {show && errorMessage.question ? (
                  <p className="text-danger">{errorMessage.question}</p>
                ) : null}
              </div>
              <div className="col-12 mb-3">
                <label>Answer*</label>
                <textarea
                  name="answer"
                  onChange={getInputData}
                  placeholder="Answer"
                  rows={4}
                  className={`form-control ${show && errorMessage.answer ? "border-danger" : "border-primary"}`}
                ></textarea>
                {show && errorMessage.answer ? (
                  <p className="text-danger">{errorMessage.answer}</p>
                ) : null}
              </div>
              <div className="col-lg-12 mb-3">
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

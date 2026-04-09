import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import {
  getContactUs,
  updateContactUs,
  deleteContactUs,
} from "../../../Redux/ActionCreators/ContactUsActionCreators";

export default function AdminContactUsShowPage() {
  let { _id } = useParams();
  let [data, setData] = useState({});
  let [flag, setFlag] = useState(false);
  let ContactUsStateData = useSelector((state) => state.ContactUsStateData);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  function deleteRecord() {
    if (window.confirm("Are You Sure You Want To Delete This Record?")) {
      dispatch(deleteContactUs({ _id: _id }));
      navigate("/admin/contactus");
    }
  }

  function updateRecord() {
    data.status = !data.status;
    dispatch(updateContactUs({ ...data }));
    setFlag(!flag);
  }

  useEffect(() => {
    (() => {
      dispatch(getContactUs());
      if (ContactUsStateData.length) {
        let item = ContactUsStateData.find((x) => x._id === _id);
        if (item) {
          setData({ ...item });
        } else {
          navigate("/admin/contactus");
        }
      }
    })();
  }, [ContactUsStateData.length]);

  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-lg-3">
          <AdminSidebar />
        </div>
        <div className="col-lg-9">
          <h5 className="bg-primary text-center p-2 text-light">
            Contact Us Query
            <Link to="/admin/contactus">
              <i className="bi bi-arrow-left text-light fs-4 float-end"></i>
            </Link>
          </h5>
          <table className="table table-bordered table-responsive">
            <tbody>
              <tr>
                <th>ID</th>
                <td>{data._id}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{data.name}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{data.email}</td>
              </tr>
              <tr>
                <th>Subject</th>
                <td>{data.subject}</td>
              </tr>
              <tr>
                <th>Message</th>
                <td>{data.message}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{data.status ? "Active" : "Inactive"}</td>
              </tr>
              <tr>
                <th>Date</th>
                <td>{new Date(data.date).toDateString()}</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  {data.status ? (
                    <button
                      className="btn btn-primary w-100"
                      onClick={updateRecord}
                    >
                      Update Status
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger w-100"
                      onClick={deleteRecord}
                    >
                      Delete Status
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

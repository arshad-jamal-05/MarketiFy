import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import DataTable from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import {
  getNewsletter,
  updateNewsletter,
  deleteNewsletter,
} from "../../../Redux/ActionCreators/NewsletterActionCreators";

export default function AdminNewsletterPage() {
  let [data, setData] = useState([]);
  let NewsletterStateData = useSelector((state) => state.NewsletterStateData);
  let dispatch = useDispatch();

  function deleteRecord(_id) {
    if (window.confirm("Are You Sure You Want To Delete This Record?")) {
      dispatch(deleteNewsletter({ _id: _id }));
      setData(data.filter((x) => x._id !== _id));
    }
  }

  function updateRecord(_id) {
    let index = data.findIndex((x) => x._id === _id);
    data[index].status = !data[index].status;
    dispatch(updateNewsletter({ ...data[index] }));
    setData([...data]);
  }

  useEffect(() => {
    let time = (() => {
      dispatch(getNewsletter());
      if (NewsletterStateData) {
        setData(NewsletterStateData);
      } else {
        setData([]);
      }
      let time = setTimeout(() => {
        new DataTable("#myTable");
      }, 500);
      return time;
    })();
    return () => {
      clearTimeout(time);
    };
  }, [NewsletterStateData.length]);

  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-lg-3">
          <AdminSidebar />
        </div>
        <div className="col-lg-9">
          <h5 className="bg-primary text-center p-2 text-light">Newsletter</h5>
          <div className="table-responsive">
            <table className="table table-bordered" id="myTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.email}</td>
                      <td
                        style={{ cursor: "pointer" }}
                        title="Click Here to Change the Status"
                        onClick={() => updateRecord(item._id)}
                      >
                        {item.status ? "Active" : "Inactive"}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteRecord(item._id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

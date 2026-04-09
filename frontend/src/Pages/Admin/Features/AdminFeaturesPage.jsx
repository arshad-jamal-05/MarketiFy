import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import DataTable from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import {
  getFeatures,
  deleteFeatures,
} from "../../../Redux/ActionCreators/FeaturesActionCreators";

export default function AdminFeaturesPage() {
  let [data, setData] = useState([]);
  let FeaturesStateData = useSelector((state) => state.FeaturesStateData);
  let dispatch = useDispatch();

  function deleteRecord(_id) {
    if (window.confirm("Are You Sure You Want To Delete This Record?")) {
      dispatch(deleteFeatures({ _id: _id }));
      setData(data.filter((x) => x._id !== _id));
    }
  }

  useEffect(() => {
    let time = (() => {
      dispatch(getFeatures());
      if (FeaturesStateData) {
        setData(FeaturesStateData);
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
  }, [FeaturesStateData.length]);

  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-lg-3">
          <AdminSidebar />
        </div>
        <div className="col-lg-9">
          <h5 className="bg-primary text-center p-2 text-light">
            Features
            <Link to="/admin/features/create">
              <i className="bi bi-plus text-light fs-4 float-end"></i>
            </Link>
          </h5>
          <div className="table-responsive">
            <table className="table table-bordered" id="myTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Icon</th>
                  <th>Short Description</th>
                  <th>Status</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>
                        <span
                          className="fs-1"
                          dangerouslySetInnerHTML={{ __html: item.icon }}
                        />
                      </td>
                      <td>{item.shortDescription}</td>
                      <td>{item.status ? "Active" : "Inactive"}</td>
                      <td>
                        <Link
                          to={`/admin/features/update/${item._id}`}
                          className="btn btn-primary"
                        >
                          <i className="bi bi-pencil"></i>
                        </Link>
                      </td>
                      {/* <td>
                        <Link
                          to={`/admin/features/update/${item._id}`}
                          className="btn btn-danger"
                          onClick={() => deleteRecord(item._id)}
                        >
                          <i className="bi bi-trash"></i>
                        </Link>
                      </td> */}
                      <td>
                        {localStorage.getItem("role") === "Super Admin" ? (
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteRecord(item._id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        ) : null}
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

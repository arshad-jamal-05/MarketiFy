import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import DataTable from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import {
  getBrand,
  deleteBrand,
} from "../../../Redux/ActionCreators/BrandActionCreators";

export default function AdminBrandPage() {
  let [data, setData] = useState([]);
  let BrandStateData = useSelector((state) => state.BrandStateData);
  let dispatch = useDispatch();

  function deleteRecord(_id) {
    if (window.confirm("Are You Sure You Want To Delete This Record?")) {
      dispatch(deleteBrand({ _id: _id }));
      setData(data.filter((x) => x._id !== _id));
    }
  }

  useEffect(() => {
    let time = (() => {
      dispatch(getBrand());
      if (BrandStateData) {
        setData(BrandStateData);
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
  }, [BrandStateData.length]);

  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-lg-3">
          <AdminSidebar />
        </div>
        <div className="col-lg-9">
          <h5 className="bg-primary text-center p-2 text-light">
            Brand
            <Link to="/admin/brand/create">
              <i className="bi bi-plus text-light fs-4 float-end"></i>
            </Link>
          </h5>
          <div className="table-responsive">
            <table className="table table-bordered" id="myTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Pic</th>
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
                        <Link
                          to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`}
                          target="_blank"
                          rel="noreferror"
                        >
                          <img
                            src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`}
                            height={70}
                            alt=""
                          />
                        </Link>
                      </td>
                      <td>{item.status ? "Active" : "Inactive"}</td>
                      <td>
                        <Link
                          to={`/admin/brand/update/${item._id}`}
                          className="btn btn-primary"
                        >
                          <i className="bi bi-pencil"></i>
                        </Link>
                      </td>
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

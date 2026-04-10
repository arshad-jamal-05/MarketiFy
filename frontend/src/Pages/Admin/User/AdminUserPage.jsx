import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import DataTable from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import {
  getUser,
  deleteUser,
  updateUser,
} from "../../../Redux/ActionCreators/UserActionCreators";

export default function AdminUserPage() {
  let [data, setData] = useState([]);
  let UserStateData = useSelector((state) => state.UserStateData);
  let dispatch = useDispatch();

  function deleteRecord(_id) {
    if (window.confirm("Are You Sure You Want To Delete This Record?")) {
      dispatch(deleteUser({ _id: _id }));
      setData(data.filter((x) => x._id !== _id));
    }
  }

  function updateRecord(_id) {
    let index = data.findIndex((x) => x._id === _id);
    data[index].status = !data[index].status;
    dispatch(updateUser({ ...data[index] }));
    setData([...data]);
  }

  useEffect(() => {
    let time = (() => {
      dispatch(getUser());
      if (UserStateData) {
        setData(UserStateData);
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
  }, [UserStateData.length]);

  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-lg-3">
          <AdminSidebar />
        </div>
        <div className="col-lg-9">
          <h5 className="bg-primary text-center p-2 text-light">
            User
            <Link to="/admin/users/create">
              <i className="bi bi-plus text-light fs-4 float-end"></i>
            </Link>
          </h5>
          <div className="table-responsive">
            <table className="table table-bordered" id="myTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
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
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.role}</td>
                      {/* <td>
                        <span
                          className="fs-1"
                          dangerouslySetInnerHTML={{ __html: item.icon }}
                        />
                      </td> */}
                      <td
                        style={{ cursor: "pointer" }}
                        title="Click Here to Change the Status"
                        onClick={() => updateRecord(item._id)}
                      >
                        {item.status ? "Active" : "Inactive"}
                      </td>
                      <td>
                        {item.role === "Buyer" ? null : (
                          <Link
                            to={`/admin/users/update/${item._id}`}
                            className="btn btn-primary"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                        )}
                      </td>
                      {/* <td>
                        <Link
                          to={`/admin/user/update/${item._id}`}
                          className="btn btn-primary"
                        >
                          <i className="bi bi-pencil"></i>
                        </Link>
                      </td> */}
                      <td>
                        <Link
                          to={`/admin/users/update/${item._id}`}
                          className="btn btn-danger"
                          onClick={() => deleteRecord(item._id)}
                        >
                          <i className="bi bi-trash"></i>
                        </Link>
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

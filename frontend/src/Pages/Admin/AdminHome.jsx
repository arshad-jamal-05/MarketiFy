import React, { useEffect, useState } from "react";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import { useNavigate } from "react-router-dom";

export default function AdminHome() {
  let [data, setData] = useState({});
  let navigate = useNavigate();
  
  useEffect(() => {
    (async () => {
      let response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_SERVER}/api/user/${localStorage.getItem("userid")}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            "authorization": localStorage.getItem("token"),
          },
        },
      );
      response = await response.json();
      if (response.result === "Done") {
        setData(response.data);
      } else {
        navigate("/login");
      }
    })();
  });
  
  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-lg-3">
          <AdminSidebar />
        </div>
        <div className="col-lg-9">
          <h5 className="bg-primary text-center p-2 text-light">Admin Home</h5>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{data.name}</td>
              </tr>
              <tr>
                <th>Username</th>
                <td>{data.username}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{data.email}</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>{data.phone}</td>
              </tr>
              <tr>
                <th>Role</th>
                <td>{data.role}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

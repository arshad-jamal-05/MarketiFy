import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile({ option }) {
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
            authorization: localStorage.getItem("token"),
          },
        },
      );
      response = await response.json();
      // setData({ ...response });
      if (response.result === "Done") {
        setData(response.data);
      } else {
        navigate("/login");
      }
    })();
  }, [option]);

  return (
    <div>
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
        </tbody>
      </table>
    </div>
  );
}

import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ErrorPage() {
  let navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (
        localStorage.getItem("login") &&
        window.location.pathname.includes("profile")
      ) {
        navigate(0);
      } else if (
        localStorage.getItem("login") &&
        window.location.pathname === "/admin" && 
        localStorage.getItem("role") !== "Buyer"
      ) {
        navigate(0);
      }
    }, 500);
  }, []);

  return (
    <div className="container-fluid">
      <div className="container my-3">
        <div className="card p-5 text-center">
          <h1>OOPS !!!</h1>
          <h2>404 ! Page Not Found</h2>
          <Link to="/" className="btn btn-outline-primary w-25 m-auto">
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
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

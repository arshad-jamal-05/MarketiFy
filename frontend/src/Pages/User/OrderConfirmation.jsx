import React from "react";
import { Link } from "react-router-dom";

export default function OrderConfirmation() {
  return (
    <div className="container-fluid">
      <div className="container my-3">
        <div className="card p-5 text-center">
          <h1>Thank You</h1>
          <h2>Your Order Has Been Placed</h2>
          <h3>You Can Track Your Order in Profile Page</h3>
          <Link to="/shop" className="btn btn-outline-primary w-25 m-auto">
            Shop
          </Link>
          <Link to="/profile?option=Orders" className="btn btn-outline-primary w-25 m-auto">
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

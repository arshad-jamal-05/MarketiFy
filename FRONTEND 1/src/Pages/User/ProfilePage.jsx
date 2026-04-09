import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import UpdateProfile from "../../Components/User/UpdateProfile";
import Profile from "../../Components/User/Profile";
import Address from "../../Components/User/Address";
import Order from "../../Components/User/Order";
import Wishlist from "../../Components/User/Wishlist";

export default function ProfilePage() {
  let [option, setOption] = useState("Profile");
  let [searchParams] = useSearchParams();

  useEffect(() => {
    (() => {
      setOption(searchParams.get("option") ?? "Profile");
    })();
  }, [searchParams]);

  return (
    <div className="container-fluid my-3">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="list-group">
              <button
                type="button"
                className={`list-group-item list-group-item-action mb-1 ${option === "Profile" ? "active" : ""}`}
                onClick={() => setOption("Profile")}
              >
                Profile
              </button>
              <button
                type="button"
                className={`list-group-item list-group-item-action mb-1 ${option === "Update Profile" ? "active" : ""}`}
                onClick={() => setOption("Update Profile")}
              >
                Update Profile
              </button>
              <button
                type="button"
                className={`list-group-item list-group-item-action mb-1 ${option === "Address" ? "active" : ""}`}
                onClick={() => setOption("Address")}
              >
                Address
              </button>
              <button
                type="button"
                className={`list-group-item list-group-item-action mb-1 ${option === "Orders" ? "active" : ""}`}
                onClick={() => setOption("Orders")}
              >
                Orders
              </button>
              <button
                type="button"
                className={`list-group-item list-group-item-action mb-1 ${option === "Wishlist" ? "active" : ""}`}
                onClick={() => setOption("Wishlist")}
              >
                Wishlist
              </button>
              <Link
                to="/cart"
                className={`list-group-item list-group-item-action mb-1 ${option === "Cart" ? "active" : ""}`}
                onClick={() => setOption("Cart")}
              >
                Cart
              </Link>
              <Link
                to="checkout"
                className={`list-group-item list-group-item-action mb-1 ${option === "Checkout" ? "active" : ""}`}
                onClick={() => setOption("Checkout")}
              >
                Checkout
              </Link>
            </div>
          </div>
          <div className="col-lg-9">
            <div className={`${option === "Profile" ? "d-block" : "d-none"}`}>
              <h5 className="bg-primary text-center p-2 text-light">
                Your Profile
              </h5>
              <Profile option={option} />
            </div>
            <div
              className={`${option === "Update Profile" ? "d-block" : "d-none"}`}
            >
              <h5 className="bg-primary text-center p-2 text-light">
                Update Your Profile Details
              </h5>
              <UpdateProfile setOption={setOption} />
            </div>
            <div className={`${option === "Address" ? "d-block" : "d-none"}`}>
              <h5 className="bg-primary text-center p-2 text-light">
                Manage Your Addresses
              </h5>
              <Address />
            </div>
            <div className={`${option === "Orders" ? "d-block" : "d-none"}`}>
              <h5 className="bg-primary text-center p-2 text-light">
                Your Orders
              </h5>
              <Order />
            </div>
            <div className={`${option === "Wishlist" ? "d-block" : "d-none"}`}>
              <h5 className="bg-primary text-center p-2 text-light">
                Your Wishlist
              </h5>
              <Wishlist />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

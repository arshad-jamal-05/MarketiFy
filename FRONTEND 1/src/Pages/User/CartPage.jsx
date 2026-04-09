import React from "react";
import Cart from "../../Components/User/Cart";

export default function CartPage() {
  return (
    <>
      <div className="container-fluid">
        <div className="container my-3">
          <h5 className="bg-primary text-center text-light p-2">Your Cart</h5>
          <Cart title="Cart" />
        </div>
      </div>
    </>
  );
}

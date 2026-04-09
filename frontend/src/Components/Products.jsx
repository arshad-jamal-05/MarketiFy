import React, { useState } from "react";
import SingleProduct from "./SingleProduct";

export default function Products({ maincategory, data }) {
  let [selected, setSelected] = useState("");

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5">
          <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5 mb-3">
            Our Latest Products
          </h5>
          <div className="d-flex">
            <button
              className={`w-100 btn me-4 ${selected === "" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setSelected("")}
            >
              All
            </button>
            {maincategory.map((item) => {
              return (
                <button
                  className={`w-100 btn me-4 ${selected === item.name ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setSelected(item.name)}
                  key={item._id}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
        <div className="row g-5">
          {data
            .filter((x) => selected === "" || x.maincategory.name === selected)
            .slice(0, 24)
            .map((item) => {
              return (
                <div className="col-xl-4 col-lg-6" key={item._id}>
                  <SingleProduct item={item} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

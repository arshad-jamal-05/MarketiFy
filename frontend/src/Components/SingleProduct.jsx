import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SingleProduct({ item }) {
  let BrandStateData = useSelector((state) => state.BrandStateData);
  let brand = BrandStateData.find((x) => x.name === item.brand.name);

  return (
    <div className="bg-light rounded overflow-hidden">
      <img
        className="img-fluid w-100"
        src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic[0]}`}
        style={{ height: 300 }}
      />
      <div className="p-4 text-center">
        <Link className="h3 d-block mb-3" to={`/product/${item._id}`}>
          {item.name}
        </Link>
        <p className="m-0 text-center">
          &#8377; <del>{item.basePrice}</del> {item.finalPrice}{" "}
          <sup>{item.discount}% Off</sup>
        </p>
      </div>
      <div className="d-flex justify-content-between border-top p-4">
        <div className="d-flex align-items-center">
          <img
            className="rounded-circle me-2"
            src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.brand?.pic}`}
            width="25"
            height="25"
            alt=""
          />
          <small>{item.brand.name}</small>
        </div>
        <div className="d-flex align-items-center">
          <small className="ms-3">
            <i className="far fa-eye text-primary me-1"></i>
            {item.stockQuantity} Pcs Left In Stock
          </small>
        </div>
      </div>
      <Link to={`/product/${item._id}`} className="btn btn-primary w-100">Add To Cart</Link>
    </div>
  );
}

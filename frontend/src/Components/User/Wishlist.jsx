import React, { useEffect, useState } from "react";
import {
  getWishlist,
  deleteWishlist,
} from "../../Redux/ActionCreators/WishlistActionCreators";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Wishlist() {
  let [data, setData] = useState([]);
  let WishlistStateData = useSelector((state) => state.WishlistStateData);
  let dispatch = useDispatch();

  function deleteRecord(_id) {
    if (window.confirm("Are You Sure You Want To Delete This Record?")) {
      dispatch(deleteWishlist({ _id: _id }));
      setData(data.filter((x) => x._id !== _id));
    }
  }

  useEffect(() => {
    (() => {
      dispatch(getWishlist());
      if (WishlistStateData.length) {
        // setData(
        //   WishlistStateData.filter(
        //     (x) => x.user === localStorage.getItem("userid"),
        //   ),
        // );
        setData(
          WishlistStateData
        );
      }
    })();
  }, [WishlistStateData.length]);

  return (
    <>
      {data.length ? (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Brand</th>
                <th>Color</th>
                <th>Size</th>
                <th>Price</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>
                      <Link
                        to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.product?.pic}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.product?.pic}`}
                          height={50}
                          width="auto"
                          alt=""
                        />
                      </Link>
                    </td>
                    <td>
                      {item.product?.name}{" "}
                      <small className="d-block">
                        ({`${item.product?.stockQuantity}`} Pcs Left In Stock)
                      </small>
                    </td>
                    <td>{item.product?.brand?.name}</td>
                    <td>{item.product?.color?.join(", ")}</td>
                    <td>{item.product?.size?.join(", ")}</td>
                    <td>&#8377;{item.product?.finalPrice}</td>
                    <td>
                      <Link
                        to={`product/${item.product?._id}`}
                        className="btn btn-outline-primary"
                      >
                        <i className="bi bi-cart-check"></i>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => deleteRecord(item._id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card p-5 text-center">
          <h3>OOPS</h3>
          <h4>Your Wishlist Is Empty</h4>
          <Link to="/shop" className="btn btn-outline-primary w-25 m-auto">
            Shop Now
          </Link>
        </div>
      )}
    </>
  );
}

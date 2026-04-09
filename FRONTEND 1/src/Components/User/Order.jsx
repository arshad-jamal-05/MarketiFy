import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCheckout } from "../../Redux/ActionCreators/CheckoutActionCreators";
import { Link } from "react-router-dom";

export default function Order() {
  let [orders, setOrders] = useState([]);

  let CheckoutStateData = useSelector((state) => state.CheckoutStateData);
  let dispatch = useDispatch();

  useEffect(() => {
    (() => {
      dispatch(getCheckout());
      if (CheckoutStateData.length) {
        setOrders(
          CheckoutStateData.filter(
            (x) => x.user === localStorage.getItem("userid"),
          ),
        );
      }
    })();
  }, [CheckoutStateData.length]);

  return (
    <>
      {orders.length ? (
        orders.map((item) => {
          return (
            <div className="mb-3 border-bottom border-primary border-5">
              <div className="table-responsive mb-3">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Order Status</th>
                      <th>Payment Mode</th>
                      <th>Payment Status</th>
                      <th>Subtotal</th>
                      <th>Shipping</th>
                      <th>Total</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{item._id}</td>
                      <td>{item.orderStatus}</td>
                      <td>{item.paymentMode}</td>
                      <td>{item.paymentStatus}</td>
                      <td>&#8377; {item.subtotal}</td>
                      <td>&#8377; {item.shipping}</td>
                      <td>&#8377; {item.total}</td>
                      <td>{new Date(item.date).toDateString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h5 className="text-center p-2 border border-primary">
                Products In This Order
              </h5>
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
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.products?.map((p, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <Link
                              to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${p.pic}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <img
                                src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${p.pic}`}
                                height={70}
                                width="auto"
                                alt=""
                              />
                            </Link>
                          </td>
                          <td>{p.name}</td>
                          <td>{p.brand}</td>
                          <td>{p.color}</td>
                          <td>{p.size}</td>
                          <td>&#8377; {p.price}</td>
                          <td>{p.qty}</td>
                          <td>&#8377; {p.total}</td>
                          <td>
                            <Link
                              to={`/product/${p.product}`}
                              className="btn btn-outline-primary"
                            >
                              Buy Again
                            </Link>
                          </td>
                          <td>
                            {item.orderStatus === "Delivered" ? (
                              <button className="btn btn-outline-primary">
                                Write Review
                              </button>
                            ) : null}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center card p-5">
          No Order History Found
          <Link to="/shop" className="btn btn-outline-primary w-25 m-auto">
            Shop Now
          </Link>
        </div>
      )}
    </>
  );
}

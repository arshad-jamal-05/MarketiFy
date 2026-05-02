import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  deleteCart,
} from "../../Redux/ActionCreators/CartActionCreators";
import { createCheckout } from "../../Redux/ActionCreators/CheckoutActionCreators";
import {
  getProduct,
  updateProduct,
} from "../../Redux/ActionCreators/ProductActionCreators";

export default function Cart({ title, selected }) {
  let [data, setData] = useState([]);
  let [subtotal, setSubtotal] = useState(0);
  let [shipping, setShipping] = useState(0);
  let [total, setTotal] = useState(0);
  let CartStateData = useSelector((state) => state.CartStateData);
  let ProductStateData = useSelector((state) => state.ProductStateData);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  function deleteRecord(_id) {
    if (window.confirm("Are You Sure You Want To Delete This Record?")) {
      dispatch(deleteCart({ _id: _id }));
      setData(data.filter((x) => x._id !== _id));
    }
  }

  function updateRecord(_id, option) {
    let item = data.find((x) => x._id === _id);
    let index = data.findIndex((x) => x._id === _id);

    if (
      (option === "Dec" && item.qty === 1) ||
      (option === "Inc" && item.qty === item.product?.stockQuantity)
    ) {
      return;
    } else if (option === "Dec") {
      item.qty = item.qty - 1;
      item.total = item.total - item.product?.finalPrice;
    } else {
      item.qty = item.qty + 1;
      item.total = item.total + item.product?.finalPrice;
    }
    data[index] = { ...item };
    calculate(data);
  }

  function placeOrder() {
    let item = {
      user: localStorage.getItem("userid"),
      orderStatus: "Order Has Been Placed",
      paymentMode: selected.paymentMode,
      paymentStatus: "Pending",
      deliveryAddress: selected.deliveryAddress,
      subtotal: subtotal,
      shipping: shipping,
      total: total,
      date: new Date(),
      products: data,
    };
    dispatch(createCheckout(item));

    data.forEach((x) => {
      let product = ProductStateData.find((p) => p._id === x.product?._id);
      product.stockQuantity = product.stockQuantity - x.qty;
      product.stock = product.stockQuantity === 0 ? false : true;
      dispatch(updateProduct({ ...product, option: "Checkout" }));
      dispatch(deleteCart({ _id: x._id }));
    });
    if(selected.paymentMode === "COD"){
      navigate("/order-confirmation");
    } else {
      navigate("/payment/-1");
    }
      
  }

  function calculate(data) {
    let sum = 0;
    data.forEach((x) => (sum = sum + x.total));
    if (sum > 0 && sum < 500) {
      setShipping(50);
      setTotal(sum + 50);
    } else {
      setShipping(0);
      setTotal(sum);
    }
    setSubtotal(sum);
  }

  useEffect(() => {
    (() => {
      dispatch(getCart());
      if (CartStateData.length) {
        let data = CartStateData;
        setData(data);
        calculate(data);
      }
    })();
  }, [CartStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getProduct());
    })();
  }, [ProductStateData.length]);

  return (
    <>
      {data.length ? (
        <>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  {title === "Cart" ? <th></th> : null}
                  <th>Name</th>
                  {title === "Cart" ? <th>Brand</th> : null}
                  <th>Color</th>
                  <th>Size</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  {title === "Cart" ? <th></th> : null}
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  return (
                    <tr key={item._id}>
                      {title === "Cart" ? (
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
                      ) : null}
                      <td>
                        {item?.product.name}{" "}
                        <small className="d-block">
                          ({`${item.product?.stockQuantity}`} Pcs Left In Stock)
                        </small>
                      </td>
                      {title === "Cart" ? (
                        <td>{item.product?.brand?.name}</td>
                      ) : null}
                      <td>{item.color}</td>
                      <td>{item.size}</td>
                      <td>&#8377; {item.product?.finalPrice}</td>
                      {title === "Cart" ? (
                        <th>
                          <div className="btn-group" style={{ width: 130 }}>
                            <button
                              className="btn btn-primary"
                              onClick={() => updateRecord(item._id, "Dec")}
                            >
                              <i className="bi bi-dash"></i>
                            </button>
                            <h5 className="w-50 text-center">{item.qty}</h5>
                            <button
                              className="btn btn-primary"
                              onClick={() => updateRecord(item._id, "Inc")}
                            >
                              <i className="bi bi-plus"></i>
                            </button>
                          </div>
                        </th>
                      ) : (
                        <th>{item.qty}</th>
                      )}
                      <td>&#8377; {item.total}</td>
                      {title === "Cart" ? (
                        <td>
                          <Link
                            to={`product/${item.product}`}
                            className="btn btn-outline-primary"
                          >
                            <i className="bi bi-cart-check"></i>
                          </Link>
                        </td>
                      ) : null}
                      {title === "Cart" ? (
                        <td>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => deleteRecord(item._id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      ) : null}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-lg-6"></div>
            <div className={`${title === "Cart" ? "col-lg-6" : "col-12"}`}>
              <table className="table">
                <tbody>
                  <tr>
                    <th>Subtotal</th>
                    <td>&#8377; {subtotal}</td>
                  </tr>
                  <tr>
                    <th>Shipping Amount</th>
                    <td>&#8377; {shipping}</td>
                  </tr>
                  <tr>
                    <th>Total Amount</th>
                    <td>&#8377; {total}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      {title === "Cart" ? (
                        <Link
                          to="/checkout"
                          className="btn btn-outline-primary w-100"
                        >
                          Proceed To Checkout
                        </Link>
                      ) : (
                        <button
                          className="btn btn-outline-primary w-100"
                          onClick={placeOrder}
                        >
                          Place Order
                        </button>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="card p-5 text-center">
          <h3>OOPS</h3>
          <h4>Your Cart Is Empty</h4>
          <Link to="/shop" className="btn btn-outline-primary w-25 m-auto">
            Shop Now
          </Link>
        </div>
      )}
    </>
  );
}

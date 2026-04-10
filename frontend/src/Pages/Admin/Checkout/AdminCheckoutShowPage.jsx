import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import {
  getCheckout,
  updateCheckout,
} from "../../../Redux/ActionCreators/CheckoutActionCreators";

export default function AdminCheckoutShowPage() {
  let { _id } = useParams();
  let [data, setData] = useState({});
  let [flag, setFlag] = useState(false);
  let [orderStatus, setOrderStatus] = useState("");
  let [paymentStatus, setPaymentStatus] = useState("");

  let CheckoutStateData = useSelector((state) => state.CheckoutStateData);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  function updateRecord() {
    data.orderStatus = orderStatus;
    data.paymentStatus = paymentStatus;
    dispatch(updateCheckout({ ...data }));
    setFlag(!flag);
  }

  useEffect(() => {
    (() => {
      dispatch(getCheckout());
      if (CheckoutStateData.length) {
        let item = CheckoutStateData.find((x) => x._id === _id);
        if (item) {
          setData({ ...item });
          setOrderStatus(item.orderStatus);
          setPaymentStatus(item.paymentStatus);
        } else {
          navigate("/admin/checkout");
        }
      }
    })();
  }, [CheckoutStateData.length]);

  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-lg-3">
          <AdminSidebar />
        </div>
        <div className="col-lg-9">
          <h5 className="bg-primary text-center p-2 text-light">
            Order Details
            <Link to="/admin/checkout">
              <i className="bi bi-arrow-left text-light fs-4 float-end"></i>
            </Link>
          </h5>
          <table className="table table-bordered table-responsive">
            <tbody>
              <tr>
                <th>ID</th>
                <td>{data._id}</td>
              </tr>
              <tr>
                <th>Buyer Details</th>
                <td>
                  {data.deliveryAddress?.name} <br />
                  {data.deliveryAddress?.phone} <br />
                  {data.deliveryAddress?.address} <br />
                  {data.deliveryAddress?.city}, {data.deliveryAddress?.state},{" "}
                  {data.deliveryAddress?.pincode}
                </td>
              </tr>
              <tr>
                <th>Order Status</th>
                <td>
                  {data.orderStatus}
                  {data.orderStatus !== "Delivered" ||
                  data.paymentStatus === "Pending" ? (
                    <select
                      className="mt-3 form-select border-primary"
                      value={orderStatus}
                      onChange={(e) => setOrderStatus(e.target.value)}
                    >
                      <option>Order Has Been Placed</option>
                      <option>Order Has Been Packed</option>
                      <option>Order Is Ready To Ship</option>
                      <option>Order Has Been Shipped</option>
                      <option>Order Is In Transit</option>
                      <option>
                        Order Has Been Reached To The Final Delivery Station
                      </option>
                      <option>Order Is Dispatched</option>
                      <option>Delivered</option>
                    </select>
                  ) : null}
                </td>
              </tr>
              <tr>
                <th>Payment Mode</th>
                <td>{data.paymentMode}</td>
              </tr>
              <tr>
                <th>Payment Status</th>
                <td>
                  {data.paymentStatus}
                  {data.paymentStatus !== "Done" ? (
                    <select
                      className="mt-3 form-select border-primary"
                      value={paymentStatus}
                      onChange={(e) => setPaymentStatus(e.target.value)}
                    >
                      <option>Pending</option>
                      <option>Done</option>
                    </select>
                  ) : null}
                </td>
              </tr>
              <tr>
                <th>Subtotal</th>
                <td>&#8377; {data.subtotal}</td>
              </tr>
              <tr>
                <th>Shipping Amount</th>
                <td>&#8377; {data.shipping}</td>
              </tr>
              <tr>
                <th>Total</th>
                <td>&#8377; {data.total}</td>
              </tr>
              <tr>
                <th>Date</th>
                <td>{new Date(data.createdAt).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  {data.orderStatus !== "Delivered" ||
                  data.paymentStatus === "Pending" ? (
                    <button
                      className="btn btn-primary w-100"
                      onClick={updateRecord}
                    >
                      Update Status
                    </button>
                  ) : null}
                </td>
              </tr>
            </tbody>
          </table>
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
                </tr>
              </thead>
              <tbody>
                {data.products?.map((p, index) => {
                  return (
                    <tr key={index}>
                      {/* {console.log(p.product)} */}
                      <td>
                        <Link
                          to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${p.product?.pic}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${p.product?.pic}`}
                            height={70}
                            width="auto"
                            alt=""
                          />
                        </Link>
                      </td>
                      <td>
                        <Link
                          className="h6"
                          to={`/product/${p.product?._id}`}
                          target="_blank"
                        >
                          {p.product?.name}
                        </Link>
                      </td>
                      <td>{p.product?.brand?.name}</td>
                      <td>{p.color}</td>
                      <td>{p.size}</td>
                      <td>&#8377; {p.product?.finalPrice}</td>
                      <td>{p.qty}</td>
                      <td>&#8377; {p.total}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

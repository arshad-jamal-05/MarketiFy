import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import DataTable from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { getCheckout } from "../../../Redux/ActionCreators/CheckoutActionCreators";

export default function AdminCheckoutPage() {
  let [data, setData] = useState([]);
  let CheckoutStateData = useSelector((state) => state.CheckoutStateData);
  let dispatch = useDispatch();

  useEffect(() => {
    let time = (() => {
      dispatch(getCheckout());
      if (CheckoutStateData) {
        setData(CheckoutStateData);
      } else {
        setData([]);
      }
      let time = setTimeout(() => {
        new DataTable("#myTable");
      }, 500);

      return time;
    })();
    return () => {
      clearTimeout(time);
    };
  }, [CheckoutStateData.length]);

  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-lg-3">
          <AdminSidebar />
        </div>
        <div className="col-lg-9">
          <h5 className="bg-primary text-center p-2 text-light">Checkout</h5>
          <div className="table-responsive">
            <table className="table table-bordered" id="myTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Buyer</th>
                  <th>Order Status</th>
                  <th>Payment Mode</th>
                  <th>Payment Status</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  console.log(item);
                  return (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>
                        {item.deliveryAddress?.name} <br />
                        {item.deliveryAddress?.city},{" "}
                        {item.deliveryAddress?.state},{" "}
                        {item.deliveryAddress?.pincode}
                      </td>
                      <td>{item.orderStatus}</td>
                      <td>{item.paymentMode}</td>
                      <td>{item.paymentStatus}</td>
                      <td>&#8377; {item.total}</td>
                      <td>{new Date(item.createdAt).toDateString()}</td>
                      <td>
                        <Link
                          to={`/admin/checkout/show/${item._id}`}
                          className="btn btn-primary"
                        >
                          <i className="bi bi-eye"></i>
                        </Link>
                      </td>
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

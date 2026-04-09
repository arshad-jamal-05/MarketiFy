import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import DataTable from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import {
  getProduct,
  deleteProduct,
} from "../../../Redux/ActionCreators/ProductActionCreators";

export default function AdminProductPage() {
  let [data, setData] = useState([]);
  let ProductStateData = useSelector((state) => state.ProductStateData);
  let dispatch = useDispatch();

  function deleteRecord(_id) {
    if (window.confirm("Are You Sure You Want To Delete This Record?")) {
      dispatch(deleteProduct({ _id: _id }));
      setData(data.filter((x) => x._id !== _id));
    }
  }

  useEffect(() => {
    let time = (() => {
      dispatch(getProduct());
      if (ProductStateData) {
        setData(ProductStateData);
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
  }, [ProductStateData.length]);

  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-lg-3">
          <AdminSidebar />
        </div>
        <div className="col-lg-9">
          <h5 className="bg-primary text-center p-2 text-light">
            Product
            <Link to="/admin/product/create">
              <i className="bi bi-plus text-light fs-4 float-end"></i>
            </Link>
          </h5>
          <div className="table-responsive">
            <table className="table table-bordered" id="myTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Maincategory</th>
                  <th>Subcategory</th>
                  <th>Brand</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Base Price</th>
                  <th>Discount</th>
                  <th>Final Price</th>
                  <th>Stock</th>
                  <th>Stock Quantity</th>
                  <th>Description</th>
                  <th>Pic</th>
                  <th>Status</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  return (
                    <tr key={item._id}>
                      {/* {console.log(item)} */}
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>{item.maincategory?.name}</td>
                      <td>{item.subcategory?.name}</td>
                      <td>{item.brand?.name}</td>
                      <td>{item.color.join(", ")}</td>
                      <td>{item.size.join(", ")}</td>
                      <td>&#8377;{item.basePrice}</td>
                      <td>{item.discount}% Off</td>
                      <td>&#8377;{item.finalPrice}</td>
                      <td>{item.stock ? "In Stock" : "Out Of Stock"}</td>
                      <td>{item.stockQuantity}</td>
                      <td>{item.description}</td>
                      <td>
                        <div style={{ width: 400 }}>
                          {item.pic?.map((p, index) => {
                            return (
                              <Link
                                className="m-2"
                                to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${p}`}
                                key={index}
                                target="_blank"
                                rel="noreferror"
                              >
                                <img
                                  src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${p}`}
                                  height={70}
                                  alt=""
                                />
                              </Link>
                            );
                          })}
                        </div>
                      </td>
                      {/* <td>
                        <Link
                          to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`}
                          target="_blank"
                          rel="noreferror"
                        >
                          <img
                            src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`}
                            height={70}
                            alt=""
                          />
                        </Link>
                      </td> */}
                      <td>{item.status ? "Active" : "Inactive"}</td>
                      <td>
                        <Link
                          to={`/admin/product/update/${item._id}`}
                          className="btn btn-primary"
                        >
                          <i className="bi bi-pencil"></i>
                        </Link>
                      </td>
                      <td>
                        {localStorage.getItem("role") === "Super Admin" ? (
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteRecord(item._id)}
                          >
                            <i className="bi bi-trash"></i>
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
      </div>
    </div>
  );
}

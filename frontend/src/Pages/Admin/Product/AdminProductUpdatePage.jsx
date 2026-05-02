import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProduct,
  getProduct,
} from "../../../Redux/ActionCreators/ProductActionCreators";
import { getMaincategory } from "../../../Redux/ActionCreators/MaincategoryActionCreators";
import { getSubcategory } from "../../../Redux/ActionCreators/SubcategoryActionCreators";
import { getBrand } from "../../../Redux/ActionCreators/BrandActionCreators";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import FormValidator from "../../../Validators/FormValidator";
import ImageValidator from "../../../Validators/ImageValidator";

let colors = [
  "White",
  "Red",
  "Blue",
  "Black",
  "Green",
  "Yellow",
  "Orange",
  "Pink",
  "Brown",
  "Navy",
  "Gray",
  // "Lavender",
  "N/A",
];
let sizes = [
  "XXXL",
  "XXL",
  "XL",
  "L",
  "M",
  "S",
  "XS",
  "NB",
  "26",
  "28",
  "30",
  "32",
  "34",
  "36",
  "38",
  "40",
  "42",
  "N/A",
];
var rte;

export default function AdminProductUpdatePage() {
  let refdiv = useRef(null);
  let [oldPics, setOldPics] = useState([]);
  let { _id } = useParams();
  let [flag, setFlag] = useState(false);
  let [data, setData] = useState({
    name: "",
    maincategory: "",
    subcategory: "",
    brand: "",
    color: [],
    size: [],
    basePrice: 0,
    discount: 0,
    stock: true,
    stockQuantity: 0,
    pic: [],
    status: true,
  });

  let [errorMessage, setErrorMessage] = useState({
    name: "",
    color: "",
    size: "",
    basePrice: "",
    discount: "",
    stockQuantity: "",
    pic: "",
  });

  let [show, setShow] = useState(false);

  let MaincategoryStateData = useSelector(
    (state) => state.MaincategoryStateData,
  );
  let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData);
  let BrandStateData = useSelector((state) => state.BrandStateData);
  let ProductStateData = useSelector((state) => state.ProductStateData);
  let dispatch = useDispatch();

  let navigate = useNavigate();

  function getInputData(e) {
    let name = e.target.name;
    if(name === "pic"){
      var picError = ImageValidator(e);
    }
    if(name === "pic" && picError === ""){
      let value = name === "pic" ? e.target.files : e.target.value;
      setData({ ...data, pic: value });
    } else if (name !== "pic") {
      var value = e.target.value;
      setData({ ...data, [name]: name === "status" || name === "stock" ? (value === "1" ? true : false) : value});
    }

    setErrorMessage({
      ...errorMessage,
      [name]: name === "pic" ? picError : FormValidator(e),
    });
  }

  function getCheckboxData(key, value) {
    let arr = key === "color" ? data.color : data.size;
    if (arr.includes(value)) {
      arr = arr.filter((x) => x !== value);
    } else {
      arr.push(value);
    }
    setErrorMessage({
      ...errorMessage,
      [key]: arr.length ? "" : `Please Select Atleast One ${key}`,
    });
    setData({
      ...data,
      [key]: arr,
    });
  }

  function postData(e) {
    e.preventDefault();
    let error = Object.values(errorMessage).find((x) => x !== "");
    if (error) {
      setShow(true);
    } else if (oldPics.length === 0 && Array.from(data.pic).length === 0) {
      setShow(true);
      setErrorMessage({
        ...errorMessage,
        pic: "Please Upload Atleast One Pic",
      });
    } else {
      let bp = parseInt(data.basePrice);
      let dis = parseInt(data.discount);
      let fp = bp - (bp * dis) / 100;
      let sc = parseInt(data.stockQuantity);

      let formData = new FormData();
      formData.append("_id", data._id);
      formData.append("name", data.name);
      formData.append(
        "maincategory",
        data.maincategory._id ?? data.maincategory,
      );
      formData.append("subcategory", data.subcategory._id ?? data.subcategory);
      formData.append("brand", data.brand._id ?? data.brand);
      data.color.map((item) => formData.append("color", item));
      data.size.map((item) => formData.append("size", item));
      formData.append("basePrice", data.basePrice);
      formData.append("discount", data.discount);
      formData.append("finalPrice", data.finalPrice);
      formData.append("stock", data.stock);
      formData.append("stockQuantity", data.stockQuantity);
      formData.append("description", rte.getHTMLCode());
      Array.from(data.pic).map((item) => formData.append("pic", item));
      oldPics.map((item) => formData.append("oldPics", item));
      formData.append("status", data.status);
      dispatch(updateProduct(formData));
      navigate("/admin/product");
    }
  }

  useEffect(() => {
    (() => {
      dispatch(getMaincategory());
    })();
  }, [MaincategoryStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getSubcategory());
    })();
  }, [SubcategoryStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getBrand());
    })();
  }, [BrandStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getProduct());
      rte = new window.RichTextEditor(refdiv.current);
      if (ProductStateData.length) {
        let item = ProductStateData.find((x) => x._id === _id);
        if (item) {
          setData({ ...data, ...item });
          setOldPics(item.pic);
          rte.setHTMLCode(item.description);
        } else {
          navigate("/admin/product");
        }
      }
    })();
  }, [ProductStateData.length]);

  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-lg-3">
          <AdminSidebar />
        </div>
        <div className="col-lg-9">
          <h5 className="bg-primary text-center p-2 text-light">
            Update Product
            <Link to="/admin/product">
              <i className="bi bi-arrow-left text-light fs-4 float-end"></i>
            </Link>
          </h5>
          <form onSubmit={postData}>
            <div className="row">
              <div className="col-12 mb-3">
                <label>Name*</label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={getInputData}
                  placeholder="Product Name"
                  className={`form-control ${show && errorMessage.name ? "border-danger" : "border-primary"}`}
                />
                {show && errorMessage.name ? (
                  <p className="text-danger">{errorMessage.name}</p>
                ) : null}
              </div>
              <div className="col-3 mb-3">
                <label>Maincategory*</label>
                <select
                  name="maincategory"
                  value={data.maincategory._id}
                  onChange={getInputData}
                  className={"form-select border-primary"}
                >
                  {MaincategoryStateData.filter((x) => x.status).map((item) => {
                    return (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-3 mb-3">
                <label>Subcategory*</label>
                <select
                  name="subcategory"
                  value={data.subcategory._id}
                  onChange={getInputData}
                  className={"form-select border-primary"}
                >
                  {SubcategoryStateData.filter((x) => x.status).map((item) => {
                    return (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-3 mb-3">
                <label>Brand*</label>
                <select
                  name="brand"
                  value={data.brand._id}
                  onChange={getInputData}
                  className={"form-select border-primary"}
                >
                  {BrandStateData.filter((x) => x.status).map((item) => {
                    return (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-3 mb-3">
                <label>Stock*</label>
                <select
                  name="stock"
                  value={data.stock}
                  onChange={getInputData}
                  className={"form-select border-primary"}
                >
                  <option value="1">In Stock</option>
                  <option value="0">Out Of Stock</option>
                </select>
              </div>
              <div className="col-12 mb-3">
                <label>Color*</label>
                <div className="row border border-primary p-2 m-1 rounded">
                  {colors.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="mb-3 col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6"
                      >
                        <input
                          type="checkbox"
                          onChange={() => getCheckboxData("color", item)}
                          checked={data.color.includes(item)}
                          name={item}
                        />
                        <label className="ms-2">{item}</label>
                      </div>
                    );
                  })}
                </div>
                {show && errorMessage.color ? (
                  <p className="text-danger">{errorMessage.color}</p>
                ) : null}
              </div>
              <div className="col-12 mb-3">
                <label>Size*</label>
                <div className="row border border-primary p-2 m-1 rounded">
                  {sizes.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="mb-3 col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6"
                      >
                        <input
                          type="checkbox"
                          onChange={() => getCheckboxData("size", item)}
                          checked={data.size.includes(item)}
                          name={item}
                        />
                        <label className="ms-2">{item}</label>
                      </div>
                    );
                  })}
                </div>
                {show && errorMessage.size ? (
                  <p className="text-danger">{errorMessage.size}</p>
                ) : null}
              </div>
              <div className="col-md-4 mb-3">
                <label>Base Price*</label>
                <input
                  type="number"
                  name="basePrice"
                  value={data.basePrice}
                  step={20}
                  onChange={getInputData}
                  placeholder="Product Base Price"
                  className={`form-control ${show && errorMessage.basePrice ? "border-danger" : "border-primary"}`}
                />
                {show && errorMessage.basePrice ? (
                  <p className="text-danger">{errorMessage.basePrice}</p>
                ) : null}
              </div>
              <div className="col-md-4 mb-3">
                <label>Discount*</label>
                <input
                  type="text"
                  name="discount"
                  value={data.discount}
                  onChange={getInputData}
                  placeholder="Product Discount"
                  className={`form-control ${show && errorMessage.discount ? "border-danger" : "border-primary"}`}
                />
                {show && errorMessage.discount ? (
                  <p className="text-danger">{errorMessage.discount}</p>
                ) : null}
              </div>
              <div className="col-md-4 mb-3">
                <label>Stock Quantity*</label>
                <input
                  type="number"
                  name="stockQuantity"
                  value={data.stockQuantity}
                  step={10}
                  onChange={getInputData}
                  placeholder="Product Stock Quantity"
                  className={`form-control ${show && errorMessage.stockQuantity ? "border-danger" : "border-primary"}`}
                />
                {show && errorMessage.stockQuantity ? (
                  <p className="text-danger">{errorMessage.stockQuantity}</p>
                ) : null}
              </div>
              <div className="col-md-12 mb-3">
                <label>Description*</label>
                <div ref={refdiv} className="border border-primary"></div>
              </div>
              <div className="col-lg-6 mb-3">
                <label>Pic</label>
                <input
                  type="file"
                  name="pic"
                  multiple
                  onChange={getInputData}
                  className={`form-control ${show && errorMessage.pic ? "border-danger" : "border-primary"}`}
                />
                {show && errorMessage.pic
                  ? errorMessage.pic?.split(".").map((err, index) => {
                      return (
                        <p className="text-danger" key={index}>
                          {err}
                        </p>
                      );
                    })
                  : null}
              </div>
              <div className="col-lg-6 mb-3">
                <label>Old Pic (Click On Image To Remove)</label>
                <div>
                  {/* {data.pic.map((item, index) => {
                    return (
                      <img
                        key={index}
                        onClick={() => {
                          data.pic.splice(index, 1);
                          setFlag(!flag);
                        }}
                        src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item}`}
                        height={70}
                        className="m-1"
                      />
                    );
                  })} */}
                  {oldPics.map((item, index) => {
                    return (
                      <img
                        key={index}
                        onClick={() => {
                          oldPics.splice(index, 1);
                          setFlag(!flag);
                        }}
                        src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item}`}
                        height={70}
                        className="m-1"
                      />
                    );
                  })}
                </div>
              </div>
              <div className="col-lg-6 mb-3">
                <label>Status*</label>
                <select
                  name="status"
                  value={data.status ? "1" : "0"}
                  onChange={getInputData}
                  className="form-select border-primary"
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>

              <div className="col-12 mb-3">
                <button type="submit" className="btn btn-primary w-100">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

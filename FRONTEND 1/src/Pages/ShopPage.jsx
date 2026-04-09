import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators";
import { getSubcategory } from "../Redux/ActionCreators/SubcategoryActionCreators";
import { getBrand } from "../Redux/ActionCreators/BrandActionCreators";
import { getProduct } from "../Redux/ActionCreators/ProductActionCreators";
import SingleProduct from "../Components/SingleProduct";

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

export default function ShopPage() {
  let [search, setSearch] = useState("");
  let [shortFilter, setShortFilter] = useState("1");
  let [filter, setFilter] = useState({
    maincategory: [],
    subcategory: [],
    brand: [],
    color: [],
    size: [],
  });
  let [data, setData] = useState([]);
  let MaincategoryStateData = useSelector(
    (state) => state.MaincategoryStateData,
  );
  let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData);
  let BrandStateData = useSelector((state) => state.BrandStateData);
  let ProductStateData = useSelector((state) => state.ProductStateData);
  let dispatch = useDispatch();

  function getInputCheckbox(key, value) {
    let arr = filter[key];
    if (arr.includes(value)) {
      arr = arr.filter((x) => x !== value);
    } else {
      arr.push(value);
    }
    setFilter({ ...filter, [key]: arr });
    applyFilter({ ...filter, [key]: arr });
  }

  function applyFilter(filter) {
    let data = ProductStateData.filter(
      (x) =>
        x.status &&
        (filter.maincategory.length === 0 ||
          filter.maincategory.includes(x.maincategory)) &&
        (filter.subcategory.length === 0 ||
          filter.subcategory.includes(x.subcategory)) &&
        (filter.brand.length === 0 || filter.brand.includes(x.brand)) &&
        (filter.color.length === 0 ||
          new Set(filter.color).intersection(new Set(x.color)).size > 0) &&
        (filter.size.length === 0 ||
          new Set(filter.size).intersection(new Set(x.size)).size > 0),
    );
    applySortFilter(shortFilter, data);
  }

  function postSearchData(e) {
    e.preventDefault();
    let data = ProductStateData.filter(
      (x) =>
        (x.status && x.name.toLowerCase().includes(search.toLowerCase())) ||
        x.maincategory.toLowerCase().includes(search.toLowerCase()) ||
        x.subcategory.toLowerCase().includes(search.toLowerCase()) ||
        x.brand.toLowerCase().includes(search.toLowerCase()) ||
        x.color.find((x) => x.toLowerCase().includes(search)),
    );
    applySortFilter(shortFilter, data);
  }

  function applySortFilter(shortFilter, data) {
    setShortFilter(shortFilter);
    if (shortFilter === "1") {
      data.sort((x, y) => y._id.localeCompare(x._id));
    } else if (shortFilter === "2") {
      data.sort((x, y) => x.finalPrice - y.finalPrice);
    } else {
      data.sort((x, y) => y.finalPrice - x.finalPrice);
    }
    setData(data);
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
      if (ProductStateData.length) {
        applyFilter(filter);
        // setData(ProductStateData);
      }
    })();
  }, [ProductStateData.length]);

  return (
    <div className="container-fluid">
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-2">
            <h5 className="bg-primary p-2 text-light text-center rounded mt-3">
              Maincategory
            </h5>
            {MaincategoryStateData.filter((x) => x.status).map((item) => {
              return (
                <div className="ms-2" key={item._id}>
                  <input
                    type="checkbox"
                    name={item.name}
                    onChange={() => getInputCheckbox("maincategory", item.name)}
                    checked={filter.maincategory.includes(item.name)}
                  />
                  <label className="ms-2">{item.name}</label>
                </div>
              );
            })}
            <h5 className="bg-primary p-2 text-light text-center rounded mt-3">
              Subcategory
            </h5>
            {SubcategoryStateData.filter((x) => x.status).map((item) => {
              return (
                <div className="ms-2" key={item._id}>
                  <input
                    type="checkbox"
                    name={item.name}
                    onChange={() => getInputCheckbox("subcategory", item.name)}
                    checked={filter.subcategory.includes(item.name)}
                  />
                  <label className="ms-2">{item.name}</label>
                </div>
              );
            })}
            <h5 className="bg-primary p-2 text-light text-center rounded mt-3">
              Brand
            </h5>
            {BrandStateData.filter((x) => x.status).map((item) => {
              return (
                <div className="ms-2" key={item._id}>
                  <input
                    type="checkbox"
                    name={item.name}
                    onChange={() => getInputCheckbox("brand", item.name)}
                    checked={filter.brand.includes(item.name)}
                  />
                  <label className="ms-2">{item.name}</label>
                </div>
              );
            })}
            <h5 className="bg-primary p-2 text-light text-center rounded mt-3">
              Color
            </h5>
            {colors.map((item, index) => {
              return (
                <div className="ms-2" key={index}>
                  <input
                    type="checkbox"
                    name={item}
                    onChange={() => getInputCheckbox("color", item)}
                    checked={filter.color.includes(item)}
                  />
                  <label className="ms-2">{item}</label>
                </div>
              );
            })}
            <h5 className="bg-primary p-2 text-light text-center rounded mt-3">
              Size
            </h5>
            {sizes.map((item, index) => {
              return (
                <div className="ms-2" key={index}>
                  <input
                    type="checkbox"
                    name={item}
                    onChange={() => getInputCheckbox("size", item)}
                    checked={filter.size.includes(item)}
                  />
                  <label className="ms-2">{item}</label>
                </div>
              );
            })}
          </div>
          <div className="col-lg-10">
            <div className="row mt-3">
              <div className="row mb-3">
                <div className="col-lg-8">
                  <form onSubmit={postSearchData}>
                    <div className="btn-group w-100">
                      <input
                        type="search"
                        name="search"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search Product By Name, Maincategory, Subcategory, Brand, Color etc"
                        className="form-control border-primary rounded-0 rounded-start"
                      />
                      <button className="btn btn-primary">Search</button>
                    </div>
                  </form>
                </div>
                <div className="col-lg-4">
                  <select
                    name="sortFilter"
                    onChange={(e) => applySortFilter(e.target.value, data)}
                    className="form-control border-primary"
                  >
                    <option value="1">Latest</option>
                    <option value="2">Price: Low to High</option>
                    <option value="3">Price: High to Low</option>
                  </select>
                </div>
              </div>
              {data.map((item) => {
                return (
                  <div className="col-lg-4 col-md-6 col-12 mb-3" key={item._id}>
                    <SingleProduct item={item} />;
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

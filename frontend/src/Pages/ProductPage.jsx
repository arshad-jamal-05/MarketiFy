import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import ProductSlider from "../Components/ProductSlider";
import Testimonial from "../Components/Testimonial";
import { getProduct } from "../Redux/ActionCreators/ProductActionCreators";
import {
  createCart,
  getCart,
} from "../Redux/ActionCreators/CartActionCreators";
import {
  getWishlist,
  createWishlist,
} from "../Redux/ActionCreators/WishlistActionCreators";
import { getTestimonial } from "../Redux/ActionCreators/TestimonialActionCreators";

export default function ProductPage() {
  let { _id } = useParams();
  let [selected, setSelected] = useState({
    color: "",
    size: "",
    qty: 1,
  });
  let [data, setData] = useState([]);
  let [relatedProduct, setRelatedProduct] = useState([]);
  let [reviewState, setReviewState] = useState({
    rating: 0,
    star: [0, 0, 0, 0, 0],
    total: 0,
  });
  let [show, setShow] = useState("Description");

  let ProductStateData = useSelector((state) => state.ProductStateData);
  let CartStateData = useSelector((state) => state.CartStateData);
  let WishlistStateData = useSelector((state) => state.WishlistStateData);
  let TestimonialStateData = useSelector((state) => state.TestimonialStateData);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let sliderOption = {
    loop: true,
    modules: [Autoplay, Pagination],
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      clickable: true,
    },
  };

  function addToCart() {
    let item = CartStateData.find(
      (x) => x.user?._id === localStorage.getItem("userid") && x.product === _id,
      // (x) => x.user?._id === localStorage.getItem("userid") && x.product?._id === product._id,
    );
    if (!item) {
      item = {
        user: localStorage.getItem("userid"),
        product: _id,
        // product: product._id,
        color: selected.color,
        size: selected.size,
        qty: selected.qty,
        total: selected.qty * data.finalPrice,

        // Remove following lines in case of real backend
        // name: data.name,
        // brand: data.brand,
        // stockQuantity: data.stockQuantity,
        // price: data.finalPrice,
        // pic: data.pic[0],
      };
      dispatch(createCart(item));
    }
    navigate("/cart");
  }

  function addToWishlist() {
    let item = WishlistStateData.find(
      (x) => x.user?._id === localStorage.getItem("userid") && x.product === _id,
      // (x) => x.user?._id === localStorage.getItem("userid") && x.product?._id === product._id,
    );
    if (!item) {
      item = {
        user: localStorage.getItem("userid"),
        product: _id,
        // product: product._id,

        // Remove following lines in case of real backend
        // name: data.name,
        // brand: data.brand,
        // color: selected.color,
        // size: selected.size,
        // stockQuantity: data.stockQuantity,
        // price: data.finalPrice,
        // pic: data.pic[0],
      };
      dispatch(createWishlist(item));
    }
    navigate("/profile?option=Wishlist");
  }

  useEffect(() => {
    (() => {
      dispatch(getProduct());
      if (ProductStateData.length) {
        let item = ProductStateData.find((x) => x._id === _id);
        if (item) {
          setData(item);
          setSelected({
            ...selected,
            color: item.color[0],
            size: item.size[0],
          });
          setRelatedProduct(
            ProductStateData.filter(
              (x) => x.maincategory === item.maincategory,
            ),
          );
        } else {
          window.history.back();
        }
      }
    })();
  }, [ProductStateData.length, _id]);

  useEffect(() => {
    (() => {
      dispatch(getCart());
    })();
  }, [CartStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getWishlist());
    })();
  }, [WishlistStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getTestimonial());
      if (TestimonialStateData.length) {
        let reviews = TestimonialStateData.filter((x) => x.product === id);
        let total = 0;
        let star = [0, 0, 0, 0, 0];
        reviews.forEach((x) => {
          ((total += x.star), (star[x.star - 1] += 1));
        });
        setReviewState({
          rating: (total / reviews.length).toFixed(1),
          star: star,
          total: reviews.length,
        });
      }
    })();
  }, [TestimonialStateData.length, _id]);

  return (
    <div className="container-fluid">
      <div className="container my-3">
        <div className="row">
          <div className="col-md-6">
            <Swiper {...sliderOption}>
              {data?.pic?.map((item, index) => {
                return (
                  // <SwiperSlide>
                  <SwiperSlide key={index}>
                    {/* <img
                      src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item}`}
                      className="w-100"
                    /> */}
                    <div
                      className="overflow-hidden"
                      style={{ width: "100%", height: "600px" }}
                    >
                      <img
                        src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item}`}
                        className="w-100 h-100"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className="col-md-6">
            <h5 className="bg-primary p-2 text-center text-light rounded">
              {data.name ?? ""}
            </h5>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>Maincategory</th>
                  <td>{data.maincategory?.name ?? ""}</td>
                </tr>
                <tr>
                  <th>Subcategory</th>
                  <td>{data.subcategory?.name ?? ""}</td>
                </tr>
                <tr>
                  <th>Brand</th>
                  <td>{data.brand?.name ?? ""}</td>
                </tr>
                <tr>
                  <th>Color</th>
                  <td>
                    {data?.color?.map((item, index) => {
                      return (
                        <button
                          key={index}
                          className={`btn me-2 ${selected.color === item ? "btn-primary" : "btn-outline-primary"}`}
                          onClick={() =>
                            setSelected({ ...selected, color: item })
                          }
                        >
                          {item}
                        </button>
                      );
                    })}
                  </td>
                </tr>
                <tr>
                  <th>Size</th>
                  <td>
                    {data?.size?.map((item, index) => {
                      return (
                        <button
                          key={index}
                          className={`btn me-2 ${selected.size === item ? "btn-primary" : "btn-outline-primary"}`}
                          onClick={() =>
                            setSelected({ ...selected, size: item })
                          }
                        >
                          {item}
                        </button>
                      );
                    })}
                  </td>
                </tr>
                <tr>
                  <th>Base Price</th>
                  <td>&#8377; {data.basePrice ?? ""}</td>
                </tr>
                <tr>
                  <th>Discount</th>
                  <td>{data.discount ?? ""}% Off</td>
                </tr>
                <tr>
                  <th>Final Price</th>
                  <td>&#8377; {data.finalPrice ?? ""}</td>
                </tr>
                <tr>
                  <th>Stock</th>
                  <td>
                    {data.stock
                      ? `${data.stockQuantity} Left In Stock`
                      : "Out Of Stock"}
                  </td>
                </tr>
                <tr>
                  <th>Stock Quantity</th>
                  <td>{data.stockQuantity ?? ""}</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    {data.stock ? (
                      <div className="row">
                        <div className="col-md-4">
                          <div className="btn-group w-100">
                            <button
                              className="btn btn-primary"
                              onClick={() =>
                                selected.qty > 1
                                  ? setSelected({
                                      ...selected,
                                      qty: selected.qty - 1,
                                    })
                                  : null
                              }
                            >
                              <i className="bi bi-dash"></i>
                            </button>
                            <h5 className="w-25 text-center">{selected.qty}</h5>
                            <button
                              className="btn btn-primary"
                              onClick={() =>
                                selected.qty < data.stockQuantity
                                  ? setSelected({
                                      ...selected,
                                      qty: selected.qty + 1,
                                    })
                                  : null
                              }
                            >
                              <i className="bi bi-plus"></i>
                            </button>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="btn-group w-100">
                            <button
                              className="btn btn-primary"
                              onClick={addToCart}
                            >
                              <i className="bi bi-cart-check me-2"></i>Add To
                              Cart
                            </button>
                            <button
                              className="btn btn-primary"
                              onClick={addToWishlist}
                            >
                              <i className="bi bi-heart me-2"></i>Add To
                              Wishlist
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={addToWishlist}
                      >
                        <i className="bi bi-heart me-2"></i>Add To Wishlist
                      </button>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="btn-group my-3">
          <button
            className={`btn ${show === "Description" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setShow("Description")}
          >
            Description
          </button>
          <button
            className={`btn ${show === "Reviews" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setShow("Reviews")}
          >
            Reviews
          </button>
        </div>
        <div className={`${show === "Description" ? "d-block" : "d-none"}`}>
          <div
            className="card p-4"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </div>
        <div className={`${show === "Reviews" ? "d-block" : "d-none"}`}>
          <div className="card p-4">
            <div className="row">
              <div className="col-md-4">
                <div className="card p-2 text-center">
                  <h1>Rating</h1>
                  <h1>{reviewState.rating}/5</h1>
                  <h5>Total Reviews : {reviewState.total}</h5>
                </div>
              </div>
              <div className="col-md-8">
                <div className="row">
                  <div className="col-3">5 Star ({reviewState.star[4]})</div>
                  <div className="col-9">
                    <div className="progress">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{
                          width: `${(reviewState.star[4] / reviewState.total) * 100}%`,
                        }}
                      >
                        {(
                          (reviewState.star[4] / reviewState.total) *
                          100
                        ).toFixed(0)}
                        %
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">4 Star ({reviewState.star[3]})</div>
                  <div className="col-9">
                    <div className="progress">
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{
                          width: `${(reviewState.star[3] / reviewState.total) * 100}%`,
                        }}
                      >
                        {(
                          (reviewState.star[3] / reviewState.total) *
                          100
                        ).toFixed(0)}
                        %
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">3 Star ({reviewState.star[2]})</div>
                  <div className="col-9">
                    <div className="progress">
                      <div
                        className="progress-bar bg-info"
                        role="progressbar"
                        style={{
                          width: `${(reviewState.star[2] / reviewState.total) * 100}%`,
                        }}
                      >
                        {(
                          (reviewState.star[2] / reviewState.total) *
                          100
                        ).toFixed(0)}
                        %
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">2 Star ({reviewState.star[1]})</div>
                  <div className="col-9">
                    <div className="progress">
                      <div
                        className="progress-bar bg-warning"
                        role="progressbar"
                        style={{
                          width: `${(reviewState.star[1] / reviewState.total) * 100}%`,
                        }}
                      >
                        {(
                          (reviewState.star[1] / reviewState.total) *
                          100
                        ).toFixed(0)}
                        %
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">1 Star ({reviewState.star[0]})</div>
                  <div className="col-9">
                    <div className="progress">
                      <div
                        className="progress-bar bg-danger"
                        role="progressbar"
                        style={{
                          width: `${(reviewState.star[0] / reviewState.total) * 100}%`,
                        }}
                      >
                        {(
                          (reviewState.star[0] / reviewState.total) *
                          100
                        ).toFixed(0)}
                        %
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Testimonial pid={data._id} />
          </div>
        </div>
        <div className="mt-3">
          <ProductSlider
            maincategory="Related Products"
            data={relatedProduct}
          />
        </div>
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { getTestimonial } from "../Redux/ActionCreators/TestimonialActionCreators";
import { getProduct } from "../Redux/ActionCreators/ProductActionCreators";
import { Link } from "react-router-dom";

export default function Testimonial({ pid }) {
  let TestimonialStateData = useSelector((state) => state.TestimonialStateData);
  // let ProductStateData = useSelector((state) => state.ProductStateData);
  let dispatch = useDispatch();

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
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  };

  function getStar(star) {
    if (star === 5) {
      return (
        <>
          <i className="bi bi-star-fill text-warning"></i>
          <i className="bi bi-star-fill text-warning"></i>
          <i className="bi bi-star-fill text-warning"></i>
          <i className="bi bi-star-fill text-warning"></i>
          <i className="bi bi-star-fill text-warning"></i>
        </>
      );
    } else if (star === 4) {
      return (
        <>
          <i className="bi bi-star-fill text-warning"></i>
          <i className="bi bi-star-fill text-warning"></i>
          <i className="bi bi-star-fill text-warning"></i>
          <i className="bi bi-star-fill text-warning"></i>
          <i className="bi bi-star text-warning"></i>
        </>
      );
    }
  }

  useEffect(() => {
    (() => {
      dispatch(getTestimonial());
      // dispatch(getProduct());
    })();
    // }, [TestimonialStateData.length, ProductStateData.length]);
  }, [TestimonialStateData.length]);

  return (
    <div className="container-fluid py-5">
      <div className="container">
        {pid === undefined ? (
          <div
            className="text-center mx-auto mb-5"
            style={{ maxWidth: "500px" }}
          >
            <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">
              Testimonial
            </h5>
            <h1 className="display-4">Our Happy Customers</h1>
          </div>
        ) : null}
        {/* <div className="text-center mx-auto mb-5" style={{ maxWidth: "500px" }}>
          <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">
            Testimonial
          </h5>
          <h1 className="display-4">Our Happy Customers</h1>
        </div> */}
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <Swiper {...sliderOption}>
              <div className="testimonial-carousel">
                {TestimonialStateData.filter((x) =>
                  pid ? x.product === pid : x.star >= 4,
                ).map((x) => {
                  // const product = ProductStateData.find((p) => p._id === x.product);
                  // console.log(product);
                  console.log(x);
                  return (
                    <SwiperSlide key={x._id}>
                      <div className="testimonial-item text-center">
                        <div className="position-relative mb-3">
                          <Link to={`/product/${x.product?._id}`}>
                            {x.product?.name}
                          </Link>
                          <div className="text-center">{getStar(x.star)}</div>
                          {/* <img
                            className="img-fluid rounded-circle mx-auto"
                            src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${product?.pic[0]}`}
                            style={{ objectFit: "cover" }}
                            alt=""
                          /> */}
                          {/* <div
                            className="position-absolute top-100 start-50 translate-middle d-flex align-items-center justify-content-center bg-white rounded-circle"
                            style={{ width: "60px", height: "60px" }}
                          >
                            <i className="fa fa-quote-left fa-2x text-primary"></i>
                          </div> */}
                        </div>
                        <p className="fs-4 fw-normal">{x.message}</p>
                        <hr className="w-25 mx-auto" />
                        <h3>{x.user?.name}</h3>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

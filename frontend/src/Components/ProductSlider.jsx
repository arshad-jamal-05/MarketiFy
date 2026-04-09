import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import SingleProduct from "./SingleProduct";

export default function ProductSlider({ maincategory, data }) {
  let sliderOption = {
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

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5">
          <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">
            {maincategory !== "Related Products"
              ? `${maincategory} Products`
              : `Our Others ${maincategory}`}
          </h5>
          {maincategory === "Related Products" ? null : (
            <h1>Checkout Our Awesome Products for {maincategory}</h1>
          )}
        </div>
        <Swiper {...sliderOption}>
          {data.map((item) => {
            return (
              <SwiperSlide key={item._id}>
                <SingleProduct item={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import About from "../Components/About";
import Features from "../Components/Features";
import ProductSlider from "../Components/ProductSlider";
import Testimonial from "../Components/Testimonial";
import Products from "../Components/Products";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { getSetting } from "../Redux/ActionCreators/SettingActionCreators";
import { getProduct } from "../Redux/ActionCreators/ProductActionCreators";
import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators";
import { getBrand } from "../Redux/ActionCreators/BrandActionCreators";
import { useDispatch, useSelector } from "react-redux";

export default function HomePage() {
  let [settingData, setSettingData] = useState({
    siteName: import.meta.env.VITE_APP_SITE_NAME,
    address: import.meta.env.VITE_APP_ADDRESS,
    email: import.meta.env.VITE_APP_EMAIL,
    phone: import.meta.env.VITE_APP_PHONE,
    map1: import.meta.env.VITE_APP_MAP_URL1,
    whatsapp: import.meta.env.VITE_APP_WHATSAPP,
    facebook: import.meta.env.VITE_APP_FACEBOOK,
    twitter: import.meta.env.VITE_APP_TWITTER,
    linkedin: import.meta.env.VITE_APP_LINKEDIN,
    instagram: import.meta.env.VITE_APP_INSTAGRAM,
  });

  let SettingStateData = useSelector((state) => state.SettingStateData);
  let ProductStateData = useSelector((state) => state.ProductStateData);
  let BrandStateData = useSelector((state) => state.BrandStateData);
  let MaincategoryStateData = useSelector(
    (state) => state.MaincategoryStateData,
  );
  let dispatch = useDispatch();

  let sliderOption = {
    loop: true,
    modules: [Autoplay],
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  };

  useEffect(() => {
    (() => {
      dispatch(getSetting());
      if (SettingStateData.length) {
        let item = SettingStateData[0];
        setSettingData({
          siteName: item.siteName ? item.siteName : settingData.siteName,
        });
      }
    })();
  }, [SettingStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getProduct());
    })();
  }, [ProductStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getBrand());
    })();
  }, [BrandStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getMaincategory());
    })();
  }, [MaincategoryStateData.length]);

  return (
    <>
      <Swiper {...sliderOption} style={{ height: 550 }}>
        <SwiperSlide>
          <div className="mb-5">
            <img src="/images/banner1.jpg" className="my-banner-image" alt="" />

            <div className="container py-5">
              <div className="row justify-content-start">
                <div className="col-lg-8 text-center text-lg-start">
                  <h5
                    className="d-inline-block text-primary text-uppercase border-bottom border-5"
                    style={{
                      borderColor: "rgba(256, 256, 256, .3) !important",
                    }}
                  >
                    Welcome To {settingData.siteName}
                  </h5>
                  <h1 className="display-1 text-white mb-md-4">
                    Style That Defines the Modern Man
                  </h1>
                  <div className="pt-2">
                    <Link
                      to="/shop"
                      className="btn btn-outline-light rounded-pill py-md-3 px-md-5 mx-2"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="mb-5">
            <img src="/images/banner2.jpg" className="my-banner-image" alt="" />

            <div className="container py-5">
              <div className="row justify-content-start">
                <div className="col-lg-8 text-center text-lg-start">
                  <h5
                    className="d-inline-block text-primary text-uppercase border-bottom border-5"
                    style={{
                      borderColor: "rgba(256, 256, 256, .3) !important",
                    }}
                  >
                    Welcome To {settingData.siteName}
                  </h5>
                  <h1 className="display-1 text-white mb-md-4">
                    Style That Speaks Your Power
                  </h1>
                  <div className="pt-2">
                    <Link
                      to="/shop"
                      className="btn btn-outline-light rounded-pill py-md-3 px-md-5 mx-2"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="mb-5">
            <img src="/images/banner4.jpg" className="my-banner-image" alt="" />

            <div className="container py-5">
              <div className="row justify-content-start">
                <div className="col-lg-8 text-center text-lg-start">
                  <h5
                    className="d-inline-block text-primary text-uppercase border-bottom border-5"
                    style={{
                      borderColor: "rgba(256, 256, 256, .3) !important",
                    }}
                  >
                    Welcome To {settingData.siteName}
                  </h5>
                  <h1 className="display-1 text-white mb-md-4">
                    Little Styles for Big Smiles
                  </h1>
                  <div className="pt-2">
                    <Link
                      to="/shop"
                      className="btn btn-outline-light rounded-pill py-md-3 px-md-5 mx-2"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="mb-5">
            <img
              src="/images/banner12.jpg"
              className="my-banner-image"
              alt=""
            />

            <div className="container py-5">
              <div className="row justify-content-start">
                <div className="col-lg-8 text-center text-lg-start">
                  <h5
                    className="d-inline-block text-primary text-uppercase border-bottom border-5"
                    style={{
                      borderColor: "rgba(256, 256, 256, .3) !important",
                    }}
                  >
                    Welcome To {settingData.siteName}
                  </h5>
                  <h1 className="display-1 text-white mb-md-4">
                    Powering Your World with Smart Innovation
                  </h1>
                  <div className="pt-2">
                    <Link
                      to="/shop"
                      className="btn btn-outline-light rounded-pill py-md-3 px-md-5 mx-2"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="mb-5">
            <img
              src="/images/banner11.jpg"
              className="my-banner-image"
              alt=""
            />

            <div className="container py-5">
              <div className="row justify-content-start">
                <div className="col-lg-8 text-center text-lg-start">
                  <h5
                    className="d-inline-block text-primary text-uppercase border-bottom border-5"
                    style={{
                      borderColor: "rgba(256, 256, 256, .3) !important",
                    }}
                  >
                    Welcome To {settingData.siteName}
                  </h5>
                  <h1 className="display-1 text-white mb-md-4">
                    Crafting Comfort, Defining Your Space
                  </h1>
                  <div className="pt-2">
                    <Link
                      to="/shop"
                      className="btn btn-outline-light rounded-pill py-md-3 px-md-5 mx-2"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <About />
      {MaincategoryStateData.filter((x) => x.status).map((item) => {
        let data = ProductStateData.filter(
          (x) => x.maincategory?.name === item.name,
        );
        if (data.length) {
          return (
            <ProductSlider
              key={item._id}
              maincategory={item.name}
              data={data}
            />
          );
        }
      })}
      <Features />
      <Products
        maincategory={MaincategoryStateData.filter((x) => x.status)}
        data={ProductStateData.filter((x) => x.status)}
      />
      <Testimonial />
    </>
  );
}

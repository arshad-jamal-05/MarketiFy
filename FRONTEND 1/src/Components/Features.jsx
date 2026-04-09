import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeatures } from "../Redux/ActionCreators/FeaturesActionCreators";

export default function Features() {
  let FeaturesStateData = useSelector((state) => state.FeaturesStateData);
  let dispatch = useDispatch();

  useEffect(() => {
    (() => {
      dispatch(getFeatures());
    })();
  }, [FeaturesStateData.length]);

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5">
          <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">
            Features
          </h5>
          <h3>Our Features - Designed for a Better Shopping Experience</h3>
          <p>
            Our features are built to give you a smooth and convenient shopping
            experience from start to finish. With smart product search, detailed
            product views, secure checkout, multiple payment options, real-time
            order tracking, easy returns, and a personalized user dashboard,
            everything is designed to save your time and effort. We focus on
            performance, security, and user-friendly navigation so you can
            discover, compare, and purchase your favorite products quickly and
            confidently.
          </p>
        </div>
        <div className="row g-5">
          {FeaturesStateData.filter((x) => x.status).map((item) => {
            return (
              <div className="col-lg-4 col-md-6" key={item._id}>
                <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                  <div className="service-icon mb-4">
                    <span
                      className="text-light fs-1"
                      dangerouslySetInnerHTML={{ __html: item.icon }}
                    />
                  </div>
                  <h4 className="mb-3">{item.name}</h4>
                  <p className="m-0">{item.shortDescription}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";

export default function About() {
  return (
    <>
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row gx-5">
            <div
              className="col-lg-5 mb-5 mb-lg-0"
              style={{ minHeight: "500px" }}
            >
              <div className="position-relative h-100">
                <img
                  className="position-absolute w-100 h-100 rounded"
                  src="/images/banner10.jpg"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="mb-4">
                <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">
                  About Us
                </h5>
                <h1>
                  Delivering Quality, Style, and Trust in Every Online Shopping
                  Experience.
                </h1>
              </div>
              <p>
                Welcome to {import.meta.env.VITE_APP_SITE_NAME}, your one-stop
                destination for a modern and reliable online shopping
                experience. We are dedicated to bringing you high-quality
                products, affordable prices, and a smooth, user-friendly journey
                from browsing to doorstep delivery. Our platform is built with a
                customer-first approach, ensuring secure payments, fast
                shipping, and responsive support at every step. At{" "}
                {import.meta.env.VITE_APP_SITE_NAME}, we continuously update our
                collections to match the latest trends and everyday needs,
                making shopping simple, enjoyable, and trustworthy for everyone.
              </p>
              <div className="row g-3 pt-3">
                <div className="col-sm-3 col-6">
                  <div className="bg-light text-center rounded-circle py-4">
                    <i className="bi bi-patch-check fs-1 text-primary mb-3"></i>
                    <h6 className="mb-0">
                      100%
                      <small className="d-block text-primary">
                        Genuine Products
                      </small>
                    </h6>
                  </div>
                </div>
                <div className="col-sm-3 col-6">
                  <div className="bg-light text-center rounded-circle py-4">
                    <i className="bi bi-headset fs-1 text-primary mb-3"></i>
                    <h6 className="mb-0">
                      24/7
                      <small className="d-block text-primary">
                        Customer Support
                      </small>
                    </h6>
                  </div>
                </div>
                <div className="col-sm-3 col-6">
                  <div className="bg-light text-center rounded-circle py-4">
                    <i className="bi bi-people fs-1 text-primary mb-3"></i>
                    <h6 className="mb-0">
                      100000+
                      <small className="d-block text-primary">
                        Happy Customers
                      </small>
                    </h6>
                  </div>
                </div>
                <div className="col-sm-3 col-6">
                  <div className="bg-light text-center rounded-circle py-4">
                    <i className="bi bi-arrow-repeat fs-1 text-primary mb-3"></i>
                    <h6 className="mb-0">
                      7 Days
                      <small className="d-block text-primary">
                        Refund Policy
                      </small>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

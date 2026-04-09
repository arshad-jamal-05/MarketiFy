import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

export default function Testimonial() {
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

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: "500px" }}>
          <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">
            Testimonial
          </h5>
          <h1 className="display-4">Patients Say About Our Services</h1>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <Swiper {...sliderOption}>
              <div className="testimonial-carousel">
                <SwiperSlide>
                  <div className="testimonial-item text-center">
                    <div className="position-relative mb-5">
                      <img
                        className="img-fluid rounded-circle mx-auto"
                        src="img/testimonial-1.jpg"
                        alt=""
                      />
                      <div
                        className="position-absolute top-100 start-50 translate-middle d-flex align-items-center justify-content-center bg-white rounded-circle"
                        style={{ width: "60px", height: "60px" }}
                      >
                        <i className="fa fa-quote-left fa-2x text-primary"></i>
                      </div>
                    </div>
                    <p className="fs-4 fw-normal">
                      Dolores sed duo clita tempor justo dolor et stet lorem
                      kasd labore dolore lorem ipsum. At lorem lorem magna ut
                      et, nonumy et labore et tempor diam tempor erat. Erat
                      dolor rebum sit ipsum.
                    </p>
                    <hr className="w-25 mx-auto" />
                    <h3>Patient Name</h3>
                    <h6 className="fw-normal text-primary mb-3">Profession</h6>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="testimonial-item text-center">
                    <div className="position-relative mb-5">
                      <img
                        className="img-fluid rounded-circle mx-auto"
                        src="img/testimonial-2.jpg"
                        alt=""
                      />
                      <div
                        className="position-absolute top-100 start-50 translate-middle d-flex align-items-center justify-content-center bg-white rounded-circle"
                        style={{ width: "60px", height: "60px" }}
                      >
                        <i className="fa fa-quote-left fa-2x text-primary"></i>
                      </div>
                    </div>
                    <p className="fs-4 fw-normal">
                      Dolores sed duo clita tempor justo dolor et stet lorem
                      kasd labore dolore lorem ipsum. At lorem lorem magna ut
                      et, nonumy et labore et tempor diam tempor erat. Erat
                      dolor rebum sit ipsum.
                    </p>
                    <hr className="w-25 mx-auto" />
                    <h3>Patient Name</h3>
                    <h6 className="fw-normal text-primary mb-3">Profession</h6>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="testimonial-item text-center">
                    <div className="position-relative mb-5">
                      <img
                        className="img-fluid rounded-circle mx-auto"
                        src="img/testimonial-3.jpg"
                        alt=""
                      />
                      <div
                        className="position-absolute top-100 start-50 translate-middle d-flex align-items-center justify-content-center bg-white rounded-circle"
                        style={{ width: "60px", height: "60px" }}
                      >
                        <i className="fa fa-quote-left fa-2x text-primary"></i>
                      </div>
                    </div>
                    <p className="fs-4 fw-normal">
                      Dolores sed duo clita tempor justo dolor et stet lorem
                      kasd labore dolore lorem ipsum. At lorem lorem magna ut
                      et, nonumy et labore et tempor diam tempor erat. Erat
                      dolor rebum sit ipsum.
                    </p>
                    <hr className="w-25 mx-auto" />
                    <h3>Patient Name</h3>
                    <h6 className="fw-normal text-primary mb-3">Profession</h6>
                  </div>
                </SwiperSlide>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

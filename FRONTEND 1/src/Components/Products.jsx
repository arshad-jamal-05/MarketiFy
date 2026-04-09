// import React from "react";

// export default function Products() {
//   return (
//     <div className="container-fluid py-5">
//       <div className="container">
//         <div className="text-center mx-auto mb-5" style={{ maxWidth: "500px" }}>
//           <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">
//             Blog Post
//           </h5>
//           <h1 className="display-4">Our Latest Medical Blog Posts</h1>
//         </div>
//         <div className="row g-5">
//           <div className="col-xl-4 col-lg-6">
//             <div className="bg-light rounded overflow-hidden">
//               <img className="img-fluid w-100" src="img/blog-1.jpg" alt="" />
//               <div className="p-4">
//                 <a className="h3 d-block mb-3" href="#!">
//                   Dolor clita vero elitr sea stet dolor justo diam
//                 </a>
//                 <p className="m-0">
//                   Dolor lorem eos dolor duo et eirmod sea. Dolor sit magna rebum
//                   clita rebum dolor stet amet justo
//                 </p>
//               </div>
//               <div className="d-flex justify-content-between border-top p-4">
//                 <div className="d-flex align-items-center">
//                   <img
//                     className="rounded-circle me-2"
//                     src="img/user.jpg"
//                     width="25"
//                     height="25"
//                     alt=""
//                   />
//                   <small>John Doe</small>
//                 </div>
//                 <div className="d-flex align-items-center">
//                   <small className="ms-3">
//                     <i className="far fa-eye text-primary me-1"></i>12345
//                   </small>
//                   <small className="ms-3">
//                     <i className="far fa-comment text-primary me-1"></i>123
//                   </small>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-xl-4 col-lg-6">
//             <div className="bg-light rounded overflow-hidden">
//               <img className="img-fluid w-100" src="img/blog-2.jpg" alt="" />
//               <div className="p-4">
//                 <a className="h3 d-block mb-3" href="#!">
//                   Dolor clita vero elitr sea stet dolor justo diam
//                 </a>
//                 <p className="m-0">
//                   Dolor lorem eos dolor duo et eirmod sea. Dolor sit magna rebum
//                   clita rebum dolor stet amet justo
//                 </p>
//               </div>
//               <div className="d-flex justify-content-between border-top p-4">
//                 <div className="d-flex align-items-center">
//                   <img
//                     className="rounded-circle me-2"
//                     src="img/user.jpg"
//                     width="25"
//                     height="25"
//                     alt=""
//                   />
//                   <small>John Doe</small>
//                 </div>
//                 <div className="d-flex align-items-center">
//                   <small className="ms-3">
//                     <i className="far fa-eye text-primary me-1"></i>12345
//                   </small>
//                   <small className="ms-3">
//                     <i className="far fa-comment text-primary me-1"></i>123
//                   </small>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-xl-4 col-lg-6">
//             <div className="bg-light rounded overflow-hidden">
//               <img className="img-fluid w-100" src="img/blog-3.jpg" alt="" />
//               <div className="p-4">
//                 <a className="h3 d-block mb-3" href="#!">
//                   Dolor clita vero elitr sea stet dolor justo diam
//                 </a>
//                 <p className="m-0">
//                   Dolor lorem eos dolor duo et eirmod sea. Dolor sit magna rebum
//                   clita rebum dolor stet amet justo
//                 </p>
//               </div>
//               <div className="d-flex justify-content-between border-top p-4">
//                 <div className="d-flex align-items-center">
//                   <img
//                     className="rounded-circle me-2"
//                     src="img/user.jpg"
//                     width="25"
//                     height="25"
//                     alt=""
//                   />
//                   <small>John Doe</small>
//                 </div>
//                 <div className="d-flex align-items-center">
//                   <small className="ms-3">
//                     <i className="far fa-eye text-primary me-1"></i>12345
//                   </small>
//                   <small className="ms-3">
//                     <i className="far fa-comment text-primary me-1"></i>123
//                   </small>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import SingleProduct from "./SingleProduct";

export default function Products({ maincategory, data }) {
  let [selected, setSelected] = useState("");

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5">
          <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5 mb-3">
            Our Latest Products
          </h5>
          <div className="d-flex">
            <button
              className={`w-100 btn me-4 ${selected === "" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setSelected("")}
            >
              All
            </button>
            {maincategory.map((item) => {
              return (
                <button
                  className={`w-100 btn me-4 ${selected === item.name ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setSelected(item.name)}
                  key={item._id}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
        <div className="row g-5">
          {data
            .filter((x) => selected === "" || x.maincategory === selected)
            .slice(0, 24)
            .map((item) => {
              return (
                <div className="col-xl-4 col-lg-6" key={item._id}>
                  <SingleProduct item={item} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

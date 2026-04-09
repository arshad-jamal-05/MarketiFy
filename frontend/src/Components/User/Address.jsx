import React, { useEffect, useState } from "react";
import FormValidator from "../../Validators/FormValidator";
import { ToastContainer, toast } from "react-toastify";

let addressDataOptions = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  pincode: "",
  state: "",
};
let errorMessageOptions = {
  name: "Name Field Is Required",
  email: "Email Address Is Required",
  phone: "Phone Number Field Is Required",
  address: "Address Field Is Required",
  city: "City Is Required",
  pincode: "Pincode Is Required",
  state: "State Is Required",
};

export default function Address() {
  let [addressData, setAddressData] = useState(addressDataOptions);
  let [errorMessage, setErrorMessage] = useState(errorMessageOptions);
  let [show, setShow] = useState(false);
  let [data, setData] = useState({});
  let [option, setOption] = useState("Create");
  let [showModal, setShowModal] = useState(false);
  let [flag, setFlag] = useState(false);

  function getInputData(e) {
    let { name, value } = e.target;
    setErrorMessage({ ...errorMessage, [name]: FormValidator(e) });
    setAddressData({ ...addressData, [name]: value });
  }

  async function postData(e) {
    e.preventDefault();
    let error = Object.values(errorMessage).find((x) => x !== "");
    if (error) {
      setShow(true);
    } else {
      if (option === "Create") {
        data.address = data.address
          ? data.address.concat([addressData])
          : [addressData];
      } else {
        data.address[addressData.index] = { ...addressData };
      }
      let response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_SERVER}/api/user/${localStorage.getItem("userid")}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            "authorization": localStorage.getItem("token"),
          },
          body: JSON.stringify({ ...data }),
        },
      );
      response = await response.json();
      toast("Address Has Been Updated Successfully !!!");
      setShowModal(false);
    }
    setAddressData(addressDataOptions);
    setErrorMessage(errorMessageOptions);
  }

  function createAddress() {
    setShowModal(true);
    setAddressData(addressDataOptions);
    setErrorMessage(errorMessageOptions);
    setShow(false);
    setOption("Create");
  }

  function editAddress(index) {
    setShowModal(true);
    setAddressData({ ...data.address[index], index: index });
    setErrorMessage(addressDataOptions);
    setShow(false);
    setOption("Edit");
  }

  async function deleteRecord(idx) {
    if (window.confirm("Are You Sure You Want To Delete This Address ?")) {
      data.address = data.address.filter((x, index) => idx !== index);
      let response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_SERVER}/api/user/${localStorage.getItem("userid")}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            "authorization": localStorage.getItem("token"),
          },
          body: JSON.stringify({ ...data }),
        },
      );
      response = await response.json();
      toast("Address Has Been Deleted Successfully !!!");
      setFlag(!flag);
    }
  }

  useEffect(() => {
    (async () => {
      let response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_SERVER}/api/user/${localStorage.getItem("userid")}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            "authorization": localStorage.getItem("token"),
          },
        },
      );
      response = await response.json();
      setData({ ...response.data });
    })();
  }, []);

  return (
    <>
      <div className="mb-3">
        <button
          className="btn btn-outline-primary float-end"
          onClick={createAddress}
        >
          Add New Address
        </button>
      </div>
      <div className="mt-5">
        {data?.address?.map((item, index) => {
          return (
            <div className="card p-3 my-3" key={index}>
              <h6>
                Name : <i className="text-primary">{item.name}</i>
              </h6>
              <h6>
                Phone Number : <i className="text-primary">{item.phone}</i>
              </h6>
              <h6>
                Email Address : <i className="text-primary">{item.email}</i>
              </h6>
              <h6>
                Address : <i className="text-primary">{item.address}</i>
              </h6>
              <h6>
                City : <i className="text-primary">{item.city}</i>
              </h6>
              <h6>
                Pincode : <i className="text-primary">{item.pincode}</i>
              </h6>
              <h6>
                State : <i className="text-primary">{item.state}</i>
              </h6>

              <div className="position-absolute end-0">
                <button
                  className="btn btn-outline-primary me-2"
                  onClick={() => editAddress(index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger me-2"
                  onClick={() => deleteRecord(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {/* Modal Dialog */}
      <div
        className={`modal fade ${showModal ? "show d-block" : "d-none"}`}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" style={{ minWidth: "75vw" }}>
          <form onSubmit={postData}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {option} Address
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-4 col-12 mb-3">
                    <label>Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={addressData.name}
                      onChange={getInputData}
                      className={`form-control ${show && errorMessage.name ? "border-danger" : "border-primary"}`}
                      placeholder="Full Name"
                    />
                    {show && errorMessage.name ? (
                      <p className="text-danger">{errorMessage.name}</p>
                    ) : null}
                  </div>
                  <div className="col-lg-4 col-12 mb-3">
                    <label>Phone Number*</label>
                    <input
                      type="tel"
                      pattern="[6-9]{1}[0-9]{9}"
                      maxLength={10}
                      minLength={10}
                      name="phone"
                      value={addressData.phone}
                      onChange={getInputData}
                      className="form-control"
                      placeholder="Phone Number"
                    />
                    {show && errorMessage.phone ? (
                      <p className="text-danger">{errorMessage.phone}</p>
                    ) : null}
                  </div>
                  <div className="col-lg-4 col-12 mb-3">
                    <label>Email*</label>
                    <input
                      type="email"
                      name="email"
                      value={addressData.email}
                      onChange={getInputData}
                      className="form-control"
                      placeholder="Email Address"
                    />
                    {show && errorMessage.email ? (
                      <p className="text-danger">{errorMessage.email}</p>
                    ) : null}
                  </div>
                  <div className="col-lg-12 col-12 mb-3">
                    <label>Address*</label>
                    <textarea
                      name="address"
                      value={addressData.address}
                      onChange={getInputData}
                      className="form-control"
                      placeholder="Address"
                      rows={2}
                    ></textarea>
                    {show && errorMessage.address ? (
                      <p className="text-danger">{errorMessage.address}</p>
                    ) : null}
                  </div>
                  <div className="col-lg-4 col-12 mb-3">
                    <label>City*</label>
                    <input
                      type="text"
                      name="city"
                      value={addressData.city}
                      onChange={getInputData}
                      className="form-control"
                      placeholder="City"
                    />
                    {show && errorMessage.city ? (
                      <p className="text-danger">{errorMessage.city}</p>
                    ) : null}
                  </div>
                  <div className="col-lg-4 col-12 mb-3">
                    <label>Pincode*</label>
                    <input
                      type="number"
                      name="pincode"
                      value={addressData.pincode}
                      onChange={getInputData}
                      className="form-control"
                      placeholder="Pincode"
                      maxLength={6}
                      minLength={6}
                    />
                    {show && errorMessage.pincode ? (
                      <p className="text-danger">{errorMessage.pincode}</p>
                    ) : null}
                  </div>
                  <div className="col-lg-4 col-12 mb-3">
                    <label>State*</label>
                    <input
                      type="text"
                      name="state"
                      value={addressData.state}
                      onChange={getInputData}
                      className="form-control"
                      placeholder="State"
                    />
                    {show && errorMessage.state ? (
                      <p className="text-danger">{errorMessage.state}</p>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  {option}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

import React, { useEffect, useState } from "react";
import Cart from "../../Components/User/Cart";

export default function CheckoutPage() {
  let [selected, setSelected] = useState({
    deliveryAddress: {},
    paymentMode: "COD",
  });
  let [address, setAddress] = useState([]);

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
      // if (response.address) {
      //   setAddress(response.address);
      //   setSelected({ ...selected, deliveryAddress: response.address[0] });
      // }
      if (response.data?.address) {
        setAddress(response.data.address);
        setSelected({ ...selected, deliveryAddress: response.data?.address[0] });
      }
      // console.log(response);
    })();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="container my-3">
          <div className="row">
            <div className="col-lg-6">
              <h5 className="bg-primary text-center text-light p-2">
                Delievery Address
              </h5>
              {/* {console.log(address)} */}
              {address?.map((item, index) => {
                return (
                  <div
                    className="card p-3 border-primary mb-3"
                    key={index}
                    style={{cursor: "pointer"}}
                    onClick={() =>
                      setSelected({
                        ...selected,
                        deliveryAddress: address[index],
                      })
                    }
                  >
                    <h6>
                      Name : <i className="text-primary">{item.name}</i>
                    </h6>
                    <h6>
                      Phone Number :{" "}
                      <i className="text-primary">{item.phone}</i>
                    </h6>
                    <h6>
                      Email Address :{" "}
                      <i className="text-primary">{item.email}</i>
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
                      {selected.deliveryAddress?.address === item.address ? (
                        <i
                          style={{ fontSize: "50px" }}
                          className="bi bi-check2 me-3 text-primary"
                        ></i>
                      ) : null}
                    </div>
                  </div>
                );
              })}
              <h5 className="bg-primary text-center text-light p-2">
                Payment Mode
              </h5>
              <div
                className="card p-2 text-dark mb-2"
                onClick={() => setSelected({ ...selected, paymentMode: "COD" })}
              >
                COD (Cash On Delivery)
                <div className="position-absolute end-0 top-0">
                  {selected.paymentMode === "COD" ? (
                    <i className="bi bi-check2 me-3 text-primary fs-3"></i>
                  ) : null}
                </div>
              </div>
              <div
                className="card p-2 text-dark mb-2"
                onClick={() =>
                  setSelected({ ...selected, paymentMode: "Net Banking" })
                }
              >
                Net Banking / Card
                <div className="position-absolute end-0 top-0">
                  {selected.paymentMode === "Net Banking" ? (
                    <i className="bi bi-check2 me-3 text-primary fs-3"></i>
                  ) : null}
                </div>
              </div>
              <div
                className="card p-2 text-dark mb-2"
                onClick={() => setSelected({ ...selected, paymentMode: "UPI" })}
              >
                BHIM UPI
                <div className="position-absolute end-0 top-0">
                  {selected.paymentMode === "UPI" ? (
                    <i className="bi bi-check2 me-3 text-primary fs-3"></i>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <h5 className="bg-primary text-center text-light p-2">
                Items in Cart
              </h5>
              <Cart title="Checkout" selected={selected} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

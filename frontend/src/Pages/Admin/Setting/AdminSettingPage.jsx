import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast, Bounce } from "react-toastify";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import {
  getSetting,
  createSetting,
  updateSetting,
} from "../../../Redux/ActionCreators/SettingActionCreators";

var rtePrivacyPolicy;
var rteTermsAndConditions;
var rteReturnPolicy;
var rteCancellationPolicy;
var rteRefundPolicy;

export default function AdminSettingPage() {
  var refdivPrivacyPolicy = useRef(null);
  var refdivTermsAndConditions = useRef(null);
  var refdivReturnPolicy = useRef(null);
  var refdivCancellationPolicy = useRef(null);
  var refdivRefundPolicy = useRef(null);

  let [data, setData] = useState({
    siteName: "",
    map1: "",
    map2: "",
    address: "",
    phone: "",
    email: "",
    whatsapp: "",
    facebook: "",
    instagram: "",
    twitter: "",
    privacyPolicy: "",
    termsAndConditions: "",
    returnPolicy: "",
    cancellationPolicy: "",
    refundPolicy: "",
  });

  let SettingStateData = useSelector((state) => state.SettingStateData);
  let dispatch = useDispatch();

  function getInputData(e) {
    let { name, value } = e.target;

    setData({ ...data, [name]: value });
  }

  function postData(e) {
    e.preventDefault();
    let item = {
      ...data,
      privacyPolicy: rtePrivacyPolicy.getHTMLCode(),
      termsAndConditions: rteTermsAndConditions.getHTMLCode(),
      returnPolicy: rteReturnPolicy.getHTMLCode(),
      cancellationPolicy: rteCancellationPolicy.getHTMLCode(),
      refundPolicy: rteRefundPolicy.getHTMLCode(),
    };
    // if (SettingStateData.length) {
    //   dispatch(updateSetting(item));
    // } else {
    //   dispatch(createSetting(item));
    // }
    if (data._id) {
      dispatch(updateSetting(item));
    } else {
      dispatch(createSetting(item));
    }
    // dispatch(createSetting(item));
    toast("Record Has Been Updated Successfully");
  }

  useEffect(() => {
    rtePrivacyPolicy = new window.RichTextEditor(refdivPrivacyPolicy.current);
    rteTermsAndConditions = new window.RichTextEditor(refdivTermsAndConditions.current);
    rteReturnPolicy = new window.RichTextEditor(refdivReturnPolicy.current);
    rteCancellationPolicy = new window.RichTextEditor(refdivCancellationPolicy.current);
    rteRefundPolicy = new window.RichTextEditor(refdivRefundPolicy.current);
    
    dispatch(getSetting());
    if (SettingStateData.length) {
      let item = SettingStateData[0];
      setData({ ...data, ...SettingStateData[0] });
      rtePrivacyPolicy.setHTMLCode(item.privacyPolicy?item.privacyPolicy:"");
      rteTermsAndConditions.setHTMLCode(item.termsAndConditions?item.termsAndConditions:"");
      rteReturnPolicy.setHTMLCode(item.returnPolicy?item.returnPolicy:"");
      rteCancellationPolicy.setHTMLCode(item.cancellationPolicy?item.cancellationPolicy:"");
      rteRefundPolicy.setHTMLCode(item.refundPolicy?item.refundPolicy:"");
    }
  }, [SettingStateData.length]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-lg-3">
            <AdminSidebar />
          </div>
          <div className="col-lg-9">
            <h5 className="bg-primary text-center p-2 text-light">
              Configuration Setting
            </h5>
            <form onSubmit={postData}>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label>Site Name</label>
                  <input
                    type="text"
                    name="siteName"
                    onChange={getInputData}
                    value={data.siteName}
                    placeholder="Sitename"
                    className="form-control border-primary"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    onChange={getInputData}
                    value={data.email}
                    placeholder="Email Address"
                    className="form-control border-primary"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    pattern="[6-9]{1}[0-9]{9}"
                    onChange={getInputData}
                    value={data.phone}
                    placeholder="Phone Number"
                    className="form-control border-primary"
                  />
                </div>
                <div className="col-12 mb-3">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    onChange={getInputData}
                    value={data.address}
                    placeholder="Address"
                    className="form-control border-primary"
                  />
                </div>
                <div className="col-12 mb-3">
                  <label>Google Map1</label>
                  <input
                    type="url"
                    name="map1"
                    onChange={getInputData}
                    value={data.map1}
                    placeholder="Google Map1"
                    className="form-control border-primary"
                  />
                </div>
                <div className="col-12 mb-3">
                  <label>Google Map2</label>
                  <input
                    type="url"
                    name="map2"
                    onChange={getInputData}
                    value={data.map2}
                    placeholder="Google Map2"
                    className="form-control border-primary"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label>WhatsApp Number</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    pattern="[6-9]{1}[0-9]{9}"
                    onChange={getInputData}
                    value={data.whatsapp}
                    placeholder="WhatsApp Number"
                    className="form-control border-primary"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label>Twitter</label>
                  <input
                    type="url"
                    name="twitter"
                    onChange={getInputData}
                    value={data.twitter}
                    placeholder="Twitter ( X )"
                    className="form-control border-primary"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label>Facebook</label>
                  <input
                    type="url"
                    name="facebook"
                    onChange={getInputData}
                    value={data.facebook}
                    placeholder="Facebook"
                    className="form-control border-primary"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label>LinkedIn</label>
                  <input
                    type="url"
                    name="linkedin"
                    onChange={getInputData}
                    value={data.linkedin}
                    placeholder="LinkedIn"
                    className="form-control border-primary"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label>Instagram</label>
                  <input
                    type="url"
                    name="instagram"
                    onChange={getInputData}
                    value={data.instagram}
                    placeholder="Instagram"
                    className="form-control border-primary"
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label>Privacy Policy</label>
                  <div
                    ref={refdivPrivacyPolicy}
                    className="border border-primary"
                  ></div>
                </div>
                <div className="col-md-12 mb-3">
                  <label>Terms and Conditions</label>
                  <div
                    ref={refdivTermsAndConditions}
                    className="border border-primary"
                  ></div>
                </div>
                <div className="col-md-12 mb-3">
                  <label>Return Policy</label>
                  <div
                    ref={refdivReturnPolicy}
                    className="border border-primary"
                  ></div>
                </div>
                <div className="col-md-12 mb-3">
                  <label>Cancellation Policy</label>
                  <div
                    ref={refdivCancellationPolicy}
                    className="border border-primary"
                  ></div>
                </div>
                <div className="col-md-12 mb-3">
                  <label>Refund Policy</label>
                  <div
                    ref={refdivRefundPolicy}
                    className="border border-primary"
                  ></div>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary w-100">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

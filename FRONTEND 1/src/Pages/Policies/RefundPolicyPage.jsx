import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSetting } from "../../Redux/ActionCreators/SettingActionCreators";

export default function RefundPolicyPage() {
  let [settingData, setSettingData] = useState({
    refundPolicy: "",
  });

  let SettingStateData = useSelector((state) => state.SettingStateData);
  let dispatch = useDispatch();

  useEffect(() => {
    (() => {
      dispatch(getSetting());
      if (SettingStateData.length) {
        let item = SettingStateData[0];
        setSettingData({
          refundPolicy: item.refundPolicy
            ? item.refundPolicy
            : settingData.refundPolicy,
        });
      }
    })();
  }, [SettingStateData.length]);

  return (
    <div className="container-fluid">
      <div className="container my-5">
        <div
          dangerouslySetInnerHTML={{ __html: settingData.refundPolicy }}
        ></div>
      </div>
    </div>
  );
}

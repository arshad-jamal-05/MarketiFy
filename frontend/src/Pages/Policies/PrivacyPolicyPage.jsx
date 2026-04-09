import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSetting } from "../../Redux/ActionCreators/SettingActionCreators";

export default function PrivacyPolicyPage() {
  let [settingData, setSettingData] = useState({
    privacyPolicy: "",
  });

  let SettingStateData = useSelector((state) => state.SettingStateData);
  let dispatch = useDispatch();

  useEffect(() => {
    (() => {
      dispatch(getSetting());
      if (SettingStateData.length) {
        let item = SettingStateData[0];
        setSettingData({
          privacyPolicy: item.privacyPolicy
            ? item.privacyPolicy
            : settingData.privacyPolicy,
        });
      }
    })();
  }, [SettingStateData.length]);

  return (
    <div className="container-fluid">
      <div className="container my-5">
        <div
          dangerouslySetInnerHTML={{ __html: settingData.privacyPolicy }}
        ></div>
      </div>
    </div>
  );
}

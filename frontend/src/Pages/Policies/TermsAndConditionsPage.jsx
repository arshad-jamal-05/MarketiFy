import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSetting } from "../../Redux/ActionCreators/SettingActionCreators";

export default function TermsAndConditionsPage() {
  let [settingData, setSettingData] = useState({
    termsAndConditions: "",
  });

  let SettingStateData = useSelector((state) => state.SettingStateData);
  let dispatch = useDispatch();

  useEffect(() => {
    (() => {
      dispatch(getSetting());
      if (SettingStateData.length) {
        let item = SettingStateData[0];
        setSettingData({
          termsAndConditions: item.termsAndConditions
            ? item.termsAndConditions
            : settingData.termsAndConditions,
        });
      }
    })();
  }, [SettingStateData.length]);

  return (
    <div className="container-fluid">
      <div className="container my-5">
        <div
          dangerouslySetInnerHTML={{ __html: settingData.termsAndConditions }}
        ></div>
      </div>
    </div>
  );
}

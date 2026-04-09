import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSetting } from "../../Redux/ActionCreators/SettingActionCreators";

export default function ReturnPolicyPage() {
  let [settingData, setSettingData] = useState({
    returnPolicy: "",
  });

  let SettingStateData = useSelector((state) => state.SettingStateData);
  let dispatch = useDispatch();

  useEffect(() => {
    (() => {
      dispatch(getSetting());
      if (SettingStateData.length) {
        let item = SettingStateData[0];
        setSettingData({
          returnPolicy: item.returnPolicy
            ? item.returnPolicy
            : settingData.returnPolicy,
        });
      }
    })();
  }, [SettingStateData.length]);

  return (
    <div className="container-fluid">
      <div className="container my-5">
        <div
          dangerouslySetInnerHTML={{ __html: settingData.returnPolicy }}
        ></div>
      </div>
    </div>
  );
}

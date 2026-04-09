import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSetting } from "../../Redux/ActionCreators/SettingActionCreators";

export default function CancellationPolicyPage() {
  let [settingData, setSettingData] = useState({
    cancellationPolicy: "",
  });

  let SettingStateData = useSelector((state) => state.SettingStateData);
  let dispatch = useDispatch();

  useEffect(() => {
    (() => {
      dispatch(getSetting());
      if (SettingStateData.length) {
        let item = SettingStateData[0];
        setSettingData({
          cancellationPolicy: item.cancellationPolicy
            ? item.cancellationPolicy
            : settingData.cancellationPolicy,
        });
      }
    })();
  }, [SettingStateData.length]);

  return (
    <div className="container-fluid">
      <div className="container my-5">
        <div
          dangerouslySetInnerHTML={{ __html: settingData.cancellationPolicy }}
        ></div>
      </div>
    </div>
  );
}

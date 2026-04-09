import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFAQ } from "../Redux/ActionCreators/FAQActionCreators";

export default function FAQPage() {
  let FAQStateData = useSelector((state) => state.FAQStateData);
  let dispatch = useDispatch();

  useEffect(() => {
    (() => {
      dispatch(getFAQ());
    })();
  }, [FAQStateData.length]);

  return (
    <>
      <div className="container-fluid">
        <div className="container my-5">
          <div className="accordion" id="accordionExample">
            {FAQStateData.filter((x) => x.status).map((item, index) => {
              return (
                <div className="accordion-item" key={item._id}>
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${item._id}`}
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      {item.question}
                    </button>
                  </h2>
                  <div
                    id={`collapse${item._id}`}
                    className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">{item.answer}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

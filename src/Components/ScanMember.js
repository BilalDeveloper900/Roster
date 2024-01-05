import React, { useState } from "react";
import { useNavigate } from "react-router";

function ScanMember() {
  const navigate = useNavigate();
  const [memberId, setMemberId] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(memberId);
    navigate(`/scanDetail/${memberId}`);
  };

  const handleBack = () => {
    navigate("/today");
  };

  return (
    <div>
      <div className="scan-main">
        <div className="header">
          <div className="first-header">
            <span className="date">
              <b>11:03</b>
            </span>
            <div>
              <i
                className="fa-solid fa-signal"
                style={{
                  fontSize: "13px",
                  paddingTop: "0px",
                  margin: "0px",
                  paddingLeft: "5px",
                }}
              ></i>
              <b
                style={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  paddingLeft: "5px",
                }}
              >
                LTE
              </b>
              <i className="fa-solid fa-battery-quarter"></i>
            </div>
          </div>
          <div className="second-header">
            <span>
              <i
                className="fa fa-arrow-left pointer"
                aria-hidden="true"
                onClick={handleBack}
              ></i>
              <b>Member Id</b>
            </span>

            <span>
              <i className="fa-solid fa-qrcode first"></i>
              <i className="fa fa-home second" aria-hidden="true"></i>
            </span>
          </div>
        </div>

        <div className="body">
          <div className="scan-box">
            <div className="scan-1">
              <b>Member Id</b>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter Id"
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>

        <div className="footer">
          <hr />
        </div>
      </div>
    </div>
  );
}

export default ScanMember;

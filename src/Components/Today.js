import React from "react";

function Today() {
  return (
    <div className="today-outer">
      <div className="today-main">
        <div className="header">
          <div className="first-header">
            <span className="date">
              <b>11:03</b>
            </span>
            <div>
              <i
                class="fa-solid fa-signal"
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
              <i class="fa-solid fa-battery-quarter"></i>
            </div>
          </div>
          <div className="second-header">
            <span>
              <i class="fa fa-arrow-left" aria-hidden="true"></i>
              <b>All Trips</b>
            </span>

            <span>
              <i className="fa-solid fa-qrcode first"></i>
              <i className="fa fa-home second" aria-hidden="true"></i>
            </span>
          </div>
        </div>

        <div className="search-box">
          <div className="search">
            <i className="fa fa-search ms-auto  " aria-hidden="true" />
            <input type="text" className="input" placeholder="Search by name" />
          </div>
        </div>

        <div className="trip">
          <b>Today</b>

          <div className="calender">
            <b>12/26/2023</b>
            <i class="fa-regular fa-calendar"></i>
          </div>
        </div>

        <div className="no-trip" align="center">
          <b>No Trip for Today</b>
        </div>

        <div className="next-trip">
          <b>Next Trips</b>
        </div>

        <div className="box">
          <div className="hr" />
          <div className="box-in">
            <div className="text">
              Trip Name:{" "}
              <span>Rocky Mountains Jasper and Banff Tour 5 day</span>
            </div>

            <div>
              Trip Date: <span>12/22/2025</span>
            </div>

            <div className="box-1">
              <div className="first">
                Trip Seats: <span>50</span> <span>(50 left)</span> <br />
                AM-ON-BUS: <span>0</span> <br />
                PARENT PICKED UP: <span>0</span>
              </div>
              <div className="second">
                Trip Members: <span>0</span>
                <br />
                PM-RETURN: <span>0</span>
                <br />
                NO-SHOW: <span>0</span>
              </div>
            </div>

            <span className="view-details">View Details</span>
          </div>
        </div>

        <div className="footer">
          <hr />
        </div>
      </div>
    </div>
  );
}

export default Today;

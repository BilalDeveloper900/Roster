import React from "react";
import { BoxArrowInLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router";

function Dashboard() {
  const navigate = useNavigate();
  const handelToday = () => {
    navigate("/today");
  };
  return (
    <div>
      <div className="dashboard-outer">
        <div className="dashboard-main">
          <div className="header">
            <div className="first-header">
              <span className="date">
                <b>6:09</b>
              </span>
              <span>
                <i
                  className="fa fa-ellipsis-h"
                  aria-hidden="true"
                  style={{
                    color: "#14446b",
                  }}
                ></i>
                <i className="fa-solid fa-wifi"></i>
                <i
                  className="fa fa-battery-three-quarters"
                  aria-hidden="true"
                ></i>
              </span>
            </div>

            <div className="second-header">
              <span>
                <b>Dashboard</b>
              </span>
              <span>
                <i className="fa-solid fa-qrcode"></i>
              </span>
            </div>
          </div>

          <div className="search-box">
            <div className="search">
              <i className="fa fa-search ms-auto  " aria-hidden="true" />
              <input
                type="text"
                className="input"
                placeholder="Search by name"
              />
            </div>
          </div>

          <div className="trip">
            <b onClick={handelToday}>Today's Trip</b>
          </div>

          <div className="no-trip" align="center">
            <b>No Trip for Today</b>
          </div>

          <div className="container">
            <div className="box-1">
              <i class="fa-regular fa-clipboard"></i>
              <b>Trip List</b>
            </div>

            <div className="box-2">
              <i class="fa-regular fa-user"></i>
              <b>Profile</b>
            </div>
          </div>

          <div className="container">
            <div className="box-3">
              {/* <i class="fa-solid fa-arrow-right-from-bracket"></i> */}
              <BoxArrowInLeft size={30} />
              <b>Logout</b>
            </div>
          </div>

          <div className="footer">
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

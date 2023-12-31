import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { trips } from "../Stores/Slices";

function Today() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tripData, setTripData] = useState();

  const trip = () => {
    dispatch(trips()).then((res) => {
      setTripData(res.payload.data.trips);
      console.log(tripData, "trips-Data");
    });
  };

  const handleDetail = (tripId) => {
    navigate(`/tripList/${tripId}`);
  };

  useEffect(() => {
    trip();
  }, []);

  const handleBack = () => {
    navigate("/dashboard");
  };
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
            <i className="fa-regular fa-calendar"></i>
          </div>
        </div>

        <div className="no-trip" align="center">
          <b>No Trip for Today</b>
        </div>

        <div className="next-trip">
          <b>Next Trips</b>
        </div>

        {tripData &&
          tripData.map((value, index) => (
            <div className="box" key={index}>
              <div className="hr" />
              <div className="box-in">
                <div className="text">
                  Trip Name:
                  <span>{value.name}</span>
                </div>

                <div>
                  Trip Date: <span>{value.depart_date}</span>
                </div>

                <div className="box-1">
                  <div className="first">
                    Trip Seats: <span>50</span>{" "}
                    <span>({value.trip_seats} left)</span> <br />
                    AM-ON-BUS: <span>{value.am_on_bus_count}</span> <br />
                    PARENT PICKED UP: <span>0</span>
                  </div>
                  <div className="second">
                    Trip Members: <span>{value.trip_sold_seats}</span>
                    <br />
                    PM-RETURN: <span>{value.pm_return_count}</span>
                    <br />
                    NO-SHOW: <span>{value.no_show_count}</span>
                  </div>
                </div>

                <span
                  className="view-details ms-auto"
                  onClick={() => handleDetail(value.id)}
                >
                  View Details
                </span>
              </div>
            </div>
          ))}

        <div className="footer">
          <hr />
        </div>
      </div>
    </div>
  );
}

export default Today;

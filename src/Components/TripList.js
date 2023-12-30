import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { trips } from "../Stores/Slices";
import TripListTab from "./TripListTab";

function TripList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tripData, setTripData] = useState();

  const Members = () => {
    dispatch(trips()).then((res) => {
      setTripData(res.payload.data.trips);
      console.log(tripData, "trips");
    });
  };

  useEffect(() => {
    Members();
  }, []);

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="tripList-outer">
      <div className="tripList-main">
        <div className="header mb-3">
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
              <i className="fa-solid fa-wifi"></i>
              <i
                className="fa fa-battery-three-quarters"
                aria-hidden="true"
              ></i>
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

        {tripData &&
          tripData.map((value, index) => (
            <div className="box" key={index}>
              <div className="box-in">
                <div className="text">
                  <span id="color">
                    <b>{value.name}</b>
                  </span>
                </div>

                <div>
                  Trip Date: <span>{value.depart_date}</span>
                </div>

                <div className="box-1">
                  <div className="first">
                    Trip Seats: <span>{value.trip_seats}</span>{" "}
                    <span>({value.trip_available_seats} left)</span> <br />
                    AM-ON-BUS: <span>{value.am_on_bus_count}</span> <br />
                    PARENT PICKED UP: <span>0</span>
                  </div>
                  <div className="second pb-1">
                    Trip Members: <span>{value.trip_sold_seats}</span>
                    <br />
                    PM-RETURN: <span>{value.pm_return_count}</span>
                    <br />
                    NO-SHOW: <span>{value.no_show_count}</span>
                  </div>
                </div>

                <div className="pt-1">
                  Bus stops locations:{" "}
                  <span>({value.trip_locations_count})</span>
                </div>

                <div className="total">Total / Sold / Available</div>

                <div className="d-flex justify-content-between">
                  <span id="color">Highland park</span>
                  <div className="total ">
                    {value.trip_seats} / {value.trip_sold_seats} /{" "}
                    {value.trip_available_seats}
                  </div>
                </div>
              </div>
            </div>
          ))}

        <div className="box ">
          <div className="p-3 pb-0">
            Trip Members: <span>(8)</span>
          </div>

          <div className="search-box pb-3">
            <div className="search">
              <i className="fa fa-search ms-auto  " aria-hidden="true" />
              <input
                type="text"
                className="input"
                placeholder="Search by name"
              />
            </div>
          </div>

          <div className="pb-5">
            <TripListTab className="pb-5" />
          </div>
        </div>

        <div className="footer">
          <div className="scan-member">
            <i className="fa-solid fa-qrcode first"></i>

            <b>Scan Member</b>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
}

export default TripList;

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { tripDetail } from "../Stores/Slices";
import TripListTab from "./TripListTab";
import ModalWindow from "./ModalWindow";
// import ModalWindow from "./ModalWindow";

function TripList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tripData, setTripData] = useState();

  const Members = () => {
    dispatch(tripDetail(id)).then((res) => {
      setTripData(res.payload.data.trip);
      console.log(res, "trips");
    });
  };

  useEffect(() => {
    Members();
  }, []);

  const handleBack = () => {
    navigate("/today");
  };

  const scanMember = () => {
    navigate("/scanMember");
  };

  return (
    <div className="tripList-outer ">
      <div className="tripList-main ">
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

        <div className="box">
          <div className="box-in">
            <div className="text">
              <span id="color">
                <b>{tripData?.name}</b>
              </span>
            </div>

            <div>
              Trip Date: <span>{tripData?.depart_date}</span>
            </div>

            <div className="box-1">
              <div className="first">
                Trip Seats: <span>{tripData?.trip_seats}</span>{" "}
                <span>({tripData?.trip_available_seats} left)</span> <br />
                AM-ON-BUS: <span>{tripData?.am_on_bus_count}</span> <br />
                PARENT PICKED UP: <span>0</span>
              </div>
              <div className="second pb-1">
                Trip Members: <span>{tripData?.trip_sold_seats}</span>
                <br />
                PM-RETURN: <span>{tripData?.pm_return_count}</span>
                <br />
                NO-SHOW: <span>{tripData?.no_show_count}</span>
              </div>
            </div>

            <div className="pt-1">
              Bus stops locations:{" "}
              <span>({tripData?.trip_locations_count})</span>
            </div>

            <div className="total">Total / Sold / Available</div>

            <div className="d-flex justify-content-between">
              <span id="color">Highland park</span>
              <div className="total ">
                {tripData?.trip_seats} / {tripData?.trip_sold_seats} /{" "}
                {tripData?.trip_available_seats}
              </div>
            </div>
          </div>
        </div>

        <div className="box tp">
          <div className="pb-5">
            <TripListTab number={tripData?.trip_sold_seats} />
          </div>
        </div>

        <div className="footer">
          {/* <ModalWindow /> */}
          <div className="scan-member" onClick={() => scanMember()}>
            <i className="fa-solid fa-qrcode first"></i>

            <b>Scan Member</b>
          </div>
          <hr />
        </div>

        {/* <ModalWindow /> */}
      </div>
    </div>
  );
}

export default TripList;

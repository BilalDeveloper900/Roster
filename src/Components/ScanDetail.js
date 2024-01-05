import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { scanDetail } from "../Stores/Slices";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function ScanDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [detail, setDetail] = useState();
  const [status, setStatus] = useState("AM-ON-BUS");
  const [statusAM, setStatusAM] = useState("AM-ON-BUS");
  const [statusPM, setStatusPM] = useState("PM-RETURN");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Members = () => {
    dispatch(scanDetail(id)).then((res) => {
      setDetail(res.payload.data.member);
      // console.log(res, "scan---detail");
    });
  };
  console.log(detail);

  const handleStatusAM = () => {
    setStatus(statusPM);
  };

  const handleStatusPM = () => {
    setStatus(statusAM);
    handleShow();
  };

  useEffect(() => {
    Members();
  }, []);

  const scanMember = () => {
    navigate("/scanMember");
  };

  const handleBack = () => {
    navigate("/today");
  };

  return (
    <div className="scanDetail-main">
      <div className="scanDetail">
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
              <b>Member Detail</b>
            </span>

            <span>
              <i className="fa-solid fa-qrcode first"></i>
              <i className="fa fa-home second" aria-hidden="true"></i>
            </span>
          </div>
        </div>

        <div className="body">
          <div className="box mt-3">
            <div>
              <div className="box1">
                <b>First Name:</b>
                <span>
                  <b>{detail?.first_name}</b>
                </span>
              </div>

              <div className="box1">
                <b>Last Name:</b>
                <span>
                  <b>{detail?.last_name}</b>
                </span>
              </div>

              <div className="box1">
                <b>Gender:</b>
                <span>
                  <b>{detail?.gender}</b>
                </span>
              </div>

              <div className="box1">
                <b>Phone:</b>
                <span>
                  <b>{detail?.phone}</b>
                </span>
              </div>

              <div className="box1">
                <b>Email:</b>
                <span>
                  <b>{detail?.email}</b>
                </span>
              </div>

              <div className="box1">
                <b>Date of Birth:</b>
                <span>
                  <b>{detail?.date_of_birth}</b>
                </span>
              </div>

              <div className="box1">
                <b>Membership Price:</b>
                <span>
                  <b>{detail?.membership_price}</b>
                </span>
              </div>

              <div className="box2">
                <b>Status:</b>
                <span>
                  <b>{status}</b>
                </span>
              </div>
            </div>
          </div>

          <div className="memberDetail-btn pt-4">
            <span className="memberDetail-btn-1" onClick={handleStatusAM}>
              {status === "AM-ON-BUS" ? "PM-RETURN" : "NO-SHOW"}
            </span>
            <span
              className={`${
                status === "AM-ON-BUS" ? "memberDetail-btn-2" : "am_on_bus"
              }`}
              onClick={handleStatusPM}
            >
              {status === "AM-ON-BUS" ? "PARENT PICKED UP" : "AM-ON-BUS"}
            </span>
          </div>

          <div className="scan pt-2">
            <div className="scan-member" onClick={() => scanMember()}>
              <i className="fa-solid fa-qrcode first"></i>
              <b>Scan Member</b>
            </div>
          </div>
        </div>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
          style={{ width: "90%" }}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Form>
              {["checkbox"].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                  <Form.Check // prettier-ignore
                    type={type}
                    id="Kenilworth"
                    label="Kenilworth"
                  />

                  <Form.Check // prettier-ignore
                    type={type}
                    id="Northbrook"
                    label="Northbrook"
                  />

                  <Form.Check // prettier-ignore
                    type={type}
                    id="Wilmette"
                    label="Wilmette"
                  />

                  <Form.Check // prettier-ignore
                    type={type}
                    id="Highland Park"
                    label="Highland Park"
                  />

                  <Form.Check // prettier-ignore
                    type={type}
                    id="Lake Forest"
                    label="Lake Forest"
                  />
                </div>
              ))}
            </Form>
          </Modal.Body>
        </Modal>

        <div className="footer">
          <hr />
        </div>
      </div>
    </div>
  );
}

export default ScanDetail;

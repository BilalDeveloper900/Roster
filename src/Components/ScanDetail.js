import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { scanDetail, changeTime, tripMembers } from "../Stores/Slices";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

function ScanDetail({ receivedData }) {
  // console.log(receivedData, " received....Data ");
  const receivedData2 = receivedData.slice(0, 1);

  const tripId = receivedData2[0].trip_id;
  // console.log(tripId, "tripId");

  const { id } = useParams();

  const memberId = id;
  // console.log(memberId);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [detail, setDetail] = useState();
  const [status, setStatus] = useState("AM-ON-BUS");
  const [statusAM, setStatusAM] = useState("AM-ON-BUS");
  const [statusPM, setStatusPM] = useState("PM-RETURN");
  const [statusParent, setStatusParent] = useState("PARENT PICKED UP");
  const [statusNo, setStatusNo] = useState("NO SHOW");
  const [show, setShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  const [hide, setHide] = useState(true);
  const [showPM, setShowPM] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClosePM = () => setShowPM(false);
  const handleShowPM = () => setShowPM(true);
  const handleUpdateClose = () => setUpdateShow(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const handleUpdateShow = () => {
    setUpdateShow(true);
    setShow(false);
    setStatus(statusAM);
    const selectedCheckboxId = selectedCheckbox;
    // console.log("Location ID:", selectedCheckboxId);
  };

  const handleCheckboxChange = (id) => {
    setSelectedCheckbox(id);
  };

  const Members = () => {
    dispatch(scanDetail(id)).then((res) => {
      setDetail(res.payload.data.member);
    });
  };

  const handleUpdate = () => {
    console.log("status:", status);
    console.log("member_id:", memberId);
    console.log("trip_id:", tripId);
    console.log("location_id:", selectedCheckbox);

    const payload = {
      status: status,
      member_id: memberId,
      trip_id: tripId,
      location_id: selectedCheckbox,
    };

    dispatch(changeTime(payload)).then((res) => {
      console.log(res, "change----Time");
      toast.success("Status update successfully");
    });

    setUpdateShow(false);
    setStatus(statusAM);
  };

  const handleStatusAM = () => {
    setHide(true);
    handleShow();
  };

  const handleStatusPM = () => {
    setStatus(statusPM);
    setHide(false);
    handleShowPM();
  };

  const handleStatusParent = () => {
    setStatus(statusParent);
    setHide(false);
    handleShowPM();
  };

  const handleStatusNo = () => {
    setStatus(statusNo);
    setHide(true);
    handleShowPM();
  };

  const handleUpdatePM = () => {
    console.log("status:", status);
    console.log("member_id:", memberId);
    console.log("trip_id:", tripId);

    const payload = {
      status: status,
      member_id: memberId,
      trip_id: tripId,
    };

    dispatch(changeTime(payload)).then((res) => {
      console.log(res, "change----Time");
      toast.success("Status update successfully");
    });

    setUpdateShow(false);
    handleClosePM();
  };

  useEffect(() => {
    Members();
    // firstMember();
    console.log(detail);
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
                  <b>
                    {/* {receive[0].id} */}
                    {status}
                  </b>
                </span>
              </div>
            </div>
          </div>

          {hide === true ? (
            <div className="memberDetail-btn-first pt-4">
              <button
                className="memberDetail-btn-1"
                onClick={() => handleStatusPM()}
              >
                PM-RETURN
              </button>
              <button
                className="memberDetail-btn-2"
                onClick={() => handleStatusParent()}
              >
                PARENT PICKED UP
              </button>
            </div>
          ) : (
            ""
          )}

          {hide === false ? (
            <div className="memberDetail-btn-second pt-4">
              <button
                className="memberDetail-btn-1"
                onClick={() => handleStatusNo()}
              >
                NO-SHOW
              </button>
              <button className="am_on_bus" onClick={() => handleStatusAM()}>
                AM-ON-BUS
              </button>
            </div>
          ) : (
            ""
          )}

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
          className="modelWindow"
        >
          <Modal.Body>
            <b className="modalB">Select Buss Stop</b>
            <Form>
              {receivedData.map((item) => (
                <div key={item.id} className="mb-3">
                  <Form.Check
                    id={item.id}
                    label={item.title}
                    className="modalTab"
                    checked={selectedCheckbox === item.id}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </div>
              ))}
            </Form>

            <div className="ms-auto ">
              <span className="modal-btn" onClick={handleClose}>
                Cancel
              </span>
              <span className="modal-btn" onClick={handleUpdateShow}>
                Save
              </span>
            </div>
          </Modal.Body>
        </Modal>

        <div className="modal-2">
          <Modal
            show={updateShow}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header>
              <Modal.Title>Busses</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                {receivedData.flatMap((trip) =>
                  trip.busses
                    .filter(() => selectedCheckbox === trip.id)
                    .map((bus) => (
                      <div key={bus.id} className="mb-3">
                        <Form.Check id={bus.id} label={bus.name} />
                      </div>
                    ))
                )}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleUpdateClose}>
                NO
              </Button>
              <Button variant="primary" onClick={handleUpdate}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        <Modal
          show={showPM}
          onHide={handleClosePM}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Body>
            <b>
              Do You want to update status in to{" "}
              <span id="color">{status}</span>
            </b>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClosePM}>
              NO
            </Button>
            <Button variant="primary" onClick={handleUpdatePM}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="footer">
          <hr />
        </div>
      </div>
    </div>
  );
}

export default ScanDetail;

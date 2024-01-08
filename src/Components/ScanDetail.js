import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { scanDetail, changeTime, tripMembers } from "../Stores/Slices";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function ScanDetail({ receivedData }) {
  console.log(receivedData, " received....Data ");
  const receivedData2 = receivedData.slice(0, 1);

  // const idValue = receivedData2[0].id;
  // console.log(idValue, "idValue");
  const tripId = receivedData2[0].trip_id;
  console.log(tripId, "tripId");
  // const title = receivedData2[0].title;
  // console.log(title, "title");
  // const busses = receivedData2[0];
  // console.log(busses, "busses");

  const { id } = useParams();

  const memberId = id;
  console.log(memberId);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [detail, setDetail] = useState();
  const [status, setStatus] = useState("AM-ON-BUS");
  const [statusAM, setStatusAM] = useState("AM-ON-BUS");
  const [statusPM, setStatusPM] = useState("PM-RETURN");
  const [show, setShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleUpdateClose = () => setUpdateShow(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const handleUpdateShow = () => {
    setUpdateShow(true);
    setShow(false);
    const selectedCheckboxId = selectedCheckbox;
    console.log("Location ID:", selectedCheckboxId);
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
    const payload = {
      status: status,
      memberId: memberId,
      tripId: tripId,
      selectedCheckbox: selectedCheckbox,
    };

    const ChangeTime = () => {
      dispatch(changeTime(payload)).then((res) => {
        console.log(changeTime, "change----Time");
      });
    };
    // ChangeTime();
    console.log("status:", status);
    console.log("memberId:", memberId);
    console.log("tripId:", tripId);
    console.log("selectedCheckbox:", selectedCheckbox);

    setUpdateShow(false);
    setStatus(statusAM);
  };

  const handleStatusAM = () => {
    setStatus(statusPM);
  };

  const handleStatusPM = () => {
    handleShow();
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

          <div className="memberDetail-btn pt-4">
            <span className="memberDetail-btn-1" onClick={handleStatusAM}>
              {status === "AM-ON-BUS" ? "PM-RETURN" : "NO-SHOW"}
            </span>
            <span
              className={`${
                status === "AM-ON-BUS" ? "memberDetail-btn-2" : "am_on_bus"
              }`}
              onClick={() => status === "PM-RETURN" && handleStatusPM()}
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
                  trip.busses.map((bus) => (
                    <div key={bus.id} className="mb-3">
                      <Form.Check
                        id={bus.id}
                        label={bus.name}
                        className="modalTab"
                      />
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

        <div className="footer">
          <hr />
        </div>
      </div>
    </div>
  );
}

export default ScanDetail;

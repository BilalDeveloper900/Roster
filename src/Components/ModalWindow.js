import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import { useNavigate } from "react-router";

function ModalWindow(props) {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [memberId, setMemberId] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(memberId);
    navigate(`/scanDetail/${memberId}`);
  };

  return (
    <>
      <div className="scan-member" onClick={() => setModalShow(true)}>
        <i className="fa-solid fa-qrcode first"></i>

        <b>Scan Member</b>
      </div>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Member Id
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="scan-1">
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
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalWindow;

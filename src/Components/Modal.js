import React from "react";

function Modal() {
  return (
    <div>
      <Modal
        size="lg"
        show={open}
        onHide={() => setOpen(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="pt-5 pl-5 add-member_modal"
      >
        <div className="container">
          <div className="main-modal">
            <Modal.Header className="project-modal_header">
              <Modal.Title>Add Task To Sprint</Modal.Title>
              <FontAwesomeIcon icon={faClose} onClick={() => handleCancel()} />
            </Modal.Header>
            <Modal.Body className="project-modal_body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="fields">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="project-name">
                        <h5 className="text-dark">Sprints</h5>
                        <input type="text" />
                        <span className="mt-2 mb-0 danger-color error-msg">
                          {errors.sprint_id && errors.sprint_id.message}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="actions">
                  <button
                    type="button"
                    className="btn btn-cancel btn-sm"
                    onClick={() => handleCancel()}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    disabled={isLoading || !isValid}
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Modal;

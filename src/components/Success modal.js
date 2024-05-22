const SuccessModal = ({ message, onClose }) => {
  return (
    <div className="success-modal">
      <div className="modal-custom">
        <div className="modal-content-custom content-success">
          <div className="modal-header-custom">
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              style={{ marginTop: 10 }}
            ></button>
          </div>
          <div className="modal-body-custom body-success">{message}</div>
          <div
            className="modal-footer-custom"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              height: "auto",
              padding: 0
            }}
          >
            <button
              className="btn btn-primary btn-adopt btn-owner-details"
              onClick={onClose}
              style={{ width: "70px", marginRight: 0, marginBottom: 0 }}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;

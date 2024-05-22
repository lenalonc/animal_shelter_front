const WarningModal = ({ message, onClose }) => {
  return (
    <div className="modal-custom">
      <div
        className="modal-content-custom content-success warning-modal"
        style={{}}
      >
        <div className="modal-header-custom">
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            style={{ marginTop: 10 }}
          ></button>
        </div>
        <div
          className="modal-body-custom body-success"
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
            padding: 30,
            textAlign: "center",
            marginTop: 20
          }}
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="#5e1914"
            className="bi bi-exclamation-circle"
            viewBox="0 0 16 16"
            style={{ marginRight: 10 }}
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
          </svg>
          {message}
        </div>
      </div>
    </div>
  );
};

export default WarningModal;

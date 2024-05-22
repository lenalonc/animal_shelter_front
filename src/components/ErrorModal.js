const ErrorModal = ({ message, onClose }) => {
  return (
    <div className="modal-custom">
      <div
        className="modal-content-custom content-success"
        style={{ width: 500 }}
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
            marginBottom: 60,
            padding: 50,
            textAlign: "left",
            alignSelf: "flex-start",
            marginLeft: 10,
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
            style={{ marginRight: 15 }}
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
          {message}
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;

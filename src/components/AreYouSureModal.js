import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AreYouSure = ({ message, onClose, deletePet }) => {
  const navigate = useNavigate();

  return (
    <div className="modal-custom">
      <div
        className="modal-content-custom content-success yes-no-modal"
        style={{ width: 550, height: 250, padding: 30 }}
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
          style={{ fontSize: 18, padding: 50, margin: 0 }}
        >
          {message}
        </div>
        <div
          className="modal-footer-custom"
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "auto",
            paddingBottom: 30,
          }}
        >
          <button
            className="btn btn-primary btn-adopt btn-owner-details"
            onClick={onClose}
            style={{ width: "70px", marginRight: 0 }}
          >
            NO
          </button>
          <button
            className="btn btn-primary btn-adopt btn-owner-details"
            onClick={deletePet}
            style={{ width: "70px", marginRight: 0 }}
          >
            YES
          </button>
        </div>
      </div>
    </div>
  );
};

export default AreYouSure;

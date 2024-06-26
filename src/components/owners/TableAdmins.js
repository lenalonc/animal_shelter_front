import React, { useState } from "react";
import imgConf from "../../img/gui-check-yes-svgrepo-com.svg";
import imgCancel from "../../img/cancel2-svgrepo-com.svg";
import api from "../../api/Api";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../ErrorModal";
import SuccessModal from "../Success modal";

const TableCustom = ({ selectedRow, onRowClick, data, setData, fetchData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmItemId, setConfirmItemId] = useState(null);
  const navigate = useNavigate();
  const [successDelete, setSuccessDelete] = useState(false);
  const [errorDelete, setErrorDelete] = useState(false);

  const keys = Object.keys(data[0] || {});

  const filteredData = data.filter((d) => {
    return keys.some((key) => {
      const value = d[key];
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false;
    });
  });

  const handleRowClick = (id) => {
    onRowClick(id);
  };

  const showConfirm = (id) => {
    setConfirmItemId(id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete("/owner/" + id);
      setConfirmItemId(null); // Reset confirmation state
      setSuccessDelete(true);
      fetchData();
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
      setErrorDelete(true);
    }
  };

  const handleCancel = () => {
    setConfirmItemId(null);
  };

  return (
    <div className="table-container">
      <input
        style={{
          margin: "0 304px 10px 100px",
          width: 150,
          height: 30,
          borderRadius: 5,
          border: "none",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          padding: 5,
        }}
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table className="data-table rounded-3">
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key}>{key.toUpperCase()}</th>
            ))}
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr
              key={item.id}
              className={item.id === selectedRow ? "selected" : ""}
              onClick={() => handleRowClick(item.id)}
            >
              {keys.map((key) => (
                <td key={key}>{item[key]}</td>
              ))}

              <td style={{ display: "flex", marginLeft: 20 }}>
                {confirmItemId === item.id ? (
                  <div className="delete">
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => handleDelete(item.id)}
                    >
                      <img
                        src={imgConf}
                        style={{ width: 16, marginRight: 10 }}
                      />
                    </button>
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                      }}
                      onClick={handleCancel}
                    >
                      <img src={imgCancel} alt="x" style={{ width: 16 }} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => showConfirm(item.id)}
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {successDelete && (
        <div className="success">
          <SuccessModal
            message={"Admin successfully deleted"}
            onClose={() => setSuccessDelete(false)}
          />
        </div>
      )}

      {errorDelete && (
        <div className="success">
          <ErrorModal
            message={"Could not delete admin"}
            onClose={() => setErrorDelete(false)}
          />
        </div>
      )}
    </div>
  );
};

export default TableCustom;

import React, { useState } from "react";
import { Link } from "react-router-dom";

const MultiSelectTable = (props) => {
  const { selectedRow, onRowClick, data } = props;

  const handleRowClick = (id) => {
    onRowClick(id);
  };

  const keys = Object.keys(data[0] || {});

  const handleButtonClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="table-container">
      <table className="data-table rounded-3">
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key}>{key.toUpperCase()}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className={selectedRow.includes(item.id) ? "selected" : ""}
              onClick={() => handleRowClick(item.id)}
            >
              {keys.map((key) => (
                <td key={key}>{item[key]}</td>
              ))}
              <td>
                <Link to={`/pets/${item.id}`} target="_blank">
                  <button
                    type="button"
                    className="btn btn-primary btn-adopt btn-tbl"
                    onClick={handleButtonClick}
                  >
                    ...
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MultiSelectTable;

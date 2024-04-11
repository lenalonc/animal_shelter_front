import React, { useState } from "react";

const TableCustom = (props) => {
  const { selectedRow, onRowClick, data } = props;

  const handleRowClick = (id) => {
    onRowClick(id);
  };

  const keys = Object.keys(data[0] || {});

  return (
    <table className="data-table rounded-3">
      <thead>
        <tr>
          {keys.map((key) => (
            <th key={key}>{key.toUpperCase()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr
            key={item.id}
            className={item.id === selectedRow ? "selected" : ""}
            onClick={() => handleRowClick(item.id)}
          >
            {keys.map((key) => (
              <td key={key}>{item[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableCustom;

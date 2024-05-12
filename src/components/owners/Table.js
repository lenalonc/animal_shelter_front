import React, { useState } from "react";

//TODO: if no data is in filteredData show a message that says that no values match your search

const TableCustom = ({ selectedRow, onRowClick, data }) => {
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <div className="table-container">
      <input
        style={{
          margin: "0 300px 10px 100px",
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableCustom;

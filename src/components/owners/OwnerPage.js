import { Link } from "react-router-dom";
import TableCustom from "./Table";
import { useState } from "react";

const OwnerPage = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com" },
  ]);

  const handleRowClick = (id) => {
    setSelectedRow((prevSelectedRow) => (prevSelectedRow === id ? null : id));
  };

  return (
    <div className="view-all-page">
      <TableCustom
        onRowClick={handleRowClick}
        selectedRow={selectedRow}
        data={data}
      />
      <div className="buttons-container">
        <Link to={`${selectedRow}`}>
          <button
            type="button"
            className="btn btn-primary btn-adopt btn-owner"
            style={{ marginRight: 0 }}
          >
            DETAILS
          </button>
        </Link>
        <Link to={"add"}>
          <button type="button" className="btn btn-primary btn-adopt btn-owner">
            ADD NEW
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OwnerPage;

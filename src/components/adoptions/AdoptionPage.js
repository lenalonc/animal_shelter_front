import TableCustom from "../owners/Table";
import { useState } from "react";
import { Link } from "react-router-dom";

const AdoptionPage = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([
    { id: 1, name: "John Doe", pet: "aaaaa" },
    { id: 2, name: "Jane Smith", pet: "basdsaz" },
    { id: 3, name: "Alice Johnson", pet: "cszdcv" },
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
      ></TableCustom>
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

export default AdoptionPage;

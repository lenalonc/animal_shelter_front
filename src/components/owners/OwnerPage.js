import { Link } from "react-router-dom";
import TableCustom from "./Table";
import { useState, useEffect } from "react";
import api from "../../api/Api";

const OwnerPage = () => {
  //TODO:  kad ene selektuje nijedan owner da izadje obavestenje hej nisi selektovao nista!!!

  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getOwners = async () => {
      try {
        const response = await api.get("/owner");
        const formattedData = response.data.map((owner) => ({
          id: owner.id,
          username: owner.username,
          firstname: owner.firstname,
          lastname: owner.lastname,
        }));
        setData(formattedData);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };
    getOwners();
  }, []);

  const handleRowClick = (id) => {
    setSelectedRow((prevSelectedRow) => (prevSelectedRow === id ? null : id));
  };

  useEffect(() => {
    const hello = async () => {
      try {
        const response = await api.get("/owner/hello");
        console.log(response.data);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };
    hello();
  }, []);

  return (
    <div className="view-all-page">
      <h2 className="title-tbl">OWNERS</h2>
      <TableCustom
        onRowClick={handleRowClick}
        selectedRow={selectedRow}
        data={data}
      />
      <div className="buttons-container">
        <Link to={`${selectedRow}`}>
          <button type="button" className="btn btn-primary btn-adopt btn-owner">
            DETAILS
          </button>
        </Link>
        <Link to={"add"}>
          <button
            type="button"
            className="btn btn-primary btn-adopt btn-owner"
            style={{ marginRight: 0 }}
          >
            ADD NEW
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OwnerPage;

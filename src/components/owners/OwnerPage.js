import { Link, useNavigate } from "react-router-dom";
import TableCustom from "./Table";
import { useState, useEffect, useContext } from "react";
import api from "../../api/Api";
import WarningModal from "../WarningModal";
import ErrorModal from "../ErrorModal";
import { UserContext } from "../context/UserContext";

const OwnerPage = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [warning, setWarning] = useState(false);
  const [systemError, setSystemError] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

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
        if (!formattedData || formattedData.length === 0) {
          setSystemError(true);
        }
      } catch (err) {
        setSystemError(true);
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

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/notfound");
    }
  }, [user]);

  const handleRowClick = (id) => {
    setSelectedRow((prevSelectedRow) => (prevSelectedRow === id ? null : id));
  };

  const handleDetails = () => {
    if (selectedRow == null) {
      setWarning(true);
    } else {
      navigate(`${selectedRow}`);
    }
  };

  return (
    <div className="view-all-page">
      <h2 className="title-tbl">OWNERS</h2>
      <TableCustom
        onRowClick={handleRowClick}
        selectedRow={selectedRow}
        data={data}
      />
      <div className="buttons-container">
        <button
          type="button"
          className="btn btn-primary btn-adopt btn-owner"
          onClick={handleDetails}
        >
          DETAILS
        </button>
        <Link to={"/owners/add"}>
          <button
            type="button"
            className="btn btn-primary btn-adopt btn-owner"
            style={{ marginRight: 0 }}
          >
            ADD NEW
          </button>
        </Link>
      </div>
      {warning && (
        <WarningModal
          message={"No owner selected"}
          onClose={() => setWarning(false)}
        />
      )}
      {systemError && (
        <ErrorModal
          message={"System could not load admins"}
          onClose={() => setSystemError(false)}
        />
      )}
    </div>
  );
};

export default OwnerPage;

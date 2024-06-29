import TableCustom from "../owners/Table";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/Api";
import AdoptionDetailsModal from "./AdoptionDetails";
import WarningModal from "../WarningModal";
import ErrorModal from "../ErrorModal";
import { UserContext } from "../context/UserContext";

const AdoptionPage = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [warning, setWarning] = useState(false);
  const [systemError, setSystemError] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const getAdoptions = async () => {
    try {
      const response = await api.get("/adoption");
      setData(response.data);
      const formattedData = response.data.map((adoption) => ({
        id: adoption.id,
        date: adoption.date,
        owner: `${adoption.owner.firstname} ${adoption.owner.lastname}`,
        pets: adoption.pets.length,
      }));
      setFormattedData(formattedData);
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

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/notfound");
    }
  }, [user]);

  useEffect(() => {
    getAdoptions();
  }, [data]);

  const handleRowClick = (id) => {
    setSelectedRow((prevSelectedRow) => (prevSelectedRow === id ? null : id));
  };

  const openModal = () => {
    if (selectedRow === null) {
      setWarning(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
    getAdoptions();
  };

  return (
    <div className="view-all-page">
      <h2 className="title-tbl">ADOPTIONS</h2>
      <TableCustom
        onRowClick={handleRowClick}
        selectedRow={selectedRow}
        data={formattedData}
      ></TableCustom>
      {isModalOpen && (
        <AdoptionDetailsModal onClose={closeModal} id={`${selectedRow}`} />
      )}

      {warning && (
        <WarningModal
          message={"No adoption selected"}
          onClose={() => setWarning(false)}
        />
      )}
      {systemError && (
        <ErrorModal
          message={"System could not load adoptions"}
          onClose={() => setSystemError(false)}
        />
      )}
      <div className="buttons-container">
        <button
          type="button"
          className="btn btn-primary btn-adopt btn-owner"
          onClick={openModal}
        >
          DETAILS
        </button>
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

export default AdoptionPage;

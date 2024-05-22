import TableCustom from "../owners/Table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/Api";
import AdoptionDetailsModal from "./AdoptionDetails";

//TODO: proveri ovde pozive nesto je cudnoo pisalo je za useEffect data da trigeruje a data unutar getAdoption pa se beskonacno poziva

const AdoptionPage = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    } catch (error) {
      console.error("Error fetching fields:", error);
    }
  };

  useEffect(() => {
    getAdoptions();
  }, []);

  const handleRowClick = (id) => {
    setSelectedRow((prevSelectedRow) => (prevSelectedRow === id ? null : id));
  };

  const openModal = () => {
    setIsModalOpen(true);
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

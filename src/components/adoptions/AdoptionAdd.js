import { useContext, useEffect, useState } from "react";
import api from "../../api/Api";
import TableCustom from "../owners/Table";
import AdoptionTable from "./MultiSelectTable";
import MultiSelectTable from "./MultiSelectTable";
import { Link, useNavigate } from "react-router-dom";
import AdoptionModal from "./AdoptionModal";
import WarningModal from "../WarningModal";
import { UserContext } from "../context/UserContext";

const AdoptionAdd = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [pets, setPets] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPets, setSelectedPets] = useState([]);
  const [warning, setWarning] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/notfound");
    }
  }, [user]);


  useEffect(() => {
    const getPets = async () => {
      try {
        const response = await api.get("/pet");
        setPets(response.data);

        const filteredPetData = response.data.map(
          ({ id, name, animal, breed, sex }) => ({
            id,
            name: name,
            animal: animal.type,
            breed: breed.breed,
            sex,
          })
        );
        setFilteredData(filteredPetData);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    getPets();
  }, [isModalOpen]);

  const handleRowClick = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((rowId) => rowId !== id)
      );
    } else {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, id]);
    }
  };

  const handleAdoptClick = () => {
    if (selectedRows && selectedRows.length > 0) {
      const selectedPetsData = selectedRows.map((selectedId) =>
        pets.find((pet) => pet.id == selectedId)
      );
      setSelectedPets(selectedPetsData);
      setIsModalOpen(true);
    } else {
      setWarning(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="view-all-page">
      {warning && (
        <WarningModal
          message={"No pets selected"}
          onClose={() => setWarning(false)}
        />
      )}
      <h2 className="title-tbl">NEW ADOPTION</h2>
      <MultiSelectTable
        onRowClick={handleRowClick}
        selectedRow={selectedRows}
        data={filteredData}
      ></MultiSelectTable>
      <div className="buttons-container">
        <button
          type="button"
          className="btn btn-primary btn-adopt btn-owner"
          onClick={handleAdoptClick}
        >
          ADOPT
        </button>
      </div>
      {isModalOpen && (
        <AdoptionModal
          onClose={closeModal}
          chosenPets={selectedPets.filter((pet) => pet)}
        />
      )}
    </div>
  );
};

export default AdoptionAdd;

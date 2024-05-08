import { useEffect, useState } from "react";
import api from "../../api/Api";
import TableCustom from "../owners/Table";
import AdoptionTable from "./MultiSelectTable";
import MultiSelectTable from "./MultiSelectTable";
import { Link } from "react-router-dom";
import AdoptionModal from "./AdoptionModal";

const AdoptionAdd = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [pets, setPets] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPets, setSelectedPets] = useState([]);

  useEffect(() => {
    const getPets = async () => {
      try {
        const response = await api.get("/pet");
        setPets(response.data);
        const filteredPets = response.data.map(
          ({ id, name, animal, breed, sex }) => ({
            id,
            name: name,
            "animal.type": animal.type,
            "breed.name": breed.breed,
            sex,
          })
        );
        setFilteredData(filteredPets);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    getPets();
  }, []);

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
    const selectedPetsData = selectedRows.map((selectedId) =>
      pets.find((pet) => pet.id == selectedId)
    );
    setSelectedPets(selectedPetsData);
    setIsModalOpen(true);
    // console.log(selectedPetsData);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="view-all-page">
      <MultiSelectTable
        onRowClick={handleRowClick}
        selectedRow={selectedRows}
        data={filteredData}
      ></MultiSelectTable>
      <div className="buttons-container">
        <button
          type="button"
          className="btn btn-primary btn-adopt btn-owner"
          style={{ marginRight: 10 }}
          onClick={handleAdoptClick}
        >
          ADOPT
        </button>
      </div>
      {isModalOpen && (
        <AdoptionModal onClose={closeModal} pets={selectedPets} />
      )}
    </div>
  );
};

export default AdoptionAdd;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SelectBox from "../pets/SelectBox";
import api from "../../api/Api";

const MultiSelectTable = ({ selectedRow, onRowClick, data }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [animals, setAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState("");

  const keys = Object.keys(data[0] || {});

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await api.get("/pet/animals");
        setAnimals(response.data);
      } catch (error) {
        console.error("Error fetching animals:", error);
      }
    };

    fetchAnimals();
  }, []);

  const filteredData = data.filter((d) => {
    // Filter by search query

    const searchMatch = keys.some((key) => {
      // Skip the fields 'gender' and 'animal'
      if (key === "sex" || key === "animal") {
        return false;
      }

      const value = d[key];

      if (typeof value === "string") {
        return value.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false;
    });

    // Filter by selected gender
    const genderMatch = selectedGender ? d.sex === selectedGender : true;

    // Filter by animal type
    const animalMatch = selectedAnimal
      ? d.animal === selectedAnimal.type
      : true;

    return animalMatch && searchMatch && genderMatch;
  });

  const handleRowClick = (id) => {
    onRowClick(id);
  };

  const handleButtonClick = (event) => {
    event.stopPropagation();
  };

  const handleClearGender = () => {
    setSelectedGender(null);
  };

  const handleClearAnimal = () => {
    setSelectedAnimal(null);
  };

  const handleAnimalChange = (animalInfo) => {
    setSelectedAnimal(animalInfo);
  };

  return (
    <div className="table-container">
      <div className="search-bar-table">
        <div style={{ marginBottom: 10, marginRight: 20 }}>
          <SelectBox
            type={"text"}
            id={"animal"}
            name={"animal"}
            className="input-add-owner input-pet-text"
            required
            options={animals}
            label={"type"}
            placeholder={"Animal..."}
            onChange={handleAnimalChange}
            width={"150px"}
            onClear={handleAnimalChange}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <SelectBox
            onChange={(selectedOption) =>
              setSelectedGender(selectedOption.label)
            }
            options={[
              { id: "male", label: "Male" },
              { id: "female", label: "Female" },
            ]}
            label={"label"}
            width={"150px"}
            placeholder={"Gender..."}
            onClear={handleClearGender}
          />
        </div>
        <input
          style={{
            margin: "0 304px 10px 20px",
            width: 150,
            height: 35,
            borderRadius: 5,
            border: "none",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            padding: 5,
            display: "inline-block",
          }}
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table className="data-table rounded-3">
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key}>{key.toUpperCase()}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr
              key={item.id}
              className={selectedRow.includes(item.id) ? "selected" : ""}
              onClick={() => handleRowClick(item.id)}
            >
              {keys.map((key) => (
                <td key={key}>{item[key]}</td>
              ))}
              <td>
                <Link to={`/pets/${item.id}`} target="_blank">
                  <button
                    type="button"
                    className="btn btn-primary btn-adopt btn-tbl"
                    onClick={handleButtonClick}
                  >
                    ...
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MultiSelectTable;

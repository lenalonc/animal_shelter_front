import React, { useState, useEffect } from "react";
import api from "../../api/Api";
import SelectionBox from "./SelectionPetAdd";
import GenderSelect from "./GenderSelect";
import SelectBox from "./SelectBox";
import BreedSelectBox from "./BreedSelectBox";

//TODO: when searching an option if its not selected from options it should throw a
//TODO: when u delete the selection of type of pet it shoudl delete that in the form and also affect the breeds selection

const PetAdd = () => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    animal: { id: null, type: null },
    breed: { id: null, breed: null },
    sex: "",
    primaryColors: "",
    size: "",
    years: 0,
    months: 0,
    weight: 0,
    dateOfArrival: "",
    vaccinated: false,
    sterilization: false,
  });
  const [animals, setAnimals] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [breedDisabled, setBreedDisabled] = useState(true);
  const [selectedAnimalType, setSelectedAnimalType] = useState(null);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await api.get("/pet/fields");
        setFields(response.data);
      } catch (error) {
        console.error("Error fetching fields:", error);
      }
    };

    const fetchAnimals = async () => {
      try {
        const response = await api.get("/pet/animals");
        setAnimals(response.data);
      } catch (error) {
        console.error("Error fetching animals:", error);
      }
    };

    fetchFields();
    fetchAnimals();
  }, []);

  const fetchBreeds = async (animalType) => {
    try {
      const response = await api.get(`/pet/breeds/${animalType}`);
      setBreeds(response.data);
    } catch (error) {
      console.error("Error fetching breeds:", error);
    }
  };

  const handleInputChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleInputFocus = (e) => {
    const previousSibling = e.target.previousElementSibling;
    if (previousSibling) {
      previousSibling.classList.add("focused-label");
    }
  };

  const handleInputBlur = (e) => {
    const previousSibling = e.target.previousElementSibling;
    if (previousSibling) {
      previousSibling.classList.remove("focused-label");
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    return `${year}-${month}-${day}`;
  };

  const handleAnimalChange = (animalInfo) => {
    setFormData({ ...formData, animal: animalInfo });
    setBreedDisabled(false);
    setSelectedAnimalType(animalInfo.type.toLowerCase());
  };

  const handleBreedChange = (breedInfo) => {
    setFormData({ ...formData, breed: breedInfo });
  };

  return (
    <div className="add-pet-page">
      <div className="pet-add-form">
        <div className="pet-add-header">
          <h2>Add new pet</h2>
        </div>
        <form className="pet-add-content" onSubmit={handleSubmit}>
          <div className="inputs-container">
            <div className="pet-input" style={{ flex: "" }}>
              <label htmlFor={"text"} className="label-add-owner">
                Name:
              </label>
              <input
                type={"text"}
                id={"name"}
                name={"name"}
                className="input-add-owner input-pet-prime"
                required
                // onFocus={handleInputFocus}
                // onBlur={handleInputBlur}
                onChange={handleInputChange}
              />
            </div>
            <div className="pet-input" style={{ flex: " 1 1" }}>
              <label htmlFor={"text"} className="label-add-owner">
                Type of animal:
              </label>
              {/* <div className="select-segment"> */}
              <SelectBox
                type={"text"}
                id={"animal"}
                name={"animal"}
                className="input-add-owner input-pet-text"
                required
                options={animals}
                label={"type"}
                onChange={handleAnimalChange}
                width={"200px"}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
              {/* </div> */}
            </div>
            <div className="pet-input" style={{ flex: " 1 1" }}>
              <label htmlFor={"text"} className="label-add-owner">
                Breed:
              </label>
              <BreedSelectBox
                type={"text"}
                id={"breed"}
                name={"breed"}
                className="input-add-owner input-pet-prime"
                required
                options={breeds}
                setOptions={setBreeds}
                label={"breed"}
                disabled={!selectedAnimalType}
                selectedAnimalType={selectedAnimalType}
                onChange={handleBreedChange}
                width={"300px"}
              />
            </div>
            <div className="pet-input" style={{ flex: " 1 1 " }}>
              <label htmlFor={"text"} className="label-add-owner">
                Gender:
              </label>
              <SelectBox
                onChange={(selectedOption) =>
                  handleInputChange({
                    target: { name: "sex", value: selectedOption.label },
                  })
                }
                options={[
                  { id: "male", label: "Male" },
                  { id: "female", label: "Female" },
                ]}
                label={"label"}
                width={"200px"}
              />
            </div>
            <div className="pet-input" style={{ flex: " 1 1" }}>
              <label htmlFor={"text"} className="label-add-owner">
                Colors:
              </label>
              <input
                type={"text"}
                id={"primaryColors"}
                name={"primaryColors"}
                className="input-add-owner input-pet-prime"
                required
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={handleInputChange}
              />
            </div>
            <div className="pet-input" style={{ flex: " 1 1" }}>
              <label htmlFor={"text"} className="label-add-owner">
                Size:
              </label>
              <SelectBox
                type={"text"}
                id={"size"}
                name={"size"}
                className="input-add-owner input-pet-text"
                required
                onChange={(selectedOption) =>
                  handleInputChange({
                    target: { name: "size", value: selectedOption.label },
                  })
                }
                options={[
                  { id: "s", label: "Small" },
                  { id: "m", label: "Medium" },
                  { id: "l", label: "Large" },
                ]}
                label={"label"}
                width={"200px"}
              />
            </div>
            <div className="pet-input">
              <label htmlFor={"number"} className="label-add-owner">
                Years:
              </label>
              <input
                type="number"
                id="years"
                name="years"
                className="input-add-owner input-pet-num"
                required
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={handleInputChange}
                value={formData.years || 0}
                min={0}
              />
            </div>
            <div className="pet-input">
              <label htmlFor={"number"} className="label-add-owner">
                Months:
              </label>
              <input
                type="number"
                id="months"
                name="months"
                className="input-add-owner input-pet-num"
                required
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={handleInputChange}
                value={formData.months || 0}
                min={0}
                max={11}
              />
            </div>
            <div className="pet-input" style={{ flex: "0 0 120px" }}>
              <label htmlFor={"number"} className="label-add-owner">
                Weight:
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                className="input-add-owner input-pet-num"
                required
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={handleInputChange}
                value={formData.weight || 0}
                min={0}
              />{" "}
              <span style={{ color: "#6c1d17", fontSize: 18, fontWeight: 400 }}>
                kg
              </span>
            </div>
            <div className="pet-input">
              <label htmlFor={"date"} className="label-add-owner">
                Date of arrival:
              </label>
              <input
                type={"date"}
                id={"dateOfArrival"}
                name={"dateOfArrival"}
                className="input-add-owner input-pet-text"
                required
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={handleInputChange}
                defaultValue={getCurrentDate()}
              />
            </div>
            <div className="checks">
              <div
                className="pet-input"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginRight: 15,
                }}
              >
                <div className="checkbox-wrapper-23">
                  <input
                    type="checkbox"
                    id="check-23"
                    name="vaccinated"
                    checked={formData.vaccinated || false}
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor="check-23"
                    style={{ style: 10, marginRight: 10 }}
                  >
                    <svg viewBox="0,0,50,50">
                      <path d="M5 30 L 20 45 L 45 5"></path>
                    </svg>
                  </label>
                </div>
                <label htmlFor="vaccinated" className="label-add-owner">
                  Vaccinated
                </label>
              </div>
              <div
                className="pet-input"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <div className="checkbox-wrapper-24">
                  <input
                    type="checkbox"
                    id="check-24"
                    name="sterilization"
                    checked={formData.sterilization || false}
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor="check-24"
                    style={{ style: 10, marginRight: 10 }}
                  >
                    <svg viewBox="0,0,50,50">
                      <path d="M5 30 L 20 45 L 45 5"></path>
                    </svg>
                  </label>
                </div>
                <label htmlFor="vaccinated" className="label-add-owner">
                  Sterilized
                </label>
              </div>
            </div>
          </div>
          <div className="pet-add-btn-container">
            <button
              type="submit"
              className="btn btn-primary btn-adopt btn-add-owner"
            >
              SAVE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PetAdd;

import React, { useState, useEffect } from "react";
import api from "../../api/Api";
import SelectBox from "./SelectBox";
import BreedSelectBox from "./BreedSelectBox";
import SelectMultiple from "./SelectMultiple";
import SuccessModal from "../Success modal";
import { Link, useNavigate } from "react-router-dom";
import ErrorModal from "../ErrorModal";
import done from "../../img/check-all.svg";

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
  const [picture, setPicture] = useState(null);
  const [id, setId] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
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
      formData.dateOfArrival = getCurrentDate();
      setLoading(false);
    }, 1300);
  }, []);

  const handleInputChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFlag(true);
    const savePet = async () => {
      try {
        const response = await api.post("/pet", formData);
        setId(response.data.id);
        setSuccess(true);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
        setError(true);
      }
    };
    if (checkData()) {
      savePet();
    }
  };

  useEffect(() => {
    if (picture && id) {
      savePictureLocally(picture);
    }
  }, [id]);

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

  const handlePictureChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const savePictureLocally = (picture) => {
    const send = new FormData();
    send.append("picture", picture);
    send.append("name", "pet" + id);

    api
      .post("/pet/savePicture", send)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error saving picture:", error);
      });
  };

  const hideSuccessModal = () => {
    setSuccess(false);
    navigate("/pets");
  };

  const hideErrorModal = () => {
    setError(false);
  };

  const checkData = () => {
    return (
      formData &&
      formData.name &&
      formData.name !== "" &&
      formData.animal &&
      formData.animal.id &&
      formData.sex !== "" &&
      formData.size &&
      formData.size !== "" &&
      (formData.years || formData.months) &&
      !(
        ((formData.years === 0 || formData.years === "0") &&
          formData.months === 0) ||
        formData.months === "0"
      )
    );
  };

  return (
    <div className="add-pet-page" style={{ minHeight: "80vh" }}>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="pet-add-form">
          <div className="pet-add-header">
            <h2>Add new pet</h2>
          </div>
          <form className="pet-add-content" onSubmit={handleSubmit}>
            <div className="inputs-container">
              <div className="pet-input" style={{ flex: "" }}>
                <label htmlFor={"text"} className="label-add-owner">
                  Name*
                </label>
                <input
                  type={"text"}
                  id={"name"}
                  name={"name"}
                  className="input-add-owner input-pet-prime"
                  required
                  onChange={handleInputChange}
                  style={{
                    border:
                      flag && formData.name === "" ? "2px solid #8a251d" : "",
                  }}
                />
              </div>
              <div className="pet-input" style={{ flex: " 1 1" }}>
                <label htmlFor={"text"} className="label-add-owner">
                  Type of animal*
                </label>
                <SelectBox
                  type={"text"}
                  id={"animal"}
                  name={"animal"}
                  className="input-add-owner input-pet-text"
                  required
                  options={animals}
                  label={"type"}
                  error={flag && formData.animal.id === null}
                  onChange={handleAnimalChange}
                  width={"200px"}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>
              <div className="pet-input" style={{ flex: " 1 1" }}>
                <label htmlFor={"text"} className="label-add-owner">
                  Breed
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
                  Gender*
                </label>
                <SelectBox
                  error={flag && formData.sex === ""}
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
                  Colors
                </label>
                <SelectMultiple
                  type={"text"}
                  id={"primaryColors"}
                  name={"primaryColors"}
                  className="input-add-owner input-pet-prime"
                  required
                  onChange={(selectedOptions) =>
                    handleInputChange({
                      target: {
                        name: "primaryColors",
                        value: selectedOptions
                          .map((option) => option.value)
                          .join(" "),
                      },
                    })
                  }
                  width={"300px"}
                />
              </div>
              <div className="pet-input" style={{ flex: " 1 1" }}>
                <label htmlFor={"text"} className="label-add-owner">
                  Size*
                </label>
                <SelectBox
                  type={"text"}
                  id={"size"}
                  name={"size"}
                  className="input-add-owner input-pet-text"
                  error={flag && formData.size === ""}
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
                  style={{
                    border:
                      flag &&
                      (formData.months === 0 || formData.months === "0") &&
                      (formData.years === 0 || formData.years === "0")
                        ? "2px solid #8a251d"
                        : "",
                  }}
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
                  style={{
                    border:
                      flag &&
                      (formData.months === 0 || formData.months === "0") &&
                      (formData.years === 0 || formData.years === "0")
                        ? "2px solid #8a251d"
                        : "",
                  }}
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
                  onChange={handleInputChange}
                  value={formData.weight || 0}
                  min={0}
                  step={0.1}
                />{" "}
                <span
                  style={{ color: "#6c1d17", fontSize: 18, fontWeight: 400 }}
                >
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
              <div className="pet-input" style={{ flex: "1 1 300px" }}>
                <label htmlFor="picture" className="label-add-owner">
                  Picture:
                </label>
                <div className="custom-file-upload">
                  <input
                    type="file"
                    id="picture"
                    name="picture"
                    className="input-add-owner input-pet-prime"
                    accept="image/*"
                    onChange={handlePictureChange}
                    style={{ display: "none" }} // hide the default file input
                  />
                  {picture ? (
                    <label htmlFor="picture" className="custom-button-file">
                      {/* <img src={done}></img> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-check-all"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z" />
                      </svg>
                    </label>
                  ) : (
                    <label htmlFor="picture" className="custom-button-file">
                      Choose image
                    </label>
                  )}
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
      )}
      {success && (
        <div className="success">
          <SuccessModal
            message={
              <div>
                <Link to={`/pets/${id}`} className="link-custom">
                  Pet
                </Link>{" "}
                successfully saved.
              </div>
            }
            onClose={hideSuccessModal}
          />
        </div>
      )}

      {error && (
        <div className="success">
          <ErrorModal message={"System could not save pet"} onClose={hideErrorModal} />
        </div>
      )}
    </div>
  );
};

export default PetAdd;

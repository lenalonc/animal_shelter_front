import { useState } from "react";
import BreedSelectBox from "./BreedSelectBox";
import SelectMultiple from "./SelectMultiple";
import SelectBox from "./SelectBox";
import api from "../../api/Api";
import { useNavigate } from "react-router-dom";

const EditPetModal = ({ onClose, pet, setDeleted }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(pet);
  const [breeds, setBreeds] = useState([]);
  const sizeOptions = [
    { id: "s", label: "Small" },
    { id: "m", label: "Medium" },
    { id: "l", label: "Large" },
  ];
  const genderOptions = [
    { id: "male", label: "Male" },
    { id: "female", label: "Female" },
  ];
  const [picture, setPicture] = useState(null);

  const handlePictureChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleBreedChange = (breedInfo) => {
    setFormData({ ...formData, breed: breedInfo });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const savePet = async () => {
      try {
        const response = await api.put("/pet/" + pet.id, formData);
        if (picture) {
          savePictureLocally(picture);
        }
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching fields:", error);
      }
    };
    savePet();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const deletePet = async () => {
      try {
        const response = await api.delete("/pet/" + pet.id);
        //brisanje slike preko funkc u backu ako slika postoji
        setDeleted(true);
        navigate("/pets?type=All");
      } catch (error) {
        console.error("Error deleting fields:", error);
      }
    };
    deletePet();
  };

  const savePictureLocally = (picture) => {
    const send = new FormData();
    send.append("picture", picture);
    send.append("name", "pet" + pet.id);
    api
      .post("/pet/savePicture", send)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error saving picture:", error);
      });
  };

  return (
    <div className="modal-custom">
      <div
        className="modal-content-custom"
        style={{ width: "fit-content", minWidth: 450 }}
      >
        <div className="modal-header-custom">
          <h2 className="modal-title-custom">
            #{pet.id} {pet.name}
          </h2>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
          ></button>
        </div>
        <div
          className="modal-body-custom"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <div className="pet-input pet-input-details">
            <label htmlFor={"text"} className="label-add-owner">
              Name:
            </label>
            <input
              type={"text"}
              id={"name"}
              name={"name"}
              className="input-add-owner input-pet-prime"
              required
              onChange={handleInputChange}
              style={{ marginLeft: 10 }}
              defaultValue={pet.name}
            />
          </div>
          <div className="pet-input pet-input-details">
            <label
              htmlFor={"text"}
              className="label-add-owner"
              style={{ marginRight: 10 }}
            >
              Breed:
            </label>
            <BreedSelectBox
              selectedAnimalType={pet.animal.type.toLowerCase()}
              onChange={handleBreedChange}
              options={breeds}
              setOptions={setBreeds}
              label={"breed"}
              preselectedOption={pet.breed}
              width={300}
              disabled={false}
            />
          </div>
          <div
            className="pet-input pet-input-details"
            style={{ flex: " 1 1 " }}
          >
            <label
              htmlFor={"text"}
              className="label-add-owner"
              style={{ marginRight: 10 }}
            >
              Gender:
            </label>
            <SelectBox
              onChange={(selectedOption) =>
                handleInputChange({
                  target: { name: "sex", value: selectedOption.label },
                })
              }
              options={genderOptions}
              label={"label"}
              width={"300px"}
              preselectedOption={genderOptions.find(
                (opt) => opt.label.toLowerCase() === pet.sex.toLowerCase()
              )}
            />
          </div>
          <div className="pet-input pet-input-details" style={{ flex: " 1 1" }}>
            <label
              htmlFor={"text"}
              className="label-add-owner"
              style={{ marginRight: 10 }}
            >
              Colors:
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
              preselectedOptions={pet.primaryColors}
            />
          </div>
          <div className="pet-size">
            <div
              className="pet-input pet-input-details"
              style={{ flex: "0 0", marginRight: 10 }}
            >
              <label
                htmlFor={"number"}
                className="label-add-owner"
                style={{ marginRight: 10 }}
              >
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
                style={{ width: 54 }}
              />{" "}
              <span
                style={{
                  color: "#450c08",
                  fontSize: 18,
                  fontWeight: 400,
                  marginLeft: 2,
                }}
              >
                kg
              </span>
            </div>

            <div
              className="pet-input pet-input-details"
              style={{ flex: " 1 1" }}
            >
              <label
                htmlFor={"text"}
                className="label-add-owner"
                style={{ marginRight: 10 }}
              >
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
                options={sizeOptions}
                label={"label"}
                width={"170px"}
                preselectedOption={sizeOptions.find(
                  (opt) => opt.label.toLowerCase() === pet.size.toLowerCase()
                )}
              />
            </div>
          </div>
          <div className="pet-input pet-input-details">
            <label
              htmlFor={"date"}
              className="label-add-owner"
              style={{ marginRight: 10 }}
            >
              Date of arrival:
            </label>
            <input
              type={"date"}
              id={"dateOfArrival"}
              name={"dateOfArrival"}
              className="input-add-owner input-pet"
              required
              onChange={handleInputChange}
              defaultValue={pet.dateOfArrival}
              style={{ width: 235 }}
            />
          </div>
          <div className="age">
            <div className="pet-input pet-input-details">
              <label
                htmlFor={"number"}
                className="label-add-owner"
                style={{ marginRight: 10 }}
              >
                Years:
              </label>
              <input
                type="number"
                id="years"
                name="years"
                className="input-add-owner input-pet-num"
                required
                onChange={handleInputChange}
                value={formData.years || 0}
                min={0}
                style={{ marginRight: 10, width: 54 }}
              />
            </div>
            <div className="pet-input input-pet pet-input-details">
              <label
                htmlFor={"number"}
                className="label-add-owner"
                style={{ marginRight: 10 }}
              >
                Months:
              </label>
              <input
                type="number"
                id="months"
                name="months"
                className="input-add-owner input-pet-num"
                required
                onChange={handleInputChange}
                value={formData.months || 0}
                min={0}
                max={11}
                style={{ width: 54 }}
              />
            </div>
            <div className="custom-file-upload">
              <input
                type="file"
                id="picture"
                name="picture"
                className="input-add-owner input-pet-prime"
                accept="image/*"
                onChange={handlePictureChange}
                style={{ display: "none" }}
              />
              <label
                htmlFor="picture"
                className="custom-button-file"
                style={{ marginLeft: 25 }}
              >
                image
              </label>
            </div>
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
              <label htmlFor="vaccinated" className="label-add-owner">
                Vaccinated
              </label>
              <div className="checkbox-wrapper-23">
                <input
                  type="checkbox"
                  id="check-23"
                  name="vaccinated"
                  checked={formData.vaccinated || false}
                  onChange={handleInputChange}
                />
                <label htmlFor="check-23" style={{ style: 10, marginLeft: 10 }}>
                  <svg viewBox="0,0,50,50">
                    <path d="M5 30 L 20 45 L 45 5"></path>
                  </svg>
                </label>
              </div>
            </div>
            <div
              className="pet-input"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <label htmlFor="vaccinated" className="label-add-owner">
                Sterilized
              </label>
              <div className="checkbox-wrapper-24">
                <input
                  type="checkbox"
                  id="check-24"
                  name="sterilization"
                  checked={formData.sterilization || false}
                  onChange={handleInputChange}
                />
                <label htmlFor="check-24" style={{ style: 10, marginLeft: 10 }}>
                  <svg viewBox="0,0,50,50">
                    <path d="M5 30 L 20 45 L 45 5"></path>
                  </svg>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal-footer-custom"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <button
            className="btn btn-primary btn-adopt btn-owner-details"
            onClick={handleDelete}
            style={{
              width: "120px",
              marginRight: 0,
              marginBottom: 10,
              marginTop: 0,
            }}
          >
            Delete
          </button>
          <button
            className="btn btn-primary btn-adopt btn-owner-details"
            onClick={handleSave}
            style={{
              width: "120px",
              marginRight: 0,
              marginBottom: 10,
              marginTop: 0,
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPetModal;

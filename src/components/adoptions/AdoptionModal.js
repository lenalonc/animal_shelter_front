import React, { useContext, useEffect, useState } from "react";
import api from "../../api/Api";
import SelectBox from "../pets/SelectBox";
import PetCardAd from "./PetCardAdoption";
import SuccessModal from "../Success modal";
import ErrorModal from "../ErrorModal";
import { UserContext } from "../context/UserContext";

const AdoptionModal = ({ onClose, chosenPets }) => {
  const [owners, setOwners] = useState([]);
  const [formattedOwners, setFormattedOwners] = useState([]);
  const [chosenOwner, setChosenOwner] = useState(null);
  const [petImages, setPetImages] = useState({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getOwners = async () => {
      try {
        const response = await api.get("/owner");
        setOwners(response.data);
        const formattedData = response.data.map((owner) => ({
          id: owner.id,
          fullname: `${owner.id} ${owner.firstname} ${owner.lastname}`,
        }));
        setFormattedOwners(formattedData);
      } catch (error) {
        console.error("Error fetching fields:", error);
      }
    };
    getOwners();
    loadPetImages(chosenPets);
  }, []);

  const loadPetImages = async (pets) => {
    const images = {};
    for (const pet of pets) {
      try {
        const img = await import(`../../img/pets/pet${pet.id}.jpg`);
        images[pet.id] = img.default;
      } catch (error) {
        if (pet.animal.type === "CAT") {
          const img = await import("../../img/pets/placeholderCat.jpg");
          images[pet.id] = img.default;
        } else {
          const img = await import("../../img/pets/placeholderDog.jpg");
          images[pet.id] = img.default;
        }
      }
    }
    setPetImages(images);
  };

  const handleOwnerChange = (ownerInfo) => {
    const selectedOwner = owners.find((owner) => owner.id === ownerInfo.id);
    setChosenOwner(selectedOwner);
  };

  const handleSave = () => {
    const currentDate = new Date().toISOString();

    const admin = user;

    const owner = chosenOwner;

    const pets = chosenPets.map((pet) => ({
      pet,
    }));

    const adoption = {
      date: currentDate,
      admin,
      owner,
      pets,
    };

    const createAdoption = async () => {
      try {
        const response = await api.post("/adoption", adoption);
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
    if (chosenOwner) {
      createAdoption();
    }
  };

  const hideSuccessModal = () => {
    setSuccess(false);
    onClose();
  };

  const hideErrorModal = () => {
    setError(false);
  };

  return (
    <div className="modal-custom">
      <div className="modal-content-custom">
        <div className="modal-header-custom">
          <h4 className="modal-title-custom">Adoption Confirmation</h4>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
          ></button>
        </div>
        <div className="modal-body-custom">
          <div className="pet-input" style={{ flex: " 1 1" }}>
            <label htmlFor={"text"} className="label-add-owner">
              Owner:
            </label>
            <SelectBox
              required
              options={formattedOwners}
              label={"fullname"}
              onChange={handleOwnerChange}
              width={"300px"}
              error={!chosenOwner}
            />
            {chosenPets.length > 0 && (
              <div className="pet-part">
                {chosenPets.map((pet) => (
                  <PetCardAd key={pet.id} pet={pet} image={petImages[pet.id]} />
                ))}
              </div>
            )}
          </div>
        </div>
        <div
          className="modal-footer-custom"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <button
            className="btn btn-primary btn-adopt btn-owner-details"
            onClick={handleSave}
            style={{ width: "120px", marginRight: 10, marginBottom: 10 }}
          >
            Save
          </button>
        </div>
      </div>
      {success && (
        <div className="success">
          <SuccessModal
            message={"Adoption successfully saved"}
            onClose={hideSuccessModal}
          />
        </div>
      )}

      {error && (
        <div className="success">
          <ErrorModal
            message={"System could not delete adoption"}
            onClose={hideErrorModal}
          />
        </div>
      )}
    </div>
  );
};

export default AdoptionModal;

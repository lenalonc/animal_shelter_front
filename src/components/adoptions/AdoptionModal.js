import React, { useEffect, useState } from "react";
import api from "../../api/Api";
import SelectBox from "../pets/SelectBox";
import PetCard from "../pets/PetCard";
import PetCardAd from "./PetCardAdoption";

const AdoptionModal = ({ onClose, pets }) => {
  const [owners, setOwners] = useState([]);
  const [formattedOwners, setFormattedOwners] = useState([]);
  const [chosenOwner, setChosenOwner] = useState(null);
  const [petImages, setPetImages] = useState({});

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
    loadPetImages(pets);
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
    console.log(selectedOwner);
  };

  const handleSave = () => {
    const currentDate = new Date().toISOString();

    // Administrator object
    const administrator = { id: 1 };

    // Owner object
    const owner = chosenOwner;

    // List of adoption items
    const adoptionItems = pets.map((pet) => ({
      adoptionItem: {
        pet,
      },
    }));

    // Adoption object
    const adoption = {
      date: currentDate,
      administrator,
      owner,
      adoptionItems,
    };

    console.log(JSON.stringify(adoption));
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
            />
            {pets.length > 0 && (
              <div className="pet-part">
                {pets.map((pet) => (
                  <PetCardAd key={pet.id} pet={pet} image={petImages[pet.id]} />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="modal-footer-custom">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdoptionModal;

import { useEffect, useState } from "react";
import AdoptionModal from "./AdoptionModal";
import api from "../../api/Api";
import PetCardAd from "./PetCardAdoption";

//TODO: if no row is selected do not let them open details
//TODO: are you sure you want to delete this adoption?

const AdoptionDetailsModal = ({ onClose, id }) => {
  const [adoption, setAdoption] = useState(null);
  const [petImages, setPetImages] = useState({});
  const [pets, setPets] = useState({});

  useEffect(() => {
    if (id) {
      const getAdoption = async () => {
        try {
          const response = await api.get("/adoption/" + id);
          setAdoption(response.data);
          const formattedPets = response.data.pets.map(
            (petData) => petData.pet
          );
          setPets(formattedPets);
        } catch (error) {
          console.error("Error fetching fields:", error);
        }
      };
      getAdoption();
    }
  }, []);

  useEffect(() => {
    const loadPetImages = async (pets) => {
      const images = {};
      for (const pet of Array.from(pets)) {
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
    if (pets) {
      loadPetImages(pets);
    }
  }, [pets]);

  const handleDelete = () => {
    const deleteAdoption = async () => {
      try {
        const response = await api.delete("/adoption/" + id);
      } catch (error) {
        console.error("Error fetching fields:", error);
      }
    };
    deleteAdoption();
    onClose();
  };

  return (
    <div className="modal-custom">
      <div
        className="modal-content-custom"
        style={{
          height: "fit-content",
          width: "fit-content",
          paddingRight: 20,
        }}
      >
        <div className="modal-header-custom" style={{ paddingBottom: 10 }}>
          {adoption && (
            <h2
              style={{
                color: "#5e1914",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                marginLeft: 18,
              }}
            >
              Adoption #{adoption.id}
            </h2>
          )}
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
          ></button>
        </div>
        <div className="modal-body-custom">
          <div className="adoption-field" style={{ flex: " 1 1" }}>
            {adoption && (
              <p>
                <span>Owner:</span>{" "}
                {`${adoption.owner.id}. ${adoption.owner.firstname} ${adoption.owner.lastname}`}
              </p>
            )}
          </div>
          <div className="adoption-field" style={{ flex: " 1 1" }}>
            {adoption && (
              <p>
                <span>Date:</span> {`${adoption.date}`}
              </p>
            )}
          </div>
          <div className="adoption-field" style={{ flex: " 1 1" }}>
            {adoption && (
              <p>
                <span>Admin:</span> {`${adoption.admin.username}`}
              </p>
            )}
          </div>
          <div style={{ justifyContent: "center" }}></div>
          {pets && (
            <div className="pet-part" style={{ padding: 0 }}>
              {Array.from(pets).map((pet) => (
                <PetCardAd key={pet.id} pet={pet} image={petImages[pet.id]} />
              ))}
            </div>
          )}
        </div>
        <div
          className="modal-footer-custom"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            height: "fit-content",
            margin: 0,
          }}
        >
          <button
            className="btn btn-primary btn-adopt btn-owner-details"
            onClick={handleDelete}
            style={{
              width: "100px",
              marginRight: 10,
              marginTop: 0,
              marginBottom: 15,
              fontWeight: 550,
              fontSize: 18,
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdoptionDetailsModal;

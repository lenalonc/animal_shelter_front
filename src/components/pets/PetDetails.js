import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/Api";
import HeartButton from "./HeartButton";
import { UserContext } from "../context/UserContext";
import EditPetModal from "./EditPetModal";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

const PetDetails = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [petImage, setPetImage] = useState(null);
  const { user } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [heart, setHeart] = useState(false);

  useEffect(() => {
    getPetDetails();
  }, [id]);

  const loadPetImage = async (petData) => {
    try {
      const img = await import(`../../img/pets/pet${petData.id}.jpg`);
      setPetImage(img.default);
    } catch (err) {
      if (petData.animal && petData.animal.type === "CAT") {
        const img = await import("../../img/pets/placeholderCat.jpg");
        setPetImage(img.default);
      } else {
        const img = await import("../../img/pets/placeholderDog.jpg");
        setPetImage(img.default);
      }
    }
  };

  const getPetDetails = async () => {
    try {
      if (!deleted) {
        const response = await api.get(`/pet/${id}`);
        setPet(response.data);
        loadPetImage(response.data);
      }
    } catch (err) {
      console.error("Error fetching pet details:", err);
    }
  };

  if (!pet) {
    return <div>Loading...</div>;
  }

  const {
    adopted,
    sex,
    breed,
    years,
    months,
    vaccinated,
    primaryColors,
    size,
    weight,
    sterilization,
    dateOfArrival,
  } = pet;

  const calculateAge = () => {
    const yearsText = years === 1 ? "year" : "years";
    const monthsText = months === 1 ? "month" : "months";

    if (years > 0) {
      if (months > 0) {
        return `${years} ${yearsText} and ${months} ${monthsText}`;
      } else {
        return `${years} ${yearsText}`;
      }
    } else {
      return `${months} ${monthsText}`;
    }
  };

  const openEditModal = () => {
    setModalOpen(true);
  };

  const closeEditModal = () => {
    setModalOpen(false);
  };

  const likePet = async () => {
    try {
      const likedPet = {
        owner: user,
        pet: pet,
      };

      if (!deleted) {
        const response = await api.post("/owner/like", likedPet);
        console.log(response.data);
        console.log(2);
        // console.log(JSON.stringify(likedPet));
      }
    } catch (err) {
      console.error("Error fetching pet details:", err);
    }
  };

  const unlikePet = async () => {
    try {
      if (!deleted) {
        const response = await api.delete(`/owner/${user.id}/unlike/${pet.id}`);
        console.log(response.data);
      }
    } catch (err) {
      console.error("Error fetching pet details:", err);
    }
  };

  return (
    <div className="pet-details">
      <div className="container-pet-details">
        <div className="pet-image">
          <img src={petImage} alt={`Image of ${pet.name}`} />
        </div>
        <div className="pet-info">
          <div className="pet-info-info">
            <h2>Hi, my name is {pet.name}.</h2>
            <p>
              <span>Gender:</span> {sex}
            </p>
            <p>
              <span>Breed:</span> {breed ? breed.breed : "/"}
            </p>
            <p>
              <span>Primary colors:</span> {primaryColors}
            </p>
            <p>
              <span>Age:</span> {calculateAge()}
            </p>
            <p>
              <span>Size:</span> {size}
            </p>
            <p>
              <span>Weight:</span> {weight}kg
            </p>
            <p>
              <span>Date of arrival:</span> {dateOfArrival.replace(/-/g, "/")}
            </p>
            <p>
              <span>Sterilized:</span> {sterilization ? "Yes" : "No"}
            </p>
            <p>
              <span>Vaccinated:</span> {vaccinated ? "Yes" : "No"}
            </p>
          </div>
          {user.role === "admin" ? (
            <button
              className="btn btn-primary btn-adopt btn-owner"
              style={{ marginRight: 0 }}
              onClick={setModalOpen}
            >
              EDIT
            </button>
          ) : (
            <HeartButton like={likePet} unlike={unlikePet} pet={pet} />
          )}
        </div>
      </div>
      {modalOpen && (
        <EditPetModal
          onClose={closeEditModal}
          pet={pet}
          setDeleted={setDeleted}
          refresh={getPetDetails}
        />
      )}
    </div>
  );
};

export default PetDetails;

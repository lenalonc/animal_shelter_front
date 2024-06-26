import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/Api";
import HeartButton from "./HeartButton";
import { UserContext } from "../context/UserContext";
import EditPetModal from "./EditPetModal";

const PetAdoptedDetails = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [petImage, setPetImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const getPetDetails = async () => {
        try {
          const response = await api.get(`/pet/${id}`);
          setPet(response.data);
          loadPetImage(response.data);
        } catch (err) {
          console.error("Error fetching pet details:", err);
        }
      };

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

      getPetDetails();
      setLoading(false);
    }, 1000);
  }, [id, pet]);

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
  } = pet || {};

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

  return (
    <div className="pet-details" style={{ minHeight: "80vh" }}>
      {loading && <div className="loader"></div>}
      {pet && (
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
          </div>
        </div>
      )}
    </div>
  );
};

export default PetAdoptedDetails;

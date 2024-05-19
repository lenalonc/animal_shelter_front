import { useContext, useEffect, useState } from "react";
import PetCard from "./PetCard";
import { UserContext } from "../context/UserContext";
import api from "../../api/Api";
import { Link } from "react-router-dom";

const LikedPets = () => {
  const { user } = useContext(UserContext);
  const [petImages, setPetImages] = useState({});
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const getPetDetails = async () => {
      try {
        {
          console.log(user.id);
          if (user.id) {
            console.log("a");
            const response = await api.get(`/owner/liked/${user.id}`);
            const pets = response.data.map((item) => item.pet);
            setPets(pets);
            loadPetImages(pets);
          }
        }
      } catch (err) {
        console.error("Error fetching pet details:", err);
      }
    };

    getPetDetails();
  }, [user]);

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

  return (
    <div className="liked-pets-page">
      {pets && pets.length > 0 ? (
        <div className="pet-page">
          {Array.from(pets).map((pet) => (
            <PetCard key={pet.id} pet={pet} image={petImages[pet.id]} />
          ))}
        </div>
      ) : (
        <div className="no-liked-pets">
          <div className="modal-no-liked">
            <p style={{ fontSize: 23 }}>You still haven't liked any pets.</p>
            <p>
              Check out our pets in the shelter{" "}
              <Link to={"/pets"}>
                <span style={{ color: "#8a251d", textDecoration: "underline" }}>
                  here
                </span>
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LikedPets;

import React, { useState, useEffect } from "react";
import api from "../../api/Api";
import PetCard from "./PetCard";

//TODO: add a placeholder picture

const PetPage = () => {
  const [pets, setPets] = useState([]);
  const [petImages, setPetImages] = useState({});

  useEffect(() => {
    const getPets = async () => {
      try {
        const response = await api.get("/pet");
        const filteredPets = response.data.filter((pet) => !pet.adopted);
        setPets(filteredPets);
        loadPetImages(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    getPets();
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

  return (
    <div className="pet-page">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} image={petImages[pet.id]} />
      ))}
    </div>
  );
};

export default PetPage;

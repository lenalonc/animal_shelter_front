import React, { useState, useEffect, useContext } from "react";
import api from "../../api/Api";
import PetCard from "./PetCard";
import SelectionBox from "./SelectionPetPage";

import { useLocation, useNavigate } from "react-router-dom";

const PetPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const selectedValueFromURL = queryParams.get("type") || "All";

  const [pets, setPets] = useState([]);
  const [petImages, setPetImages] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(selectedValueFromURL);

  const handleOptionClick = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
    updateURL(value);
  };

  const updateURL = (value) => {
    const newURL = `${window.location.pathname}?type=${value}`;
    navigate(newURL);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedValue(selectedValueFromURL);
  }, [selectedValueFromURL]);

  useEffect(() => {
    const getPets = async () => {
      try {
        const response = await api.get("/pet");
        let filteredPets = response.data;

        if (selectedValue !== "All") {
          filteredPets = filteredPets.filter((pet) => {
            if (selectedValue === "Dogs") {
              return pet.animal.type === "DOG";
            } else if (selectedValue === "Cats") {
              return pet.animal.type === "CAT";
            }
          });
        }

        setPets(filteredPets);
        loadPetImages(filteredPets);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    getPets();
  }, [selectedValue]);

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
    <div className="see-pets">
      <div className="select-segment" style={{ margin: "30px 80px 0px 60px" }}>
        <SelectionBox
          label={selectedValue === "All" ? "All" : selectedValue}
          options={["All", "Dogs", "Cats"]}
          onChange={handleOptionClick}
        />
      </div>
      <div className="pet-page">
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} image={petImages[pet.id]} />
        ))}
      </div>
    </div>
  );
};

export default PetPage;

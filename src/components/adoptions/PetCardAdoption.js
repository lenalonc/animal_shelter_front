import React from "react";
import { Link } from "react-router-dom";

const PetCardAd = ({ pet, image }) => {
  const altText = image ? `Image of ${pet.name}` : "No picture";

  return (
    <Link
      to={`/pets/${pet.id}`}
      target="_blank"
      style={{ textDecoration: "none" }}
    >
      <div className="card card-pet-ad" style={{ width: "18rem" }}>
        <img
          src={image || "placeholder.png"}
          className="card-img-top img-card-pet-ad"
          alt={altText}
        />
        <div className="card-body-ad">
          <h5 className="card-title-ad">{pet.name}</h5>
        </div>
      </div>
    </Link>
  );
};

export default PetCardAd;

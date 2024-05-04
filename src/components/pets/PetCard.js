import React from "react";
import { Link } from "react-router-dom";

const PetCard = ({ pet, image }) => {
  const altText = image ? `Image of ${pet.name}` : "No picture";

  return (
    <Link
      to={`${pet.id}`}
      style={{ textDecoration: "none" }}
    >
      <div className="card card-pet" style={{ width: "18rem" }}>
        <img
          src={image || "placeholder.png"}
          className="card-img-top img-card-pet"
          alt={altText}
        />
        <div className="card-body">
          <h5 className="card-title">{pet.name}</h5>
        </div>
      </div>
    </Link>
  );
};

export default PetCard;

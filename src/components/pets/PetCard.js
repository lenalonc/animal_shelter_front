const PetCard = () => {
  const imageUrl = "../../img/cat-01.jpg";

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={imageUrl} className="card-img-top" alt="nema slicice" />
      <div className="card-body">
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
    </div>
  );
};

export default PetCard;

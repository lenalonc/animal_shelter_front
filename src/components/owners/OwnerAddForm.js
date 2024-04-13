import slika from "../../img/addOwner.jpg";
import { Link } from "react-router-dom";

const OwnerAddForm = () => {
  const fields = ["Email", "Name", "Lastname"];

  return (
    <div className="form-container-add-owner">
      <div className="form-left-add-owner">
        <h2
          style={{
            marginBottom: 30,
            color: "#8a251d",
            fontSize: 40,
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            fontWeight: 600,
          }}
        >
          BECOME A PET OWNER
        </h2>
        <form>
          {fields.map((field, index) => (
            <div className="form-group-add-owner " key={index}>
              <label htmlFor={field.toLowerCase()}  className="label-add-owner">{field}:</label>
              <input
                type={field === "Email" ? "email" : "text"}
                id={field.toLowerCase()}
                name={field.toLowerCase()}
                className="input-add-owner"
                required
              />
            </div>
          ))}
          <div className="add-owner-btncontainer">
            <button
              type="submit"
              className="btn btn-primary btn-adopt btn-add-owner"
            >
              SAVE
            </button>
            <Link to="/owners">
              <button
                type="button"
                className="btn btn-primary btn-adopt btn-add-owner"
                style={{ marginLeft: 30 }}
              >
                VIEW ALL
              </button>
            </Link>
          </div>
        </form>
      </div>
      <div className="form-right-add-owner">
        <img src={slika} alt="placeholder" className="form-image-add-owner " />
      </div>
    </div>
  );
};

export default OwnerAddForm;

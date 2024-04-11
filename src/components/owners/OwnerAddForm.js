import slika from "../../img/addOwner.jpg";
import { Link } from "react-router-dom";

const OwnerAddForm = () => {
  const fields = ["Email", "Name", "Lastname"];

  return (
    <div className="form-container">
      <div className="form-left">
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
            <div className="form-group" key={index}>
              <label htmlFor={field.toLowerCase()}>{field}:</label>
              <input
                type={field === "Email" ? "email" : "text"}
                id={field.toLowerCase()}
                name={field.toLowerCase()}
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
      <div className="form-right">
        <img src={slika} alt="placeholder" className="form-image" />
      </div>
    </div>
  );
};

export default OwnerAddForm;

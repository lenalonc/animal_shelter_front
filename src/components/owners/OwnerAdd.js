import { Link } from "react-router-dom";
import slika from "../../img/addOwner.jpg";
import { useState, useEffect } from "react";
import api from "../../api/Api";

//TODO: two password input fields and check if they match before sending the data
//TODO: Success modal when new owner is created
//TODO: Validation checks

const OwnerAdd = () => {
  const [fields, setFields] = useState([]);
  const [owner, setOwner] = useState([]);

  useEffect(() => {
    const getFields = async () => {
      try {
        const response = await api.get("/owner/fields");
        setFields(response.data);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };

    getFields();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOwner((prevOwner) => ({
      ...prevOwner,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const result = api.post("owner", owner);
      setOwner(result.data);
      console.log(owner);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleInputFocus = (e) => {
    e.target.previousElementSibling.classList.add("focused-label");
  };

  const handleInputBlur = (e) => {
    e.target.previousElementSibling.classList.remove("focused-label");
  };

  return (
    <div className="owner-add-page">
      <div className="owner-add-form">
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
                <div className="form-group-add-owner" key={index}>
                  <label htmlFor={field} className="label-add-owner">
                    {capitalizeFirstLetter(
                      field === "dateOfBirth" ? "Date of birth" : field
                    )}
                    :
                  </label>
                  <input
                    type={
                      field === "password"
                        ? "password"
                        : field === "dateOfBirth"
                        ? "date"
                        : "text"
                    }
                    id={field}
                    name={field}
                    className="input-add-owner"
                    required
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChange={handleInputChange}
                    defaultValue={field === "dateOfBirth" ? "2000-01-01" : ""}
                  />
                </div>
              ))}
              <div className="add-owner-btncontainer">
                <button
                  type="submit"
                  className="btn btn-primary btn-adopt btn-add-owner"
                  onClick={handleSave}
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
            <img
              src={slika}
              alt="add owner form"
              className="form-image-add-owner"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerAdd;

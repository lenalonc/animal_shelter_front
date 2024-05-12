import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/Api";
import { Link } from "react-router-dom";

//TODO: After deleting an owner the edit button should not be useable as that owner doesnt exist anymore
//TODO: Save check: if no info was change make the save button unavailable

const OwnerDetails = () => {
  const { id } = useParams();

  const [owner, setOwner] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const handleInputFocus = (e) => {
    e.target.previousElementSibling.classList.add("focused-label");
  };

  const handleInputBlur = (e) => {
    e.target.previousElementSibling.classList.remove("focused-label");
  };

  useEffect(() => {
    const getOwner = async () => {
      try {
        const response = await api.get("/owner/" + id);
        setOwner(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    getOwner();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "firstname" || name === "lastname") {
      updatedValue = value.charAt(0).toUpperCase() + value.slice(1);
    }

    setOwner((prevOwner) => ({
      ...prevOwner,
      [name]: updatedValue,
    }));
  };

  const handleSaveClick = async () => {
    try {
      await api.put("/owner/" + id, owner);
      console.log(owner);
      setIsEditing(false);
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

  const handleDeleteClick = async () => {
    try {
      await api.delete("/owner/" + id);
      setIsEditing(false);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="owner-details-page">
      <div className="owner-details">
        <div className="owner-details-header">
          <h2>Owner Details</h2>
        </div>
        <div className="owner-details-content">
          {Object.keys(owner).map((key) => {
            if (key !== "adoptions" && key !== "password") {
              return (
                <div className="field-owner-details" key={key}>
                  <label>{capitalizeFirstLetter(key)}:</label>
                  <input
                    type="text"
                    name={key}
                    value={key === "id" ? owner[key] : owner[key] || ""}
                    onChange={
                      isEditing && key !== "id" ? handleInputChange : null
                    }
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    disabled={!isEditing || key === "id"}
                    style={
                      key === "id"
                        ? {
                            width: 20,
                            border: "none",
                            background: "none",
                            color: "#450c08",
                            fontSize: 18,
                            fontWeight: 500,
                          }
                        : { width: 300, marginLeft: 10 }
                    }
                  />
                </div>
              );
            }
            return null;
          })}

          <div className="buttons-owner-details">
            {isEditing ? (
              <>
                <button
                  className="btn btn-primary btn-adopt btn-owner-details"
                  style={{ marginRight: 200, marginLeft: 0 }}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary btn-adopt btn-owner-details"
                  onClick={handleDeleteClick}
                  style={{ marginLeft: "auto", marginRight: 20 }}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary btn-adopt btn-owner-details"
                  onClick={handleSaveClick}
                  style={{ marginLeft: "auto", width: "100px" }}
                >
                  Save
                </button>
              </>
            ) : (
              <button
                className="btn btn-primary btn-adopt btn-owner-details"
                onClick={handleEditClick}
                style={{ width: "100px" }}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDetails;

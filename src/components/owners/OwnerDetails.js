import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/Api";

const OwnerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [owner, setOwner] = useState({
    id: "",
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    role: "customer",
  });
  const [originalRole, setOriginalRole] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const getOwner = async () => {
      try {
        const response = await api.get("/owner/" + id);
        setOwner(response.data);
        setOriginalRole(response.data.role);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    getOwner();
  }, [id]);

  useEffect(() => {
    if (redirect) {
      navigate("/owners");
    }
  }, [redirect, navigate]);

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

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    const newRole = isChecked ? "admin" : "customer"; // Changed "user" to "customer"
    setOwner((prevOwner) => ({
      ...prevOwner,
      role: newRole,
    }));
  };

  const handleSaveClick = async () => {
    try {
      await api.put("/owner/" + id, owner);
      setIsEditing(false);
      if (owner.role !== originalRole) {
        setRedirect(true);
      }
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
      setRedirect(true);
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
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <label
              style={{
                marginRight: 35,
                fontSize: 17,
                fontWeight: 500,
                color: "#450c08",
              }}
            >
              Make admin:
            </label>
            <p className="onoff">
              <input
                type="checkbox"
                value="1"
                id="checkboxID"
                style={{ color: "white" }}
                onChange={handleCheckboxChange}
                checked={owner.role === "admin"}
                disabled={!isEditing}
              />
              <label htmlFor="checkboxID" style={{ color: "white" }}></label>
            </p>
          </div>

          {Object.keys(owner).map((key) => {
            if (key !== "adoptions" && key !== "id" && key !== "role") {
              return (
                <div className="field-owner-details" key={key}>
                  <label>{capitalizeFirstLetter(key)}:</label>
                  <input
                    type="text"
                    name={key}
                    value={owner[key]}
                    onChange={isEditing ? handleInputChange : null}
                    disabled={!isEditing}
                    style={{ width: 300, marginLeft: 10 }}
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
                  style={{ marginRight: 120, marginLeft: 0, width: 95 }}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary btn-adopt btn-owner-details"
                  onClick={handleDeleteClick}
                  style={{ marginLeft: "auto", marginRight: 20, width: 90 }}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary btn-adopt btn-owner-details"
                  onClick={handleSaveClick}
                  style={{ marginLeft: "auto", width: "80px" }}
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

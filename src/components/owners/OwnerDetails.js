import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/Api";
import SuccessModal from "../Success modal";
import ErrorModal from "../ErrorModal";
import AreYouSure from "../AreYouSureModal";
import WarningModal from "../WarningModal";

const OwnerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [errorDelete, setErrorDelete] = useState(false);
  const [sure, setSure] = useState(false);
  const [showNoChangesModal, setShowNoChangesModal] = useState(false);

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
  const [originalOwner, setOriginalOwner] = useState();

  useEffect(() => {
    const getOwner = async () => {
      try {
        const response = await api.get("/owner/" + id);
        setOwner(response.data);
        setOriginalOwner(response.data);
        setOriginalRole(response.data.role);
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
    const newRole = isChecked ? "admin" : "customer";
    setOwner((prevOwner) => ({
      ...prevOwner,
      role: newRole,
    }));
  };

  const handleSaveClick = async () => {
    if (originalOwner === owner) {
      setShowNoChangesModal(true);
      return;
    }
    console.log(originalOwner);
    console.log(owner === originalOwner);
    try {
      const response = await api.put("/owner/" + id, owner);
      setIsEditing(false);
      setSuccess(true);
      setOriginalOwner(response.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
      setError(true);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete("/owner/" + id);
      setSuccessDelete(true);
      setSure(false);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
      setErrorDelete(true);
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const hideSuccessModal = () => {
    setSuccess(false);
    if (owner.role !== originalRole) {
      setRedirect(true);
    }
  };

  const hideErrorModal = () => {
    setError(false);
  };

  const hideSuccessDeleteModal = () => {
    setSuccessDelete(false);
    setRedirect(true);
  };

  const hideErrorDeleteModal = () => {
    setErrorDelete(false);
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
                  onClick={() => setSure(true)}
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
      {success && (
        <div className="success">
          <SuccessModal
            message={"Owner successfully updated"}
            onClose={hideSuccessModal}
          />
        </div>
      )}

      {error && (
        <div className="success">
          <ErrorModal
            message={"Could not update owner"}
            onClose={hideErrorModal}
          />
        </div>
      )}

      {successDelete && (
        <div className="success">
          <SuccessModal
            message={"Owner successfully deleted"}
            onClose={hideSuccessDeleteModal}
          />
        </div>
      )}

      {errorDelete && (
        <div className="success">
          <ErrorModal
            message={"Could not delete owner"}
            onClose={hideErrorDeleteModal}
          />
        </div>
      )}

      {showNoChangesModal && (
        <div className="no-changes">
          <WarningModal
            message={"No changes have been made!"}
            onClose={() => setShowNoChangesModal(false)}
          />
        </div>
      )}

      {sure && (
        <AreYouSure
          message={"Are you sure you want to delete this owner?"}
          onClose={() => setSure(false)}
          deletePet={handleDelete}
        />
      )}
    </div>
  );
};

export default OwnerDetails;

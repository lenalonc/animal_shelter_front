import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/Api";
import SuccessModal from "../Success modal";
import ErrorModal from "../ErrorModal";
import AreYouSure from "../AreYouSureModal";
import WarningModal from "../WarningModal";
import { UserContext } from "../context/UserContext";

const OwnerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [errorDelete, setErrorDelete] = useState(false);
  const [sure, setSure] = useState(false);
  const [showNoChangesModal, setShowNoChangesModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [systemError, setSystemError] = useState(false);
  const {user} = useContext(UserContext);

  const [owner, setOwner] = useState({
    id: "",
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    role: "customer",
  });

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/notfound");
    }
  }, [user]);

  const [originalRole, setOriginalRole] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [originalOwner, setOriginalOwner] = useState();
  const [hasAdoptions, setHasAdoptions] = useState(false);

  useEffect(() => {
    const getOwner = async () => {
      try {
        const response = await api.get("/owner/" + id);
        setOwner(response.data);
        console.log(response.data);
        setOriginalOwner(response.data);
        setOriginalRole(response.data.role);
        if (response.data.adoptions && response.data.adoptions.length > 0) {
          setHasAdoptions(true);
        }
      } catch (err) {
        setSystemError(true);
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
    setTimeout(() => {
      setLoading(false);
    }, 1300);
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

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    const newRole = isChecked ? "admin" : "customer";
    setOwner((prevOwner) => ({
      ...prevOwner,
      role: newRole,
    }));
  };

  const handleSaveClick = async () => {
    if (
      originalOwner === owner ||
      (owner.firstname === originalOwner.firstname &&
        owner.lastname === originalOwner.lastname &&
        owner.email === originalOwner.email &&
        owner.username === originalOwner.username &&
        owner.role === originalOwner.role)
    ) {
      setShowNoChangesModal(true);
      return;
    }

    if (checkData()) {
      try {
        const response = await api.put("/owner/" + id, owner);
        setIsEditing(false);
        setSuccess(true);
        setOriginalOwner(response.data);
        setShowError(false);
      } catch (err) {
        if (err.response) {
          if (err.response.status === 403) {
            setShowError(true);
          } else {
            setError(true);
            setShowError(false);
          }
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
          setError(true);
        }
      }
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
    navigate("/owners");
  };

  const hideErrorModal = () => {
    setError(false);
  };

  const hideSuccessDeleteModal = () => {
    setSuccessDelete(false);
    navigate("/owners");
  };

  const hideErrorDeleteModal = () => {
    setErrorDelete(false);
  };

  const checkData = () => {
    return (
      owner &&
      owner.firstname &&
      owner.firstname !== "" &&
      owner.lastname &&
      owner.lastname !== "" &&
      owner.email &&
      owner.email !== "" &&
      owner.username &&
      owner.username !== "" &&
      owner.role
    );
  };

  const handleCancel = () => {
    setIsEditing(false);
    setOwner(originalOwner);
  };

  const goBack = () => {
    setSystemError(false);
    navigate("/owners");
  };

  return (
    <div className="owner-details-page" style={{ minHeight: "80vh" }}>
      {loading ? (
        <div className="loader" style={{ color: "#5e1914" }}></div>
      ) : (
        <div className="owner-details">
          <div className="owner-details-header">
            <h2>Owner Details</h2>
          </div>
          <div className="owner-details-content">
            {!hasAdoptions && (
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
                  <label
                    htmlFor="checkboxID"
                    style={{ color: "white" }}
                  ></label>
                </p>
              </div>
            )}

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
                      style={{
                        width: 300,
                        marginLeft: 10,
                        border: owner[key] === "" ? "2px solid #8a251d" : "",
                      }}
                    />
                  </div>
                );
              }
              return null;
            })}
            {showError && (
              <label
                style={{ textAlign: "center" }}
                className="error-owner-add"
              >
                Username or email is already registered.
              </label>
            )}
            <div className="buttons-owner-details">
              {isEditing ? (
                <>
                  <button
                    className="btn btn-primary btn-adopt btn-owner-details"
                    style={{ marginRight: 120, marginLeft: 0, width: 95 }}
                    onClick={handleCancel}
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
      )}
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
            message={"System could not update owner"}
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
            message={"System could not delete owner"}
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
      {systemError && (
        <ErrorModal message={"System could not load owner"} onClose={goBack} />
      )}
    </div>
  );
};

export default OwnerDetails;

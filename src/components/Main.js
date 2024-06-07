import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Icon } from "../img/arrow-right.svg";
import { GoogleMap } from "@react-google-maps/api";
import { useEffect } from "react";

const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAdoptClick = (type) => {
    navigate(`/pets?type=${type}`);
  };

  return (
    <div className="container-custom">
      <div className="panel">
        <img
          className="dog-picture"
          src={require("../img/pas2-01.png")}
          style={{ height: 300, width: "auto" }}
        ></img>
        <button
          type="button"
          className="btn btn-primary btn-adopt"
          onClick={() => handleAdoptClick("All")}
        >
          ADOPT NOW
        </button>
        <img className="quote-img" src={require("../img/maki-01.png")}></img>
      </div>
      <div className="animals">
        <div className="card card-animal" style={{ width: "25rem" }}>
          <img
            src={require("../img/cat-01.jpg")}
            className="card-img-top animal-img"
            alt="cat"
            style={{ height: "250px", borderRadius: "15px" }}
          ></img>
          <div className="card-body-animal">
            <button
              className="button-27"
              onClick={() => handleAdoptClick("Cats")}
            >
              ADOPT A CAT
            </button>
          </div>
        </div>

        <div className="card card-animal" style={{ width: "25rem" }}>
          <img
            src={require("../img/dog-02.jpg")}
            className="card-img-top animal-img"
            alt="dog"
            style={{ height: "250px", borderRadius: "15px" }}
          ></img>
          <div className="card-body-animal">
            <button
              className="button-27"
              onClick={() => handleAdoptClick("Dogs")}
            >
              ADOPT A DOG
            </button>
          </div>
        </div>
      </div>
      <div className="container mt-5 ">
        <div className="p-4 text-center bg-body-tertiary rounded-3 container-ann">
          <img
            src={require("../img/logoRed_Paw Print Heart Connected.png")}
            className="logo-jumbo"
          ></img>
          <h1 className="text-body-emphasis title-jumbo">
            MARLO ANIMAL SHELTER
          </h1>
          <p className="col-lg-8 mx-auto fs-5 text-muted">
            Our adoption shelter serves as a sanctuary for animals in search of
            loving homes. With a committed team and an emphasis on compassion
            and responsible pet ownership, we endeavor to ensure that every
            furry resident finds their perfect match. Join us in our mission to
            make a difference in the lives of these deserving animals.
            <br></br>
            <br></br>
            Explore more possibilities with our adoption shelter. Register or
            log in to track animals you're interested in. Join us in making a
            lasting difference in the lives of our shelter animals. You can
            visit at us{" "}
            <span style={{ color: "#8a251d" }}>
              MONDAY to FRIDAY from 09 h to 21h, 1234 Paws and Claws Boulevard,
              Barkington.
            </span>
          </p>
          <div className="map">
            {/* <iframe
              width="400"
              height="500"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
              src="https://maps.google.com/maps?width=400&amp;height=500&amp;hl=en&amp;q=Florence,%20Italy+(Marlo%20Animal%20Shelter)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            >
              <a href="https://www.gps.ie/">gps devices</a>
            </iframe> */}
          </div>
          <div className="d-inline-flex gap-2 mb-5">
            <Link to={"/login"} state={{ checked: true }}>
              <button
                className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill btn-login"
                type="button"
              >
                Login
                <Icon className="bi ms-2" width="24" height="24" />
              </button>
            </Link>
            <Link to={"/login"} state={{ checked: false }}>
              <button
                className="btn btn-outline-secondary btn-lg px-4 rounded-pill btn-register"
                type="button"
              >
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

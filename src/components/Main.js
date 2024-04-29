import { ReactComponent as Icon } from "../img/arrow-right.svg";

const Main = () => {
  return (
    <div className="container-custom">
      <div className="panel">
        <img
          className="dog-picture"
          src={require("../img/pas2-01.png")}
          style={{ height: 300, width: "auto" }}
        ></img>
        <button type="button" className="btn btn-primary btn-adopt">
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
            <button className="button-27" role="button">
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
            <button className="button-27" role="button">
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
            <span style={{ color: "#8a251d" }}> Learn more</span>
            <br></br>
            <br></br>
            Explore more possibilities with our adoption shelter. Register or
            log in to track animals you're interested in, view your past
            adoptions, and more. Join us in making a lasting difference in the
            lives of our shelter animals.
          </p>
          <div className="d-inline-flex gap-2 mb-5">
            <button
              className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill btn-login"
              type="button"
            >
              Login
              <Icon className="bi ms-2" width="24" height="24" />
            </button>
            <button
              className="btn btn-outline-secondary btn-lg px-4 rounded-pill btn-register"
              type="button"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

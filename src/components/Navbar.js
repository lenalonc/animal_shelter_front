import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";

const Navbar = () => {
  const { user, resetUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className="bd-example m-0 border-0 ">
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary nav-custom"
        style={{
          backgroundColor: "#b37973",
        }}
      >
        <div className="container-fluid">
          <img
            src={require("../img/logoRed_Paw Print Heart Connected.png")}
            className="logo-small"
          ></img>
          <h2
            className="navbar-brand nav-text"
            style={{ color: "white", marginTop: 5, cursor: "default" }}
            to={"/"}
          >
            Marlo Animal Shelter
          </h2>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <div
                className="left-side"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <li className="nav-item">
                  <NavLink className="nav-link nav-text" to={"/"}>
                    Home
                  </NavLink>
                </li>
                {/* <li className="nav-item">
                  <a className="nav-link nav-text" href="#">
                    About us
                  </a>
                </li> */}

                <li className="nav-item dropdown">
                  <NavLink className="nav-link  nav-text" to={"pets?type=All"}>
                    Pets
                  </NavLink>
                  {user.role === "admin" && (
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          className="dropdown-item nav-drop"
                          to={"pets?type=All"}
                        >
                          View pets
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item nav-drop"
                          to={"pets/add"}
                        >
                          Add
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item nav-drop"
                          to={"pets/adopted?type=All"}
                        >
                          Adopted Pets
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>

                {user.role === "admin" && (
                  <li className="nav-item dropdown">
                    <NavLink className="nav-link nav-text" to={"/owners"}>
                      Owners
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          className="dropdown-item nav-drop"
                          to={"/owners"}
                        >
                          View All
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item nav-drop"
                          to={"/owners/add"}
                        >
                          Add
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item nav-drop"
                          to={"/admins"}
                        >
                          Admins
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                )}

                {user.role === "admin" && (
                  <li className="nav-item dropdown">
                    <NavLink className="nav-link nav-text" to={"adoptions"}>
                      Adoptions
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          className="dropdown-item nav-drop"
                          to={"adoptions"}
                        >
                          View All
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item nav-drop"
                          to={"adoptions/add"}
                        >
                          Add
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                )}
              </div>

              {user.role === "" && (
                <div
                  className="right-side"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    zIndex: 100,
                    marginLeft: 920,
                  }}
                >
                  <li className="nav-item">
                    <NavLink
                      className="nav-link nav-text"
                      to={"/login"}
                      state={{ checked: true }}
                    >
                      Login
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      className="nav-link nav-text"
                      to={"/login"}
                      state={{ checked: false }}
                    >
                      Sign up
                    </NavLink>
                  </li>
                </div>
              )}

              {user.role != "" && (
                <div
                  className={`right-side ${
                    user.role === "admin" ? "admin-nav" : "customer-nav"
                  }`}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {user.role === "customer" && (
                    <li className="nav-item">
                      <NavLink
                        className="nav-link nav-text"
                        to={"/pets/liked"}
                        style={{ marginRight: 10, zIndex: 100, }}
                      >
                        Liked pets
                      </NavLink>
                    </li>
                  )}
                  <li className="nav-item">
                    <NavLink
                      className="nav-link nav-text"
                      to={"/login"}
                      state={{ checked: true }}
                      onClick={resetUser}
                    >
                      Logout
                    </NavLink>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

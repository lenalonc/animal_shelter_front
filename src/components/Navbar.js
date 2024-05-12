import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "./context/UserContext";

const Navbar = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="bd-example m-0 border-0 ">
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary nav-custom"
        style={{ backgroundColor: "#b37973 !important" }}
      >
        <div className="container-fluid">
          <img
            src={require("../img/logoRed_Paw Print Heart Connected.png")}
            className="logo-small"
          ></img>
          <NavLink
            className="navbar-brand nav-text"
            style={{ color: "white" }}
            to={"/"}
          >
            Marlo Animal Shelter
          </NavLink>
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
              <li className="nav-item">
                <NavLink className="nav-link nav-text" to={"/"}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-text" href="#">
                  About us
                </a>
              </li>

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
                  </ul>
                </li>
              )}

              {(user.role === "admin" || user.role === "customer") && (
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle nav-text"
                    to={"adoptions"}
                  >
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
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

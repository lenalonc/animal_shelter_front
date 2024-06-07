import React, { useState, useContext, useEffect } from "react";
import api from "../api/Api";
import { UserContext } from "./context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { setUser, saveUserToLocalStorage } = useContext(UserContext);
  const { state } = useLocation();
  const checked = state ? state.checked : false;
  const [isChecked, setIsChecked] = useState(checked);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    email: "",
    username: "",
    firstname: "",
    lastname: "",
    password: "",
  });
  const [showError, setShowError] = useState(false);
  // const [invalidEmail, setInvalidEmail] = useState(false);
  // const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [flag, setFlag] = useState(false);
  const [flagLogin, setFlagLogin] = useState(false);
  const punctuationRegex = /[!@#$%^&*(),.?":{}|<>]/;
  const [invalid, setInvalid] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value.trim() });
  };

  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    console.log(value.trim());
    setSignupData({ ...signupData, [name]: value.trim() });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setFlagLogin(true);
    if (checkLogin()) {
      try {
        const response = await api.post("/login", loginData);
        const userData = {
          id: response.data.user.id,
          firstname: response.data.user.firstname,
          lastname: response.data.user.lastname,
          email: response.data.user.email,
          username: response.data.user.username,
          role: response.data.user.role,
          token: response.data.token,
        };
        setUser(userData);
        saveUserToLocalStorage(userData);
        navigate("/");
      } catch (err) {
        if (err.response) {
          if (err.response.status === 403) {
            setShowError(true);
          }
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    var check;
    console.log(invalid);
    check = checkSignup();

    if (check) {
      register();
    }
  };

  const register = async () => {
    try {
      console.log("ovde");
      const response = await api.post("/register", signupData);
      const userData = {
        id: response.data.user.id,
        firstname: response.data.user.firstname,
        lastname: response.data.user.lastname,
        email: response.data.user.email,
        username: response.data.user.username,
        role: response.data.user.role,
        token: response.data.token,
      };
      setUser(userData);
      saveUserToLocalStorage(userData);
      setInvalid(false);
      navigate("/");
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.error);
        if (err.response.status === 400) {
          setInvalid(true);
          console.log("je li");
        } else {
          setInvalid(false);
        }
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  const checkSignup = () => {
    setFlag(true);
    var c1, c2;
    if (
      !signupData ||
      !signupData.password ||
      signupData.password === "" ||
      signupData.password.length < 8 ||
      !!punctuationRegex.test(signupData.password)
    ) {
      setInvalidPassword(true);
      c1 = true;
    } else {
      setInvalidPassword(false);
      c1 = false;
    }
    c2 =
      signupData &&
      signupData.email &&
      signupData.email !== "" &&
      signupData.firstname &&
      signupData.firstname !== "" &&
      signupData.lastname &&
      signupData.lastname !== "" &&
      signupData.username &&
      signupData.username !== "";

    return c1 && c2;
  };

  const checkLogin = () => {
    return (
      loginData &&
      loginData.username &&
      loginData.username !== "" &&
      loginData.password &&
      loginData.password !== ""
    );
  };

  // const uniqueEmail = async () => {
  //   try {
  //     const response = await api.get("/owner/email/" + signupData.email);
  //     if (response.data === true) {
  //       setInvalidEmail(false);
  //       return true;
  //     } else {
  //       setInvalidEmail(true);
  //       return false;
  //     }
  //   } catch (err) {
  //     if (err.response) {
  //       console.log(err.response.data);
  //       console.log(err.response.status);
  //       console.log(err.response.headers);
  //     } else {
  //       console.log(`Error: ${err.message}`);
  //     }
  //   }
  // };

  // const uniqueUsername = async () => {
  //   try {
  //     const response = await api.get("/owner/username/" + signupData.username);
  //     if (response.data === true) {
  //       setInvalidUsername(false);
  //       return true;
  //     } else {
  //       setInvalidUsername(true);
  //       return false;
  //     }
  //   } catch (err) {
  //     if (err.response) {
  //       console.log(err.response.data);
  //       console.log(err.response.status);
  //       console.log(err.response.headers);
  //     } else {
  //       console.log(`Error: ${err.message}`);
  //     }
  //   }
  // };

  const getInvalidPasswordMessage = () => {
    switch (true) {
      case signupData.password === "":
        return "Password is required";
      case signupData.password.length < 8:
        return "Password must be at least 8 characters long";
      case !/[!@#$%^&*(),.?":{}|<>]/.test(signupData.password):
        return "Password must contain at least one special sign";
      default:
        return;
    }
  };

  return (
    <div className="login-form">
      <div className="main-login">
        <input
          type="checkbox"
          id="chk"
          aria-hidden="true"
          checked={isChecked}
          onChange={toggleCheckbox}
        />
        <div className="signup">
          <form>
            <label htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <div className="field-login">
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="input-custom"
                onChange={handleSignupInputChange}
              />
              {flag && signupData.email === "" && (
                <label style={{ textAlign: "center", color: "#882f29" }}>
                  Email is required.
                </label>
              )}
              {flag &&
                signupData.email &&
                signupData.email !== "" &&
                !signupData.email.includes("@") && (
                  <label style={{ textAlign: "center", color: "#882f29" }}>
                    Email must contain '@'.
                  </label>
                )}
              {/* {flag && invalidEmail && (
                <label style={{ textAlign: "center", color: "#882f29" }}>
                  This email is already registered.
                </label>
              )} */}
            </div>
            <div className="field-login">
              <input
                type="text"
                name="firstname"
                placeholder="Firstname"
                required
                className="input-custom"
                onChange={handleSignupInputChange}
              />
              {flag && signupData.firstname === "" && (
                <label style={{ textAlign: "center", color: "#882f29" }}>
                  Firstname is required.{" "}
                </label>
              )}
            </div>
            <div className="field-login">
              <input
                type="text"
                name="lastname"
                placeholder="Lastname"
                required
                className="input-custom"
                onChange={handleSignupInputChange}
              />
              {flag && signupData.lastname === "" && (
                <label style={{ textAlign: "center", color: "#882f29" }}>
                  Lastname is required.
                </label>
              )}
            </div>
            <div className="field-login">
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                className="input-custom"
                onChange={handleSignupInputChange}
              />
              {flag && signupData.username === "" && (
                <label style={{ textAlign: "center", color: "#882f29" }}>
                  Username is required.
                </label>
              )}
              {/* {flag && invalidUsername && (
                <label style={{ textAlign: "center", color: "#882f29" }}>
                  This username is already registered.
                </label>
              )} */}
            </div>
            <div className="field-login">
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="input-custom"
                onChange={handleSignupInputChange}
              />
              {/* {flag && signupData.password === "" && (
                <label style={{ textAlign: "center", color: "#882f29" }}>
                  Password is required.
                </label>
              )} */}
              {flag && invalidPassword && (
                <label style={{ textAlign: "center", color: "#882f29" }}>
                  {getInvalidPasswordMessage()}
                </label>
              )}
            </div>
            <button
              className="btn-signup"
              style={{ marginTop: 10 }}
              onClick={handleSignup}
            >
              Sign up
            </button>
            {flag && invalid && (
              <label
                style={{
                  textAlign: "center",
                  color: "#882f29",
                  fontSize: 11,
                  marginTop: 10,
                }}
              >
                Email or username not unique.
              </label>
            )}
          </form>
        </div>

        <div className="login">
          <form>
            <label
              htmlFor="chk"
              aria-hidden="true"
              className="main-login-label"
              style={{ margin: 0 }}
            >
              Login
            </label>
            <div className="field-login">
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                className="input-custom-signup"
                onChange={handleLoginInputChange}
              />
              {flagLogin && loginData.username === "" && (
                <label style={{ textAlign: "center", color: "#882f29" }}>
                  Username is required.
                </label>
              )}
            </div>
            <div className="field-login">
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="input-custom-signup"
                onChange={handleLoginInputChange}
              />
              {flagLogin && loginData.password === "" && (
                <label style={{ textAlign: "center", color: "#882f29" }}>
                  Password is required.
                </label>
              )}
              {showError && (
                <label style={{ textAlign: "center" }}>
                  Incorrect username or password.<br></br> Please try again.
                </label>
              )}
            </div>
            <button
              className="btn-login"
              onClick={handleLogin}
              style={{ position: "static" }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

import api from "../api/Api";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const LoginForm = () => {
  const { user, setUser, saveUserToLocalStorage } = useContext(UserContext);
  const { state } = useLocation();
  const checked = state ? state.checked : false;
  const [isChecked, setIsChecked] = useState(checked);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    role: "",
  });

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const login = async () => {
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
        console.log(userData);
        navigate("/");
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    login();
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const register = async () => {
      try {
        console.log(signupData);
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
        console.log(userData);
        navigate("/");
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    register();
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
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="input-custom"
              onChange={handleSignupInputChange}
            />
            <input
              type="text"
              name="firstname"
              placeholder="Firstname"
              required
              className="input-custom"
              onChange={handleSignupInputChange}
            />
            <input
              type="text"
              name="lastname"
              placeholder="Lastname"
              required
              className="input-custom"
              onChange={handleSignupInputChange}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              className="input-custom"
              onChange={handleSignupInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="input-custom"
              onChange={handleSignupInputChange}
            />
            <button className="btn-signup" onClick={handleSignup}>
              Sign up
            </button>
          </form>
        </div>

        <div className="login">
          <form>
            <label htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              className="input-custom-signup"
              onChange={handleLoginInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="input-custom-signup"
              onChange={handleLoginInputChange}
            />
            <button className="btn-login" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

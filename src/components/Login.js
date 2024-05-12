import api from "../api/Api";
import { useContext, useState } from "react";
import { UserContext } from "./context/UserContext";

const LoginForm = () => {
  const { setUser } = useContext(UserContext);

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
        setUser(response.data);
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
        const response = await api.post("/register", signupData);
        setUser(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    register();
  };

  return (
    <div className="login-form">
      <div className="main-login">
        <input type="checkbox" id="chk" aria-hidden="true" />
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
              name="txt"
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

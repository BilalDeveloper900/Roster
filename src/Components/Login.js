import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../Stores/Slices";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };
    dispatch(login(payload)).then((res) => {
      const token = res.payload.data.access_token;
      localStorage.setItem("token", token);

      navigate("/dashboard");
    });
  };

  return (
    <div className="login-outer">
      <div className="login-main">
        <h1>Login</h1>
        <div className="login-input">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="login-input">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className=" btn login-btn" onClick={handleLogin}>
          <b>LOGIN</b>
        </button>
      </div>
    </div>
  );
}

export default Login;

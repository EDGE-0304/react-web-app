import React, { useState } from "react";
import "./Login.css";

function Login() {
  // State for username, email, and password
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Function to handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit logic
    console.log(userCredentials);
  };

  // Render the form
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Sign up</h2>
        <input
          type="text"
          name="username"
          placeholder="User Name"
          value={userCredentials.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userCredentials.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userCredentials.password}
          onChange={handleChange}
        />
        <div className="buttons">
          <button type="button" className="secondary-button">
            Log in
          </button>
          <button type="submit" className="primary-button">
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

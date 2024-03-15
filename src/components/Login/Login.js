import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useUser } from '../../UserContext'; // Adjust the import path as necessary


function Login() {
  // State for username, email, and password
  const { userCredentials, setUserCredentials } = useUser();
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const url = 'https://bugracket.nn.r.appspot.com/users/sign-up';

    const payload = {
      name: userCredentials.username,
      email: userCredentials.email,
      password: userCredentials.password,
    };

    console.log(payload);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (response.ok) {
        console.log("Successful")
        navigate('/dashboard'); // Navigate to the success page

      } else {
        throw new Error(response.body.message || 'Invalid user');
      }
    })
    .catch(error => console.error(error));

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

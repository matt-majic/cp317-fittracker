/* 
js for the sign in page, where the user enters email & password. 
There's a button that says "log in", and a button that says "back". 
*/

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./signInPage.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make an HTTP POST request to the login API
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        // If login is successful, store userId and userType in localStorage
        const { userid, userType } = data;
        localStorage.setItem("userId", userid);
        localStorage.setItem("userType", userType);

        // Redirect to the appropriate page based on the userType
        if (userType === "Trainee") {
          history.push("/trainee-profile");
        } else if (userType === "Trainer") {
          history.push("/trainer-profile");
        } else {
          history.push("/dashboard");
        }
        console.log("Login successful, userId:", userid, "userType:", userType);
      } else {
        // If login failed, show an error message
        setErrorMessage("Invalid email or password. Please try again.");
      }
    } catch (error) {
      // Handle errors during the API call
      setErrorMessage("An error occurred. Please try again later.");
      console.error("Login failed:", error);
    }
  };

  const handleBack = () => {
    history.push("/");
  };

  const handleForgotPassword = () => {
    history.push("/change-password");
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>

        <div className="forgot-password">
          <button
            type="button"
            className="forgot-password-btn"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>
        </div>

        <div className="button-group">
          <button type="button" className="back-button" onClick={handleBack}>
            Back
          </button>
          <button type="submit" className="signin-button">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;

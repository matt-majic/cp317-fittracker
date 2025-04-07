/* 
js for the sign in page, where the user enters email & password. 
There's a button that says "log in", and a button that says "back". 
*/

// By: Graeme Georges

import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // Import useHistory for navigation
import "./signInPage.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to hold the error message
  const history = useHistory(); // Initialize useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the API for login using fetch
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      const { userId, userType } = data;

      // Store userId and userType in localStorage or state as needed
      localStorage.setItem("userId", userId);
      localStorage.setItem("userType", userType);

      // Navigate to the next page after successful login
      history.push(`/dashboard`); // Update with the actual page you want to navigate to
      console.log("Login successful, userId:", userId, "userType:", userType);
    } catch (error) {
      // If there's an error (wrong credentials or server issue), show error message
      setErrorMessage("Invalid email or password. Please try again.");
      console.error("Login failed:", error);
    }
  };

  const handleBack = () => {
    history.push("/"); // Navigate to the start page
    console.log("Back button clicked");
  };

  const handleForgotPassword = () => {
    history.push("/change-password"); // Navigate to the change password page
    console.log("Forgot Password button clicked");
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>

        {/* Display error message if login fails */}
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

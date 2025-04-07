/* 
js for the sign in page, where the user enters email & password. 
There's a button that says "log in", and a button that says "back". 
*/

import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // Import useHistory for navigation
import "./signInPage.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory(); // Initialize useHistory

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log("logging in with", { email, password });
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
            onClick={handleForgotPassword} // Call the navigation function
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

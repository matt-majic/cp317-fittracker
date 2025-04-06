/* 
js for the sign in page, where the user enters email & password. 
There's a button that says "log in", and a button that says "back". 
*/

import React, { useState } from "react";
import "./signInPage.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log("logging in with", { email, password });
  };

  const handleBack = () => {
    // Handle back button logic here
    console.log("Back button clicked");
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
            types="button"
            className="forgot-password-btn"
            onClick={() => console.log("Forgot Password clicked")}
          >
            Forgot Password?
          </button>
        </div>

        <div className="button-group">
          <button type="submit" className="signin-button">
            Log In
          </button>
          <button type="button" className="back-button" onClick={handleBack}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
export default SignIn;

import React, { useState } from "react";
import "./createAccount.css";

function CreateAccount() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // sign-up logic goes here
    console.log({ fullName, email, password });
  };

  const handleBack = () => {
    // back navigation logic
    console.log("Back button clicked");
  };

  return (
    <div className="create-account-container">
      <form className="create-account-form" onSubmit={handleSignUp}>
        <h2>Create Account</h2>

        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            placeholder="Your full name"
          />
        </div>

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
            placeholder="Create a password"
          />
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Repeat your password"
          />
        </div>

        <div className="button-group">
          <button type="button" className="back-btn" onClick={handleBack}>
            Back
          </button>
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateAccount;

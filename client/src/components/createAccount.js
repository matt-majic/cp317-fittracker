// By: Graeme Georges

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./createAccount.css";

function CreateAccount() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const [firstName, lastName] = fullName.split(" ", 2); // Split full name into first and last name

    const trainee = {
      email,
      password,
      firstName: firstName || "",
      lastName: lastName || "",
      height: 0, // Default values for required fields
      weight: 0,
      gender: "Not Specified",
      age: 0,
      weightGoal: 0,
      weightGoalDuration: 0,
      interests: "",
    };

    try {
      const response = await fetch("/api/Trainee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trainee),
      });

      if (response.ok) {
        alert("Account created successfully!");
        history.push("/calorie-page"); // Redirect to the calorie tracker page
      } else {
        setErrorMessage("Failed to create account. Please try again.");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  const handleBack = () => {
    history.push("/");
  };

  return (
    <div className="create-account-container">
      <form className="create-account-form" onSubmit={handleSignUp}>
        <h2>Create Account</h2>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

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

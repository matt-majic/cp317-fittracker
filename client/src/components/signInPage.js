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
      console.log("Submitting login request with:", { email, password });

      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || "Invalid email or password. Please try again."
        );
        return;
      }

      const data = await response.json();
      console.log("Login successful:", data);

      const { userid, userType } = data;
      sessionStorage.setItem("userId", userid);
      sessionStorage.setItem("userType", userType);

      // Redirect based on userType
      if (userType === "Trainee") {
        history.push("/trainee-profile");
      } else if (userType === "Trainer") {
        history.push("/trainer-profile"); // Redirect trainers to TrainerProfilePage
      } else {
        history.push(`/dashboard/${userType.toLowerCase()}`);
      }
    } catch (error) {
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

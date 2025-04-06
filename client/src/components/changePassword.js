import React, { useState } from "react";
import "./changePassword.css";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match");
      return;
    }

    // Your change password logic here
    console.log({ currentPassword, newPassword });
  };

  const handleBack = () => {
    // Your back navigation logic
    console.log("Back button clicked");
  };

  return (
    <div className="change-password-container">
      <form className="change-password-form" onSubmit={handleChangePassword}>
        <h2>Change Password</h2>

        <div className="input-group">
          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            placeholder="Enter your current password"
          />
        </div>

        <div className="input-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            placeholder="Enter new password"
          />
        </div>

        <div className="input-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
            placeholder="Confirm new password"
          />
        </div>

        <div className="button-group">
          <button type="button" className="back-btn" onClick={handleBack}>
            Back
          </button>
          <button type="submit" className="change-btn">
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;

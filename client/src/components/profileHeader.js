// By: Graeme Georges

import React from "react";
import { useState } from "react";
import userImage from "../SVG-images/User.svg";
import { useHistory } from "react-router-dom";

function ProfileHeader({
  name,
  profileImage,
  showBack = false,
  showLogout = false,
}) {
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <div className="profile-header">
      <div className="profile-header-left">
        {showBack && (
          <button className="header-btn" onClick={handleBack}>
            ← Back
          </button>
        )}
      </div>

      <div className="profile-header-center">
        <img
          src={profileImage}
          alt="Profile"
          className="header-profile-image"
        />
        <span className="header-profile-name">{name}</span>
      </div>

      <div className="profile-header-right">
        {showLogout && (
          <button className="header-btn logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileHeader;

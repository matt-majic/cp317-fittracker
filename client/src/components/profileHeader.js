import React from "react";
import { useState } from "react";
import userImage from "../SVG-images/User.svg";

function ProfileHeader() {
  return (
    <div>
      <div className="profile-header">
        <div className="profile-left">
          <h2>
            Madison <span className="gender"></span>
          </h2>
          <p>Age: 28</p>
          <div className="metrics">
            <span>75 kg</span>
            <span>175 cm</span>
          </div>
        </div>
        <img src={userImage} alt="User" className="profile-avatar" />
      </div>
    </div>
  );
}

export default ProfileHeader;

/*
the trainee can edit their existing profile here.
*/

// By: Graeme Georges

import React, { useState } from "react";
import "./traineeManageProfile.css";

function traineeManageProfile() {
  const [user, setUser] = useState({
    name: "Graeme Georges",
    email: "graeme@example.com",
    birthday: "1995-06-15",
    weight: "75kg",
    height: "180cm",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., update user data)
    console.log("Updated user info:", user);
    alert("Profile updated successfully!");
  };

  return (
    <div className="edit-profile-container">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Birthday</label>
          <input
            type="date"
            name="birthday"
            value={user.birthday}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Weight</label>
          <input
            type="text"
            name="weight"
            value={user.weight}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Height</label>
          <input
            type="text"
            name="height"
            value={user.height}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default traineeManageProfile;

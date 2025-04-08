import React, { useState } from "react";
import "./traineeManageProfile.css";

function traineeManageProfile() {
  const [user, setUser] = useState({
    id: sessionStorage.getItem("userId"), // Retrieve user ID from session storage
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/Trainee/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred. Please try again later.");
    }
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

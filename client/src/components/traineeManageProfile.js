import React, { useState, useEffect } from "react";
import "./traineeManageProfile.css";

function TraineeManageProfile() {
  const [user, setUser] = useState({
    id: sessionStorage.getItem("userId"), // Retrieve user ID from session storage
    firstName: "",
    lastName: "",
    email: "",
    height: "",
    weight: "",
    gender: "",
    age: "",
    weightGoal: "",
    weightGoalDuration: "",
    interests: "",
  });

  // Fetch trainee data from the backend when the component loads
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/Trainee/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setUser({
            ...user,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            height: data.height,
            weight: data.weight,
            gender: data.gender,
            age: data.age,
            weightGoal: data.weightGoal,
            weightGoalDuration: data.weightGoalDuration,
            interests: data.interests,
          });
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user.id]);

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
        body: JSON.stringify(user), // Send updated user data
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
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
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
          <label>Height</label>
          <input
            type="text"
            name="height"
            value={user.height}
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
          <label>Gender</label>
          <input
            type="text"
            name="gender"
            value={user.gender}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={user.age}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Weight Goal</label>
          <input
            type="text"
            name="weightGoal"
            value={user.weightGoal}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Weight Goal Duration</label>
          <input
            type="text"
            name="weightGoalDuration"
            value={user.weightGoalDuration}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Interests</label>
          <input
            type="text"
            name="interests"
            value={user.interests}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="submit-button">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default TraineeManageProfile;

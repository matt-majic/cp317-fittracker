import React, { useState, useEffect } from "react";
import "./traineeManageProfile.css";

function TraineeManageProfile() {
  const [user, setUser] = useState({
    id: sessionStorage.getItem("userId"), // Retrieve user ID from session storage
    name: "",
    email: "",
    birthday: "",
    weight: "",
    height: "",
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
            name: `${data.firstName} ${data.lastName}`, // Combine first and last name
            email: data.email,
            birthday: data.birthday || "", // Ensure birthday is handled
            weight: data.weight,
            height: data.height,
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
        body: JSON.stringify({
          firstName: user.name.split(" ")[0], // Extract first name
          lastName: user.name.split(" ")[1] || "", // Extract last name
          email: user.email,
          birthday: user.birthday,
          weight: user.weight,
          height: user.height,
        }),
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

export default TraineeManageProfile;

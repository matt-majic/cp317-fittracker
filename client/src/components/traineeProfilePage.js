import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; // Import useHistory
import "./traineeProfilePage.css";

function TraineeProfilePage() {
  const history = useHistory(); // Initialize useHistory
  const [user, setUser] = useState(null); // State to store user data
  const userId = sessionStorage.getItem("userId"); // Retrieve user ID from session storage

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/Trainee/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data); // Set user data in state
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleNavigation = (action) => {
    switch (action) {
      case "profile":
        history.push("/manage-trainee-profile"); // Navigate to Trainee Manage Profile
        break;
      case "settings":
        console.log("Settings clicked");
        break;
      case "payment":
        console.log("Payment clicked");
        break;
      case "favourite":
        console.log("Favourite clicked");
        break;
      case "help":
        console.log("Help clicked");
        break;
      case "logout":
        localStorage.clear();
        window.location.href = "/";
        break;
      default:
        break;
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src={user.profileImage || "https://via.placeholder.com/150"}
          alt="Profile"
          className="profile-image"
        />
        <h2 className="profile-name">
          {user.firstName} {user.lastName}
        </h2>
        <p className="profile-email">{user.email}</p>
        <p className="profile-type">{user.userType}</p>

        <div className="profile-description">
          <p>
            <strong>Height:</strong> {user.height}
          </p>
          <p>
            <strong>Weight:</strong> {user.weight}
          </p>
          <p>
            <strong>Gender:</strong> {user.gender}
          </p>
          <p>
            <strong>Age:</strong> {user.age}
          </p>
        </div>

        <div className="button-list">
          <button onClick={() => handleNavigation("profile")}>
            👤 EditProfile
          </button>
          <button onClick={() => handleNavigation("settings")}>
            ⚙️ Settings
          </button>
          <button onClick={() => handleNavigation("payment")}>
            💳 Payment
          </button>
          <button onClick={() => handleNavigation("favourite")}>
            ⭐ Favourite
          </button>
          <button onClick={() => handleNavigation("help")}>❓ Help</button>
          <button
            className="logout-button"
            onClick={() => handleNavigation("logout")}
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default TraineeProfilePage;

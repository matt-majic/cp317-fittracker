// By: Graeme Georges

import React from "react";
import "./traineeProfilePage.css";

function traineeProfilePage() {
  const user = {
    name: "Graeme Georges",
    email: "graeme@example.com",
    userType: "Premium Member",
    profileImage: "https://via.placeholder.com/150",
    weight: "75kg",
    age: 28,
    height: "180cm",
  };

  const handleNavigation = (action) => {
    switch (action) {
      case "profile":
        console.log("Profile clicked");
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

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={user.profileImage} alt="Profile" className="profile-image" />
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-email">{user.email}</p>
        <p className="profile-type">{user.userType}</p>

        <div className="profile-description">
          <p>
            <strong>Weight:</strong> {user.weight}
          </p>
          <p>
            <strong>Age:</strong> {user.age}
          </p>
          <p>
            <strong>Height:</strong> {user.height}
          </p>
        </div>

        <div className="button-list">
          <button onClick={() => handleNavigation("profile")}>
            👤 Edit Profile
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

export default traineeProfilePage;

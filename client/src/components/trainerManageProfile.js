import React from "react";
import "./trainerProfilePage.css";

function TrainerManageProfile() {
  const trainer = {
    name: "Jordan Smith",
    email: "jordan.smith@fitapp.com",
    userType: "Certified Trainer",
    profileImage: "https://via.placeholder.com/150",
    specialization: "Strength & Conditioning",
    clients: 24,
    sessions: 150,
  };

  const handleNavigation = (action) => {
    switch (action) {
      case "profile":
        console.log("Edit Profile clicked");
        break;
      case "financials":
        console.log("View Financials clicked");
        break;
      case "messages":
        console.log("Messages clicked");
        break;
      case "schedule":
        console.log("Schedule clicked");
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
        <img
          src={trainer.profileImage}
          alt="Trainer"
          className="profile-image"
        />
        <h2 className="profile-name">{trainer.name}</h2>
        <p className="profile-email">{trainer.email}</p>
        <p className="profile-type">{trainer.userType}</p>

        <div className="profile-description">
          <p>
            <strong>Specialization:</strong> {trainer.specialization}
          </p>
          <p>
            <strong>Clients:</strong> {trainer.clients}
          </p>
          <p>
            <strong>Sessions:</strong> {trainer.sessions}+
          </p>
        </div>

        <div className="button-list">
          <button onClick={() => handleNavigation("profile")}>
            👤 Edit Profile
          </button>
          <button onClick={() => handleNavigation("financials")}>
            💰 View Financials
          </button>
          <button onClick={() => handleNavigation("messages")}>
            💬 Messages
          </button>
          <button onClick={() => handleNavigation("schedule")}>
            📅 Schedule
          </button>
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

export default TrainerManageProfile;

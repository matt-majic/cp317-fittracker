import React from "react";
import "./traineeSessions.css";

function TraineeSessions() {
  // Sample data – you'd typically fetch this from an API
  const activeSessions = [
    {
      id: 1,
      trainer: "Jordan Smith",
      type: "Strength Training",
      date: "2025-04-10",
      time: "10:00 AM",
    },
    {
      id: 2,
      trainer: "Amanda Lee",
      type: "HIIT",
      date: "2025-04-12",
      time: "2:00 PM",
    },
    {
      id: 3,
      trainer: "Chris Nolan",
      type: "Yoga",
      date: "2025-04-14",
      time: "7:00 AM",
    },
  ];

  return (
    <div className="sessions-container">
      <h2>My Active Sessions</h2>
      <div className="session-list">
        {activeSessions.map((session) => (
          <div key={session.id} className="session-card">
            <div className="session-title">{session.type}</div>
            <div className="session-details">
              <p><strong>Trainer:</strong> {session.trainer}</p>
              <p><strong>Date:</strong> {session.date}</p>
              <p><strong>Time:</strong> {session.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TraineeSessions;

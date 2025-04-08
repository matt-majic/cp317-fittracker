/*
this is a page where the trainer can make a session that 
they’ve uploaded show up as active (with a button that switches on/off).
*/

// By: Carter LaFosse

import React, { useState, useEffect } from "react";
import "./trainerSessionPage.css";

function TrainerSessionPage() {
  const [sessions, setSessions] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch(`/api/Trainer/${userId}/Sessions`);
        const data = await res.json();
        setSessions(data);
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
      }
    };

    fetchSessions();
  }, [userId]);

  const toggleSession = async (sessionId, isActive) => {
    try {
      const response = await fetch("/api/ServicesController/ActiveSessions", {
        method: isActive ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });

      if (response.ok) {
        setSessions((prev) =>
          prev.map((s) =>
            s.id === sessionId ? { ...s, isActive: !isActive } : s
          )
        );
      }
    } catch (error) {
      console.error("Error toggling session status:", error);
    }
  };

  return (
    <div className="trainer-sessions-container">
      <h2>Your Sessions</h2>
      {sessions.map((session) => (
        <div key={session.id} className="session-card">
          <div>
            <h3>{session.name}</h3>
            <p>{session.description}</p>
            <p>Date: {new Date(session.date).toLocaleDateString()}</p>
          </div>
          <button
            className={`toggle-btn ${session.isActive ? "active" : ""}`}
            onClick={() => toggleSession(session.id, session.isActive)}
          >
            {session.isActive ? "Set Inactive" : "Set Active"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default TrainerSessionPage;
/*
js for the page where a trainee can look at the list of their workouts. 
Has all the workouts they're subscribed to listed, and a back button in the top left corner. 
*/

// script.js

//by Ashrey

// ViewTraineeWorkouts.jsx
// Page for the trainee to view all workouts they are subscribed to

import React, { useState, useEffect } from "react";
import "./viewTraineeWorkouts.css";

function ViewTraineeWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch subscribed workouts from backend (mocked here)
    const fetchWorkouts = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const res = await fetch(`/api/Trainee/${userId}/Workouts`);
        const data = await res.json();

        setWorkouts(data || []);
      } catch (err) {
        console.error("Error fetching workouts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="workout-list-container">
      <button className="back-button" onClick={handleBack}>
        ← Back
      </button>

      <div className="workout-list">
        <h2>Your Subscribed Workouts</h2>

        {loading ? (
          <p>Loading workouts...</p>
        ) : workouts.length === 0 ? (
          <p className="no-workouts">You haven't subscribed to any workouts yet.</p>
        ) : (
          workouts.map((workout, index) => (
            <div key={index} className="workout-item">
              <span className="title">{workout.title}</span>
              <span className="link">
                <a href={workout.link} target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ViewTraineeWorkouts;

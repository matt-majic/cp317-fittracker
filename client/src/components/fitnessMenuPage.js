/*
js file for the workout plans & sessions page. It has 5 options:
Explore Sessions, My Sessions, Explore Workout Plans, My Workout Plans, and Explore Trainers. 
Pressing one of these options would lead to the corresponding page. 
*/

import React from "react";
import "./fitnessMenuPage.css";
import { useHistory } from "react-router-dom";

export default function FitnessMenuPage() {
  const history = useHistory();
  const routeChange = (path) => {
    history.push(path);
  };

  return (
    <main className="fitness-menu-container">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1em",
          width: "100%",
        }}
      >
        <button
          className="fitness-menu-btn"
          style={{ background: "wheat" }}
          onClick={() => routeChange("explore-sessions")}
        >
          Explore Sessions
        </button>
        <button
          className="fitness-menu-btn"
          style={{ background: "wheat" }}
          onClick={() => routeChange("my-sessions")}
        >
          My Sessions
        </button>
        <button
          className="fitness-menu-btn"
          style={{ background: "wheat" }}
          onClick={() => routeChange("explore-plans")}
        >
          Explore Workout Plans
        </button>
        <button
          className="fitness-menu-btn"
          style={{ background: "wheat" }}
          onClick={() => routeChange("my-plans")}
        >
          My Workout Plans
        </button>
        <button
          className="fitness-menu-btn"
          style={{ background: "wheat" }}
          onClick={() => routeChange("explore-trainers")}
        >
          Explore Trainers
        </button>
      </div>
    </main>
  );
}
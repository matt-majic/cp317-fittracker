/*
The trainer enters their weight gain/loss/maintain/(no goal) goal (select one),
as well as the types of workouts they're interested in (multi-select). 
*/

import React, { useState } from "react";
import "./traineeSetupInformation2.css";

function TraineeSetupInformation2() {
  const [goal, setGoal] = useState("");
  const [interests, setInterests] = useState([]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setInterests([...interests, value]);
    } else {
      setInterests(interests.filter((item) => item !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Goal:", goal);
    console.log("Workout Interests:", interests);
  };

  return (
    <div className="setup-container">
      <form className="setup-form" onSubmit={handleSubmit}>
        <h2>Fitness Goals</h2>

        <label>Goal</label>
        <select value={goal} onChange={(e) => setGoal(e.target.value)} required>
          <option value="">Select Goal</option>
          <option value="Gain Weight">Gain Weight</option>
          <option value="Lose Weight">Lose Weight</option>
          <option value="Maintain Weight">Maintain Weight</option>
          <option value="No Goal">No Goal</option>
        </select>

        <label>Workout Interests</label>
        <div className="checkbox-group">
          {[
            "Cardio",
            "Strength Training",
            "Yoga",
            "HIIT",
            "Flexibility",
            "Sports",
          ].map((type) => (
            <label key={type}>
              <input
                type="checkbox"
                value={type}
                checked={interests.includes(type)}
                onChange={handleCheckboxChange}
              />
              {type}
            </label>
          ))}
        </div>

        <button type="submit">Finish</button>
      </form>
    </div>
  );
}

export default TraineeSetupInformation2;

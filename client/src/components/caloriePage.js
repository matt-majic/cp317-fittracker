/*
This is the js for the page for the calorie tracker, which shows 
a the daily breakdowns of calories in and calories out,
diplayed against the weight goal. 
*/

// By: Graeme Georges

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./caloriePage.css";

function CaloriePage() {
  const [calorieData, setCalorieData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const userId = sessionStorage.getItem("userId");
  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchCalorieData = async () => {
      try {
        if (!userId) {
          setErrorMessage("User not logged in. Redirecting to sign-in...");
          history.push("/signin");
          return;
        }

        const response = await fetch(
          `/api/CalorieTracker/${userId}/${currentDate}`
        );
        if (!response.ok) {
          setErrorMessage("No calorie data found for today.");
          return;
        }

        const data = await response.json();
        setCalorieData(data);
      } catch (error) {
        console.error("Error fetching calorie data:", error);
        setErrorMessage("Failed to load calorie data.");
      }
    };

    fetchCalorieData();
  }, [userId, currentDate, history]);

  if (!calorieData) {
    return (
      <div className="loading-message">
        {errorMessage ? <span>{errorMessage}</span> : <span>Loading...</span>}
      </div>
    );
  }

  const { calorieIn, calorieOut, calorieGoal } = calorieData;

  return (
    <div className="calorie-container">
      <h1>Calorie Tracker</h1>

      <div className="calorie-list">
        <div className="calorie-item">
          <span className="food-name">Calories In</span>
          <span className="food-calories">{calorieIn} kcal</span>
        </div>
        <div className="calorie-item">
          <span className="food-name">Calories Out</span>
          <span className="food-calories">{calorieOut} kcal</span>
        </div>
        <div className="calorie-item">
          <span className="food-name">Calorie Goal</span>
          <span className="food-calories">{calorieGoal} kcal</span>
        </div>
      </div>

      <div className="calorie-total">
        <strong>Total Calories Consumed:</strong> {calorieIn} kcal
      </div>

      <div className="calorie-goal-status">
        <strong>Goal:</strong> {calorieGoal} kcal
        <div>
          {calorieIn > calorieGoal
            ? "You've exceeded your goal!"
            : "You're within your goal!"}
        </div>
      </div>
    </div>
  );
}

export default CaloriePage;

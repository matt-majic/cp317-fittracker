/*
This is the js for the page for the calorie tracker, which shows 
a the daily breakdowns of calories in and calories out,
diplayed against the weight goal. 
*/

// By: Graeme Georges

import React, { useState } from "react";
import "./caloriePage.css";

function CaloriePage() {
  const [foods, setFoods] = useState([
    { name: "Banana", calories: 105 },
    { name: "Grilled Chicken Breast", calories: 165 },
    { name: "Rice (1 cup)", calories: 200 },
    { name: "Almonds (10)", calories: 70 },
  ]);

  const totalCalories = foods.reduce((sum, food) => sum + food.calories, 0);

  return (
    <div className="calorie-container">
      <h1>Calorie Tracker</h1>

      <div className="calorie-list">
        {foods.map((food, index) => (
          <div className="calorie-item" key={index}>
            <span className="food-name">{food.name}</span>
            <span className="food-calories">{food.calories} kcal</span>
          </div>
        ))}
      </div>

      <div className="calorie-total">
        <strong>Total Calories:</strong> {totalCalories} kcal
      </div>
    </div>
  );
}

export default CaloriePage;

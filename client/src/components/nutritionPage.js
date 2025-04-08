/*
This is the js for the page for the nutrition tracker, which shows 
the foods and drinks that were listed for that day. 
*/

// By: Carter LaFosse

import React, { useEffect, useState } from "react";
import "./nutritionPage.css";

function NutritionPage() {
  const [foodLog, setFoodLog] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchFoodLog = async () => {
      try {
        const res = await fetch(`/api/Nutrition/FoodLog/${userId}`);
        const data = await res.json();
        setFoodLog(data);
      } catch (err) {
        console.error("Failed to fetch food log", err);
      }
    };

    const fetchTotalCalories = async () => {
      try {
        const res = await fetch(`/api/Nutrition/TotalCalories/${userId}`);
        const data = await res.json();
        setTotalCalories(data[0]?.totalCalories || 0);
      } catch (err) {
        console.error("Failed to fetch total calories", err);
      }
    };

    if (userId) {
      fetchFoodLog();
      fetchTotalCalories();
    }
  }, [userId]);

  return (
    <div className="nutrition-page-container">
      <h2 className="nutrition-title">Nutrition Tracker</h2>
      <div className="calorie-summary">Total Calories: {totalCalories}</div>
      <div className="food-log-list">
        {foodLog.length === 0 ? (
          <p className="no-food">No food logged for today.</p>
        ) : (
          foodLog.map((item, index) => (
            <div key={index} className="food-card">
              <div className="food-name">{item.foodName}</div>
              <div className="food-details">
                {item.quantity}x — {item.calories} cal each
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NutritionPage;
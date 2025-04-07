// By: Graeme Georges

import React from "react";
import "./FoodLog.css";

function FoodLog() {
  const entries = [
    { name: "Chicken Breast", kcal: 330, date: "June 09", info: "2 Serving" },
    { name: "Blueberries", kcal: 85, date: "April 15", info: "1 Serving" },
  ];

  return (
    <div className="food-log">
      <h3>Foods & Drinks</h3>
      {entries.map((entry, i) => (
        <div className="food-card" key={i}>
          <div>
            <p>🔥 {entry.kcal} Kcal</p>
            <h4>{entry.name}</h4>
            <p>{entry.date}</p>
          </div>
          <div className="info">{entry.info}</div>
        </div>
      ))}
    </div>
  );
}

export default FoodLog;

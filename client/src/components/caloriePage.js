/*
This is the js for the page for the calorie tracker, which shows 
a the daily breakdowns of calories in and calories out,
diplayed against the weight goal. 
*/

import React from "react";
import ProfileHeader from "./profileHeader";
import ToggleTabs from "./toggleTabs";
import Calendar from "./calendarSection";
// import FoodLog from "./FoodLog";
// import BottomNav from "./BottomNav";
import "./caloriePage.css"; // or Tailwind

function CaloriePage() {
  return (
    <div className="app-container">
      <ProfileHeader />
      <ToggleTabs />
      <Calendar />
    </div>
  );
}

export default CaloriePage;

import React from "react";
import "./calendarSection.css";

function CalendarSection() {
  return (
    <div className="calendar-section">
      <div className="calendar-header">
        <p>Choose Date</p>
        <select>
          <option>Month</option>
        </select>
      </div>
      <div className="days-row">
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="calendar-grid">
        {[...Array(31).keys()].map((day) => (
          <div key={day} className={day + 1 === 9 ? "active" : ""}>
            {day + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarSection;

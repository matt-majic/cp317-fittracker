import React, { useState } from "react";
import "./toggleTabs.css";

function ToggleTabs() {
  const [active, setActive] = useState("log");

  return (
    <div className="toggle-tabs">
      <button
        className={active === "log" ? "active" : ""}
        onClick={() => setActive("log")}
      >
        Calorie Log
      </button>
      <button
        className={active === "charts" ? "active" : ""}
        onClick={() => setActive("charts")}
      >
        Charts
      </button>
    </div>
  );
}

export default ToggleTabs;

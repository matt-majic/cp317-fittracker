/* 
js for the first page of the app. It shows the app logo, as well as two
buttons: one says "Sign In" and the other says "Sign Up". 
*/

"use client";
import React from "react";
import "./startPage.css"; // not using styles from modules

function StartPage() {
  return (
    <main className="start-page-container">
      <h2 className="logo">FITTracker</h2>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8e8d20912f4e1f3b5c8855fb0b71c77626ae65c9"
        alt="FITTracker Logo"
        className="logo"
      />
      {/* You can add your buttons here if needed */}
    </main>
  );
}

export default StartPage;

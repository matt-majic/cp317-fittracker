"use client";
import * as React from "react";
import styles from "./startPage.module.css";

console.log("Styles object in startPage.js", styles);

function StartPage() {
  return (
    <main className={styles.div}>
      <h2>Test</h2>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8e8d20912f4e1f3b5c8855fb0b71c77626ae65c9"
        alt="FITTracker"
        className={styles.logo}
      />
    </main>
  );
}

export default StartPage;

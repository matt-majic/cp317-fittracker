"use client";
import * as React from "react";
import styles from "./InputDesign.module.css";

function InputDesign() {
  return (
    <section className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        <div className={styles.glassBackground} />
        <div className={styles.borderOverlay} />
      </div>
    </section>
  );
}

export default InputDesign;

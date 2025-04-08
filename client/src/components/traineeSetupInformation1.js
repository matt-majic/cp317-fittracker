/*
The trainer enters their sex, height, and weight. 
*/

import React, { useState } from "react";
import "./traineeSetupInformation1.css";

function TraineeSetupInformation1() {
  const [formData, setFormData] = useState({ sex: "", height: "", weight: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <div className="setup-container">
      <form className="setup-form" onSubmit={handleSubmit}>
        <h2>Basic Information</h2>

        <label>Sex</label>
        <select
          name="sex"
          value={formData.sex}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Height (cm)</label>
        <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleChange}
          required
        />

        <label>Weight (kg)</label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          required
        />

        <button type="submit">Next</button>
      </form>
    </div>
  );
}

export default TraineeSetupInformation1;

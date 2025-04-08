/*
where the trainer enters their qualifications & experience when making the account. 
*/

import React, { useState } from "react";
import "./trainerSetupInformation.css";

function TrainerSetupInformation() {
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

        <label>Qualifications (cm)</label>
        <input
          type="string"
          name="qualifications"
          value={formData.qualifications}
          onChange={handleChange}
          required
        />

        <label>Experience (kg)</label>
        <input
          type="string"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
        />

        <button type="submit">Next</button>
      </form>
    </div>
  );
}

export default TrainerSetupInformation;

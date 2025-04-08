/*
where the trainer can edit their banking information. 
*/

// By: Carter LaFosse

import React, { useState, useEffect } from "react";
import "./editTrainerFinancials.css";

function EditTrainerFinancials() {
  const [bankingInfo, setBankingInfo] = useState("");

  useEffect(() => {
    // Fetch current banking info for the trainer
    const fetchBankingInfo = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const res = await fetch(`/api/Trainer/${userId}/BankingInfo`);
        const data = await res.json();
        if (data && data[0]) {
          setBankingInfo(data[0].bankingInfo || "");
        }
      } catch (err) {
        console.error("Error fetching banking info:", err);
      }
    };

    fetchBankingInfo();
  }, []);

  const handleChange = (e) => {
    setBankingInfo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const res = await fetch(`/api/Trainer/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bankingInfo }),
      });

      if (!res.ok) throw new Error("Update failed");
      alert("Banking information updated successfully!");
    } catch (err) {
      console.error("Error updating banking info:", err);
      alert("Failed to update banking information.");
    }
  };

  return (
    <div className="edit-financials-container">
      <h1>Edit Banking Info</h1>
      <form onSubmit={handleSubmit} className="edit-financials-form">
        <div className="form-group">
          <label>Banking Info</label>
          <input
            type="text"
            value={bankingInfo}
            onChange={handleChange}
            placeholder="e.g. TD Bank - 123456789"
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Save Banking Info
        </button>
      </form>
    </div>
  );
}

export default EditTrainerFinancials;
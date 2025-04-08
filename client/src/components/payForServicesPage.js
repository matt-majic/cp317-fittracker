/*
where the trainee pays for a service (a workout plan or a session)

by Amelia
*/

import React, { useState, useEffect } from "react";
import "./payForServicesPage.css";

function payForServices() {
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    // Fetch current payment info for the trainee
    const getPaymentMethod = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const res = await fetch(`/api/Trainee/${userId}/PaymentMethod`);
        const data = await res.json();
        if (data && data[0]) {
          setPaymentMethod(data[0].paymentMethod || "");
        }
      } catch (err) {
        console.error("Error fetching payment method:", err);
      }
    };

    getPaymentMethod();
  }, []);

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const res = await fetch(`/api/Trainee/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethod }),
      });

      if (!res.ok) throw new Error("Update failed");
      alert("Payment method updated successfully!");
    } catch (err) {
      console.error("Error updating payment method:", err);
      alert("Failed to update payment method.");
    }
  };

  return (
    <div className="pay-for-services-container">
      <h1>Pay For Services</h1>
      <form onSubmit={handleSubmit} className="pay-for-services-form">
        <div className="form-group">
          <label>Payment Method</label>
          <input
            type="text"
            value={paymentMethod}
            onChange={handleChange}
            placeholder="e.g. VISA - 123456789"
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Make Purchase
        </button>
      </form>
    </div>
  );
}

export default payForServices;

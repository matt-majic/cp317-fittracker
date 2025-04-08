/*
page for the information about the trainer’s payments received and banking information 
(the banking information and payments received history will be on the same page). 
*/

// By: Carter LaFosse

import React, { useState, useEffect } from "react";
import "./viewTrainerFinancials.css";

function ViewTrainerFinancials() {
  const [bankingInfo, setBankingInfo] = useState({
    bankingInfo: "N/A",
  });

  const [paymentHistory, setPaymentHistory] = useState([
    // Mock payment data; replace with real API call later if needed
    { date: "2025-04-01", amount: "$250.00", method: "Direct Deposit" },
    { date: "2025-03-15", amount: "$180.00", method: "E-Transfer" },
  ]);

  useEffect(() => {
    // Fetch trainer banking info from backend
    const fetchBankingInfo = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const res = await fetch(`/api/Trainer/${userId}/BankingInfo`);
        const data = await res.json();
        if (data && data[0]) {
          setBankingInfo(data[0]);
        }
      } catch (err) {
        console.error("Error fetching banking info:", err);
      }
    };

    fetchBankingInfo();
  }, []);

  return (
    <div className="financials-container">
      <h1>Trainer Financials</h1>

      <section className="banking-info">
        <h2>Banking Information</h2>
        <p>
          <strong>Banking Details:</strong>{" "}
          {bankingInfo.bankingInfo || "Not Available"}
        </p>
      </section>

      <section className="payment-history">
        <h2>Payments Received</h2>
        <ul>
          {paymentHistory.map((payment, index) => (
            <li key={index} className="payment-item">
              {payment.date} – {payment.amount} via {payment.method}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default ViewTrainerFinancials;
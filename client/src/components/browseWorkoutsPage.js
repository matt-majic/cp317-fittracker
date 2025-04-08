import React from "react";
import "./browseWorkoutsPage.css";

function BrowseWorkoutsPage() {
  // Sample workout data
  const workouts = [
    {
      id: 1,
      title: "Full Body Burn",
      description: "High-intensity circuit training to tone and build endurance.",
      price: "$20",
    },
    {
      id: 2,
      title: "Powerlifting 101",
      description: "A strength-focused program with squats, deadlifts, and bench press.",
      price: "$25",
    },
    {
      id: 3,
      title: "Yoga Flow",
      description: "Relax, stretch, and strengthen your body with guided yoga.",
      price: "$15",
    },
    {
      id: 4,
      title: "Cardio Shred",
      description: "Burn calories fast with this fat-blasting HIIT routine.",
      price: "$18",
    },
  ];

  const handlePurchase = (title) => {
    console.log(`Workout purchased: ${title}`);
    // Redirect to payment or confirmation page here if needed
  };

  return (
    <div className="workouts-container">
      <h2>Browse Workouts</h2>
      <div className="workout-grid">
        {workouts.map((workout) => (
          <div className="workout-card" key={workout.id}>
            <div className="workout-title">{workout.title}</div>
            <div className="workout-description">{workout.description}</div>
            <div className="workout-price">{workout.price}</div>
            <button
              className="buy-button"
              onClick={() => handlePurchase(workout.title)}
            >
              🛒 Purchase Workout
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrowseWorkoutsPage;

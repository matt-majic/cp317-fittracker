/*
js for the page where a trainee can look at the list of their workouts. 
Has all the workouts they're subscribed to listed, and a back button in the top left corner. 
*/

// script.js

//by Ashrey

document.addEventListener("DOMContentLoaded", () => {
  const workouts = [
    { title: "Full Body HIIT", link: "https://example.com/hiit" },
    { title: "Core Strengthening", link: "https://example.com/core" },
    { title: "Mobility Flow", link: "https://example.com/mobility" }
  ];

  const workoutContainer = document.getElementById("workout-items");
  const noWorkoutsMsg = document.getElementById("noWorkoutsMsg");

  function renderWorkouts(list) {
    workoutContainer.innerHTML = "";

    if (list.length === 0) {
      noWorkoutsMsg.style.display = "block";
      return;
    }

    noWorkoutsMsg.style.display = "none";

    list.forEach(workout => {
      const div = document.createElement("div");
      div.className = "workout-item";
      div.innerHTML = `
        <span class="title">${workout.title}</span>
        <span class="link"><a href="${workout.link}" target="_blank">View</a></span>
      `;
      workoutContainer.appendChild(div);
    });
  }

  renderWorkouts(workouts);

  document.getElementById("backBtn").addEventListener("click", () => {
    window.history.back(); // Takes user to previous page
  });
});

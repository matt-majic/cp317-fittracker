/*
the trainer enters the description of the workout plan and the link. It has an upload button. 
*/
// script.js

// by Ashrey

document.addEventListener("DOMContentLoaded", () => {
  const uploadBtn = document.querySelector(".upload-btn");
  const cancelBtn = document.querySelector(".cancel-btn");

  uploadBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Workout plan submitted successfully!");
    // Add form validation and submission logic here
  });

  cancelBtn.addEventListener("click", () => {
    const confirmCancel = confirm("Are you sure you want to discard your changes?");
    if (confirmCancel) {
      window.location.href = "/trainer-dashboard"; // Adjust this URL as needed
    }
  });
});

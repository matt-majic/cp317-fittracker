/*
the trainer enters the description of the session plan, the expected day & 
time the session will be active, and the link. It has an upload button. 
*/
// script.js

//by Ashrey

document.addEventListener("DOMContentLoaded", () => {
  const uploadBtn = document.querySelector(".upload-btn");
  const cancelBtn = document.querySelector(".cancel-btn");

  uploadBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Session plan uploaded successfully!");
    // Add form validation or data submission here
  });

  cancelBtn.addEventListener("click", () => {
    const confirmCancel = confirm("Are you sure you want to discard this session?");
    if (confirmCancel) {
      window.location.href = "/trainer-sessions"; // Adjust this redirect path as needed
    }
  });
});

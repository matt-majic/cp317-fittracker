/*
where the trainee can edit their payment information (like credit card information and such). 
*/
// script.js

//by Ashrey

document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.querySelector(".save-btn");
  const cancelBtn = document.querySelector(".cancel-btn");

  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Your payment information has been saved!");
    // Replace this with your form submission logic (e.g., API call)
  });

  cancelBtn.addEventListener("click", () => {
    const confirmCancel = confirm("Discard changes and go back?");
    if (confirmCancel) {
      window.location.href = "/payments"; // Redirect to previous page or dashboard
    }
  });
});

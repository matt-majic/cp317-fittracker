/*
 page for the information about the trainee’s payments and credit card information. 
*/
// script.js

//by Ashrey

document.addEventListener("DOMContentLoaded", () => {
  const updateBtn = document.querySelector(".update-btn");
  const cancelBtn = document.querySelector(".cancel-btn");

  updateBtn.addEventListener("click", () => {
    alert("Credit card info updated!");
    // In a real app, you'd submit a form or make an API call here
  });

  cancelBtn.addEventListener("click", () => {
    const confirmCancel = confirm("Are you sure you want to cancel?");
    if (confirmCancel) {
      window.location.href = "/dashboard"; // Replace with your desired redirect
    }
  });
});

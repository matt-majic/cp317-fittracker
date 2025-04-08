/*
This is the js for the page for the nutrition tracker, which shows 
the foods and drinks that were listed for that day. 
*/

// script.js

// by Ashrey 

document.addEventListener("DOMContentLoaded", () => {
  const foods = [
    { name: "Grilled Chicken Salad", calories: "350 kcal" },
    { name: "Greek Yogurt", calories: "150 kcal" }
  ];

  const drinks = [
    { name: "Green Tea", calories: "0 kcal" },
    { name: "Protein Shake", calories: "180 kcal" }
  ];

  function renderList(listId, items, emptyMsgId) {
    const listContainer = document.getElementById(listId);
    const emptyMessage = document.getElementById(emptyMsgId);

    listContainer.innerHTML = ""; // Clear previous items

    if (items.length === 0) {
      emptyMessage.style.display = "block";
      return;
    }

    emptyMessage.style.display = "none";

    items.forEach(item => {
      const div = document.createElement("div");
      div.className = "tracked-item";
      div.innerHTML = `
        <span class="name">${item.name}</span>
        <span class="calories">${item.calories}</span>
      `;
      listContainer.appendChild(div);
    });
  }

  renderList("foods-list", foods, "no-foods-msg");
  renderList("drinks-list", drinks, "no-drinks-msg");
});

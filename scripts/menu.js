$(document).ready(function() {
  fetch("../menu_categories.json")
    .then((response) => response.json())
    .then((categories) => {
      for (let category of categories) {
        console.log(category.categoryName);
        addCategory(category);
      }
    })
});

function addCategory(category) {
  console.log(category.categoryName);
  $("#categories").append(`<tr><td>${category.categoryName}</td></tr>`);
}
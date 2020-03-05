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
  var categoryImg = $(`<div><img src="${category.imageURL}" alt="${category.imageAlt}" height="42" width="42"></div>`);
  var categoryBtn = $(`<div><button class="categoryBtn">${category.categoryName}</button></div>`);
  var row = $("<tr></tr>");
  var content = $("<div></div>").append(categoryImg, categoryBtn);
  row.append($("<td></td>").append(content));
  $("#categories").append(row);
}
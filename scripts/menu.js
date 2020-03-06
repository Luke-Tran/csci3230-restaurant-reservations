$(document).ready(function() {
  fetch("../menu_categories.json")
    .then((response) => response.json())
    .then((categories) => {
      for (let category of categories) {
        addCategory(category);
      }
    })
});

/*
 * Is fed json data and generates a 3-column grid from it
 */
function addCategory(category) {
  var categoryImg = $(`<div><img src="${category.imageURL}" alt="${category.imageAlt}" height="42" width="42"></div>`);
  var categoryBtn = $(`<div><button class="categoryBtn">${category.categoryName}</button></div>`);
  var content = $("<div></div>").append(categoryImg, categoryBtn);
  var tableRows = $("#categories").find("tbody").children()

  var lastRow = tableRows.last();
  if (lastRow.children().length >= 3 || tableRows.length == 0) {
    var newRow = $("<tr></tr>");
    newRow.append($("<td></td>").append(content));
    $("#categories").append(newRow);
  } else {
    lastRow.append($("<td></td>").append(content));
  }
}
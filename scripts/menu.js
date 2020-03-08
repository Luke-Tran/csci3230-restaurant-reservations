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
  var grid = $('#categories');
  var column = $('<div class="column is-one-third"></div>');
  var cell = $('<div class="card large"></div>');
  var imageHTML = `
  <div class="card-image">
    <figure class="image">
      <img src="${category.imageURL}" alt="${category.imageAlt}" height="42" width="42">
    </figure>
  </div>
  `;
  
  var categoryImg = $(imageHTML);
  var content = $('<div class="card-content"></div>');
  var categoryBtn = $(`<button class="button categoryBtn">${category.categoryName}</button>`);
  content.append(categoryBtn);

  cell.append(categoryImg, content);
  column.append(cell);
  grid.append(column);
}
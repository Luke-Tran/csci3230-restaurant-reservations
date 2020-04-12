// TODO: call the database and store the object in a variable 
// TODO: call the tableReserved function and put the variable in the function
// TODO: profit
$(document).ready(function() {
	console.log("Hello Form");
	var longTableNumber = 1; // initialize the long talbe number
	var shortTableNumber = 2; // initialise the short table numbers
	// Loop to automatically generate the tables in rows
	for( i = 0 ; i < 5; i++) {
		generateTableRow(longTableNumber, shortTableNumber);
		longTableNumber += 2; // Increment by 2 (long tables are odd)
		shortTableNumber += 2; // Increment by 2 (short tables are even)
	}
	// click to get the id of the tables
	$("svg").find("rect").click(function(){
		console.log($(this).attr("id"));
	});
});

// Function that generates SVGs of tables
function generateTableRow(longTableNumber, shortTableNumber) {
	var width = 1000;
	var height = 200;

	// Create svg element
	var svg = d3.select("body")
							.append("svg")
							.attr("width", width)
							.attr("height", height);

	// Create left table
	svg.append("rect")
					.attr("x", 0)
					.attr("y", 0)
					.attr("width", 200)
					.attr("height", 100)
					.attr("rx", 15)
					.attr("class", "left-side")
					.attr("id", longTableNumber);

	// Create right table 
	svg.append("rect")
					.attr("x", 500)
					.attr("y", 0)
					.attr("width", 100)
					.attr("height", 100)
					.attr("rx", 15)
					.attr("class", "right-side")
					.attr("id", shortTableNumber);

}

// Function to change the colour if the table is reserved 
function tableReserved(databaseData) {
	for(j = 0; j < databaseData.length; j++) {
		if(databaseData[j].time.getHours() == 18 && databaseData[j].time.getMinutes() == 15){
			var tableNumber = database[j].table;
			$("#" + tableNumber).attr("fill", "pink"); // assign pink fill to all the tables in the object
		}
	}
}
		

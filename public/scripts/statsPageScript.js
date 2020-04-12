$(document).ready(function() {
	console.log("Hello World");
	console.log("test");
	generateTable();
});

// Function to generate the table
function generateTable() {
	
	// TODO: Test data comment out when testing parse function
	const reservationData = [
		{'time': "10:00 AM", 'numberOfReservations': 10},
		{'time': "10:45 AM", 'numberOfReservations': 3},
		{'time': "11:30 AM", 'numberOfReservations': 5},
		{'time': "12:15 PM", 'numberOfReservations': 7},
		{'time': "1:00 PM", 'numberOfReservations': 7},
		{'time': "1:45 PM", 'numberOfReservations': 10},
		{'time': "2:30 PM", 'numberOfReservations': 10},
		{'time': "3:15 PM", 'numberOfReservations': 3},
		{'time': "4:00 PM", 'numberOfReservations': 5},
		{'time': "4:45 PM", 'numberOfReservations': 7},
		{'time': "5:30 PM", 'numberOfReservations': 7},
		{'time': "6:15 PM", 'numberOfReservations': 3},
		{'time': "7:00 PM", 'numberOfReservations': 5},
		{'time': "7:45 PM", 'numberOfReservations': 7},
		{'time': "8:15 PM", 'numberOfReservations': 7},
	];

	const margin = 50;
	const width = 1000;
	const height = 500;
	const chartWidth = width -2 * margin;
	const chartHeight = height -2 * margin;

	// Colour Scale for Testing
	const colourScale = d3.scaleLinear()
                          .domain([0, 10])
                          .range(['red', 'blue']);

	const xScale = d3.scaleBand()
							.range([0, chartWidth])
							.domain(reservationData.map((r) => r.time))
							.padding(0.3);

	// Calculate y-scale for the graph
	const yScale = d3.scaleLinear()
							.range([chartHeight, 0])
							.domain([0, 10]);

	// Calculate the x-scale for the graph
	const svg = d3.select('#chart')
						.append('svg')
						.attr('width', width)
						.attr('height', height);

	// Add the SVG to the cancas to display 
	const canvas = svg.append('g')
							.attr('transform', `translate(${margin}, ${margin})`);

	// Generate x-axis
	canvas.append('g')
			.attr('transform', `translate(0, ${chartHeight})`)
			.call(d3.axisBottom(xScale));

	// Generate x-axis label
	svg.append('text')
			.attr('x', margin + chartWidth/2 + margin - 50)
			.attr('y', chartHeight + 2 * margin)
			.attr('text-anchor', 'middle')
			.text("Reservation Time");

	// Generate y-axis
	canvas.append('g')
			.call(d3.axisLeft(yScale));

	// Generate y-axis label
	svg.append('text')
			.attr('x', -margin - (chartHeight/2))
			.attr('y', margin - 35)
			.attr('transform', 'rotate(-90)')
			.attr('text-anchor', 'middle')
			.text("Number of Tables Reserved");

	// Add bars to the graph
	const bars = canvas.selectAll('rect')
								.data(reservationData)
								.enter()
									.append('rect')
										.attr('x', (data) => xScale(data.time))
										.attr('y', chartHeight)
										.attr('height', 0)
										.attr('width', xScale.bandwidth())
										.attr('fill', (data) => colourScale(data.numberOfReservations));

	// On load effects for the chart 
	bars.transition()
			.ease(d3.easeCircle)
			.duration(1000)
			.delay((data, index) => index * 50)
			.attr('y', (data) => yScale(data.numberOfReservations))
			.attr('height', (data) => chartHeight - yScale(data.numberOfReservations));
		
}

// Function to generate the reservation data from the database
function praseDatabaseInformation(dataBaseObject) {
	var reservationData = [];
	var counter1000 = 0;
	var counter1045 = 0;
	var counter1130 = 0;
	var counter1215 = 0;
	var counter100 = 0;
	var counter145 = 0;
	var counter230 = 0;
	var counter315 = 0;
	var counter400 = 0;
	var counter445 = 0;
	var counter530 = 0;
	var counter615 = 0;
	var counter700 = 0;
	var counter745 = 0;
	var counter830 = 0;

	// count the number of occurances of reservations
	for(i = 0; i < dataBaseObject.length; i++) {
		if(dataBaseObject.getHours() == 10 && dataBaseObject.getMinutes() == 0) {
			counter1000 += 1;
		} 
		if(dataBaseObject.getHours() == 10 && dataBaseObject.getMinutes() == 45) {
			counter1045 += 1;
		} 
		if(dataBaseObject.getHours() == 11 && dataBaseObject.getMinutes() == 30) {
			counter1130 += 1;
		} 
		if(dataBaseObject.getHours() == 12 && dataBaseObject.getMinutes() == 15) {
			counter1215 += 1;
		} 
		if(dataBaseObject.getHours() == 13 && dataBaseObject.getMinutes() == 0) {
			counter100 += 1;
		} 
		if(dataBaseObject.getHours() == 13 && dataBaseObject.getMinutes() == 45) {
			counter145 += 1;
		} 
		if(dataBaseObject.getHours() == 14 && dataBaseObject.getMinutes() == 30) {
			counter230 += 1;
		} 
		if(dataBaseObject.getHours() == 15 && dataBaseObject.getMinutes() == 15) {
			counter315 += 1;
		} 
		if(dataBaseObject.getHours() == 16 && dataBaseObject.getMinutes() == 0) {
			counter400 += 1;
		} 
		if(dataBaseObject.getHours() == 16 && dataBaseObject.getMinutes() == 45) {
			counter445 += 1;
		} 
		if(dataBaseObject.getHours() == 17 && dataBaseObject.getMinutes() == 30) {
			counter530 += 1;
		} 
		if(dataBaseObject.getHours() == 18 && dataBaseObject.getMinutes() == 15) {
			counter615 += 1;
		} 
		if(dataBaseObject.getHours() == 19 && dataBaseObject.getMinutes() == 0) {
			counter700 += 1;
		} 
		if(dataBaseObject.getHours() == 19 && dataBaseObject.getMinutes() == 45) {
			counter745 += 1;
		} 
		if(dataBaseObject.getHours() == 20 && dataBaseObject.getMinutes() == 30) {
			counter830 += 1;
		} 
	}

	// Append count information to the reservationData variable to use in the chart	
	reservationData.push({'time': "10:00 AM", 'numberOfReservations': counter1000});
	reservationData.push({'time': "10:45 AM", 'numberOfReservations': counter1045});
	reservationData.push({'time': "11:30 AM", 'numberOfReservations': counter1130});
	reservationData.push({'time': "12:15 PM", 'numberOfReservations': counter1215});
	reservationData.push({'time': "1:00 PM", 'numberOfReservations': counter100});
	reservationData.push({'time': "1:45 PM", 'numberOfReservations': counter145});
	reservationData.push({'time': "2:30 PM", 'numberOfReservations': counter230});
	reservationData.push({'time': "3:15 PM", 'numberOfReservations': counter315});
	reservationData.push({'time': "4:00 PM", 'numberOfReservations': counter400});
	reservationData.push({'time': "4:45 PM", 'numberOfReservations': counter445});
	reservationData.push({'time': "5:30 PM", 'numberOfReservations': counter530});
	reservationData.push({'time': "6:15 PM", 'numberOfReservations': counter615});
	reservationData.push({'time': "7:00 PM", 'numberOfReservations': counter700});
	reservationData.push({'time': "7:45 PM", 'numberOfReservations': counter745});
	reservationData.push({'time': "8:15 PM", 'numberOfReservations': counter815});

	return reservationData;
}

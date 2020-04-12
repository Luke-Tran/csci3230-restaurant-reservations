$(document).ready(function() {
	console.log("Hello World");
	console.log("test");
	generateTable();
});

function generateTable() {
	const reservationData = [
		{'table': 1, 'numberOfReservations': 10},
		{'table': 2, 'numerOfReservations': 3},
		{'table': 3, 'numberOfReservations': 5}
	];

	const margin = 50;
	const width = 500;
	const height = 500;
	const chartWidth = width -2 * margin;
	const chartHeight = height -2 * margin;

	const xScale = d3.scaleBand()
							.range([0, chartWidth])
							.domain(reservationData.map((r) => r.table))
							.padding(0.3);

	const yScale = d3.scaleLinear()
							.range([chartHeight, 0])
							.domain([0, 15]);

	const svg = d3.select('#chart')
						.append('svg')
						.attr('width', width)
						.attr('height', height);

	const canvas = svg.append('g')
							.attr('transform', `translate(${margin}, ${margin})`);

	// Generate x-axis
	canvas.append('g')
			.call(d3.axisBottom(xScale));

	// Generate y-axis
	canvas.append('g')
			.call(d3.axisLeft(yScale));
}

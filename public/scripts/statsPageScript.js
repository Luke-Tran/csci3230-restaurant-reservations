$(document).ready(function() {
	console.log("Hello World");
	console.log("test");
	generateTable();
});

function generateTable() {
	const reservationData = [
		{'table': 1, 'numberOfReservations': 10},
		{'table': 2, 'numberOfReservations': 3},
		{'table': 3, 'numberOfReservations': 5},
		{'table': 4, 'numberOfReservations': 7},
	];

	const margin = 50;
	const width = 500;
	const height = 500;
	const chartWidth = width -2 * margin;
	const chartHeight = height -2 * margin;

	// Colour Scale for Testing
	const colourScale = d3.scaleLinear()
                          .domain([3, 10])
                          .range(['red', 'blue']);

	const xScale = d3.scaleBand()
							.range([0, chartWidth])
							.domain(reservationData.map((r) => r.table))
							.padding(0.3);

	// Calculate y-scale for the graph
	const yScale = d3.scaleLinear()
							.range([chartHeight, 0])
							.domain([0, 15]);

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

	// Generate y-axis
	canvas.append('g')
			.call(d3.axisLeft(yScale));

	// Add bars to the graph
	const bars = canvas.selectAll('rect')
								.data(reservationData)
								.enter()
									.append('rect')
										.attr('x', (data) => xScale(data.table))
										.attr('y', chartHeight)
										.attr('height', 0)
										.attr('width', xScale.bandwidth())
										.attr('fill', (data) => colourScale(data.numberOfReservations));

	// On load effects for the chart 
	bars.transition()
			.ease(d3.easeElastic)
			.duration(800)
			.delay((data, index) => index * 50)
			.attr('y', (data) => yScale(data.numberOfReservations))
			.attr('height', (data) => chartHeight - yScale(data.numberOfReservations));
		
}

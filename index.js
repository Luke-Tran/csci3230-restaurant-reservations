let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let http = require('http').createServer(app);
let io = require('socket.io')(http);
let message2 = "Hello from server";

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/customerReview', function (request, response) {
	response.render("reviewPage");
});

app.get('/customerReservation', function (request, response) {
	response.render("resPage");
});

app.post('/customerReview', function (request, response) {
	response.render("reviewPage");
});

// Display homepage 
app.get('/', (request, response) => {
	response.sendFile(__dirname + '/public/homepage.html');
});

// Display Menu
app.get('/menu', (request, response) => {
	response.sendFile(__dirname + '/public/pages/menu.html');
});

// Display table Form for dev
app.get('/tableForm', (request, response) => {
	response.sendFile(__dirname + '/public/pages/tableForm.html');
});

// Set which port to use
app.set('port', 3000);

// Show which port the server is lisening at 
// app.listen(app.get('port'), () => {
// 	console.log("Server is listening at port: " + app.get('port'));
// });

// Set up socket IO
io.on('connection', function(socket){
	console.log('User Connected');

	// Accepts what the client is sending the server
	socket.on('send message', function(data){
		console.log(data);
	});

	// Executes the function once after x numnber of miliseconds (currently 10 seconds)
	var data = {serverMessage: message2,
					serverTime: serverTime(),
	};
	setTimeout(function() {io.emit('send message', data)},5000);
	//setTimeout(function() {io.emit('send message',"time" )},1000);
	//io.emit('send message', message);

});

// Show which port the server is lisening at 
//app.listen(app.get('port'), () => {
	//console.log("Server is listening at port: " + app.get('port'));
//});
http.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
});

// Function to get the server time when entering a message
function serverTime() {
	var d = new Date();
	var hours = d.getHours();
	var minutes = d.getMinutes();
	// Format the minutes so they give a leading 0 if less than 10
	if (minutes < 10) {
		var time = `${hours}:0${minutes}`;
	}
	else {
		var time = `${hours}:${minutes}`;
	}
	return time;
}






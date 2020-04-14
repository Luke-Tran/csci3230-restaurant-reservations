let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let http = require('http').createServer(app);
let io = require('socket.io')(http);
let mongo = require('./mongo');

let message2 = "Hello from server";

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/customerReview', function (request, response) {
	response.render("reviewPage");
});

app.post('/customerReview', function (request, response) {
	response.render("reviewPage");
});

app.get('/customerReservation', function (request, response) {
	response.render("resPage");
});

// Store finished reservations in database
app.post('/customerReservation', function (request, response) {
	mongo.addReservation(request.body.firstname, request.body.lastname, "missing", 
		request.body.guests, 0, new Date("April 18, 2020 18:30:00"))
	.then(res => {
		mongo.getReservationById(res).then(res => {
			console.log(res);
		})
	});
	response.sendFile(__dirname + '/public/pages/tableForm.html');
});

app.get('/reservations', function(request, response) {
	mongo.getSecureReservations().then(res => {
		response.send(res);
	});
});

// "Authentication" is just done locally for now
var usernames = ['admin'];
function usernameExists(username) {
  for (let i = 0; i < usernames.length; i++) {
      if (usernames[i] === username) {
          return true;
      }
  }
  return false;
}

// Display homepage 
app.get('/', (request, response) => {
	response.sendFile(__dirname + '/public/homepage.html');
});

// Display login page
app.get('/login', (request, response) => {
	response.render("login");
});

// Process submitted login
app.post('/login', (request, response) => {
	let username = request.body.username;
	let password = request.body.password;
	if (usernameExists(username)) {
		response.redirect("/statsPage");
	}
});

// Display Menu
app.get('/menu', (request, response) => {
	response.sendFile(__dirname + '/public/pages/menu.html');
});

// Display table Form for dev
app.get('/tableForm', (request, response) => {
	response.sendFile(__dirname + '/public/pages/tableForm.html');
});

// Display the stats page
app.get('/statsPage', (request, response) => {
	response.sendFile(__dirname + '/public/pages/statsPage.html');
});

// Set which port to use
app.set('port', 3000);

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


http.listen(app.get('port'), function() {
  console.log(`Listening on port ${app.get('port')}: localhost:${app.get('port')}`);
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






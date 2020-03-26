let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));

// Display homepage 
app.get('/', (request, response) => {
	response.sendFile(__dirname + '/public/homepage.html');
});

// Display Menu
app.get('/menu', (request, response) => {
	response.sendFile(__dirname + '/public/pages/menu.html');
});

// Set which port to use
app.set('port', 3000);

// Show which port the server is lisening at 
app.listen(app.get('port'), () => {
	console.log("Server is listening at port: " + app.get('port'));
});
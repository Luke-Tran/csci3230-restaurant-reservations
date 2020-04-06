let mongoose = require('mongoose');
let mongo = require('./mongo')
let url = 'mongodb://localhost:27017/reservations'

exports.init = function() {
	mongoose.connect(url, 
		{
			"useNewUrlParser": true,
			"useFindAndModify": false,
			"useUnifiedTopology": true
		}
	);

	let db = mongoose.connection;
	db.on('open', () => console.log("Database connection established."))
	db.on('error', () => console.log(`Error: Could not connect to database at ${url}.`))
}

let reservationSchema = new mongoose.Schema(
		{
			resID: String,
			firstName: String,
			lastName: String
		}
	);

let reservation = mongoose.model('reservation', reservationSchema);



mongo.init()


let mongoose = require("mongoose");
let mongo = require("./mongo")
let url = "mongodb://localhost:27017/reservations"

// Reservation datatype model / Schema creation for use in database
let reservationSchema = new mongoose.Schema(
		{
			firstName: String,
			lastName: String,
			phone: String,
			email: String,
			people: Number,
			time: Date,
			notifyMins: Number
		}
	);

let Reservation = mongoose.model("reservation", reservationSchema);

// Establishes a connection to the MongoDB server. Reports status via console.
exports.init = function() {
	mongoose.connect(url, 
		{
			// Uses new features instead of older, deprecated versions
			"useNewUrlParser": true,
			"useFindAndModify": false,
			"useUnifiedTopology": true
		}
	);

	let db = mongoose.connection;
	db.on('open', () => console.log("Database connection established."))
	db.on('error', () => console.log(`Error: Could not connect to database at ${url}.`))
}

exports.addReservation = async function(firstName, lastName, phone, email, people, time, notifyMins) {
	let reservation = new Reservation({
		firstName: firstName,
		lastName: lastName,
		phone: phone,
		email: email,
		people: people,
		time: time,
		notifyMins: notifyMins
	});

	if(reservation !== await reservation.save()) {
		console.log(`Error saving reservation with id ${id}.`);
		return -1;
	}
	else {
		console.log(`Saved reservation for ${reservation.firstName} ${reservation.lastName}.`);
		return reservation._id;
	}
}

exports.getReservationById = async function(id) {
	result = await Reservation.findById(id);
	return result;
}

exports.getAllReservations = async function() {
	result = await Reservation.find();
	return result;
}

exports.getSortedReservations = async function() {
	result = await Reservation.find({}, null, { sort:  { time: 1 } } );
	return result;
}

exports.deleteAllReservations = async function() {
	await Reservation.deleteMany();
}

let mongoTest = async function() {
	mongo.init();

	await mongo.addReservation("John", "Doe", "9051234567", "john.doe@gmail.com", 2, new Date("April 25, 2020 19:15:00"), 60);
	let id = await mongo.addReservation("Randy", "Fortier", "9057218668", "randy.fortier@ontariotechu.net", 5, new Date("April 18, 2020 18:30:00"), 5);
	await mongo.addReservation("Geoff", "Smith", "4161346795", "geoff.smith@hotmail.ca", 2, new Date("April 22, 2020 17:45:00"), -1);

	let result = await mongo.getReservationById(id);
	console.log("\nSingle reservation pull for Randy Fortier:", result);

	result = await mongo.getSortedReservations();
	console.log("\nAll reservations, sorted: ", result);

	mongo.deleteAllReservations();

	result = await mongo.getAllReservations();
	console.log("\nAll reservations post delete: ", result);
}

mongoTest();

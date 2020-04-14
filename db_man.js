let mongo = require('./mongo');

let pruneDB = function() {
	// TODO Remove outdated reservations
}

let sendSMS = function() {
	// TODO Send SMS messages on time
	console.log("test");
}

// Prune DB once a day
setInterval(pruneDB, 86400000);

// Check for SMS timing every minute
setInterval(sendSMS, 60000);
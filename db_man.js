let mongo = require('./mongo');
let phone = require('./phone');

const MINUTE = 60000;
const DAY = 86400000;


let pruneDB = function() {
	// TODO Remove outdated reservations
}

let sendSMS = async function() {
	// TODO Send SMS messages on time
	let curTime = new Date(Date.now());
	let reservations = await mongo.getAllReservations();
	for(let i in reservations) {
		let resTime = new Date(reservations[i].time);
		if(resTime - curTime <= 60 * MINUTE && resTime - curTime >= 59 * MINUTE) {
			phone.sendReminder(reservations[i].phone, '1 hour');
		}
	}
}

// Prune DB once a day
setInterval(pruneDB, DAY);

// Check for SMS timing every minute
setInterval(sendSMS, MINUTE);
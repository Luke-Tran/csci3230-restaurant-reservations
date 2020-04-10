let dotenv = require("dotenv");

dotenv.config();

let twilioSID = process.env.TWILIO_SID;
let twilioToken = process.env.TWILIO_TOKEN;

let twilio = require("twilio")(twilioSID, twilioToken);

twilio.messages.create({
	body: "Hello world",
	from: "+16474964230",
	to: "+16474964230"
}).then(msg => console.log(msg));
var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

var path = require("path");
var url = require('url');

// ------------------Routing Started ------------------------

// GET / - Home page.
router.get('/', function(request, res, next) {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});


// GET /send - Will send email via nodemailer SMTP transporter.
router.get('/send', function(req, res, next) {
	
	// Here we are configuring our SMTP Server details.
	// STMP is mail server which is responsible for sending and recieving email.

	var options = {
		service: "Sendgrid",
		auth: {
			api_user: process.env.SENDGRID_USERNAME,
			api_key: process.env.SENDGRID_PASSWORD
		}
	};

	console.log("Options", options);
	// login
	var transporter = nodemailer.createTransport(sgTransport(options));


	// ------------------SMTP Over-----------------------------

	var mailOptions = {
		to: "lauren.kroner@gmail.com",
		from: req.query.email,
		subject: "You got a message from " + req.query.first_name + "!",
		text:
			"Hey Lauren,"
			// req.query.
			// req.query.message
	};

	console.log("Here's mailOptions", mailOptions);

	// send mail
	transporter.sendMail(mailOptions, function(error, response){
		if (error) {
			console.log(error);
		} else {
			console.log("Message sent: " + JSON.stringify(response));
			res.end("sent");
		}
	});

});


module.exports = router;

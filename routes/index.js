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
	
	// Here we are configuring our Sendgrid/Nodemailer SMTP Server details.
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

	var messageNotification = {
		to: "lauren.kroner@gmail.com",
		from: req.query.email,
		subject: "You got a message from " + req.query.first_name + "!",
		text:
			"Hi Lauren, \n\n" +
			"You received a message from LaurenKroner.com. Here are the details: \n\n" +
			"Name: " + req.query.first_name + "\n\n" +
			"Email: " + req.query.email + "\n\n" +
			"Message: " + req.query.message
	};

	var messageThankYou = {
		to: req.query.email,
		from: "lauren@laurenkroner.com",
		subject: "Thanks from Laurenkroner.com " + req.query.first_name,
		text:
			"Hi there " + req.query.first_name + ",\n\n" +
			"Thanks for stopping by my site. I'll get back to you as soon as I get a chance :) \n\n" +
			"Have a good one and speak soon.\n\n" +
			"Lauren"
	}

	console.log("Here's messageNotification", messageNotification);

	// send mail
	transporter.sendMail(messageNotification, function(error, response){
		if (error) {
			console.log(error);
		} else {
			console.log("Message sent: " + JSON.stringify(response));
			transporter.sendMail(messageThankYou, function(error, response){
				if (error) {
					console.log(error);
				} else {
					console.log("Message sent: " + JSON.stringify(response));
					res.end("sent");
				}
			});
		}
	});
});


module.exports = router;

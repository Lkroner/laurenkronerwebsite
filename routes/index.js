var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var path = require("path");
var url = require('url');

// ------------------Routing Started ------------------------

// GET / - Home page.
router.get('/', function(request, res, next) {
  var url_parts = url.parse(request.url, true);
  var query = url_parts.query;
  // console.log('GET /');
  console.log(query);
  res.sendFile(path.join(__dirname, "../views/index.html"));
});


// GET /send - Will send email via nodemailer SMTP transporter.
router.get('/send', function(req, res, next) {
	
	// Here we are configuring our SMTP Server details.
	// STMP is mail server which is responsible for sending and recieving email.
	var transporter = nodemailer.createTransport(smtpTransport({
		service: process.env.NODEMAILER_SERVICE,
		auth: {
			user: process.env.NODEMAILER_USER,
			pass: process.env.NODEMAILER_PASS
		}
	}));

	// ------------------SMTP Over-----------------------------

	var mailOptions = {
		to: "lauren.kroner@gmail.com",
		subject: "You got a message from " + req.query.email + "!",
		text:
			// "Hey Lauren," +
			// req.query.
			// req.query.message
	};

	console.log("Here's mailOptions", mailOptions);
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

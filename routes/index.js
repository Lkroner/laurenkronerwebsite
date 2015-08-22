var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');
var path = require("path");
var url = require('url');


/*
Here we are configuring our SMTP Server details.
STMP is mail server which is responsible for sending and recieving email.
*/

var smtpTransport = nodemailer.createTransport("SMTP", {
	service: process.env.NODEMAILER_SERVICE,
	auth: {
		user: process.env.NODEMAILER_USER,
		pass: process.env.NODEMAILER_PASS
	}
});

/*------------------SMTP Over-----------------------------*/


/*------------------Routing Started ------------------------*/

/* GET home page. */
router.get('/', function(request, res, next) {
  var url_parts = url.parse(request.url, true);
  var query = url_parts.query;
  // console.log('GET /');
  console.log(query);
  res.sendFile(path.join(__dirname, "../views/index.html"));
});


/* GET send page. */
router.get('/send', function(req, res, next) {

	var mailOptions = {
		to: "lauren.kroner@gmail.com",
		subject: "Lauren, " + req.query.first_name + ", " + req.query.email + "sent you a message from laurenkroner.com",
		text: req.query.message
	};
	console.log("Here's mailOptions", mailOptions);
	console.log("process.env.NODEMAILER_USER: ", process.env.NODEMAILER_USER);
	console.log("process.env.NODEMAILER_PASS: ", process.env.NODEMAILER_PASS);
	smtpTransport.sendMail(mailOptions, function(error, response){
		if (error) {
			console.log(error);
		} else {
			console.log("Message sent: " + response.message);
			res.end("sent");
		}
	});

});


module.exports = router;

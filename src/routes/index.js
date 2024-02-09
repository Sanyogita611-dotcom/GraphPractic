var express = require('express');
var router = express.Router();
var path = require('path');
// const bcrypt = require('bcrypt');
var md5 = require('md5');
const saltRounds = 10;
//Database configuration file
var DBconfig = require('../../config.json');
//MSSQL
var sqlclient = require("mssql");

var connectionString = DBconfig.connectionString;

router.get('/', function (req, res, next) {
	res.sendFile(path.join(__dirname, '../', 'public', 'LiveDashboard.html'));
});


router.get('/login', function (req, res, next) {

	// const hash = bcrypt.hashSync(req.query.pass, saltRounds);
	// //demo='$2b$10$iNAsJleQ9QnpTPoc/Z5Wk.lO0/RjRTTyQx5834u5KRmVGyOWQktaS'

	// var comp=bcrypt.compareSync('$2b$10$jqr9Qe1GZr8CXYl/36LmnOFDDLW8BZqbBbLmHiJsKUFrNCaW9d6ze', hash);
	var Password = md5(req.query.pass);
	var query = "SELECT * FROM MINT_Users where [Password]='" + Password + "' and [Email]='" + req.query.emailId + "'";

	sqlclient.connect(connectionString, function (connectionerr) {

		if (connectionerr) {
			console.log('error connecting: ' + connectionerr.stack);
			res.send("DB_ERROR");
		}
		// create Request object
		var sqlrequest = new sqlclient.Request();

		sqlrequest.query(query, (err, recordset) => {

			sqlclient.close();
			if (err) {
				res.send(err);
			}
			else {
				res.send(recordset);
			}
		})
	});
})

router.post('/updatePassword', function (req, res, next) {
	var Password = md5( req.body.pass);
	var query = "Update MINT_Users set Password='" +Password + "' where Email='" + req.body.userName + "' ";

	sqlclient.connect(connectionString, function (connectionerr) {

		if (connectionerr) {
			console.log('error connecting: ' + connectionerr.stack);
			res.send("DB_ERROR");
		}
		// create Request object
		var sqlrequest = new sqlclient.Request();

		sqlrequest.query(query, (err, recordset) => {

			sqlclient.close();
			if (err) {
				res.send(err);
			}
			else {
				res.send(recordset);
			}
		})
	});
})

module.exports = router;
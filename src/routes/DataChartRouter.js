var express = require('express');
var router = express.Router();
var path = require('path');
var sqlclient = require("mssql");
var md5 = require('md5');
var DBconfig = require('../../config.json');
var connectionString = DBconfig.connectionString;
const { Pool, Client } = require("pg");



router.get('/getTotalRecord', function (req, res) {

	var query = "SELECT count(*) FROM \"cronjob\";";

	const sqlclient = new Client({
		connectionString: connectionString,
	})
	sqlclient.connect();
	sqlclient.query(query, function (err, result) {

		var data = JSON.parse(JSON.stringify(result.rows));

		if (err) {
			console.log(err)
		}

		var rowsAffected = JSON.parse(JSON.stringify(result.rowCount));

		sqlclient.end();
		//if (rowsAffected > 0) {
		res.send(result);
		//}
	});
});


module.exports = router;
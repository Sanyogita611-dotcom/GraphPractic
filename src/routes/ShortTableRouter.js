var express = require('express');
var router = express.Router();
var path = require('path');
var sqlclient = require("mssql");
var md5 = require('md5');
var DBconfig = require('../../config.json');
var connectionString = DBconfig.connectionString;

router.get('/getUser', function (req, res, next) {

	var query =   " SELECT [RowInsertTime],[Parameter_Value],[Parameter_Name] FROM   [NARROW].[dbo].[Narrow_Final] where CAST([RowInsertTime] As date) between '"+req.query.date+"'  and '"+req.query.enddate+"' and CAST([RowInsertTime] As time) between '"+req.query.time+"'  and '"+req.query.endtime+"'and [Parameter_Name]='"+req.query.para+"'order by [RowInsertTime] desc;"

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
	})
});

router.get('/getData', function (req, res, next) {

	var query = "SELECT count(*) FROM [cronjob]";
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
	})
});

router.get('/getTableData', function (req, res, next) {

	var query = "SELECT Top 100 * FROM [cronjob]";
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
	})
});

module.exports = router;
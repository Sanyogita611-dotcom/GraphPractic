var express = require('express');
var router = express.Router();
var path = require('path');
var sqlclient = require("mssql");
var md5 = require('md5');
var DBconfig = require('../../config.json');
var connectionString = DBconfig.connectionString;

router.get('/getUserData', function (req, res, next) {
   var query="SELECT TOP (1000) * FROM [WIDE].[dbo].[wide1_Final] where cast([RowInsertTime] as date)  between '"+req.query.date+"' and '"+req.query.enddate+"' order by [RowInsertTime] desc"
// 	var query = "SELECT top (1000)[RowInsertTime],[Parameter1] ,[Parameter2] ,[parameter3] ,[Parameter4] ,[Parameter5],[Parameter6],[Parameter7],[Parameter8],[Parameter9] ,[Parameter10] FROM [wide1]"
//  " where cast([RowInsertTime] as date)  between '"+req.query.date+"' and '"+req.query.enddate+"' order by [RowInsertTime] desc;"

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
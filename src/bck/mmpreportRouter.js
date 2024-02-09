var express = require('express');
var router = express.Router();
var con = require('./connection.js');
var sqlclient = require("mssql");
var DBconfig = require('../../config.json');
var connectionstr = DBconfig.connectionString;

router.get('/getTypeMachines', function (req, res, next) {

    var query = " select * from [MINT_ActivityAreaTreeDetails] where LineDesc='" + req.query.type + "'";
    // connect to your database
    sqlclient.connect(connectionstr, function (connectionerr) {

        if (connectionerr) {
            console.log('error connecting: ' + connectionerr.stack);
            res.send("DB_ERROR");
        }
        // create Request object
        var sqlrequest = new sqlclient.Request();

        // query to the database and get the records
        sqlrequest.query(query, function (err, result) {
            if (err) {
                console.log(err)
            }
            // var rowsAffected = JSON.parse(JSON.stringify(result.rowsAffected));
            sqlclient.close();
            res.send(result);
        });
    });
});

router.get('/GetMMPreportData', function (req, res, next) {

    var conn = con.connection(req.query.selectDate, req.query.strShift)

    var query = "select * from MINT_tHUL_Shift_MMPReport where tDate='" + req.query.selectDate + "' and sShift in('" + req.query.strShift + "') " +
        " and WorkcellDesc in(" + req.query.str + ")  order by WorkcellDesc asc,sShift asc";

    sqlclient.connect(conn, function (connectionerr) {

        if (connectionerr) {
            console.log('error connecting: ' + connectionerr.stack);
            res.send("DB_ERROR");
        }
        var sqlrequest = new sqlclient.Request();
        sqlrequest.query(query, function (err, result) {
            if (err) {
                console.log(err)
            }
            sqlclient.close();
            res.send(result);
        });
    });
});
//
router.get('/getAllLosses', function (req, res, next) {
    if (req.query.type == 'Packing_Machine') {
        var query = "  select s.*,m.MMPCodeID,main.MMPCodeDesc from Mint_vSmartTags s,MINT_HUL_MMPLossCode m, " +
            " MINT_HUL_MMPCode main where s.CategoryCode=m.MMPLossCodeID and m.MMPCodeID=main.MMPCodeID and s.MachineCode=1000005 order by m.MMPCodeID asc";
    }
    else {
        var query = "  select s.*,m.MMPCodeID,main.MMPCodeDesc from Mint_vSmartTags s,MINT_HUL_MMPLossCode m, " +
            " MINT_HUL_MMPCode main where s.CategoryCode=m.MMPLossCodeID and m.MMPCodeID=main.MMPCodeID and s.MachineName in(" + req.query.line + ") order by m.MMPCodeID";
    }
    sqlclient.connect(connectionstr, function (connectionerr) {

        if (connectionerr) {
            console.log('error connecting: ' + connectionerr.stack);
            res.send("DB_ERROR");
        }
        var sqlrequest = new sqlclient.Request();
        sqlrequest.query(query, function (err, result) {
            if (err) {
                console.log(err)
            }
            sqlclient.close();
            res.send(result);
        });
    });
});
//
router.get('/getAllLossesData', function (req, res, next) {
    var conn = con.connection(req.query.selectDate, req.query.strShift)

    var query = " select * from [MINT_HUL_Shift_EventSummary] where tDate='" + req.query.selectDate +
        "' and sShift in('" + req.query.strShift + "') and WorkcellDesc in(" + req.query.str + ")";

    sqlclient.connect(conn, function (connectionerr) {

        if (connectionerr) {
            console.log('error connecting: ' + connectionerr.stack);
            res.send("DB_ERROR");
        }
        var sqlrequest = new sqlclient.Request();
        sqlrequest.query(query, function (err, result) {
            if (err) {
                console.log(err)
            }
            sqlclient.close();
            res.send(result);
        });
    });
});

module.exports = router;


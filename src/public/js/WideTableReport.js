$(document).ready(function () {

    });
    
function UserData() {
debugger;
$("#userbody").empty();


var date = document.getElementById('txt_FromDate').value;
var enddate = document.getElementById('txt_ToDate').value;

$.ajax({
    type: 'get',
    url: '/getUserData',
    //async: false,
    data: { date: date, enddate: enddate},
success: function (data) {
    debugger;
    var response = JSON.parse(JSON.stringify(data.recordset));
    if (response.length > 0) {
        $.each(response, function (i, d) {
            var row = '<tr>';
            // let dt = d["RowInsertTime"].split("T");
            // let dt1 = dt[0];
            // let dt2 = dt[1].split(".");
            //  row += '<td>' + (i + 1) + '</td>';
            // row += '<td>' + dt1 + '</td>';
            // row += '<td>' + dt2[0] + '</td>';
            row += '<td>' + d["RowInsertTime"] + '</td>';
            row += '<td>' + d["Para1"] + '</td>';
            row += '<td>' + d["Para2"] + '</td>';
            row += '<td>' + d["Para3"] + '</td>';
            row += '<td>' + d["Para4"] + '</td>';
            row += '<td>' + d["Para5"] + '</td>';
            row += '<td>' + d["Para6"] + '</td>';
            row += '<td>' + d["Para7"] + '</td>';
            row += '<td>' + d["Para8"] + '</td>';
            row += '<td>' + d["Para9"] + '</td>';
            row += '<td>' + d["Para10"] + '</td>';
            row += '</tr>';
            $('#tblUserdata tbody').append(row);
        
        });
          


    }
}

})
}
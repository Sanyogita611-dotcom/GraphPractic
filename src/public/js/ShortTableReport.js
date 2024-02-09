$(document).ready(function () {
  
    });
    
function getEvent(){
debugger;
$("#userbody").empty();

var date = document.getElementById('txt_FromDate').value;
var enddate = document.getElementById('txt_ToDate').value;
var time = document.getElementById('txt_FromTime').value;
var endtime = document.getElementById('txt_ToTime').value;
var parameter=document.getElementById('ddlparameter').value;
if(parameter=='Parameter 1')
{
    var para='Parameter1';
}
else
if(parameter=='Parameter 2')
{
    var para='Parameter2';
}
else
if(parameter=='Parameter 3')
{
    var para='Parameter3';
}
else
if(parameter=='Parameter 4')
{
    var para='Parameter4';
}
else
if(parameter=='Parameter 5')
{
    var para='Parameter5';
}
else
if(parameter=='Parameter 6')
{
    var para='Parameter6';
}
else
if(parameter=='Parameter 7')
{
    var para='Parameter7';
}
else
if(parameter=='Parameter 8')
{
    var para='Parameter8';
}
else
if(parameter=='Parameter 9')
{
    var para='Parameter9';
}
else
if(parameter=='Parameter 10')
{
    var para='Parameter10';
}
$.ajax({
    type: 'get',
    url: '/getUser',
    //async: false,
    data: { date: date, enddate: enddate,time:time,endtime:endtime,para:para},
success: function (data) {
    debugger;
    var response = JSON.parse(JSON.stringify(data.recordset));
    if (response.length > 0) {
        $.each(response, function (i, d) {
            var row = '<tr>';
            let dt = d["RowInsertTime"].split("T");
                      let dt1 = dt[0];
                      let dt2 = dt[1].split(".");
                      row += '<td>' + (i + 1) + '</td>';
                      row += '<td>' + dt1 + '</td>';
                      row += '<td>' + dt2[0] + '</td>';
            // row += '<td>' + d["RowInsertTime"] + '</td>';
            row += '<td>' + d["Parameter_Value"] + '</td>';
            row += '<td>' + d["Parameter_Name"] + '</td>';
            row += '</tr>';
            $('#tblUserdata tbody').append(row);
        
        });
          


    }
}

})
}




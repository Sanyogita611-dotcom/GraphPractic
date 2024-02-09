

var selectedrow;
var RMStdWtData;
var today;

function DisplayData() {
    debugger;
    var fromdate = document.getElementById('fdate').value;
    var shift = document.getElementById("selectflowshift").value;
    var line = document.getElementById("selectflowline").value;

    $("#tblflowwrap").empty();

    $.ajax({
        type: 'GET',
        url: '/getFlowData',
        data: {
            fromdate: fromdate,
            shift: shift,
            line: line

        },
        success: function (data) {
            if (data != null) {
                var response = data.recordset;
                if (response.length > 0) {
                    $.each(response, function (i, d) {

                        var row = '<tr>';

                        var time = d["RowInsertTime"].split('T')[1];
                        var dttime = time.split('.');
                       var shift1 = d["sShift"];
                       if(shift1 == 1){
                           shift = 'ShiftA'
                       }
                      else if(shift1 == 2){
                        shift = 'ShiftB'
                    }
                  else  if(shift1 == 3){
                        shift = 'ShiftC'
                    }
                        if (line == 'Line1') {


                            row += '<td>' + d["RowInsertTime"].split('T')[0] + '</td>';
                            row += '<td>' + dttime[0] + '</td>';
                           
                            row += '<td>' + shift + '</td>';
                            row += '<td>' + line + '</td>';
                            row += '<td>' + d["Line1"]

                        }
                        else if (line == 'Line2') {


                            row += '<td>' + d["RowInsertTime"].split('T')[0] + '</td>';
                            row += '<td>' + dttime[0] + '</td>';
                            row += '<td>' + shift + '</td>';
                             row += '<td>' + line + '</td>';
                            row += '<td>' + d["Line2"]
                        }


                        else if (line == 'Line3') {


                            row += '<td>' + d["RowInsertTime"].split('T')[0] + '</td>';
                            row += '<td>' + dttime[0] + '</td>';
                            row += '<td>' + shift + '</td>';
                              row += '<td>' + line + '</td>';
                            row += '<td>' + d["Line3"]
                        }
                        else if (line == 'Line4') {


                            row += '<td>' + d["RowInsertTime"].split('T')[0] + '</td>';
                            row += '<td>' + dttime[0] + '</td>';
                            row += '<td>' +shift + '</td>';
                             row += '<td>' + line + '</td>';
                            row += '<td>' + d["Line4"]

                        }
                        else if (line == 'Line5') {


                            row += '<td>' + d["RowInsertTime"].split('T')[0] + '</td>';
                            row += '<td>' + dttime[0] + '</td>';
                            row += '<td>' + shift + '</td>';
                             row += '<td>' + line + '</td>';
                            row += '<td>' + d["Line5"]
                        }
                        else if (line == 'Line6') {


                            row += '<td>' + d["RowInsertTime"].split('T')[0] + '</td>';
                            row += '<td>' + dttime[0] + '</td>';
                            row += '<td>' + shift + '</td>';
                             row += '<td>' + line + '</td>';
                            row += '<td>' + d["Line6"]
                        }
                        else if (line == 'Line7') {


                            row += '<td>' + d["RowInsertTime"].split('T')[0] + '</td>';
                            row += '<td>' + dttime[0] + '</td>';
                            row += '<td>' + shift + '</td>';
                              row += '<td>' + line + '</td>';
                            row += '<td>' + d["Line7"]

                        }

                        else if (line == 'Line8') {


                            row += '<td>' + d["RowInsertTime"].split('T')[0] + '</td>';
                            row += '<td>' + dttime[0] + '</td>';
                            row += '<td>' +shift + '</td>';
                             row += '<td>' + line + '</td>';
                            row += '<td>' + d["Line8"]
                        }
                        // if (line == 'Line8') {

                        //     // var date = d["Date"].split('T')[0];
                        //     row += '<td>' + d["Date"].split('T')[0] + '</td>';
                        //     row += '<td>' + d["Date"].split('T')[1] + '</td>';
                        //     row += '<td>' + lossconfigcell + '</td>';
                        //     row += '<td>' + d["sShift"] + '</td>';

                        // }

                        row += '</tr>';
                        $('#tblFlowwrapdata tbody').append(row);

                    });
                }
            }
        }
    })
}

var tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>',
        base64 = function (s) {
            return window.btoa(unescape(encodeURIComponent(s)))
        },
        format = function (s, c) {
            return s.replace(/{(\w+)}/g, function (m, p) {
                return c[p];
            })
        }
    return function (table, name) {
        name = "Report";

        if (!table.nodeType) table = document.getElementById(table)
        var ctx = {
            worksheet: name || 'Worksheet',
            table: table.innerHTML

        }

        var filename = "Flow Wrap Count";
        // window.location.href = uri + base64(format(template, ctx))
        var link = document.createElement("a");
        link.download = filename;
        link.href = uri + base64(format(template, ctx));
        link.click();
    }
})()

window.onload = function () {
    debugger;
    var today = new Date().toISOString().slice(0, 10);
    document.getElementById('fdate').value = today;
}


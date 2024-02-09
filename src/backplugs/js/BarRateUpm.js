

var selectedrow;
var RMStdWtData;
var today;

function DisplayBarRatetData() {
    debugger;
    var fromdate = document.getElementById('date_from').value;
    // var todate = document.getElementById('date_To').value;

    var shift = document.getElementById("selectshift").value;
    // var shift = a.options[a.selectedIndex].innerHTML;

    var line = document.getElementById("selectline").value;
    // var line = b.options[b.selectedIndex].innerHTML;


    $("#tblupmunitbody").empty();

    $.ajax({
        type: 'GET',
        url: '/getBarRateData',
        data: {
            fromdate: fromdate,
            // todate: todate,
            shift: shift,
            line: line

        },
        success: function (data) {
            if (data != null) {
                var response = data.recordset;
                if (response.length > 0) {
                    $.each(response, function (i, d) {

                        var row = '<tr>';

                        if (line == 'UPM_Mazzoni') {
                            row += '<td>' + d["RowinsertTime"].split('T')[0] + '</td>';
                            row += '<td>' + d["RowinsertTime"].split('T')[1].split('.')[0] + '</td>';
                            if (d["sShift"] == 1) {
                                shift = 'ShiftA'
                            }
                            else if (d["sShift"] == 2) {
                                shift = 'ShiftB'
                            }
                            else if (d["sShift"] == 3) {
                                shift = 'ShiftC'
                            }
                            row += '<td>' + shift + '</td>';
                            row += '<td>' + d["UPM_Mazzoni"] + '</td>';
                        }
                        if (line == 'UPM_Mazzoni1') {
                            row += '<td>' + d["RowinsertTime"].split('T')[0] + '</td>';
                            row += '<td>' + d["RowinsertTime"].split('T')[1].split('.')[0] + '</td>';
                            if (d["sShift"] == 1) {
                                shift = 'ShiftA'
                            }
                            else if (d["sShift"] == 2) {
                                shift = 'ShiftB'
                            }
                            else if (d["sShift"] == 3) {
                                shift = 'ShiftC'
                            }
                            row += '<td>' + shift + '</td>';
                            row += '<td>' + d["UPM_Mazzoni1"] + '</td>';

                        }
                        if (line == 'UPM_Mazzoni2') {
                            row += '<td>' + d["RowinsertTime"].split('T')[0] + '</td>';
                            row += '<td>' + d["RowinsertTime"].split('T')[1].split('.')[0] + '</td>';
                            if (d["sShift"] == 1) {
                                shift = 'ShiftA'
                            }
                            else if (d["sShift"] == 2) {
                                shift = 'ShiftB'
                            }
                            else if (d["sShift"] == 3) {
                                shift = 'ShiftC'
                            }
                            row += '<td>' + shift + '</td>';
                            row += '<td>' + d["UPM_Mazzoni2"] + '</td>';
                        }

                        if (line == 'UPM_Mazzoni3') {
                            row += '<td>' + d["RowinsertTime"].split('T')[0] + '</td>';
                            row += '<td>' + d["RowinsertTime"].split('T')[1].split('.')[0] + '</td>';
                            if (d["sShift"] == 1) {
                                shift = 'ShiftA'
                            }
                            else if (d["sShift"] == 2) {
                                shift = 'ShiftB'
                            }
                            else if (d["sShift"] == 3) {
                                shift = 'ShiftC'
                            }
                            row += '<td>' + shift + '</td>';
                            row += '<td>' + d["UPM_Mazzoni3"] + '</td>';
                        }


                        row += '</tr>';
                        $('#tblupmunitdata tbody').append(row);

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
    document.getElementById('date_from').value = today;
}


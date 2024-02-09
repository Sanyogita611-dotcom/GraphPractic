
var buttonCommon;
$(document).ready(function () {
    debugger;
    buttonCommon = {
        exportOptions: {
            format: {
                body: function (data, row, column, node) {
                    // Strip $ from salary column to make it numeric
                    return column === 5 ?
                        data.replace(/[$,]/g, '') :
                        data;
                }
            }
        }
    }
    debugger;
    var date = localStorage.getItem('date');
    var Finalshift = window.localStorage.getItem('Shift');
   // var Finalshift =  window.localStorage.getItem('Shift');
    // if (Finalshift == 'Shift1') {
    //     var shift1 = 'Shift A';
    // }
    // else if (Finalshift == 'Shift2') {
    //     var shift1 = 'Shift B';
    // }
    // else if (Finalshift == 'Shift3') {
    //     var shift1 = 'Shift C';
    // }

    var machine = localStorage.getItem('machine');

    document.getElementById("lbldttm").innerHTML = date;//'2021-05-06'
    document.getElementById("shift1").innerHTML = Finalshift;//'Shift1';
    document.getElementById("machine").innerHTML = machine;

    getShiftLossSummeryData(Finalshift);

});

//localStorage.setItem('Shift', Finalshift);
function getShiftLossSummeryData(Finalshift) {
    debugger;
    $('#EventDetailBody').empty();
    $('#tblEventDetail').dataTable().fnClearTable();
    $('#tblEventDetail').dataTable().fnDestroy();

    var selectDate = document.getElementById("lbldttm").innerText;
    var shift = Finalshift;
    var machine = document.getElementById("machine").innerText;

    $.ajax({
        type: 'GET',
        url: '/getShiftLossSummeryData',
        data: { selectDate: selectDate, shift: shift, machine: machine },
        async: false,
        success: function (data) {
            debugger;
            if (data != "") {
                var response = data.recordset;
                if (response.length > 0) {
                    $.each(response, function (i, d) {
                        var k = i + 1;
                        var day = new Date(d["tDate"]);
                        var dateFormat = "Y-m-d";
                        var date = format(day, dateFormat);
                        //const min =parseFloat(d["sum"]/60);
                        const min = moment.utc(d["TotalSec"] * 1000).format('mm:ss');
                        var row1 = '<tr>';
                        row1 += '<td>' + k + '</td>';
                        row1 += '<td>' + date + '</td>';
                        row1 += '<td>' + shift + '</td>';
                        row1 += '<td>' + machine + '</td>';
                        row1 += '<td>' + response[i]["MMPCodeDesc"] + '</td>';
                        row1 += '<td>' + response[i]["MMPLossCodeDesc"] + '</td>';
                        row1 += '<td>' + response[i]["LossDesc"] + '</td>';
                        row1 += '<td>' + min + '</td>';
                        row1 += '</tr>';
                        $('#EventDetailBody').append(row1);

                    });
                }
            }
        }
    });
    $('#tblEventDetail').DataTable({
        dom: 'Bfrtip',
        // paging: false,
        // searching: false,
        buttons: [
            $.extend(true, {}, buttonCommon, {
                extend: 'excelHtml5',
                text: 'Export To Excel',
                color: "blue",
                filename: function () {
                    var filename = new Date();
                    var dateFormat = "Y-m-d H-i";
                    filename = format(filename, dateFormat);
                    var name = "Shift Loss Summery Report" + " " + filename;
                    return name
                }
            }),
        ]
    });


}


// var tableToExcel = (function () {
//     var uri = 'data:application/vnd.ms-excel;base64,',
//         template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>',
//         base64 = function (s) {
//             return window.btoa(unescape(encodeURIComponent(s)))
//         },
//         format = function (s, c) {
//             return s.replace(/{(\w+)}/g, function (m, p) {
//                 return c[p];
//             })
//         }
//     return function (table, name) {
//         name = "Shift Loss summery Report";

//         if (!table.nodeType) table = document.getElementById(table)
//         var ctx = {
//             worksheet: name || 'Worksheet',
//             table: table.innerHTML

//         }
//         var selectDate = document.getElementById("lbldttm").innerText;

//         var filename = "Shift Loss summery Report" + " " + selectDate;
//         // window.location.href = uri + base64(format(template, ctx))
//         var link = document.createElement("a");
//         link.download = filename;
//         link.href = uri + base64(format(template, ctx));
//         link.click();
//     }
// })()


$(document).ready(function () {
    debugger;

    var date = localStorage.getItem('date');
    var shift = localStorage.getItem('Shift');
    var machine = localStorage.getItem('machine');

    document.getElementById("lbldttm").innerHTML = date;
    document.getElementById("shift1").innerHTML = shift;
    document.getElementById("machine").innerHTML = machine;

    getShiftLossSummeryData();

});


function getShiftLossSummeryData() {
    debugger;
    $('#EventDetailBody').empty();

    var selectDate = document.getElementById("lbldttm").innerText;
    var shift = document.getElementById("shift1").innerText;
    var machine = document.getElementById("machine").innerText;

    $.ajax({
        type: 'GET',
        url: '/getShiftLossSummeryData',
        data: { selectDate: selectDate, shift: shift, machine: machine },
        // async: false,
        success: function (data) {
            debugger;
            if (data != "") {
                var response = data.recordset;
                if (response.length > 0) {
                    var tDate = [...new Set(response.map(x => x.tDate))];
                    for (var e = 0; e < tDate.length; e++) {

                        var result = response.filter(ro => String(ro.tDate).includes(tDate[e]));

                        if (result.length > 1) {
                            var row = '<tr style="cursor:pointer;" class="xyz" >';
                            row += '<td>' + '+' + '</td>';

                            var st = result[0]["tDate"];
                            var st1 = st.split("T");
                            var dt = st1[0];
                            row += '<td>' + dt + '</td>';

                            row += '<td>' + '' + '</td>';
                            row += '<td>' + '' + '</td>';
                            row += '<td>' + '' + '</td>';
                            row += '<td>' + '' + '</td>';
                            row += '<td>' + '' + '</td>';
                            row += '<td>' + '' + '</td>';
                            // row += '<td>' + '' + '</td>';
                            // row += '<td>' + '' + '</td>';
                            // row += '<td>' + '' + '</td>';
                        }
                        else {
                            var row = '<tr  class="xyz">';
                            row += '<td>' + '' + '</td>';

                            var st = result[0]["tDate"];
                            var st1 = st.split("T");
                            var dt = st1[0];
                            row += '<td>' + dt + '</td>';

                            row += '<td>' + result[0]["sShift"] + '</td>';
                            row += '<td>' + result[0]["WorkcellDesc"] + '</td>';
                            row += '<td>' + result[0]["MMPCodeDesc"] + '</td>';
                            row += '<td>' + result[0]["MMPLossCodeDesc"] + '</td>';
                            row += '<td>' + result[0]["LossDesc"] + '</td>';
                            row += '<td>' + (result[0]["TotalSec"] / 60).toFixed(2) + '</td>';
                            // row += '<td>' + Math.round(result[0]["AverageSec"] / 60) + '</td>';
                            // row += '<td>' + Math.round(result[0]["MinimumSec"] / 60) + '</td>';
                            // row += '<td>' + Math.round(result[0]["MaximumSec"] / 60) + '</td>';
                            // row += '<td>' + Math.round(result[0]["TotalCount"]) + '</td>';
                            row += '</tr>';

                        }
                        $('#EventDetailBody').append(row);


                        for (var i = 0; i < result.length; i++) {
                            var row1 = '<tr class="abc">';
                            var st = result[i]["tDate"];
                            var st1 = st.split("T");
                            var dt = st1[0];
                            var sr = i + 1
                            row1 += '<td>' + sr + '</td>';
                            row1 += '<td>' + dt + '</td>';
                            row1 += '<td>' + result[i]["sShift"] + '</td>';
                            row1 += '<td>' + result[i]["WorkcellDesc"] + '</td>';
                            row1 += '<td>' + result[i]["MMPCodeDesc"] + '</td>';
                            row1 += '<td>' + result[i]["MMPLossCodeDesc"] + '</td>';
                            row1 += '<td>' + result[i]["LossDesc"] + '</td>';
                            row1 += '<td>' + (result[i]["TotalSec"] / 60).toFixed(2) + '</td>';
                            // row1 += '<td>' + Math.round(result[i]["AverageSec"] / 60) + '</td>';
                            // row1 += '<td>' + Math.round(result[i]["MinimumSec"] / 60) + '</td>';
                            // row1 += '<td>' + Math.round(result[i]["MaximumSec"] / 60) + '</td>';
                            // row1 += '<td>' + Math.round(result[i]["TotalCount"]) + '</td>';
                            row1 += '</tr>';
                            $('#EventDetailBody').append(row1);
                        }
                    }


                    $(function () {

                        $(".abc").hide();
                        $("table").click(function (event) {
                            event.stopPropagation();
                            var $target = $(event.target);

                            if ($target.closest("tr").attr("class") == "abc") {

                            } else {
                                var date = $target.closest("tr").next()[0].childNodes[1]["textContent"]
                                //var date= $target.closest("tr")[0].childNodes[1].textContent
                                var result = response.filter(ro => String(ro.tDate).includes(date));

                                if (result.length > 1) {

                                    $target.closest("tr").nextUntil(" tr.xyz").slideToggle()


                                    if ($target.closest("tr").find("td:first").html() == "+") {
                                        $target.closest("tr").find("td:first").html("-");
                                    }

                                    else {
                                        $target.closest("tr").find("td:first").html("+");
                                    }

                                } else {
                                    $target.closest("tr").next().stop();
                                }
                            }
                        });
                    });
                }
            }
        }
    });
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
        name = "Shift Loss summery Report";

        if (!table.nodeType) table = document.getElementById(table)
        var ctx = {
            worksheet: name || 'Worksheet',
            table: table.innerHTML

        }
        var selectDate = document.getElementById("lbldttm").innerText;

        var filename = "Shift Loss summery Report" + " " + selectDate;
        // window.location.href = uri + base64(format(template, ctx))
        var link = document.createElement("a");
        link.download = filename;
        link.href = uri + base64(format(template, ctx));
        link.click();
    }
})()

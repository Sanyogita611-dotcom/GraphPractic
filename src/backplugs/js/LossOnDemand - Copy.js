var selectedrow, Sdate, Edate, buttonCommon;
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

    var today = new Date();
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    var dateFormat = "Y-m-d";

    date = format(today, dateFormat);
    yesdate = format(yesterday, dateFormat);

    $("#date_from").val(yesdate);
    $("#date_To").val(date);
    getMachineNameLossDemand();
    $('#date_from').on('change', function (e) {
        getMachineNameLossDemand();
    });
    $('#date_To').on('change', function (e) {
        getMachineNameLossDemand();
    });

    $("#EventDetails").hide();
    $("#MMPTable").hide();
    $("#notouchreport").hide();
    $("#ProductionDetail").hide();
    $("#lossdetail").hide();

    $('#ddlreport').on('change', function (e) {
        var Report = document.getElementById("ddlreport").value;

        if (Report == "Loss Summary Report") {
            $("#EventDetails").show();
            $("#ProductionDetail").hide();
            $("#MMPTable").hide();
            $("#lossdetail").hide();
            $("#notouchreport").hide();
        }
        else if (Report == "MMP Report") {
            $("#EventDetails").hide();
            $("#MMPTable").show();
            $("#lossdetail").hide();
            $("#ProductionDetail").hide();
            $("#notouchreport").hide();
        }
        else if (Report == "No Touch Report") {
            $("#EventDetails").hide();
            $("#MMPTable").hide();
            $("#notouchreport").show();
            $("#lossdetail").hide();
            $("#ProductionDetail").hide();
        }
        else if (Report == "Production Report") {
            $("#EventDetails").hide();
            $("#MMPTable").hide();
            $("#notouchreport").hide();
            $("#ProductionDetail").show();
            $("#lossdetail").hide();
        }
        else if (Report == "Loss Detail Report") {
            $("#EventDetails").hide();
            $("#MMPTable").hide();
            $("#notouchreport").hide();
            $("#ProductionDetail").hide();
            $("#lossdetail").show();
        }
    });
});

$(document).mouseup(function (e) {
    // if the target of the click isn't the container nor a descendant of the container
    if (!$("#checkboxes").is(e.target) && $("#checkboxes").has(e.target).length === 0) {
        $("#checkboxes").hide();
    }
});

var expanded = false;
function showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}

var selectedMenu = "";
function checkOptions() {
    els = document.getElementsByName('line[]');
    var qtChecks = 0;
    selectedMenu = "";
    var labl = '';

    if (els[0].checked) {
        for (var ii = 1; ii < els.length; ii++) {

            els[ii].checked = true;
        }
    }
    if (!els[0].checked) {
        for (var ii = 1; ii < els.length; ii++) {

            els[ii].checked = false;
        }
    }

    for (i = 1; i < els.length; i++) {
        if (els[i].checked) {
            if (qtChecks > 0) {
                selectedMenu += ", "
                labl += ", "
            }
            selectedMenu += els[i].value;
            qtChecks++;
        }
    }
}


function getMachineNameLossDemand() {
    debugger;
    var FromDate = document.getElementById("date_from").value;
    var ToDate = document.getElementById("date_To").value;

    if (FromDate == "" || FromDate == null || ToDate == "" || ToDate == null) {
        alert('Something Missing Data..');
    } else {
        $.ajax({
            type: 'GET',
            url: "/getMachineNameLossDemand",
            dataType: 'json',
            async: false,
            data: { yesdate: FromDate, date: ToDate },
            success: function (result) {
                var data = JSON.parse(JSON.stringify(result.recordset));
                var html = '';
                $('#checkboxes').empty();
                if (data.length > 0) {
                    html += '<label> &nbsp;';
                    html += '<input type="checkbox" name="line[]" id="line" value="All Lines" onclick="checkOptions();"/> &nbsp;' + "All Lines" +
                        '</label>';

                    for (var i = 0; i < data.length; i++) {
                        html += '<label for="' + 'line' + i + '"> &nbsp;';
                        html += '<input type="checkbox" name="line[]" id="' + 'line' + i + '" value="' + data[i]["WorkcellDesc"] + '" />' + ' ' + data[i]["WorkcellDesc"] + '</label>';
                    }
                    $('#checkboxes').append(html);
                }
                else {
                    html += '<input type="checkbox" name="line[]" id="line" value="No Machine Found" /> &nbsp;' + "No Machine Found" +
                        '</label>';
                        $('#checkboxes').append(html);     
                }
            }
        });
    }
}

var btnClickCnt = 0

function ViewReport() {
    var Report = document.getElementById("ddlreport").value;
    btnClickCnt = 0
    if (Report == "Loss Summary Report") {
        document.getElementById("l1").innerHTML = Report;
        getShiftLossSummeryData();
    }
    else if (Report == "MMP Report") {
        document.getElementById("l1").innerHTML = Report;
        GetMMPreportData();
    }
    else if (Report == "No Touch Report") {
        document.getElementById("l1").innerHTML = Report;
        notouchdashboard();
    }
    else if (Report == "Production Report") {
        document.getElementById("l1").innerHTML = Report;
        getProductionDetailData();
    }
    else if (Report == "Loss Detail Report") {
        document.getElementById("l1").innerHTML = Report;
        getLossDetailData();
    }
}


function getShiftLossSummeryData() {
    debugger;
    $('#EventDetailBody').empty();
    var FromDate = document.getElementById("date_from").value;
    var ToDate = document.getElementById("date_To").value;
    var shift = document.getElementById("ddlshift").value;

    var linecheck = document.getElementsByName('line[]');
    var line = "";
    for (var i = 0, n = linecheck.length; i < n; i++) {

        if (linecheck[i].checked) {
            if (line == '') {
                line += "'" + linecheck[i].value + "'";
            } else {
                line += ",'" + linecheck[i].value + "'";
            }
        }
    }

    // shiftName = document.getElementsByName('defaultshiftAll');

    // var Checks1 = 0;
    // SelectedShifts = "";
    // var qtChecks = 0;
    // var SelectedColumnValue1 = "";
    // var SelectedColumnName1 = "";
    // SelectedColumnValue1 = "";
    // SelectedColumnName1 += "";
    // debugger;
    // for (i = 1; i < shiftName.length; i++) {
    //     if (shiftName[i].checked) {
    //         // labl1 = document.getElementById('l1' + (i)).innerText;
    //         //labl1 = document.getElementById('l1' + (i - 1)).innerText;
    //         Slabl = document.getElementById('Slabl' + (i - 1)).innerText;
    //         if (qtChecks > 0) {

    //             SelectedColumnValue1 += ","
    //             SelectedColumnName1 += "'";
    //             SelectedColumnName1 += ","
    //             SelectedColumnName1 += "'";
    //         }
    //         SelectedColumnValue1 += shiftName[i].value;
    //         SelectedColumnName1 += Slabl

    //         qtChecks++;
    //     }
    // }
    // var shift = '';
    // shift = "'" + SelectedColumnName1.replace(/^"*|"*$/g, '') + "'"
    // console.log(shift);

    $.ajax({
        type: 'GET',
        url: '/DemandShiftLossSummeryData',
        data: { FromDate: FromDate, ToDate: ToDate, line: line, shift: shift },
        async: false,
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
                            row += '<td>' + '' + '</td>';
                            row += '<td>' + '' + '</td>';
                            row += '<td>' + '' + '</td>';
                            row += '<td>' + '' + '</td>';
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
                            row += '<td>' + Math.round(result[0]["TotalSec"] / 60) + '</td>';
                            row += '<td>' + Math.round(result[0]["AverageSec"] / 60) + '</td>';
                            row += '<td>' + Math.round(result[0]["MinimumSec"] / 60) + '</td>';
                            row += '<td>' + Math.round(result[0]["MaximumSec"] / 60) + '</td>';
                            row += '<td>' + Math.round(result[0]["TotalCount"]) + '</td>';
                            row += '</tr>';

                        }
                      
                        $('#EventDetailBody').append(row);

                        for (var i = 0; i < result.length; i++) {
                            var row1 = '<tr class="abc" style="display:none">';
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
                            row1 += '<td>' + Math.round(result[i]["TotalSec"] / 60) + '</td>';
                            row1 += '<td>' + Math.round(result[i]["AverageSec"] / 60) + '</td>';
                            row1 += '<td>' + Math.round(result[i]["MinimumSec"] / 60) + '</td>';
                            row1 += '<td>' + Math.round(result[i]["MaximumSec"] / 60) + '</td>';
                            row1 += '<td>' + Math.round(result[i]["TotalCount"]) + '</td>';
                            row1 += '</tr>';
                            $('#EventDetailBody').append(row1);
                        }
                    }


                    $(function () {
                        debugger;
                        $(".abc").hide();

                        $("#tblEventDetail").click(function (event) {

                            event.preventDefault();
                            event.stopPropagation()
                            console.log(event)

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
                        }).click();
                    });
                }
            }
        }
    });
}


function GetMMPreportData() {

    var FromDate = document.getElementById("date_from").value;
    var ToDate = document.getElementById("date_To").value;
    var shift = document.getElementById("ddlshift").value;
    
    var linecheck = document.getElementsByName('line[]');
    var line = "";
    for (var i = 0, n = linecheck.length; i < n; i++) {

        if (linecheck[i].checked) {
            if (line == '') {
                line += "'" + linecheck[i].value + "'";
            } else {
                line += ",'" + linecheck[i].value + "'";
            }
        }
    }
   
    $.ajax({
        type: 'GET',
        url: '/DemandMMPreportData',
        data: { FromDate: FromDate, ToDate: ToDate, line: line, shift: shift },
        async: false,
        success: function (data) {
            debugger;

            var table = document.getElementById('tblMMP')
            rows = table.rows;
            if (rows[0].cells.length > 2) {
                for (var i = rows[0].cells.length - 1; i >= 2; i--) {

                    for (var j = 0; j < rows.length; j++) {
                        rows[j].deleteCell(i);
                    }
                }
            }

            var response = data.recordset;
            var arr = response;

            var table = document.createElement("TABLE");
            table.border = "1";

            var coloumnCount = data.rowsAffected;
            //Add header row
            var row = table.insertRow(-1);
            var j = 0;

            for (j = 0; j < coloumnCount; j++) {

                var row = document.getElementById("Tr0");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<th style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].WorkcellDesc + "</th>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(9, 64, 111)");
                $(cell).css("color", "#ffffff");

                var row = document.getElementById("Tr1");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].dDesignSpeed + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(162, 162, 162)");

                var row = document.getElementById("Tr2");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].CLDCount + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(162, 162, 162)");

                var row = document.getElementById("Tr3");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>0</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(162, 162, 162)");

                var row = document.getElementById("Tr4");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].dTotal + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "lightyellow");

                var row = document.getElementById("Tr5");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'></td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                //$(cell).css("background-color", "rgb(9, 64, 111)");

                var row = document.getElementById("Tr6");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + '' + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(162, 162, 162)");

                var row = document.getElementById("Tr7");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + '' + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(191, 176, 249)");

                var row = document.getElementById("Tr8");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626; padding: 8px;'>" + arr[j].dAvailable + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "lightyellow");

                var row = document.getElementById("Tr9");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626; padding: 8px;'></td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                // $(cell).css("background-color", "rgb(9, 64, 111)");

                var row = document.getElementById("Tr10");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].MMPLossCode2 + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", " rgb(162, 162, 162)");

                var row = document.getElementById("Tr11");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].MMPLossCode3 + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", " rgb(162, 162, 162)");

                var row = document.getElementById("Tr12");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].MMPLossCode5 + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", " rgb(162, 162, 162)");

                var row = document.getElementById("Tr13");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].MMPLossCode6 + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(162, 162, 162)");

                var row = document.getElementById("Tr14");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].MMPLossCode7 + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(162, 162, 162)");

                var row = document.getElementById("Tr15");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].MMPLossCode4 + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(162, 162, 162)");

                var row = document.getElementById("Tr16");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].dUnutilizedCapacityLosses + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(191, 176, 249)");

                var row = document.getElementById("Tr17");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].dLoadingTime + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "lightyellow");

                var row = document.getElementById("Tr18");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'></td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                //$(cell).css("background-color", "rgb(9, 64, 111)");

                var row = document.getElementById("Tr19");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].MMPLossCode8 + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(162, 162, 162)");

                var row = document.getElementById("Tr20");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].MMPLossCode9 + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(162, 162, 162)");

                var row = document.getElementById("Tr21");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].MMPLossCode10 + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(162, 162, 162)");

                var row = document.getElementById("Tr22");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].MMPLossCode11 + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(162, 162, 162)");

                var row = document.getElementById("Tr23");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].MMPLossCode12 + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(162, 162, 162)");

                var row = document.getElementById("Tr24");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].dProcessDrivenLosses + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(191, 176, 249)");

                var row = document.getElementById("Tr25");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].dOperatingTime + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "lightyellow");

                var row = document.getElementById("Tr26");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'></td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                // $(cell).css("background-color", "rgb(9, 64, 111)");

                var row = document.getElementById("Tr27");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].MMPLossCode13 + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(162, 162, 162)");

                var row = document.getElementById("Tr28");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].MMPLossCode14 + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(162, 162, 162)");

                var row = document.getElementById("Tr29");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].MMPLossCode15 + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(162, 162, 162)");

                var row = document.getElementById("Tr30");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].MMPLossCode16 + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(162, 162, 162)");

                var row = document.getElementById("Tr31");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].MMPLossCode17 + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(162, 162, 162)");

                var row = document.getElementById("Tr32");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].MMPLossCode18 + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(162, 162, 162)");

                var row = document.getElementById("Tr33");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].MMPLossCode19 + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(162, 162, 162)");

                var row = document.getElementById("Tr34");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].MMPLossCode20 + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(162, 162, 162)");

                var row = document.getElementById("Tr35");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].MMPLossCode21 + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(162, 162, 162)");

                var row = document.getElementById("Tr36");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].dManufacturingPerformanceLosses + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(191, 176, 249)");

                var row = document.getElementById("Tr37");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].dValueOperatingTime + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "lightyellow");

                var row = document.getElementById("Tr38");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].WorkcellDesc + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(9, 64, 111)");
                $(cell).css("color", "white");

                var row = document.getElementById("Tr39");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + (arr[j].dOEE).toFixed(2) + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "lightyellow");

                var row = document.getElementById("Tr40");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].WorkcellDesc + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(9, 64, 111)");
                $(cell).css("color", "white");

                var row = document.getElementById("Tr41");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].dCalculatedVOT + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                // $(cell).css("background-color", "rgb(9, 64, 111)");

                var row = document.getElementById("Tr42");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + (arr[j].dUnaccountedTime).toFixed(2) + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                // $(cell).css("background-color", "rgb(9, 64, 111)");

                var row = document.getElementById("Tr43");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + (arr[j].dUnaccountedPercent).toFixed(2) + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                //$(cell).css("background-color", "rgb(9, 64, 111)");

                var row = document.getElementById("Tr44");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].WorkcellDesc + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(9, 64, 111)");
                $(cell).css("color", "white");

                var row = document.getElementById("Tr45");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].MMPLossCode13Count + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(162, 162, 162)");

                var row = document.getElementById("Tr46");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].MMPLossCode11Count + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "lightyellow");


                var row = document.getElementById("Tr47");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'></td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(162, 162, 162)");

                var row = document.getElementById("Tr48");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'></td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(162, 162, 162)");

                var row = document.getElementById("Tr49");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'></td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(162, 162, 162)");

                var row = document.getElementById("Tr50");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + '' + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "lightyellow");

                var row = document.getElementById("Tr51");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'></td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(162, 162, 162)");

                var row = document.getElementById("Tr52");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'></td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(162, 162, 162)");

                var row = document.getElementById("Tr53");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'></td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "rgb(162, 162, 162)");

                var row = document.getElementById("Tr54");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'></td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "lightyellow");

                var row = document.getElementById("Tr55");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'></td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "lightyellow");

                var row = document.getElementById("Tr56");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'></td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "lightyellow");

                var date = arr[j].tDate.split("T")
                var row = document.getElementById("Tr57");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + date[0] + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "lightyellow");

                var row = document.getElementById("Tr58");
                var cell = row.insertCell(-1);
                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].sShift + "</td>";
                $(cell).css("border", "1px");
                $(cell).css("border-color", "#262626");
                $(cell).css("border-style", "solid");
                $(cell).css("padding", "8px");
                $(cell).css("background-color", "lightyellow");
            }

            if (coloumnCount > 0) {

                $("#MMPDiv").css("display", "block");

            }
        },
        failure: function (response) {
            alert(arr);
        }
    });
}


function getProductionDetailData() {
    debugger;
    // $('#tblProductionDetail').DataTable().destroy();

    $('#ProductionDetailBody').empty();

    var FromDate = document.getElementById("date_from").value;
    var ToDate = document.getElementById("date_To").value;
      var shift = document.getElementById("ddlshift").value;
     
      var linecheck = document.getElementsByName('line[]');
      var line = "";
      for (var i = 0, n = linecheck.length; i < n; i++) {
  
          if (linecheck[i].checked) {
              if (line == '') {
                  line += "'" + linecheck[i].value + "'";
              } else {
                  line += ",'" + linecheck[i].value + "'";
              }
          }
      }

    $.ajax({
        type: 'GET',
        url: '/DemandProductionDetailData',
        data: { FromDate: FromDate, ToDate: ToDate, line: line, shift: shift },
        async: false,
        success: function (data) {
            debugger;
            if (data != "") {
                var response = data.recordset;
                if (response.length > 0) {


                    //  $.each(response, function (i, d) {

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
                            row += '</tr>';
                        }
                        else {
                            var row = '<tr  class="xyz">';
                           // row += '<td>' + '' + '</td>';

                            var st = result[0]["tDate"];
                            var st1 = st.split("T");
                            var dt = st1[0];
                            var sr = e + 1
                            row += '<td>' + sr + '</td>';
                            row += '<td>' + dt + '</td>';
                            row += '<td>' + result[0]["WorkcellDesc"] + '</td>';
                            row += '<td>' + result[0]["CLDCount"] + '</td>';
                            row += '<td>' + result[0]["dOEE"] + '</td>';
                            row += '</tr>';
                        }                      
                        $('#tblProductionDetail').append(row);

                        for (var i = 0; i < result.length; i++) {
                            var row1 = '<tr class="abc" style="display:none">';
                            var st = result[i]["tDate"];
                            var st1 = st.split("T");
                            var dt = st1[0];
                            var sr = i + 1
                            row1 += '<td>' + sr + '</td>';
                            row1 += '<td>' + dt + '</td>';
                            row1 += '<td>' + result[i]["WorkcellDesc"] + '</td>';
                            row1 += '<td>' + result[i]["CLDCount"] + '</td>';
                            row1 += '<td>' + result[i]["dOEE"] + '</td>';
                            row1 += '</tr>';
                            $('#tblProductionDetail').append(row1);
                        }
                    }

                    $(function () {

                        $(".abc").hide();
                       
                        $("#tblProductionDetail").click(function (event) {
                            event.preventDefault();
                            event.stopPropagation()
                       
                            var $target = $(event.target);

                            if ($target.closest("tr").attr("class") == "abc") {

                            } else {

                                var date = $target.closest("tr").next()[0].childNodes[1]["textContent"]
                               
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

                        }).click();
                    });
                }
            }
        }
    });
   
}


function getLossDetailData() {
    debugger;
    $('#tblEventUpdate').DataTable().destroy();

    $('#LossDetailBody').empty();
    var FromDate = document.getElementById("date_from").value;
    var ToDate = document.getElementById("date_To").value;
       var shift = document.getElementById("ddlshift").value;

       var linecheck = document.getElementsByName('line[]');
       var line = "";
       for (var i = 0, n = linecheck.length; i < n; i++) {
   
           if (linecheck[i].checked) {
               if (line == '') {
                   line += "'" + linecheck[i].value + "'";
               } else {
                   line += ",'" + linecheck[i].value + "'";
               }
           }
       }

    $.ajax({
        type: 'GET',
        url: '/DemandLossDetailData',
        data: { FromDate: FromDate, ToDate: ToDate, line: line, shift: shift },
        async: false,
        success: function (data) {
            debugger;
            if (data != "") {
                var response = data.recordset;
                if (response.length > 0) {
                    $.each(response, function (i, d) {
                        var st = d["tStart"];
                        var st1 = st.split("T");
                        var dt = st1[0];
                        var dt1 = st1[1].split(".");
                        var Sdt = dt1[0].split(":");
                        var St = Sdt[0];
                        var st1 = Sdt[1];
                        var startdt = dt + ":" + dt1[0];

                        var endtime = d["tEnd"];
                        var To1 = endtime.split("T");
                        var t = To1[0];
                        var t1 = To1[1].split(".");

                        var EndTm = t + ":" + t1[0];
                        const time = moment.utc(d["lSeconds"] * 1000).format('HH:mm:ss');

                        var row = '<tr>';
                        row += '<td>' + startdt + '</td>';
                        row += '<td>' + EndTm + '</td>';
                        row += '<td>' + time + '</td>';
                        row += '<td>' + d["LossDesc"] + '</td>';
                        row += '</tr>';
                        $('#tblEventUpdate').append(row);

                    });
                }
            }
        }
    });
    $('#tblEventUpdate').DataTable({
        dom: 'Bfrtip',
        buttons: [
            $.extend(true, {}, buttonCommon, {
                extend: 'excelHtml5',
                text: 'Export To Excel',
                color: "blue",
                filename: function () {
                    var filename = new Date();
                    var dateFormat = "Y-m-d H-i";
                    filename = format(filename, dateFormat);
                    var name = "Loss Detail Report" + " " + filename;
                    return name
                }
            }),
        ]
    });
}

function notouchdashboard() {
    debugger;
    $('#notouchreportBody').empty();
    var FromDate = document.getElementById("date_from").value;
    var ToDate = document.getElementById("date_To").value;
    var shift = document.getElementById("ddlshift").value;


    var linecheck = document.getElementsByName('line[]');
    var line = "";
    for (var i = 0, n = linecheck.length; i < n; i++) {

        if (linecheck[i].checked) {
            if (line == '') {
                line += "'" + linecheck[i].value + "'";
            } else {
                line += ",'" + linecheck[i].value + "'";
            }
        }
    }

    $.ajax({
        type: 'GET',
        url: '/NoTouchReport',
        data: { FromDate: FromDate, ToDate: ToDate, line: line, shift: shift },
        async: false,
        success: function (data) {
            debugger;
            if (data != "") {
                var response = JSON.parse(JSON.stringify(data.recordset));
                if (response.length > 0) {

                    $.each(response, function (i, d) {
                        var date = d["tDate"];
                        var d1 = date.split('T');
                        var dt = d1[0];
                        var t = d1[1].split('.');
                        var tm = t[0];
                        var dttm = dt + " " + tm;

                        var row = '<tr>';
                        row += '<td>' + dt + '</td>';
                        row += '<td>' + d["sShift"] + '</td>';
                        row += '<td>' + d["maxlSeconds"].toFixed(2) + '</td>';
                        row += '<td>' + d["avglSeconds"].toFixed(2) + '</td>';
                        row += '<td>' + d["countTouch"] + '</td>';
                        row += '<td>' + d["WorkcellDesc"] + '</td>';
                        row += '</tr>';
                        $('#notouchreportBody').append(row);
                    });
                }
            }
        }
    });
}


function ShowLossDesc(rowIndexOfGridview) {
    debugger;
    $("#Losstbody").empty();
    var FromDate = document.getElementById("date_from").value;
    var ToDate = document.getElementById("date_To").value;

    var linecheck = document.getElementsByName('line[]');
    var line = "";
    for (var i = 0, n = linecheck.length; i < n; i++) {

        if (linecheck[i].checked) {
            if (line == '') {
                line += "'" + linecheck[i].value + "'";
            } else {
                line += ",'" + linecheck[i].value + "'";
            }
        }
    }
  
    var row = rowIndexOfGridview.parentNode.parentNode;
    var rowIndex = row.rowIndex - 1;

    var st = row.cells[1].outerText;
    var tstart = FromDate + " " + st;
    var et = row.cells[2].outerText;
    var tEnd = FromDate + " " + et;

    document.getElementById("lbldate").innerHTML = tstart;

    $.ajax({
        type: 'GET',
        url: '/Demandlossdesc',
        data: { FromDate: FromDate, ToDate: ToDate, line: line, tstart: tstart, tEnd: tEnd },
        async: false,
        success: function (data) {
            debugger;
            if (data != null) {
                var response = data.recordset;
                if (response.length > 0) {
                    $.each(response, function (i, d) {
                        var k = i + 1;
                        var Duration = d["lSeconds"];
                        var LossDesc = d["sEventDesc"];
                        Duration = Duration / 60.0;

                        Duration = Duration.toFixed(2);

                        var row = '<tr>';
                        row += '<td>' + k + '</td>';
                        row += '<td>' + LossDesc + '</td>';
                        row += '<td>' + Duration + '</td>';

                        row += '</tr>';
                        $('#Losstbody').append(row);
                    });
                }
            }

        }
    });

    $("#LossModal").modal('show');

}


var tableToExcelSummery = (function () {
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
        var selectDate = document.getElementById("date_from").value;

        var filename = "Shift Loss summery Report" + " " + selectDate;
        // window.location.href = uri + base64(format(template, ctx))
        var link = document.createElement("a");
        link.download = filename;
        link.href = uri + base64(format(template, ctx));
        link.click();
    }
})()

var tableToExcelProduction = (function () {
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
        name = "Production Report";

        if (!table.nodeType) table = document.getElementById(table)
        var ctx = {
            worksheet: name || 'Worksheet',
            table: table.innerHTML

        }
        var selectDate = document.getElementById("date_from").value;

        var filename = "Production Report" + " " + selectDate;
        // window.location.href = uri + base64(format(template, ctx))
        var link = document.createElement("a");
        link.download = filename;
        link.href = uri + base64(format(template, ctx));
        link.click();
    }
})()

var tableToExcelMMP = (function () {
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
        name = "MMP Report";

        if (!table.nodeType) table = document.getElementById(table)
        var ctx = {
            worksheet: name || 'Worksheet',
            table: table.innerHTML

        }
        var selectDate = document.getElementById("date_from").value;

        var filename = "MMP Report" + " " + selectDate;
        // window.location.href = uri + base64(format(template, ctx))
        var link = document.createElement("a");
        link.download = filename;
        link.href = uri + base64(format(template, ctx));
        link.click();
    }
})()

var tableToExcelLossLive = (function () {
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

        name = "Loss Live Report";

        if (!table.nodeType) table = document.getElementById(table)
        var ctx = {
            worksheet: name || 'Worksheet',
            table: table.innerHTML

        }
        var selectDate = document.getElementById("date_from").value;

        var filename = "Loss Live" + " " + selectDate;
        // window.location.href = uri + base64(format(template, ctx))
        var link = document.createElement("a");
        link.download = filename;
        link.href = uri + base64(format(template, ctx));
        link.click();
    }
})()

var tableToExcelNoTouch = (function () {
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

        name = "No Touch Report";

        if (!table.nodeType) table = document.getElementById(table)
        var ctx = {
            worksheet: name || 'Worksheet',
            table: table.innerHTML

        }
        var selectDate = document.getElementById("date_from").value;

        var filename = "NoTouch Report" + " " + selectDate;
        // window.location.href = uri + base64(format(template, ctx))
        var link = document.createElement("a");
        link.download = filename;
        link.href = uri + base64(format(template, ctx));
        link.click();
    }
})()

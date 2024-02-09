$(document).ready(function () {
    var today = new Date();
    var dateFormat = "Y-m-d";
    var datetimeformat = "Y-m-d H:i";

    today = format(today, dateFormat);

    $("#txt_FromDate").val(today);

    // $("#txtDate").val(date + "T00:00");
    bindmachine();
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

function bindmachine() {
    debugger;
    var html = '';
    $.ajax({
        type: 'GET',
        url: '/getAllMachine',
        success: function (result) {
            var data = JSON.parse(JSON.stringify(result.recordset));

            html += '<label> &nbsp;';
            html += '<input type="checkbox" name="line[]" id="line" value="All Lines" onclick="checkOptions();"/> &nbsp;' + "All Lines" + 
            '</label>';   

            for (var i = 0; i < data.length; i++) {
                    html += '<label for="' + 'line' + i + '"> &nbsp;';
                    html += '<input type="checkbox" name="line[]" id="' + 'line' + i + '" value="' + data[i]["WorkcellDesc"] + '" />' + ' ' + data[i]["WorkcellDesc"] + '</label>';
            }
            $('#checkboxes').append(html);
        }
    })
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
            // labl += els[i].labels[0].innerText;

            qtChecks++;
        }
    }
}

function GetMMPreportData() {
    debugger;
    $("#checkboxes").hide();
    var selectDate = document.getElementById("txt_FromDate").value;
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
        url: '/GetMMPreportData',
        data: { selectDate: selectDate, strShift: shift, str: line},
        async: false,
        success: function (data) {
            debugger;

            if (data != "") {

            var table = document.getElementById('tblMMP')
            rows = table.rows;
            if (rows[0].cells.length > 2) {
                for (var i = rows[0].cells.length - 1; i >= 2; i--) {

                    for (var j = 0; j < rows.length; j++) {
                        rows[j].deleteCell(i);
                    }

                }
            }


            //  var data = (response.d).split('Logicon');
            var response = data.recordset;


            //var arr = JSON.parse(data.recordset);
            var arr = response;

            console.log(arr);

            ////Create a HTML table element
            var table = document.createElement("TABLE");
            table.border = "1";

            //Get number of coloumn
            // var coloumnCount = data[1];
            // var coloumnCount = response.d["WorkcellID"];
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
        }
        },
        failure: function (response) {
            alert(arr);
        }
    });
  
}

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
        var selectDate = document.getElementById("txt_FromDate").value;

        var filename = "MMP Report" + " " + selectDate;
        // window.location.href = uri + base64(format(template, ctx))
        var link = document.createElement("a");
        link.download = filename;
        link.href = uri + base64(format(template, ctx));
        link.click();
    }
})()

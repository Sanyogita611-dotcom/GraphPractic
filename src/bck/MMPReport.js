$(document).ready(function () {
    var today = new Date();
    var dateFormat = "Y-m-d";
    var datetimeformat = "Y-m-d H:i";

    today = format(today, dateFormat);

    $("#txt_FromDate").val(today);

    // $("#txtDate").val(date + "T00:00");
    bindmachine();
    $('#ddltype').on('change', function (e) {
        bindmachine();
    })
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
    var type = document.getElementById("ddltype").value;

    var html = '';
    $.ajax({
        type: 'GET',
        url: '/getTypeMachines',
        data: { type },
        success: function (result) {
            var data = JSON.parse(JSON.stringify(result.recordset));
            html += '<label> &nbsp;';
            html += '<input type="checkbox" name="line[]" id="line" value="All Lines" onclick="checkOptions();"/> &nbsp;' + "All Lines" +
                '</label>';

            for (var i = 0; i < data.length; i++) {
                html += '<label for="' + 'line' + i + '"> &nbsp;';
                html += '<input type="checkbox" name="line[]" id="' + 'line' + i + '" value="' + data[i]["WorkcellDesc"] + '" />' + ' ' + data[i]["WorkcellDesc"] + '</label>';
            }
            $('#checkboxes').html(html);
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
    $('#MMPtbody').empty();
    var selectDate = document.getElementById("txt_FromDate").value;
    var shift = document.getElementById("ddlshift").value;
    var type = document.getElementById("ddltype").value;
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
        url: '/getAllLosses',
        data: { type, line },
        success: function (result) {
            var res = JSON.parse(JSON.stringify(result.recordset));
            if (res.length > 0) {
                var row = '<tr id="Tr0">';
                row += '<td style="background-color: rgb(9, 64, 111); border-width: 1px; padding: 8px; border-style: solid; border-color: black; color: white;">' + 'Description' + '</td>';
                row += '<td style="background-color: rgb(9, 64, 111); border-width: 1px; padding: 8px; border-style: solid; border-color: black; color: white;">' + 'Units' + '</td>';
                row += '</tr>';
                $('#MMPtbody').append(row);

                var row = '<tr id="Tr1">';
                row += '<td style="border-width: 1px; padding: 8px; border-style: solid; background-color: white; border-color: black;">' + 'Date' + '</td>';
                row += '<td style="border-width: 1px; padding: 8px; border-style: solid; background-color: white; border-color: black;">' + 'Date' + '</td>';
                row += '</tr>';
                $('#MMPtbody').append(row);

                var row = '<tr id="Tr2">';
                row += '<td style="border-width: 1px; padding: 8px; border-style: solid; background-color: white; border-color: black;">' + 'Shift' + '</td>';
                row += '<td style="border-width: 1px; padding: 8px; border-style: solid; background-color: white; border-color: black;">' + 'Shift' + '</td>';
                row += '</tr>';
                $('#MMPtbody').append(row);

                var row = '<tr id="Tr3">';
                row += '<td style="border-width: 1px; padding: 8px; border-style: solid; background-color: white; border-color: black;">' + 'Design Speed' + '</td>';
                row += '<td style="border-width: 1px; padding: 8px; border-style: solid; background-color: white; border-color: black;">' + 'Tab. / Min.' + '</td>';
                row += '</tr>';
                $('#MMPtbody').append(row);

                var row = '<tr id="Tr4">';
                row += '<td style="border-width: 1px; padding: 8px; border-style: solid; background-color: white; border-color: black;">' + 'Volume Produced - Good Product' + '</td>';
                row += '<td style="border-width: 1px; padding: 8px; border-style: solid; background-color: white; border-color: black;">' + 'CLD' + '</td>';
                row += '</tr>';
                $('#MMPtbody').append(row);

                var row = '<tr id="Tr5">';
                row += '<td style="border-width: 1px; padding: 8px; border-style: solid; background-color: white; border-color: black;">' + 'Volume Produced - Off Spec Product' + '</td>';
                row += '<td style="border-width: 1px; padding: 8px; border-style: solid; background-color: white; border-color: black;">' + 'CLD' + '</td>';
                row += '</tr>';
                $('#MMPtbody').append(row);

                var row = '<tr id="Tr6">';
                row += '<td style="background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Total Time' + '</td>';
                row += '<td style="background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Mins.' + '</td>';
                row += '</tr>';
                $('#MMPtbody').append(row);

                var row = '<tr id="Tr7">';
                row += '<td style="background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'AVAILABLE TIME' + '</td>';
                row += '<td style="background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Mins.' + '</td>';
                row += '</tr>';
                $('#MMPtbody').append(row);

                var row = '<tr id="Tr8">';
                row += '<td style="background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'LOADING TIME' + '</td>';
                row += '<td style="background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Mins.' + '</td>';
                row += '</tr>';
                $('#MMPtbody').append(row);

                var row = '<tr id="Tr9">';
                row += '<td style="background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'OPERATING TIME' + '</td>';
                row += '<td style="background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Mins.' + '</td>';
                row += '</tr>';
                $('#MMPtbody').append(row);

                var maincode = [...new Set(res.map(x => x.MMPCodeDesc))];
                for (var f = 0; f < maincode.length; f++) {
                    var row = '<tr id="' + "Trmain" + f + '" class="TrMain">';
                    row += '<td style="background-color: #d3d3d373;border-width: 1px; padding: 8px; border-style: solid; border-color: black;text-align:center">' + maincode[f] + '</td>';
                    row += '<td style="background-color: #d3d3d373;border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + '' + '</td>';
                    row += '</tr>';
                    $('#MMPtbody').append(row);

                    var mainlossData = res.filter(dd => (String(dd.MMPCodeDesc)==(maincode[f])));
                    var subcode = [...new Set(mainlossData.map(x => x.MMPLossCodeDesc))];
                    for (i = 0; i < subcode.length; i++) {
                        var row = '<tr id="' + "Trsub" + i + f + '" class="TrSub">';
                        row += '<td style="background-color: lightgray;;border-width: 1px; padding: 8px; border-style: solid; border-color: black;text-align:center">' + subcode[i] + '</td>';
                        row += '<td style="background-color: lightgray;;border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + '' + '</td>';
                        row += '</tr>';
                        $('#MMPtbody').append(row);

                        var sublossData = mainlossData.filter(dd => (String(dd.MMPLossCodeDesc)==(subcode[i])));
                        var level2code=sublossData[0]["CategoryCode"];
                        var SmartTag = [...new Set(sublossData.map(x => x.SmartTag))];
                        for (var e = 0; e < SmartTag.length; e++) {
                            var smartid = SmartTag[e].trim();                           
                            var row = '<tr id="' + smartid + '_' + level2code + '" class="smartloss">';
                            row += '<td style="border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + SmartTag[e] + '</td>';
                            row += '<td style="border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Min.' + '</td>';
                            row += '</tr>';
                            $('#MMPtbody').append(row);
                        }
                        var row = '<tr id="' + subcode[i].trim() + '" class="subloss">';
                        row += '<td style="background-color: rgb(191, 176, 249);border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Total ' + subcode[i] + '</td>';
                        row += '<td style="background-color: rgb(191, 176, 249);border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Min.' + '</td>';
                        row += '</tr>';
                        $('#MMPtbody').append(row);
                    }
                    var row = '<tr id="' + maincode[f].trim() + '_' + f + '" class="mainloss">';
                    row += '<td style="background-color: rgb(174 77 234 / 42%);border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Total ' + maincode[f] + '</td>';
                    row += '<td style="background-color: rgb(174 77 234 / 42%);border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Min.' + '</td>';
                    row += '</tr>';
                    $('#MMPtbody').append(row);
                }

                var row = '<tr id="Tr10">';
                row += '<td style="background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'VALUE OPERATING TIME' + '</td>';
                row += '<td style="background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Mins.' + '</td>';
                row += '</tr>';
                $('#MMPtbody').append(row);

                var row = '<tr id="Tr11">';
                row += '<td style="background-color: rgb(9, 64, 111); border-width: 1px; padding: 8px; border-style: solid; border-color: black;color:white">' + 'CAPACITY UTILISATION, OEE INDEXES &amp; KPI' + '</td>';
                row += '<td style="background-color: rgb(9, 64, 111); border-width: 1px; padding: 8px; border-style: solid; border-color: black;color:white">' + 'Units' + '</td>';
                row += '</tr>';
                $('#MMPtbody').append(row);

                var row = '<tr id="OEE">';
                row += '<td style="background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'OEE' + '</td>';
                row += '<td style="background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + '%' + '</td>';
                row += '</tr>';
                $('#MMPtbody').append(row);

                var row = '<tr id="Tr12">';
                row += '<td style="background-color: rgb(9, 64, 111); border-width: 1px; padding: 8px; border-style: solid; border-color: black;color:white">' + 'TIME ALLOCATION CROSS CHECK' + '</td>';
                row += '<td style="background-color: rgb(9, 64, 111); border-width: 1px; padding: 8px; border-style: solid; border-color: black;color:white">' + 'Units' + '</td>';
                row += '</tr>';
                $('#MMPtbody').append(row);

                var row = '<tr id="Tr13">';
                row += '<td style="border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Calculated Value Operating Time' + '</td>';
                row += '<td style="border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Min.' + '</td>';
                row += '</tr>';
                $('#MMPtbody').append(row);

                var row = '<tr id="Tr14">';
                row += '<td style="border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Calculated Unaccounted For Time' + '</td>';
                row += '<td style="border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Min.' + '</td>';
                row += '</tr>';
                $('#MMPtbody').append(row);

                var row = '<tr id="Tr15">';
                row += '<td style="border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Calculated Unaccounted For Time' + '</td>';
                row += '<td style="border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + '% LoadT' + '</td>';
                row += '</tr>';
                $('#MMPtbody').append(row);

                var row = '<tr id="Tr16">';
                row += '<td style="background-color: rgb(9, 64, 111);border-width: 1px; padding: 8px; border-style: solid; border-color: black;color:white">' + 'OTHER LOSS TREE RELATED KPIS' + '</td>';
                row += '<td style="background-color: rgb(9, 64, 111);border-width: 1px; padding: 8px; border-style: solid; border-color: black;color:white">' + 'Units' + '</td>';
                row += '</tr>';
                $('#MMPtbody').append(row);

                var row = '<tr id="Tr17">';
                row += '<td style="background-color: lightyellow;border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Number Of Breakdowns' + '</td>';
                row += '<td style="background-color: lightyellow;border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Quantity' + '</td>';
                row += '</tr>';
                $('#MMPtbody').append(row);

                var row = '<tr id="Tr18">';
                row += '<td style="background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Number Of Changovers' + '</td>';
                row += '<td style="background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Quantity' + '</td>';
                row += '</tr>';
                $('#MMPtbody').append(row);

                //#region nothing know data 

                // var row = '<tr id="Tr20">';
                // row += '<td background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Format' + '</td>';
                // row += '<td background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Quantity' + '</td>';
                // row += '</tr>';
                // $('#MMPtbody').append(row);

                // var row = '<tr id="Tr21">';
                // row += '<td background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Product' + '</td>';
                // row += '<td background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Quantity' + '</td>';
                // row += '</tr>';
                // $('#MMPtbody').append(row);

                // var row = '<tr id="Tr22">';
                // row += '<td background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Decorations &amp; Others' + '</td>';
                // row += '<td background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Quantity' + '</td>';
                // row += '</tr>';
                // $('#MMPtbody').append(row);

                // var row = '<tr id="Tr23">';
                // row += '<td background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Changover Time' + '</td>';
                // row += '<td background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Min.' + '</td>';
                // row += '</tr>';
                // $('#MMPtbody').append(row);

                // var row = '<tr id="Tr24">';
                // row += '<td background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Format' + '</td>';
                // row += '<td background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Min.' + '</td>';
                // row += '</tr>';
                // $('#MMPtbody').append(row);

                // var row = '<tr id="Tr25">';
                // row += '<td background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Product' + '</td>';
                // row += '<td background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Min.' + '</td>';
                // row += '</tr>';
                // $('#MMPtbody').append(row);

                // var row = '<tr id="Tr26">';
                // row += '<td background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Decorations &amp; Others' + '</td>';
                // row += '<td background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Min.' + '</td>';
                // row += '</tr>';
                // $('#MMPtbody').append(row);

                // var row = '<tr id="Tr27">';
                // row += '<td background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Average Changover Time for Format (ACOT-F)' + '</td>';
                // row += '<td background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'H/Event' + '</td>';
                // row += '</tr>';
                // $('#MMPtbody').append(row);

                // var row = '<tr id="Tr28">';
                // row += '<td background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Average Changover Time for Product (ACOT-P)' + '</td>';
                // row += '<td background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'H/Event' + '</td>';
                // row += '</tr>';
                // $('#MMPtbody').append(row);

                // var row = '<tr id="Tr29">';
                // row += '<td background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'Average Changover Time for Decorations and Others(ACOT-D&O)' + '</td>';
                // row += '<td background-color: lightyellow; border-width: 1px; padding: 8px; border-style: solid; border-color: black;">' + 'H/Event' + '</td>';
                // row += '</tr>';
                // $('#MMPtbody').append(row);
                //#endregion
            }
            var response = [];
            $.ajax({
                type: 'GET',
                url: '/GetMMPreportData',
                data: { selectDate: selectDate, strShift: shift, str: line },
                async: false,
                success: function (data) {
                    debugger;

                    if (data != "") {
                        response = data.recordset;
                        var coloumnCount = data.rowsAffected;
                        if (response.length > 0) {
                            var workcell = [...new Set(response.map(x => x.WorkcellDesc))];
                            workcell.sort();
                            for (var f = 0; f < workcell.length; f++) {
                                var row = document.getElementById("Tr0");
                                var cell = row.insertCell(-1);
                                cell.innerHTML = "<th style='border: 1px solid #262626 !important; padding: 8px;'>" + workcell[f] + "</th>";
                                $(cell).css("border", "1px");
                                $(cell).css("border-color", "#262626");
                                $(cell).css("border-style", "solid");
                                $(cell).css("padding", "8px");
                                $(cell).css("background-color", "rgb(9, 64, 111)");
                                $(cell).css("color", "#ffffff");

                                var machineData = response.filter(dd => (String(dd.WorkcellDesc)==(workcell[f])));
                                var DistinctDate = [...new Set(machineData.map(x => x.tDate))];
                                for (var s = 0; s < DistinctDate.length; s++) {
                                    var dt = DistinctDate[s].split('T');
                                    var row = document.getElementById("Tr1");
                                    var cell = row.insertCell(-1);
                                    cell.innerHTML = "<th style='border: 1px solid #262626 !important; padding: 8px;'>" + dt[0] + "</th>";
                                    $(cell).css("border", "1px");
                                    $(cell).css("border-color", "#262626");
                                    $(cell).css("border-style", "solid");
                                    $(cell).css("padding", "8px");
                                    $(cell).css("background-color", "lightyellow");

                                    var dateData = machineData.filter(dd => (String(dd.tDate).includes(DistinctDate[s])));

                                    var DistinctShift = [...new Set(dateData.map(x => x.sShift))];
                                    DistinctShift.sort();
                                    for (var z = 0; z < DistinctShift.length; z++) {
                                        var row = document.getElementById("Tr2");
                                        var cell = row.insertCell(-1);
                                        cell.innerHTML = "<th style='border: 1px solid #262626 !important; padding: 8px;'>" + DistinctShift[z] + "</th>";
                                        $(cell).css("border", "1px");
                                        $(cell).css("border-color", "#262626");
                                        $(cell).css("border-style", "solid");
                                        $(cell).css("padding", "8px");
                                        $(cell).css("background-color", "lightyellow");

                                        var shiftData = dateData.filter(dd => (String(dd.sShift).includes(DistinctShift[z])));
                                        for (var j = 0; j < shiftData.length; j++) {
                                            var row = document.getElementById("Tr3");
                                            var cell = row.insertCell(-1);
                                            cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + shiftData[j].dDesignSpeed + "</td>";
                                            $(cell).css("border", "1px");
                                            $(cell).css("border-color", "#262626");
                                            $(cell).css("border-style", "solid");
                                            $(cell).css("padding", "8px");
                                            $(cell).css("background-color", "rgb(162, 162, 162)");

                                            var row = document.getElementById("Tr4");
                                            var cell = row.insertCell(-1);
                                            cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + shiftData[j].CLDCount + "</td>";
                                            $(cell).css("border", "1px");
                                            $(cell).css("border-color", "#262626");
                                            $(cell).css("border-style", "solid");
                                            $(cell).css("padding", "8px");
                                            $(cell).css("background-color", "rgb(162, 162, 162)");

                                            var row = document.getElementById("Tr5");
                                            var cell = row.insertCell(-1);
                                            cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>0</td>";
                                            $(cell).css("border", "1px");
                                            $(cell).css("border-color", "#262626");
                                            $(cell).css("border-style", "solid");
                                            $(cell).css("padding", "8px");
                                            $(cell).css("background-color", "rgb(162, 162, 162)");

                                            var row = document.getElementById("Tr6");
                                            var cell = row.insertCell(-1);
                                            cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + shiftData[j].dTotal + "</td>";
                                            $(cell).css("border", "1px");
                                            $(cell).css("border-color", "#262626");
                                            $(cell).css("border-style", "solid");
                                            $(cell).css("padding", "8px");
                                            $(cell).css("background-color", "lightyellow");

                                            var row = document.getElementById("Tr7");
                                            var cell = row.insertCell(-1);
                                            cell.innerHTML = "<td style='border: 1px solid #262626; padding: 8px;'>" + shiftData[j].dAvailable + "</td>";
                                            $(cell).css("border", "1px");
                                            $(cell).css("border-color", "#262626");
                                            $(cell).css("border-style", "solid");
                                            $(cell).css("padding", "8px");
                                            $(cell).css("background-color", "lightyellow");

                                            var row = document.getElementById("Tr8");
                                            var cell = row.insertCell(-1);
                                            cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + shiftData[j].dLoadingTime + "</td>";
                                            $(cell).css("border", "1px");
                                            $(cell).css("border-color", "#262626");
                                            $(cell).css("border-style", "solid");
                                            $(cell).css("padding", "8px");
                                            $(cell).css("background-color", "lightyellow");

                                            var row = document.getElementById("Tr9");
                                            var cell = row.insertCell(-1);
                                            cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + (shiftData[j].dOperatingTime).toFixed(2) + "</td>";
                                            $(cell).css("border", "1px");
                                            $(cell).css("border-color", "#262626");
                                            $(cell).css("border-style", "solid");
                                            $(cell).css("padding", "8px");
                                            $(cell).css("background-color", "lightyellow");

                                            var row = document.getElementById("Tr10");
                                            var cell = row.insertCell(-1);
                                            cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + (shiftData[j].dValueOperatingTime).toFixed(2) + "</td>";
                                            $(cell).css("border", "1px");
                                            $(cell).css("border-color", "#262626");
                                            $(cell).css("border-style", "solid");
                                            $(cell).css("padding", "8px");
                                            $(cell).css("background-color", "lightyellow");

                                            var row = document.getElementById("Tr11");
                                            var cell = row.insertCell(-1);
                                            cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + shiftData[j].WorkcellDesc + "</td>";
                                            $(cell).css("border", "1px");
                                            $(cell).css("border-color", "#262626");
                                            $(cell).css("border-style", "solid");
                                            $(cell).css("padding", "8px");
                                            $(cell).css("background-color", "rgb(9, 64, 111)");
                                            $(cell).css("color", "white");

                                            var row = document.getElementById("OEE");
                                            var cell = row.insertCell(-1);
                                            cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + (shiftData[j].dOEE).toFixed(2) + "</td>";
                                            $(cell).css("border", "1px");
                                            $(cell).css("border-color", "#262626");
                                            $(cell).css("border-style", "solid");
                                            $(cell).css("padding", "8px");
                                            $(cell).css("background-color", "lightyellow");

                                            var row = document.getElementById("Tr12");
                                            var cell = row.insertCell(-1);
                                            cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + shiftData[j].WorkcellDesc + "</td>";
                                            $(cell).css("border", "1px");
                                            $(cell).css("border-color", "#262626");
                                            $(cell).css("border-style", "solid");
                                            $(cell).css("padding", "8px");
                                            $(cell).css("background-color", "rgb(9, 64, 111)");
                                            $(cell).css("color", "white");

                                            var row = document.getElementById("Tr13");
                                            var cell = row.insertCell(-1);
                                            cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + (shiftData[j].dCalculatedVOT).toFixed(2) + "</td>";
                                            $(cell).css("border", "1px");
                                            $(cell).css("border-color", "#262626");
                                            $(cell).css("border-style", "solid");
                                            $(cell).css("padding", "8px");

                                            var row = document.getElementById("Tr14");
                                            var cell = row.insertCell(-1);
                                            cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + (shiftData[j].dUnaccountedTime).toFixed(2) + "</td>";
                                            $(cell).css("border", "1px");
                                            $(cell).css("border-color", "#262626");
                                            $(cell).css("border-style", "solid");
                                            $(cell).css("padding", "8px");

                                            var row = document.getElementById("Tr15");
                                            var cell = row.insertCell(-1);
                                            cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + (shiftData[j].dUnaccountedPercent).toFixed(2) + "</td>";
                                            $(cell).css("border", "1px");
                                            $(cell).css("border-color", "#262626");
                                            $(cell).css("border-style", "solid");
                                            $(cell).css("padding", "8px");

                                            var row = document.getElementById("Tr16");
                                            var cell = row.insertCell(-1);
                                            cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + shiftData[j].WorkcellDesc + "</td>";
                                            $(cell).css("border", "1px");
                                            $(cell).css("border-color", "#262626");
                                            $(cell).css("border-style", "solid");
                                            $(cell).css("padding", "8px");
                                            $(cell).css("background-color", "rgb(9, 64, 111)");
                                            $(cell).css("color", "white");

                                            var row = document.getElementById("Tr17");
                                            var cell = row.insertCell(-1);
                                            cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + shiftData[j].MMPLossCode13Count + "</td>";
                                            $(cell).css("border", "1px");
                                            $(cell).css("border-color", "#262626");
                                            $(cell).css("border-style", "solid");
                                            $(cell).css("padding", "8px");
                                            $(cell).css("background-color", "rgb(162, 162, 162)");

                                            var row = document.getElementById("Tr18");
                                            var cell = row.insertCell(-1);
                                            cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + shiftData[j].MMPLossCode11Count + "</td>";
                                            $(cell).css("border", "1px");
                                            $(cell).css("border-color", "#262626");
                                            $(cell).css("border-style", "solid");
                                            $(cell).css("padding", "8px");
                                            $(cell).css("background-color", "lightyellow");
                                        }
                                    }
                                }
                            }

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

            $.ajax({
                type: 'GET',
                url: '/getAllLossesData',
                data: { selectDate: selectDate, strShift: shift, str: line },
                success: function (res) {
                    if (res != '') {
                        var result = res.recordset;
                        if (result.length > 0) {
                            var shiftData = [];
                            var workcell = [...new Set(response.map(x => x.WorkcellDesc))];
                            for (var f = 0; f < workcell.length; f++) {
                                var machineData = result.filter(dd => (String(dd.WorkcellDesc)==(workcell[f])));
                                if (machineData.length > 0) {
                                    var DistinctDate = [...new Set(machineData.map(x => x.tDate))];
                                    for (var s = 0; s < DistinctDate.length; s++) {
                                        var dateData = machineData.filter(dd => (String(dd.tDate)==(DistinctDate[s])));

                                        var DistinctShift = [...new Set(dateData.map(x => x.sShift))];
                                        DistinctShift.sort();
                                        for (var z = 0; z < DistinctShift.length; z++) {
                                            shiftData = dateData.filter(dd => (String(dd.sShift).includes(DistinctShift[z])));

                                            //#region smart losses
                                            var row1 = document.getElementsByClassName("smartloss");
                                            for (var q = 0; q < row1.length; q++) {
                                                var rowid = (row1[q].id).split('_');
                                                var val = shiftData.filter(dd => (String(dd.LossDesc)==(rowid[0])) 
                                                && (String(dd.MMPLossCodeID)==(rowid[1])));
                                                if (val.length > 0) {
                                                    var smartMin=0;
                                                    for(var f1=0;f1<val.length;f1++){
                                                        var min = parseFloat((val[f1]["TotalSec"]) / 60);
                                                        smartMin+=min;
                                                    }
                                                   
                                                    var row = document.getElementById(row1[q].id);
                                                    var cell = row.insertCell(-1);
                                                    cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + smartMin.toFixed(2) + "</td>";
                                                    $(cell).css("border", "1px");
                                                    $(cell).css("border-color", "#262626");
                                                    $(cell).css("border-style", "solid");
                                                    $(cell).css("padding", "8px");
                                                    $(cell).css("background-color", "rgb(162, 162, 162)");
                                                }
                                                else {
                                                    var row = document.getElementById(row1[q].id);
                                                    var cell = row.insertCell(-1);
                                                    cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + 0 + "</td>";
                                                    $(cell).css("border", "1px");
                                                    $(cell).css("border-color", "#262626");
                                                    $(cell).css("border-style", "solid");
                                                    $(cell).css("padding", "8px");
                                                    $(cell).css("background-color", "rgb(162, 162, 162)");
                                                }
                                            }
                                            //#endregion


                                            var rowsub = document.getElementsByClassName("subloss");
                                            for (var q1 = 0; q1 < rowsub.length; q1++) {
                                                var rowsubid = rowsub[q1].id;
                                                var subdescData = shiftData.filter(dd => (String(dd.MMPLossCodeDesc)==(rowsubid)));
                                                if (subdescData.length > 0) {
                                                    var totalmin = 0;
                                                    for (var t = 0; t < subdescData.length; t++) {
                                                        var tmin = parseFloat((subdescData[t]["TotalSec"]) / 60);
                                                        totalmin += tmin;
                                                    }
                                                    var row = document.getElementById(rowsubid);
                                                    var cell = row.insertCell(-1);
                                                    cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + totalmin.toFixed(2) + "</td>";
                                                    $(cell).css("border", "1px");
                                                    $(cell).css("border-color", "#262626");
                                                    $(cell).css("border-style", "solid");
                                                    $(cell).css("padding", "8px");
                                                    $(cell).css("background-color", "rgb(191, 176, 249)");
                                                }
                                                else {
                                                    var row = document.getElementById(rowsubid);
                                                    var cell = row.insertCell(-1);
                                                    cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + '0' + "</td>";
                                                    $(cell).css("border", "1px");
                                                    $(cell).css("border-color", "#262626");
                                                    $(cell).css("border-style", "solid");
                                                    $(cell).css("padding", "8px");
                                                    $(cell).css("background-color", "rgb(191, 176, 249)");
                                                }
                                            }


                                            var rowmain = document.getElementsByClassName("mainloss");
                                            for (var d = 0; d < rowmain.length; d++) {
                                                var rowmainid = (rowmain[d].id).split('_');
                                                var mainval = shiftData.filter(dd => (String(dd.MMPCodeDesc).includes(rowmainid[0])));
                                                if (mainval.length > 0) {
                                                    var totalMainLossMin = 0;
                                                    for (var t = 0; t < mainval.length; t++) {
                                                        var tmin = parseFloat((mainval[t]["TotalSec"]) / 60);
                                                        totalMainLossMin += tmin;
                                                    }
                                                    var row = document.getElementById(rowmain[d].id);
                                                    var cell = row.insertCell(-1);
                                                    cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + totalMainLossMin.toFixed(2) + "</td>";
                                                    $(cell).css("border", "1px");
                                                    $(cell).css("border-color", "#262626");
                                                    $(cell).css("border-style", "solid");
                                                    $(cell).css("padding", "8px");
                                                    $(cell).css("background-color", "rgb(174 77 234 / 42%)");
                                                }
                                                else {
                                                    var row = document.getElementById(rowmain[d].id);
                                                    var cell = row.insertCell(-1);
                                                    cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + '0' + "</td>";
                                                    $(cell).css("border", "1px");
                                                    $(cell).css("border-color", "#262626");
                                                    $(cell).css("border-style", "solid");
                                                    $(cell).css("padding", "8px");
                                                    $(cell).css("background-color", "rgb(174 77 234 / 42%)");
                                                }
                                            }

                                            var row1 = document.getElementsByClassName("TrMain");
                                            for (var q = 0; q < row1.length; q++) {
                                                var rowid = row1[q].id;
                                                var row = document.getElementById(rowid);
                                                var cell = row.insertCell(-1);
                                                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + '' + "</td>";
                                                $(cell).css("border", "1px");
                                                $(cell).css("border-color", "#262626");
                                                $(cell).css("border-style", "solid");
                                                $(cell).css("padding", "8px");
                                                $(cell).css("background-color", "#d3d3d373");
                                            }

                                            var row2 = document.getElementsByClassName("TrSub");
                                            for (var q = 0; q < row2.length; q++) {
                                                var rowid = row2[q].id;
                                                var row = document.getElementById(rowid);
                                                var cell = row.insertCell(-1);
                                                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + '' + "</td>";
                                                $(cell).css("border", "1px");
                                                $(cell).css("border-color", "#262626");
                                                $(cell).css("border-style", "solid");
                                                $(cell).css("padding", "8px");
                                                $(cell).css("background-color", "lightgray");
                                            }
                                        }
                                    }
                                }
                                else {
                                    if (response.length > 0) {
                                        //#region smart losses
                                        var row1 = document.getElementsByClassName("smartloss");
                                        for (var q = 0; q < row1.length; q++) {
                                            var row = document.getElementById(row1[q].id);
                                            var cell = row.insertCell(-1);
                                            cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + 0 + "</td>";
                                            $(cell).css("border", "1px");
                                            $(cell).css("border-color", "#262626");
                                            $(cell).css("border-style", "solid");
                                            $(cell).css("padding", "8px");
                                            $(cell).css("background-color", "rgb(162, 162, 162)");
                                        }
                                        //#endregion

                                        var rowsub = document.getElementsByClassName("subloss");
                                        for (var q1 = 0; q1 < rowsub.length; q1++) {
                                            var rowsubid = rowsub[q1].id;
                                            var row = document.getElementById(rowsubid);
                                            var cell = row.insertCell(-1);
                                            cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + '0' + "</td>";
                                            $(cell).css("border", "1px");
                                            $(cell).css("border-color", "#262626");
                                            $(cell).css("border-style", "solid");
                                            $(cell).css("padding", "8px");
                                            $(cell).css("background-color", "rgb(191, 176, 249)");
                                        }

                                        var rowmain = document.getElementsByClassName("mainloss");
                                        for (var d = 0; d < rowmain.length; d++) {
                                            var row = document.getElementById(rowmain[d].id);
                                            var cell = row.insertCell(-1);
                                            cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + '0' + "</td>";
                                            $(cell).css("border", "1px");
                                            $(cell).css("border-color", "#262626");
                                            $(cell).css("border-style", "solid");
                                            $(cell).css("padding", "8px");
                                            $(cell).css("background-color", "rgb(174 77 234 / 42%)");
                                        }

                                        var row1 = document.getElementsByClassName("TrMain");
                                        for (var q = 0; q < row1.length; q++) {
                                            var rowid = row1[q].id;

                                            var row = document.getElementById(rowid);
                                            var cell = row.insertCell(-1);
                                            cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + '' + "</td>";
                                            $(cell).css("border", "1px");
                                            $(cell).css("border-color", "#262626");
                                            $(cell).css("border-style", "solid");
                                            $(cell).css("padding", "8px");
                                            $(cell).css("background-color", "#d3d3d373");
                                        }

                                        var row2 = document.getElementsByClassName("TrSub");
                                        for (var q = 0; q < row2.length; q++) {
                                            var rowid = row2[q].id;
                                            var row = document.getElementById(rowid);
                                            var cell = row.insertCell(-1);
                                            cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + '' + "</td>";
                                            $(cell).css("border", "1px");
                                            $(cell).css("border-color", "#262626");
                                            $(cell).css("border-style", "solid");
                                            $(cell).css("padding", "8px");
                                            $(cell).css("background-color", "lightgray");
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            if (response.length > 0) {
                                for (var t = 0; t < response.length; t++) {
                                    //#region smart losses
                                    var row1 = document.getElementsByClassName("smartloss");
                                    for (var q = 0; q < row1.length; q++) {
                                        var row = document.getElementById(row1[q].id);
                                        var cell = row.insertCell(-1);
                                        cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + 0 + "</td>";
                                        $(cell).css("border", "1px");
                                        $(cell).css("border-color", "#262626");
                                        $(cell).css("border-style", "solid");
                                        $(cell).css("padding", "8px");
                                        $(cell).css("background-color", "rgb(162, 162, 162)");
                                    }
                                    //#endregion

                                    var rowsub = document.getElementsByClassName("subloss");
                                    for (var q1 = 0; q1 < rowsub.length; q1++) {
                                        var rowsubid = rowsub[q1].id;
                                        var row = document.getElementById(rowsubid);
                                        var cell = row.insertCell(-1);
                                        cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + '0' + "</td>";
                                        $(cell).css("border", "1px");
                                        $(cell).css("border-color", "#262626");
                                        $(cell).css("border-style", "solid");
                                        $(cell).css("padding", "8px");
                                        $(cell).css("background-color", "rgb(191, 176, 249)");
                                    }

                                    var rowmain = document.getElementsByClassName("mainloss");
                                    for (var d = 0; d < rowmain.length; d++) {
                                        var row = document.getElementById(rowmain[d].id);
                                        var cell = row.insertCell(-1);
                                        cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + '0' + "</td>";
                                        $(cell).css("border", "1px");
                                        $(cell).css("border-color", "#262626");
                                        $(cell).css("border-style", "solid");
                                        $(cell).css("padding", "8px");
                                        $(cell).css("background-color", "rgb(174 77 234 / 42%)");
                                    }

                                    var row1 = document.getElementsByClassName("TrMain");
                                    for (var q = 0; q < row1.length; q++) {
                                        var rowid = row1[q].id;

                                        var row = document.getElementById(rowid);
                                        var cell = row.insertCell(-1);
                                        cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + '' + "</td>";
                                        $(cell).css("border", "1px");
                                        $(cell).css("border-color", "#262626");
                                        $(cell).css("border-style", "solid");
                                        $(cell).css("padding", "8px");
                                        $(cell).css("background-color", "#d3d3d373");
                                    }

                                    var row2 = document.getElementsByClassName("TrSub");
                                    for (var q = 0; q < row2.length; q++) {
                                        var rowid = row2[q].id;
                                        var row = document.getElementById(rowid);
                                        var cell = row.insertCell(-1);
                                        cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + '' + "</td>";
                                        $(cell).css("border", "1px");
                                        $(cell).css("border-color", "#262626");
                                        $(cell).css("border-style", "solid");
                                        $(cell).css("padding", "8px");
                                        $(cell).css("background-color", "lightgray");
                                    }
                                }
                            }
                        }
                    }
                    else {
                        if (response.length > 0) {
                            for (var t = 0; t < response.length; t++) {
                                //#region smart losses
                                var row1 = document.getElementsByClassName("smartloss");
                                for (var q = 0; q < row1.length; q++) {
                                    var row = document.getElementById(row1[q].id);
                                    var cell = row.insertCell(-1);
                                    cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + 0 + "</td>";
                                    $(cell).css("border", "1px");
                                    $(cell).css("border-color", "#262626");
                                    $(cell).css("border-style", "solid");
                                    $(cell).css("padding", "8px");
                                    $(cell).css("background-color", "rgb(162, 162, 162)");
                                }
                                //#endregion

                                var rowsub = document.getElementsByClassName("subloss");
                                for (var q1 = 0; q1 < rowsub.length; q1++) {
                                    var rowsubid = rowsub[q1].id;
                                    var row = document.getElementById(rowsubid);
                                    var cell = row.insertCell(-1);
                                    cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + '0' + "</td>";
                                    $(cell).css("border", "1px");
                                    $(cell).css("border-color", "#262626");
                                    $(cell).css("border-style", "solid");
                                    $(cell).css("padding", "8px");
                                    $(cell).css("background-color", "rgb(191, 176, 249)");
                                }

                                var rowmain = document.getElementsByClassName("mainloss");
                                for (var d = 0; d < rowmain.length; d++) {
                                    var row = document.getElementById(rowmain[d].id);
                                    var cell = row.insertCell(-1);
                                    cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + '0' + "</td>";
                                    $(cell).css("border", "1px");
                                    $(cell).css("border-color", "#262626");
                                    $(cell).css("border-style", "solid");
                                    $(cell).css("padding", "8px");
                                    $(cell).css("background-color", "rgb(174 77 234 / 42%)");
                                }

                                var row1 = document.getElementsByClassName("TrMain");
                                for (var q = 0; q < row1.length; q++) {
                                    var rowid = row1[q].id;

                                    var row = document.getElementById(rowid);
                                    var cell = row.insertCell(-1);
                                    cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + '' + "</td>";
                                    $(cell).css("border", "1px");
                                    $(cell).css("border-color", "#262626");
                                    $(cell).css("border-style", "solid");
                                    $(cell).css("padding", "8px");
                                    $(cell).css("background-color", "#d3d3d373");
                                }

                                var row2 = document.getElementsByClassName("TrSub");
                                for (var q = 0; q < row2.length; q++) {
                                    var rowid = row2[q].id;
                                    var row = document.getElementById(rowid);
                                    var cell = row.insertCell(-1);
                                    cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + '' + "</td>";
                                    $(cell).css("border", "1px");
                                    $(cell).css("border-color", "#262626");
                                    $(cell).css("border-style", "solid");
                                    $(cell).css("padding", "8px");
                                    $(cell).css("background-color", "lightgray");
                                }
                            }
                        }
                    }
                }
            })
        }
    })

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

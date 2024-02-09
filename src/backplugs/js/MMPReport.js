var connectionstr;

$(document).ready(function () {
    var today = new Date();
    var dateFormat = "Y-m-d";
    today = format(today, dateFormat);

    $("#txt_FromDate").val(today);

    getMachineName();

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

$(document).mouseup(function (e) {
    // if the target of the click isn't the container nor a descendant of the container
    if (!$("#checkboxes").is(e.target) && $("#checkboxes").has(e.target).length === 0) {
        $("#checkboxes").hide();
    }
    if (!$("#checkboxes1").is(e.target) && $("#checkboxes1").has(e.target).length === 0) {
        $("#checkboxes1").hide();
    }
});

var expanded1 = false;

function showCheckboxes1() {
    debugger;
    var checkboxes1 = document.getElementById("checkboxes1");
    if (!expanded1) {
        checkboxes1.style.display = "block";
        expanded1 = true;
    } else {
        checkboxes1.style.display = "none";
        expanded1 = false;
    }
}


function checkOptions() {
    els = document.getElementsByName('categories');
    var qtChecks = 0;
    SelectedColumn = "";
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
                SelectedColumn += ", "
                labl += ", "
            }
            SelectedColumn += els[i].value;

            qtChecks++;
        }
    }

}


function checkOptions1() {
    debugger;
    var shiftName = document.getElementsByName('defaultshiftAll');
    var Checks1 = 0;
    SelectedShifts = "";
    var Slabl = '';

    if (shiftName[0].checked) {
        for (var ii = 1; ii < shiftName.length; ii++) {

            shiftName[ii].checked = true;
        }
    }

    for (i = 1; i < shiftName.length; i++) {
        if (shiftName[i].checked) {
            if (Checks1 > 0) {
                SelectedShifts += ", "
                Slabl += ", "
            }
            SelectedShifts += shiftName[i].value;

            Checks1++;
        }
    }

}


function getMachineName() {
    debugger;
    var selectDate = document.getElementById("txt_FromDate").value;

    shiftName = document.getElementsByName('defaultshiftAll');
    shiftName1 = document.getElementsByName('defaultshiftAll').values;
    var Checks1 = 0;
    SelectedShifts = "";
    var qtChecks = 0;
    var SelectedColumnValue = "";
    var SelectedColumnName = "";
    SelectedColumnValue = "";
    SelectedColumnName += "";
    debugger;
    for (i = 1; i < shiftName.length; i++) {
        if (shiftName[i].checked) {
            // labl1 = document.getElementById('l1' + (i)).innerText;
            //labl1 = document.getElementById('l1' + (i - 1)).innerText;
            Slabl = document.getElementById('Slabl' + (i - 1)).value;
            if (qtChecks > 0) {

                SelectedColumnValue += ","
                SelectedColumnName += "'";
                SelectedColumnName += ","
                SelectedColumnName += "'";
            }
            SelectedColumnValue += shiftName[i].value;
            SelectedColumnName += Slabl

            qtChecks++;
        }
    }
    var str = '';
    str = "'" + SelectedColumnName.replace(/^"*|"*$/g, '') + "'"
    console.log(str);
    $.ajax({

        type: 'GET',
        url: "/getMachineName",
        dataType: 'json',
        async: false,
        //  data: { selectDate: selectDate, str: str, connectionstr: connectionstr },

        success: function (result) {
            var response = JSON.parse(JSON.stringify(result.recordset));

            var response = JSON.parse(JSON.stringify(result.recordset));
            var catOptions = ''
            if (response.length > 0) {

                catOptions += "<label style='font-size: 15px;' id='labl'> &nbsp;<input type='checkbox' name='categories' value='' onclick='checkOptions()'/> &nbsp;Select all</label>";
                for (i in response) {

                    catOptions += "<label style='font-size: 15px;' id='labl" + i + "'> &nbsp;<input type='checkbox' name='categories' value='" + response[i]["WorkcellID"] + "'/> &nbsp;" +
                        response[i]["WorkcellDesc"] + "</label>";
                }

            } else {
                catOptions += "<label style='font-size: 15px;' id='labl'>No Machine Found</label>";

            }

            document.getElementById("checkboxes").innerHTML = catOptions;

        }
    });

}


function GetMMPreportData() {
    debugger;
    var selectDate = document.getElementById("txt_FromDate").value;
    var SelectedColumnValue = "";
    var SelectedColumnName = "";
    els = document.getElementsByName('categories');
    var qtChecks = 0;
    SelectedColumnValue = "";
    SelectedColumnName += "";
    for (i = 1; i < els.length; i++) {
        if (els[i].checked) {
            lbl = document.getElementById('labl' + (i - 1)).childNodes[1].defaultValue;
            if (qtChecks > 0) {
                
                SelectedColumnValue += ","
                SelectedColumnName += "'";
                SelectedColumnName += ","
                SelectedColumnName += "'";
            }
            SelectedColumnValue += els[i].value;
            SelectedColumnName += lbl
            qtChecks++;
        }
    }

    // var SelectedColumnName1=+""+SelectedColumnName +"";
    var str = '';
    str = SelectedColumnName.replace(/["']/g, "")// "'" + SelectedColumnName.replace(/^"*|"*$/g, '') + "'"
    console.log(str);
    shiftName = document.getElementsByName('defaultshiftAll');
    var Checks1 = 0;
    SelectedShifts = "";
    var qtChecks = 0;
    var SelectedColumnValue1 = "";
    var SelectedColumnName1 = "";
    SelectedColumnValue1 = "";
    SelectedColumnName1 += "";
    for (i = 1; i < shiftName.length; i++) {
        if (shiftName[i].checked) {
            // labl1 = document.getElementById('l1' + (i)).innerText;
            //labl1 = document.getElementById('l1' + (i - 1)).innerText;
            Slabl = document.getElementById('Slabl' + (i - 1)).value;
            if (qtChecks > 0) {

                SelectedColumnValue1 += ","
                SelectedColumnName1 += "'";
                SelectedColumnName1 += ","
                SelectedColumnName1 += "'";
            }
            SelectedColumnValue1 += shiftName[i].value;
            SelectedColumnName1 += Slabl

            qtChecks++;
        }
    }
    var strShift = '';
    strShift = SelectedColumnName1.replace(/["']/g, ""); //"'" + SelectedColumnName1.replace(/^"*|"*$/g, '') + "'"
    console.log(strShift);
    var lineArr = str.split(",")
    var shiftArr = [];
    debugger;
    // var line1 = str.split(",")
    // for (var l = 0; l < line1.length; l++) {
    //     var line = line1[l].replace(/["']/g, "").split(" ")
    //     lineArr.push("100000" + line[1])
    // }
    // lineArr = lineArr.join(",")
    var shift1 = strShift.split(",")
    for (var l = 0; l < shift1.length; l++) {
        var shift = shift1[l].replace(/["']/g, "").split(" ")
        shiftArr.push(shift[1])
    }
    shiftArr = shiftArr.join(",")
    var DesignSpeed = [];
    $.ajax({
        type: 'GET',
        url: '/getDSP',
        data: { selectDate: selectDate, shiftArr: shiftArr, lineArr: lineArr },
        async: false,
        success: function (data) {
            var response = JSON.parse(JSON.stringify(data))
            // var lineArr = lineArr.split(",")
            for (var l1 = 0; l1 < lineArr.length; l1++) {
                var lineData = response.recordset.filter(x => x.lOEEConfigWorkCellId == lineArr[l1].replace(/["']/g, ""))
                console.log(lineData)
                // sku 1= ds1 = notmaldesignspd * sku gram / 1000
                // sku 2= ds2 = notmaldesignspd * sku gram / 1000
                // orignaldesingspeed=   ds1*runtime1 + ds2* runtime2 / runtime1 * runtime2
                var ndp = [];
                var runSec = [];
                if (lineData.length > 0) {
                    for (var l2 = 0; l2 < lineData.length; l2++) {
                        ndp.push(((lineData[l2].DesignSpeed * lineData[l2].SKUGrammge) / 1000) * lineData[l2].runSec)
                        runSec.push(lineData[l2].runSec)
                    }
                    if (ndp.length == 1) {
                        DesignSpeed.push({
                            "odp": ndp[0] / runSec[0],
                            "line": lineData[0].lOEEConfigWorkCellId
                        })
                    } else {
                        DesignSpeed.push({
                            "odp": (ndp[0] + ndp[1]) / (runSec[0] + runSec[1]),
                            "line": lineData[0].lOEEConfigWorkCellId
                        })
                    }
                    console.log(DesignSpeed)
                }
            }
            $.ajax({
                type: 'GET',
                url: '/GetMainMMP',
                data: { selectDate: selectDate, strShift: strShift, str: str },
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

                        //var data = (response.d).split('Logicon');
                        var response = data.recordset;
                        //var arr = JSON.parse(data.recordset);
                        var arr = response;
                        console.log(arr);
                        ////Create a HTML table element
                        var table = document.createElement("TABLE");
                        table.border = "1";
                        //Get number of coloumn
                        //var coloumnCount = data[1];
                        //var coloumnCount = response.d["WorkcellID"];
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

                            var row = document.getElementById("Tr969");
                            var cell = row.insertCell(-1);
                            cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].sPartId + "</td>";
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

                            var row = document.getElementById("Tr361");
                            var cell = row.insertCell(-1);

                            var dunaold = arr[j].dUnaccountedTimeOld;

                            if (dunaold >= 0) {

                                // cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" +0+ "</td>";
                                // $(cell).css("border", "1px");
                                // $(cell).css("border-color", "#262626");
                                // $(cell).css("border-style", "solid");
                                // $(cell).css("padding", "8px");
                                // $(cell).css("background-color", "rgb(191, 176, 249)");

                                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].dUnaccountedTimeOld + "</td>";
                                $(cell).css("border", "1px");
                                $(cell).css("border-color", "#262626");
                                $(cell).css("border-style", "solid");
                                $(cell).css("padding", "8px");
                                $(cell).css("background-color", "rgb(191, 176, 249)");


                            } else {

                                // cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].dUnaccountedTimeOld + "</td>";
                                // $(cell).css("border", "1px");
                                // $(cell).css("border-color", "#262626");
                                // $(cell).css("border-style", "solid");
                                // $(cell).css("padding", "8px");
                                // $(cell).css("background-color", "rgb(191, 176, 249)");

                                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + 0 + "</td>";
                                $(cell).css("border", "1px");
                                $(cell).css("border-color", "#262626");
                                $(cell).css("border-style", "solid");
                                $(cell).css("padding", "8px");
                                $(cell).css("background-color", "rgb(191, 176, 249)");

                            }

                            var row = document.getElementById("Tr37");
                            var cell = row.insertCell(-1);
                            cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].dCalculatedVOTOld + "</td>";
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

                            // DesignSpeed.push({
                            //     "odp": ndp[0] / runSec[0],
                            //     "line": lineData[0].lOEEConfigWorkCellId
                            // })
                            debugger;
                            var odpData = DesignSpeed.filter(x => x.line == arr[j].WorkcellID)
                            var finalOEE = 0
                            if (odpData.length > 0) {

                                var odpdata1 = odpData[0].odp

                                if (odpdata1 > 0) {

                                    var odpval = odpData[0].odp / 60

                                } else {
                                    var odpval = 0

                                }

                                // finalOEE = (odpData[0].odp * arr[j].dGoodParts / arr[j].dValueOperatingTime) 
                                // finalOEE = (odpval * arr[j].dGoodParts / arr[j].dValueOperatingTime * 60)

                                var numerator = odpval * arr[j].dGoodParts
                                var denominator = arr[j].dValueOperatingTime * 60

                                finalOEE = numerator / denominator * 100

                            } else if (odpData == NaN) {

                                finalOEE = arr[j].dOEE

                            }
                            else {

                                finalOEE = arr[j].dOEE
                            }

                            if (finalOEE == 'NaN') {

                                finalOEE = arr[j].dOEE

                            }


                            var row = document.getElementById("Tr39");
                            var cell = row.insertCell(-1);
                            cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + finalOEE.toFixed(2) + "</td>";
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
                            cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + arr[j].dCalculatedVOT.toFixed(2) + "</td>";
                            $(cell).css("border", "1px");
                            $(cell).css("border-color", "#262626");
                            $(cell).css("border-style", "solid");
                            $(cell).css("padding", "8px");
                            // $(cell).css("background-color", "rgb(9, 64, 111)");

                            var duntime = arr[j].dUnaccountedTime;

                            if (duntime >= 0) {

                                // var row = document.getElementById("Tr42");
                                // var cell = row.insertCell(-1);
                                // cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + 0 + "</td>";
                                // $(cell).css("border", "1px");
                                // $(cell).css("border-color", "#262626");
                                // $(cell).css("border-style", "solid");
                                // $(cell).css("padding", "8px");
                                // // $(cell).css("background-color", "rgb(9, 64, 111)");

                                var row = document.getElementById("Tr42");
                                var cell = row.insertCell(-1);
                                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + (arr[j].dUnaccountedTime).toFixed(2) + "</td>";
                                $(cell).css("border", "1px");
                                $(cell).css("border-color", "#262626");
                                $(cell).css("border-style", "solid");
                                $(cell).css("padding", "8px");
                                // $(cell).css("background-color", "rgb(9, 64, 111)");

                            } else {

                                // var row = document.getElementById("Tr42");
                                // var cell = row.insertCell(-1);
                                // cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + (arr[j].dUnaccountedTime).toFixed(2) + "</td>";
                                // $(cell).css("border", "1px");
                                // $(cell).css("border-color", "#262626");
                                // $(cell).css("border-style", "solid");
                                // $(cell).css("padding", "8px");
                                // // $(cell).css("background-color", "rgb(9, 64, 111)");

                                var row = document.getElementById("Tr42");
                                var cell = row.insertCell(-1);
                                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + 0 + "</td>";
                                $(cell).css("border", "1px");
                                $(cell).css("border-color", "#262626");
                                $(cell).css("border-style", "solid");
                                $(cell).css("padding", "8px");
                                // $(cell).css("background-color", "rgb(9, 64, 111)");

                            }

                            var duntimepercent = arr[j].dUnaccountedPercent;

                            if (duntimepercent >= 0) {

                                // var row = document.getElementById("Tr43");
                                // var cell = row.insertCell(-1);
                                // cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + 0 + "</td>";
                                // $(cell).css("border", "1px");
                                // $(cell).css("border-color", "#262626");
                                // $(cell).css("border-style", "solid");
                                // $(cell).css("padding", "8px");
                                // //$(cell).css("background-color", "rgb(9, 64, 111)");

                                var row = document.getElementById("Tr43");
                                var cell = row.insertCell(-1);
                                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + (arr[j].dUnaccountedPercent).toFixed(2) + "</td>";
                                $(cell).css("border", "1px");
                                $(cell).css("border-color", "#262626");
                                $(cell).css("border-style", "solid");
                                $(cell).css("padding", "8px");
                                //$(cell).css("background-color", "rgb(9, 64, 111)");

                            } else {

                                // var row = document.getElementById("Tr43");
                                // var cell = row.insertCell(-1);
                                // cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + (arr[j].dUnaccountedPercent).toFixed(2) + "</td>";
                                // $(cell).css("border", "1px");
                                // $(cell).css("border-color", "#262626");
                                // $(cell).css("border-style", "solid");
                                // $(cell).css("padding", "8px");
                                // //$(cell).css("background-color", "rgb(9, 64, 111)");

                                var row = document.getElementById("Tr43");
                                var cell = row.insertCell(-1);
                                cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + 0 + "</td>";
                                $(cell).css("border", "1px");
                                $(cell).css("border-color", "#262626");
                                $(cell).css("border-style", "solid");
                                $(cell).css("padding", "8px");
                                //$(cell).css("background-color", "rgb(9, 64, 111)");

                            }

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

                            // var row = document.getElementById("Tr47");
                            // var cell = row.insertCell(-1);
                            // cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'></td>";
                            // $(cell).css("border", "1px");
                            // $(cell).css("border-color", "#262626");
                            // $(cell).css("border-style", "solid");
                            // $(cell).css("padding", "8px");
                            // $(cell).css("background-color", "rgb(162, 162, 162)");

                            // var row = document.getElementById("Tr48");
                            // var cell = row.insertCell(-1);
                            // cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'></td>";
                            // $(cell).css("border", "1px");
                            // $(cell).css("border-color", "#262626");
                            // $(cell).css("border-style", "solid");
                            // $(cell).css("padding", "8px");
                            // $(cell).css("background-color", "rgb(162, 162, 162)");

                            // var row = document.getElementById("Tr49");
                            // var cell = row.insertCell(-1);
                            // cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'></td>";
                            // $(cell).css("border", "1px");
                            // $(cell).css("border-color", "#262626");
                            // $(cell).css("border-style", "solid");
                            // $(cell).css("padding", "8px");
                            // $(cell).css("background-color", "rgb(162, 162, 162)");

                            // var row = document.getElementById("Tr50");
                            // var cell = row.insertCell(-1);
                            // cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + '' + "</td>";
                            // $(cell).css("border", "1px");
                            // $(cell).css("border-color", "#262626");
                            // $(cell).css("border-style", "solid");
                            // $(cell).css("padding", "8px");
                            // $(cell).css("background-color", "lightyellow");

                            // var row = document.getElementById("Tr51");
                            // var cell = row.insertCell(-1);
                            // cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'></td>";
                            // $(cell).css("border", "1px");
                            // $(cell).css("border-color", "#262626");
                            // $(cell).css("border-style", "solid");
                            // $(cell).css("padding", "8px");
                            // $(cell).css("background-color", "rgb(162, 162, 162)");

                            // var row = document.getElementById("Tr52");
                            // var cell = row.insertCell(-1);
                            // cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'></td>";
                            // $(cell).css("border", "1px");
                            // $(cell).css("border-color", "#262626");
                            // $(cell).css("border-style", "solid");
                            // $(cell).css("padding", "8px");
                            // $(cell).css("background-color", "rgb(162, 162, 162)");

                            // var row = document.getElementById("Tr53");
                            // var cell = row.insertCell(-1);
                            // cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'></td>";
                            // $(cell).css("border", "1px");
                            // $(cell).css("border-color", "#262626");
                            // $(cell).css("border-style", "solid");
                            // $(cell).css("padding", "8px");
                            // $(cell).css("background-color", "rgb(162, 162, 162)");

                            // var row = document.getElementById("Tr54");
                            // var cell = row.insertCell(-1);
                            // cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'></td>";
                            // $(cell).css("border", "1px");
                            // $(cell).css("border-color", "#262626");
                            // $(cell).css("border-style", "solid");
                            // $(cell).css("padding", "8px");
                            // $(cell).css("background-color", "lightyellow");

                            // var row = document.getElementById("Tr55");
                            // var cell = row.insertCell(-1);
                            // cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'></td>";
                            // $(cell).css("border", "1px");
                            // $(cell).css("border-color", "#262626");
                            // $(cell).css("border-style", "solid");
                            // $(cell).css("padding", "8px");
                            // $(cell).css("background-color", "lightyellow");

                            // var row = document.getElementById("Tr56");
                            // var cell = row.insertCell(-1);
                            // cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'></td>";
                            // $(cell).css("border", "1px");
                            // $(cell).css("border-color", "#262626");
                            // $(cell).css("border-style", "solid");
                            // $(cell).css("padding", "8px");
                            // $(cell).css("background-color", "lightyellow");

                            var date = arr[j].tDate.split("T")
                            var row = document.getElementById("Tr57");
                            var cell = row.insertCell(-1);
                            cell.innerHTML = "<td style='border: 1px solid #262626 !important; padding: 8px;'>" + selectDate + "</td>";
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





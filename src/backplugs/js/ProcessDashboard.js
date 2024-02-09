var sShift, currdate;
var dTotal;
var FinalDate = window.localStorage.getItem('date');
var FinalShift = window.localStorage.getItem('Shift');
var FinalMachine = window.localStorage.getItem('machine')
if (FinalMachine != 'Process') {
    window.location.href = "/LiveDashboard.html";
}

function redirectLoss() {
    window.location.href = "/LossLive.html?Report";
}

$(document).ready(function () {
    debugger;
    $("#pieChartCanvas").click(
        function (evt) {
            window.location.href = "/WaterFallChart.html?dTotal-" + dTotal;
        }
    );

    if (FinalDate != '') {

        document.getElementById("lbldate").innerHTML = FinalDate;
        document.getElementById("lblshift").innerHTML = FinalShift;
        document.getElementById("machine").innerHTML = FinalMachine;
    } else {

        var today = new Date();
        var dateFormat = "Y-m-d";
        var datetimeformat = "Y-m-d H:i:s";

        var Edate = format(today, datetimeformat);
        FinalDate = format(today, dateFormat);

        //Shift value
        var lblshift = FinalDate + " " + "06:00:00";
        var shift2 = FinalDate + " " + "14:00:00";
        var shift3 = FinalDate + " " + "22:00:00";
        var midnight = FinalDate + " " + "23:59:59";

        var newday = new Date();
        newday.setDate(newday.getDate() - 1);
        var d = newday.getDate();
        var m = newday.getMonth() + 1;
        var y = newday.getFullYear();

        newday = y + "-" + m + "-" + d + " " + "22:00:00";

        if (new Date(Edate).valueOf() >= new Date(lblshift).valueOf() &&
            new Date(Edate).valueOf() < new Date(shift2).valueOf()) {

            FinalShift = "Shift1";

        }
        else if (new Date(Edate).valueOf() >= new Date(shift2).valueOf() &&
            new Date(Edate).valueOf() < new Date(shift3).valueOf()) {
            FinalShift = "Shift2";
        }
        else if (new Date(Edate).valueOf() >= new Date(newday).valueOf() && new Date(Edate).valueOf() < new Date(lblshift).valueOf()
            || new Date(Edate).valueOf() >= new Date(shift3).valueOf()) {
            if (new Date(Edate).valueOf() >= new Date(shift3).valueOf()
                && new Date(Edate).valueOf() < new Date(midnight).valueOf()
            ) {
                FinalShift = "Shift3";
            }
            if (new Date(Edate).valueOf() >= new Date(newday).valueOf() && new Date(Edate).valueOf() < new Date(lblshift).valueOf()) {
                FinalShift = "Shift3";
            }
        }

        document.getElementById("lbldate").innerHTML = FinalDate;
        document.getElementById("lblshift").innerHTML = FinalShift;
        document.getElementById("machine").innerHTML = FinalMachine;

    }

    getconnection();

});

setInterval(() => {
    RefreshData();    
}, 300000);

function RefreshData() {
    var today = new Date();
    var dateFormat = "Y-m-d";
    var datetimeformat = "Y-m-d H:i:s";

    var Edate = format(today, datetimeformat);
    FinalDate = format(today, dateFormat);

    //Shift value
    var lblshift = FinalDate + " " + "06:00:00";
    var shift2 = FinalDate + " " + "14:00:00";
    var shift3 = FinalDate + " " + "22:00:00";
    var midnight = FinalDate + " " + "23:59:59";

    var newday = new Date();
    newday.setDate(newday.getDate() - 1);
    var d = newday.getDate();
    var m = newday.getMonth() + 1;
    var y = newday.getFullYear();

    newday = y + "-" + m + "-" + d + " " + "22:00:00";

    if (new Date(Edate).valueOf() >= new Date(lblshift).valueOf() &&
        new Date(Edate).valueOf() < new Date(shift2).valueOf()) {

        FinalShift = "Shift 1";

    }
    else if (new Date(Edate).valueOf() >= new Date(shift2).valueOf() &&
        new Date(Edate).valueOf() < new Date(shift3).valueOf()) {
        FinalShift = "Shift 2";
    }
    else if (new Date(Edate).valueOf() >= new Date(newday).valueOf() && new Date(Edate).valueOf() < new Date(lblshift).valueOf()
        || new Date(Edate).valueOf() >= new Date(shift3).valueOf()) {
        if (new Date(Edate).valueOf() >= new Date(shift3).valueOf()
            && new Date(Edate).valueOf() < new Date(midnight).valueOf()
        ) {
            FinalShift = "Shift 3";
        }
        if (new Date(Edate).valueOf() >= new Date(newday).valueOf() && new Date(Edate).valueOf() < new Date(lblshift).valueOf()) {
            FinalShift = "Shift 3";
        }
    }

    document.getElementById("lbldate").innerHTML = FinalDate;
    document.getElementById("lblshift").innerHTML = FinalShift;
    document.getElementById("machine").innerHTML = FinalMachine;

    localStorage.setItem('machine', FinalMachine);
    localStorage.setItem('date', FinalDate);
    localStorage.setItem('Shift', FinalShift);

    window.location.reload();
    //window.history.replaceState({}, document.title, "/" + "Dashboard.html");
}

function getconnection() {
    //  debugger;
    var selectDate = document.getElementById("lbldate").innerText;
    var selectShift = document.getElementById("lblshift").innerText;

    var today = new Date();
    var dateFormat = "Y-m-d";
    var datetimeformat = "Y-m-d H:i:s";

    var Edate = format(today, datetimeformat);
    today = format(today, dateFormat);
    currdate = today;

    //Shift value
    var lblshift = today + " " + "06:00:00";
    var shift2 = today + " " + "14:00:00";
    var shift3 = today + " " + "22:00:00";
    var midnight = today + " " + "23:59:59";

    var newday = new Date();
    newday.setDate(newday.getDate() - 1);
    var d = newday.getDate();
    var m = newday.getMonth() + 1;
    var y = newday.getFullYear();

    newday = y + "-" + m + "-" + d + " " + "22:00:00";

    if (new Date(Edate).valueOf() >= new Date(lblshift).valueOf() &&
        new Date(Edate).valueOf() < new Date(shift2).valueOf()) {

        sShift = "Shift 1";

    }
    else if (new Date(Edate).valueOf() >= new Date(shift2).valueOf() &&
        new Date(Edate).valueOf() < new Date(shift3).valueOf()) {
        sShift = "Shift 2";
    }
    else if (new Date(Edate).valueOf() >= new Date(newday).valueOf() && new Date(Edate).valueOf() < new Date(lblshift).valueOf()
        || new Date(Edate).valueOf() >= new Date(shift3).valueOf()) {
        if (new Date(Edate).valueOf() >= new Date(shift3).valueOf()
            && new Date(Edate).valueOf() < new Date(midnight).valueOf()
        ) {
            sShift = "Shift 3";
        }
        if (new Date(Edate).valueOf() >= new Date(newday).valueOf() && new Date(Edate).valueOf() < new Date(lblshift).valueOf()) {
            sShift = "Shift 3";
        }
    }

    $.ajax({
        type: 'GET',
        url: '/getconnection',
        data: { selectDate: selectDate, today: today, sShift: sShift, selectShift: selectShift },
        async: false,
        success: function (data) {
            debugger;
            if (data != null) {
                connectionstr = data;
                console.log("connection succesfully..");
                getBoon1and2Data();
            }
        }
    });
}

function getBoon1and2Data() {
    var selectDate = document.getElementById("lbldate").innerText;
    var shift = document.getElementById("lblshift").innerText;
    var machine = document.getElementById("machine").innerText;
    var day = new Date(selectDate);
    day.setDate(day.getDate() - 1);
    var dateFormat = "Y-m-d";
    var predate = format(day, dateFormat);
    // var sShiftCurrent,sShiftPrevious;
    if (shift == 'Shift 1') {
        var currshift = selectDate + ' 06:00:00';
        var preshift = predate + ' 22:00:00';
        var sShiftCurrent = selectDate + 'T06:00:00.000Z';
        var sShiftPrevious = predate + 'T22:00:00.000Z';
    }
    else if (shift == 'Shift 2') {
        var currshift = selectDate + ' 14:00:00';
        var preshift = selectDate + ' 06:00:00';
        var sShiftCurrent = selectDate + 'T14:00:00.000Z';
        var sShiftPrevious = selectDate + 'T06:00:00.000Z';
    }
    else if (shift == 'Shift 3') {
        var currshift = selectDate + ' 22:00:00';
        var preshift = selectDate + ' 14:00:00';
        var sShiftCurrent = selectDate + 'T22:00:00.000Z';
        var sShiftPrevious = selectDate + 'T14:00:00.000Z';
    }

    $.ajax({
        type: 'GET',
        url: '/getBoon1and2Data',
        data: { currshift, preshift, sShiftPrevious, sShiftCurrent, currdate, sShift, selectDate, shift },
        success: function (data) {
            debugger;
            if (data != "") {
                var response = data;
                if (response.length > 0) {
                    var currData = response.filter(ro => String(ro.tShift).includes(sShiftCurrent));
                    var preData = response.filter(ro => String(ro.tShift).includes(sShiftPrevious));

                    if (currData.length > 0) {
                        var boon1val = currData.filter(ro => String(ro.sFolder).includes('Boon1'));
                        var boon2val = currData.filter(ro => String(ro.sFolder).includes('Boon2'));
                        var boon1 = 0, boon2 = 0;
                        if (boon1val.length > 0) {
                            boon1 = boon1val[0]["val"];
                        }
                        if (boon1val.length > 0) {
                            boon2 = boon2val[0]["val"];
                        }

                        if (preData.length > 0) {
                            var preboon1val = preData.filter(ro => String(ro.sFolder).includes('Boon1'));
                            var preboon2val = preData.filter(ro => String(ro.sFolder).includes('Boon2'));
                            var preboon1 = 0, preboon2 = 0, finalboon1 = 0, finalboon2 = 0;
                            if (preboon1val.length > 0) {
                                preboon1 = preboon1val[0]["val"];
                            }
                            if (preboon2val.length > 0) {
                                preboon2 = preboon2val[0]["val"];
                            }
                            finalboon1 = parseFloat(boon1 - preboon1);
                            finalboon2 = parseFloat(boon2 - preboon2);

                            $('.knobboon1').val(finalboon1).trigger('change');
                            $('.knobboon2').val(finalboon2).trigger('change');
                        }
                        else {
                            $('.knobboon1').val(finalboon1).trigger('change');
                            $('.knobboon2').val(finalboon2).trigger('change');
                        }
                    }
                    else {
                        if (preData.length > 0) {
                            var preboon1val = preData.filter(ro => String(ro.sFolder).includes('Boon1'));
                            var preboon2val = preData.filter(ro => String(ro.sFolder).includes('Boon2'));
                            var preboon1 = 0, preboon2 = 0;
                            if (preboon1val.length > 0) {
                                preboon1 = preboon1val[0]["val"];
                            }
                            if (preboon2val.length > 0) {
                                preboon2 = preboon2val[0]["val"];
                            }

                            $('.knobboon1').val(finalboon1).trigger('change');
                            $('.knobboon2').val(finalboon2).trigger('change');
                        }
                    }
                }
            }
            getOEEData();
        }
    });
}

function getOEEData() {
    // debugger;
    var selectDate = document.getElementById("lbldate").innerText;
    var shift = document.getElementById("lblshift").innerText;
    var machine = document.getElementById("machine").innerText;

    $.ajax({
        type: 'GET',
        url: '/getOEEdata',
        data: { selectDate: selectDate, shift: shift, machine: machine },
        async: false,
        success: function (data) {
            debugger;
            var dOEE, CLDCount, designSpeedVal, badParts, grammage, sPartId, sOperatorId;
            if (data != "") {
                var response = data.recordset;
                if (response.length > 0) {

                    $.each(response, function (i, d) {
                        dOEE = d["dOEEProcess"];
                        if (dOEE > 100) {
                            dOEE = 100;
                        }
                        CLDCount = d["CLDCount"];
                        designSpeedVal = d["dDesignSpeedProcess"];

                        badParts = d["dScrapParts"];
                        grammage = d["Grammage"];
                        dTotal = d["dTotal"];
                        sPartId = d["sPartId"];
                        sOperatorId = d["sOperatorId"];
                    });
                    document.getElementById("oeelbl").innerHTML = dOEE.toFixed(0);
                    document.getElementById("TotalTime").innerHTML = dTotal;
                    document.getElementById("designSpeed").innerHTML = designSpeedVal;
                    document.getElementById("gParts").innerHTML = CLDCount;
                    // document.getElementById("bParts").innerHTML = badParts;
                    document.getElementById("sku").innerHTML = sPartId;
                    document.getElementById("operator1").innerHTML = sOperatorId;

                }
                else {
                    document.getElementById("oeelbl").innerHTML = "0";
                    document.getElementById("TotalTime").innerHTML = "";
                    document.getElementById("designSpeed").innerHTML = "";
                    document.getElementById("gParts").innerHTML = "";
                    // document.getElementById("bParts").innerHTML = "";
                    document.getElementById("sku").innerHTML = "";
                    document.getElementById("operator1").innerHTML = "";

                }
            }


            $.ajax({
                type: 'GET',
                url: '/getMashineStatedata',
                data: { selectDate: selectDate, shift: shift, machine: machine },
                async: false,
                success: function (data) {
                    //  debugger;
                    if (data != "") {
                        var response = data.recordset;
                        if (response.length > 0) {
                            var MachineState, Duration;
                            $.each(response, function (i, d) {
                                MachineState = d["sCategory"];
                                Duration = d["lSeconds"];
                            });

                            if (MachineState == "Activity Area Running - Point") {
                                document.getElementById("Statelbl").innerHTML = "Running";
                                $("#Mstatus").removeClass("bg-danger");
                                $("#Mstatus").addClass("bg-success");
                            }
                            else {
                                document.getElementById("Statelbl").innerHTML = "Down";
                                $("#Mstatus").removeClass("bg-success");
                                $("#Mstatus").addClass("bg-danger");
                            }
                            // const time = moment.utc(Duration * 1000).format('HH:mm:ss');
                            // document.getElementById("duration1").innerHTML = "Since: " + time;
                        }

                    }
                    getGraphData();
                }
            });

        }
    });
}
var chart;
function getGraphData() {
    debugger;
    var selectDate = document.getElementById("lbldate").innerText;
    var shift = document.getElementById("lblshift").innerText;
    var machine = document.getElementById("machine").innerText;
    //  $('#Productiontbody').empty();
    if (chart) {
        chart.destroy();
    }
    $.ajax({
        type: 'GET',
        url: '/getGraphData',
        data: { selectDate: selectDate, shift: shift, machine: machine },
        // async: false,
        success: function (data) {
            debugger;

            var k = 1;
            var OEEvalue = 0.0;
            if (data != "") {
                var response = data.recordset;
                if (response.length > 0) {
                    var dOEE = [], tEnd = [];
                    $.each(response, function (i, d) {
                        var st = d["tStart"];
                        var st1 = st.split("T");
                        var dt = st1[0];
                        var dt1 = st1[1].split(".");
                        var Sdt = dt1[0].split(":");
                        var St = Sdt[0];
                        var st1 = Sdt[1];
                        var startdt = St + ":" + st1 + ":" + Sdt[2];

                        OEEvalue = OEEvalue + d["dOEEProcess"];

                        // var finalOEE = OEEvalue / k;

                        dOEE[i] = OEEvalue.toFixed(0);

                        var endtime = d["tEnd"];
                        var To1 = endtime.split("T");
                        var t = To1[0];
                        var t1 = To1[1].split(".");
                        var Edt = t1[0].split(":");
                        var E = Edt[0];
                        var E1 = Edt[1];
                        var EndTm = E + ":" + E1;
                        var totime = E + ":" + E1 + ":" + Edt[2];
                        tEnd[i] = EndTm;
                        k = k + 1;
                    });
                    chartjs(dOEE, tEnd, "myChart");
                }
            }
            getProductionData();
        }
    });
}

function chartjs(dOEE, tEnd, CanvasId) {
    debugger;
    var MAX = 100, lbl = "OEE", lblstr = "OEE (%)";
    if (CanvasId == 'prodChart') {
        MAX = dOEE[dOEE.length];
        lbl = 'CLDCount';
        lblstr = "CLDCount";
    }
    chart = new Chart(document.getElementById(CanvasId), {

        type: 'line',
        data: {
            labels: tEnd,
            datasets: [
                {
                    label: lbl,
                    backgroundColor: "white",
                    pointBackgroundColor: "#3e95cd",
                    borderColor: "#3e95cd",
                    fill: false,
                    data: dOEE
                }
            ]
        },
        options: {
            legend: { display: true },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: true
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 20
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time',
                        fontSize: 16
                    }

                }],
                yAxes: [{
                    gridLines: {
                        display: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: lblstr,
                        fontSize: 16
                    },
                    ticks: {
                        max: MAX,
                        min: 0,
                        stepSize: 20
                    }
                }]
            },

        }
    });
    chart.render();
}

function getProductionData() {
    // debugger;
    var selectDate = document.getElementById("lbldate").innerText;
    var shift = document.getElementById("lblshift").innerText;
    var machine = document.getElementById("machine").innerText;
    $('#Productiontbody').empty();

    $.ajax({
        type: 'GET',
        url: '/getLossDetailData',
        data: { selectDate: selectDate, shift: shift, machine: machine },
        // async: false,
        success: function (data) {
            debugger;
            if (data != "") {
                var response = data.recordset;
                if (response.length > 0) {
                    $.each(response, function (i, d) {
                        var st1 = d["tStart"].split("T");
                        var dt = st1[0];
                        var dt1 = st1[1].split(".");
                        var startdt = dt + " " + dt1[0];

                        var endtime = d["tEnd"];
                        var To1 = endtime.split("T");
                        var t = To1[0];
                        var t1 = To1[1].split(".");

                        var EndTm = t + " " + t1[0];

                        const time = moment.utc(d["lSeconds"] * 1000).format('HH:mm:ss');

                        var row = '<tr>';
                        row += '<td>' + i + '</td>';
                        row += '<td>' + d["LossDesc"] + '</td>';
                        row += '<td>' + d["RootCause"] + '</td>';
                        row += '<td>' + time + '</td>';
                        row += '</tr>';
                        $('#Productiontbody').append(row);

                    });
                }
            }
            getOPEChart();
        }
    });
}

function getOPEChart() {
    /// debugger;
    var selectDate = document.getElementById("lbldate").innerText;
    var shift = document.getElementById("lblshift").innerText;
    var machine = document.getElementById("machine").innerText;

    $.ajax({
        type: 'GET',
        url: '/getOPEChart',
        data: { selectDate: selectDate, shift: shift, machine: machine },
        //async: false,
        success: function (data) {
            debugger;

            if (data != "") {
                var response = data.recordset;
                if (response.length > 0) {
                    var perarr = [], descarr = [], totalper = 0.0, minarr = [];
                    for (x = 0; x < response.length; x++) {
                        minarr.push(response[x]["LMin"]);
                        var per = ((response[x]["LMin"] / dTotal) * 100);
                        perarr.push(per.toFixed(1));
                        descarr.push(response[x]["LossDesc"]);
                        totalper += parseFloat(per);

                    }
                    totalper = totalper.toFixed(1);
                    if (totalper > 100) {
                        totalper = 100;
                    }
                    var withoutlossper = parseFloat(100 - totalper).toFixed(1);

                    perarr[response.length] = withoutlossper;
                    descarr[response.length] = ("Running");

                    divsparams(withoutlossper, perarr, descarr, minarr, "pieChartCanvas");
                }
                else {
                    divsparams(100, 100, "Running", 100, "pieChartCanvas");
                }
            }
        }
    });
}

var pichart;
function divsparams(totalper, TotalMax, LossDescription, storesecmax3, canvasId) {
    var theHelp = Chart.helpers;
    if (pichart) {
        pichart.destroy();
    }

    pichart = new Chart(document.getElementById(canvasId), {
        type: 'doughnut',
        data: {
            labels: LossDescription,
            datasets: [{
                fill: true,
                backgroundColor: [
                    "#008000",
                    "#FF0000",
                    "#002000",
                    "#2F9AEA",
                    "#090b6b",
                    "#df1bb4", "#2700b0",
                    "#af0000",
                    "#620000",
                    "#62fe00",
                    "#624700",
                    "#62ac00", "#62feb8", "#62fef1", "#270042"

                ],
                data: TotalMax,

            }]
        },

        options: {

            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
                    }
                }
            },
            rotation: -0.7 * Math.PI,
            legend: {
                display: true,
                position: 'top',
                labels: {
                    fontSize: 14,
                    fontStyle: 'bold',
                    generateLabels: function (chart) {
                        var data = chart.data;
                        if (data.labels.length && data.datasets.length) {
                            return data.labels.map(function (label, i) {
                                var meta = chart.getDatasetMeta(0);
                                var ds = data.datasets[0];
                                var arc = meta.data[i];
                                var custom = arc && arc.custom || {};
                                var getValueAtIndexOrDefault = theHelp.getValueAtIndexOrDefault;
                                var arcOpts = chart.options.elements.arc;
                                var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
                                var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
                                var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);
                                return {
                                    // And finally : 
                                    text: label + " " + ds.data[i] + "% ",
                                    fillStyle: fill,
                                    strokeStyle: stroke,
                                    lineWidth: bw,
                                    hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                                    index: i
                                };
                            });
                        }
                        return [];
                    }
                }
            },

            elements: {
                center: {
                    text: totalper + '%',
                    color: '#FF6384', // Default is #000000
                    fontStyle: 'Arial', // Default is Arial
                    sidePadding: 20, // Default is 20 (as a percentage)
                    minFontSize: 20, // Default is 20 (in px), set to false and text will not wrap.
                    lineHeight: 25 // Default is 25 (in px), used for when text wraps
                }
            }

        },
        plugins: [{
            beforeDraw: function (chart) {
                if (chart.config.options.elements.center) {
                    // Get ctx from string
                    var ctx = chart.chart.ctx;

                    // Get options from the center object in options
                    var centerConfig = chart.config.options.elements.center;
                    var fontStyle = centerConfig.fontStyle || 'Arial';
                    var txt = centerConfig.text;
                    var color = centerConfig.color || '#000';
                    var maxFontSize = centerConfig.maxFontSize || 75;
                    var sidePadding = centerConfig.sidePadding || 20;
                    var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
                    // Start with a base font of 30px
                    ctx.font = "30px " + fontStyle;

                    // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                    var stringWidth = ctx.measureText(txt).width;
                    var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

                    // Find out how much the font can grow in width.
                    var widthRatio = elementWidth / stringWidth;
                    var newFontSize = Math.floor(30 * widthRatio);
                    var elementHeight = (chart.innerRadius * 2);

                    // Pick a new font size so it will not be larger than the height of label.
                    var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
                    var minFontSize = centerConfig.minFontSize;
                    var lineHeight = centerConfig.lineHeight || 25;
                    var wrapText = false;

                    if (minFontSize === undefined) {
                        minFontSize = 20;
                    }

                    if (minFontSize && fontSizeToUse < minFontSize) {
                        fontSizeToUse = minFontSize;
                        wrapText = true;
                    }

                    // Set font settings to draw it correctly.
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
                    var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
                    ctx.font = fontSizeToUse + "px " + fontStyle;
                    ctx.fillStyle = color;

                    if (!wrapText) {
                        ctx.fillText(txt, centerX, centerY);
                        return;
                    }

                    // var words = txt.split(' ');
                    // var line = '';
                    // var lines = [];

                    // // Break words up into multiple lines if necessary
                    // for (var n = 0; n < words.length; n++) {
                    //     var testLine = line + words[n] + ' ';
                    //     var metrics = ctx.measureText(testLine);
                    //     var testWidth = metrics.width;
                    //     if (testWidth > elementWidth && n > 0) {
                    //         lines.push(line);
                    //         line = words[n] + ' ';
                    //     } else {
                    //         line = testLine;
                    //     }
                    // }

                    // // Move the center up depending on line height and number of lines
                    // centerY -= (lines.length / 2) * lineHeight;

                    // for (var n = 0; n < lines.length; n++) {
                    //     ctx.fillText(lines[n], centerX, centerY);
                    //     centerY += lineHeight;
                    // }

                    //---Draw text in center
                    //ctx.fillText(line, centerX, centerY);
                    ctx.fillText(txt, centerX, centerY);
                }
            }
        }]


        // plugins: [{
        //     afterDatasetsDraw: function (chartInstance, easing) {
        //         // To only draw at the end of animation, check for easing === 1
        //         var ctx = chartInstance.chart.ctx;
        //         var ctx = document.getElementById('pieChartCanvas').getContext('2d');
        //         chartInstance.data.datasets.forEach(function (dataset, i) {
        //             var meta = chartInstance.getDatasetMeta(i);
        //             if (!meta.hidden) {
        //                 meta.data.forEach(function (element, index) {
        //                     // Draw the text in black, with the specified font
        //                     ctx.fillStyle = 'white';
        //                     var fontSize = 23;
        //                     var fontStyle = 'normal';
        //                     var fontFamily = 'Helvetica Neue';
        //                     ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
        //                     // Just naively convert to string for now
        //                     var dataString = dataset.data[index].toString();
        //                     // var lablestring=data.labels[index].toString();
        //                     // Make sure alignment settings are correct
        //                     ctx.textAlign = 'center';
        //                     ctx.textBaseline = 'middle';
        //                     var padding1 = 15;
        //                     var padding2 = -20;
        //                     var position = element.tooltipPosition();

        //                     ctx.fillText(dataString + '%', position.x, position.y - (fontSize) - padding1);
        //                     ctx.fillText('(' + storesecmax3[index] + 'Mins)', position.x, position.y - (fontSize) - (padding2));
        //                 });
        //             }
        //         });
        //     }
        // }]


    });
    chart.render();
}


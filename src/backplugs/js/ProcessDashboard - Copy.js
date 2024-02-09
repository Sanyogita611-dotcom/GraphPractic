var sShift,currdate;
var myChart;
var FinalDate = window.localStorage.getItem('date');
var FinalShift = window.localStorage.getItem('Shift');
var FinalMachine = window.localStorage.getItem('machine')
if(FinalMachine!='Process')
{
    window.location.href = "/LiveDashboard.html";
}

function redirectLoss() {
    window.location.href = "/LossLive.html";
}

$(document).ready(function () {
    debugger;
    // var url = window.location.search;
    // var date = "";
    // var shift = "";
    // var machine = "";

    if (FinalDate != '') {
        // if (url != '') {
        // url = url.replace("?", '');
        // var fields = url.split('&');
        // var dt1 = decodeURI(fields[0]).split("=");
        // FinalDate = dt1[1];

        // var shift = decodeURI(fields[1]).split("=");
        // FinalShift = shift[1];

        // var mchine = decodeURI(fields[2]).split("=");
        // FinalMachine = mchine[1];

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

    }

    getconnection();

});

// function RefreshData() {
//     var today = new Date();
//     var dateFormat = "Y-m-d";
//     var datetimeformat = "Y-m-d H:i:s";

//     var Edate = format(today, datetimeformat);
//     today = format(today, dateFormat);

//     //Shift value
//     var lblshift = today + " " + "06:00:00";
//     var shift2 = today + " " + "14:00:00";
//     var shift3 = today + " " + "22:00:00";
//     var midnight = today + " " + "23:59:59";

//     var newday = new Date();
//     newday.setDate(newday.getDate() - 1);
//     var d = newday.getDate();
//     var m = newday.getMonth() + 1;
//     var y = newday.getFullYear();

//     newday = y + "-" + m + "-" + d + " " + "22:00:00";

//     if (new Date(Edate).valueOf() >= new Date(lblshift).valueOf() &&
//         new Date(Edate).valueOf() < new Date(shift2).valueOf()) {

//         sShift = "Shift 1";

//     }
//     else if (new Date(Edate).valueOf() >= new Date(shift2).valueOf() &&
//         new Date(Edate).valueOf() < new Date(shift3).valueOf()) {
//         sShift = "Shift 2";
//     }
//     else if (new Date(Edate).valueOf() >= new Date(newday).valueOf() && new Date(Edate).valueOf() < new Date(lblshift).valueOf()
//         || new Date(Edate).valueOf() >= new Date(shift3).valueOf()) {
//         if (new Date(Edate).valueOf() >= new Date(shift3).valueOf()
//             && new Date(Edate).valueOf() < new Date(midnight).valueOf()
//         ) {
//             sShift = "Shift 3";
//         }
//         if (new Date(Edate).valueOf() >= new Date(newday).valueOf() && new Date(Edate).valueOf() < new Date(lblshift).valueOf()) {
//             sShift = "Shift 3";
//         }
//     }

//     document.getElementById("lbldate").innerHTML = today;
//     document.getElementById("lblshift").innerHTML = sShift;
//     getconnection();
//     getOEEData();
//     getGraphData();
//     getProductionData();
//     get5topLoss();
//     window.history.replaceState({}, document.title, "/" + "Dashboard.html");
// }

function getconnection() {
    //  debugger;
    var selectDate = document.getElementById("lbldate").innerText;
    var selectShift = document.getElementById("lblshift").innerText;

    var today = new Date();
    var dateFormat = "Y-m-d";
    var datetimeformat = "Y-m-d H:i:s";

    var Edate = format(today, datetimeformat);
    today = format(today, dateFormat);
    currdate=today;

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
       var  sShiftCurrent=selectDate + 'T06:00:00.000Z';
        var sShiftPrevious=predate + 'T22:00:00.000Z'; 
    }
    else if (shift == 'Shift 2') {
        var currshift = selectDate + ' 14:00:00';
        var preshift = selectDate + ' 06:00:00';
       var sShiftCurrent=selectDate + 'T14:00:00.000Z';
       var sShiftPrevious=selectDate + 'T06:00:00.000Z';
    }
    else if (shift == 'Shift 3') {
        var currshift = selectDate + ' 22:00:00';
        var preshift = selectDate + ' 14:00:00';
        var sShiftCurrent=selectDate + 'T22:00:00.000Z';
        var sShiftPrevious=selectDate + 'T14:00:00.000Z'; 
    }

    $.ajax({
        type: 'GET',
        url: '/getBoon1and2Data',
        data: { currshift, preshift,sShiftPrevious,sShiftCurrent,currdate,sShift,selectDate,shift },
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
                            finalboon1 = parseFloat(boon1-preboon1);
                            finalboon2 = parseFloat(boon2-preboon2);
                             
                            document.getElementById("lblboon1").innerHTML = finalboon1;
                            document.getElementById("lblboon2").innerHTML = finalboon2;
                        }
                        else {
                            document.getElementById("lblboon1").innerHTML = boon1;
                            document.getElementById("lblboon2").innerHTML = boon2;
                        }
                    }
                    else
                    {
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
                              
                            document.getElementById("lblboon1").innerHTML = preboon1;
                            document.getElementById("lblboon2").innerHTML = preboon2;
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
        //async: false,
        success: function (data) {
            debugger;
            var dOEE, CLDCount, designSpeedVal, badParts, grammage, dTotal, sPartId, sOperatorId;
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


                            // document.getElementById("Statelbl").innerHTML = MachineState;

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

                        var finalOEE = OEEvalue / k;

                        dOEE[i] = finalOEE.toFixed(2);

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
           // get5topLoss();
        }
    });
}

// function get5topLoss() {
//     /// debugger;
//     var selectDate = document.getElementById("lbldate").innerText;
//     var shift = document.getElementById("lblshift").innerText;
//     var machine = document.getElementById("machine").innerText;

//     $('#top5lossId').empty();

//     $.ajax({
//         type: 'GET',
//         url: '/gettime',
//         data: { selectDate: selectDate, shift: shift, machine: machine },
//         async: false,
//         success: function (data) {
//             debugger;

//             if (data != "") {
//                 var response = data.recordset;
//                 if (response.length > 0) {
//                     var time = 0.0;
//                     $.each(response, function (i, d) {
//                         time = d["dTotal"];

//                     });
//                     $.ajax({
//                         type: 'GET',
//                         url: '/gettop5loss',
//                         data: { selectDate: selectDate, shift: shift, machine: machine },
//                         //  async: false,
//                         success: function (data) {
//                             debugger;
//                             if (data != "") {
//                                 var response = data.recordset;
//                                 if (response.length > 0) {

//                                     var Lossname = "";
//                                     var fMinutes = 0.0;
//                                     var LossCount = 0;
//                                     var percentage = 0.0;
//                                     var k = response.length;
//                                     var counter = 0;
//                                     if (k > 5) {
//                                         counter = 5;
//                                     }
//                                     else {
//                                         counter = k;
//                                     }

//                                     for (var i = 0; i < counter; i++) {
//                                         Lossname = response[i]["LossDesc"];
//                                         fMinutes = response[i]["TotalSec"];
//                                         fMinutes = fMinutes;
//                                         const interval = moment.utc(fMinutes * 1000).format('HH:mm:ss');

//                                         LossCount = response[i]["TotalCount"];
//                                         percentage = (((fMinutes / 60) / time) * 100).toFixed(0);

//                                         var row = '<tr>';
//                                         row += '<td>' + i + '</td>';
//                                         row += '<td>' + Lossname + '</td>';
//                                         row += '<td>' + LossCount + '</td>';
//                                         row += '<td>' + interval + '</td>';
//                                         row += '<td>' + percentage + '</td>';
//                                         row += '</tr>';
//                                         $('#top5lossId').append(row);
//                                     }

//                                 }
//                             }
//                         }
//                     });

//                 }
//             }

//         }
//     });
// }

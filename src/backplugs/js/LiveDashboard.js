var enddate;
var myChart;
var myChart1;
debugger;

var FinalDate = window.localStorage.getItem('date');
var FinalShift = window.localStorage.getItem('Shift');


//var FinalShift1='Shift A'
// if (FinalShift == 'Shift1') {
//     var FinalShift1 = 'Shift A';
// }
// else if (FinalShift == 'Shift2') {
//     var FinalShift1 = 'Shift B';
// }
// else if (FinalShift == 'Shift3') {
//     var FinalShift1 = 'Shift C';
// }


var FinalMachine = window.localStorage.getItem('machine')

// var FinalDate=''
// var FinalShift=''
// var FinalMachine=''


FinalDate=''
FinalShift=''

if (FinalMachine == 'Process') {
    window.location.href = "/ProcessDashboard.html";
}
function redirectLoss() {
    window.location.href = "/LossLive.html?Report";
}

$(document).ready(function () {

   // getBarRate();
    debugger;
    // var url = window.location.search;
    // var date = "";
    // var shift = "";
    // var machine = "";
   
//     FinalDate='';
//     FinalShift='';

//     var FinalDate = window.localStorage.getItem('date');
// var FinalShift = window.localStorage.getItem('Shift');

    if (FinalDate != null && FinalDate != '') {
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
        var lblshift = FinalDate + " " + "07:00:00";
        var shift2 = FinalDate + " " + "15:00:00";
        var shift3 = FinalDate + " " + "23:00:00";
        var midnight = FinalDate + " " + "23:59:59";

        var newday = new Date();
        newday.setDate(newday.getDate() - 1);
        var d = newday.getDate();
        var m = newday.getMonth() + 1;
        var y = newday.getFullYear();

        newday = y + "-" + m + "-" + d + " " + "23:00:00";

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
   // getFlowWrapGraphData();
//    get5topLoss();
//    getProductionData();
//    getGraphData();
   getBarRate();
  
});

// setInterval(() => {
//     RefreshData();
// }, 300000);

function RefreshData() {
    var today = new Date();
    var dateFormat = "Y-m-d";
    var datetimeformat = "Y-m-d H:i:s";

    var Edate = format(today, datetimeformat);
    FinalDate = format(today, dateFormat);

    //Shift value
    var lblshift = FinalDate + " " + "07:00:00";
    var shift2 = FinalDate + " " + "15:00:00";
    var shift3 = FinalDate + " " + "23:00:00";
    var midnight = FinalDate + " " + "23:59:59";

    var newday = new Date();
    newday.setDate(newday.getDate() - 1);
    var d = newday.getDate();
    var m = newday.getMonth() + 1;
    var y = newday.getFullYear();

    newday = y + "-" + m + "-" + d + " " + "23:00:00";

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
    var selectShift = FinalShift;
    // if (selectShift1 == 'Shift A') {
    //     var selectShift = 'Shift1'
    // }
    // if (selectShift1 == 'Shift B') {
    //     var selectShift = 'Shift2'
    // }
    // if (selectShift1 == 'Shift C') {
    //     var selectShift = 'Shift3'
    // }
    var today = new Date();
    var dateFormat = "Y-m-d";
    var datetimeformat = "Y-m-d H:i:s";

    var Edate = format(today, datetimeformat);
    today = format(today, dateFormat);

    //Shift value
    var lblshift = today + " " + "07:00:00";
    var shift2 = today + " " + "15:00:00";
    var shift3 = today + " " + "23:00:00";
    var midnight = today + " " + "23:59:59";

    var newday = new Date();
    newday.setDate(newday.getDate() - 1);
    var d = newday.getDate();
    var m = newday.getMonth() + 1;
    var y = newday.getFullYear();

    newday = y + "-" + m + "-" + d + " " + "23:00:00";

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
                getOEEData();

            }
        }
    });
}

function getOEEData() {
    // debugger;
    var selectDate = document.getElementById("lbldate").innerText;
    var shift = FinalShift;
    var machine = document.getElementById("machine").innerText;

    $.ajax({
        type: 'GET',
        url: '/getOEEdata',
        data: { selectDate: selectDate, shift: shift, machine: machine },
        async: false,
        success: function (data) {
            debugger;
            var dOEE, CLDCount, MMPLossCode19, kWh, TotalLoss, unaccounted, VOT, dDesignSpeed, CLDCount, dScrapParts, grammage, dTotal, sPartId, sOperatorId;
            if (data != "") {
                var response = data.recordset;
                if (response.length > 0) {

                    $.each(response, function (i, d) {
                        dOEE = d["dOEE"];
                        if (dOEE > 100) {
                            dOEE = 100;
                        }
                        CLDCount = d["CLDCount"];
                        MMPLossCode19 = d["MMPLossCode19"];
                        kWh = d["kWh"];
                        designSpeedVal = d["dDesignSpeed"];

                        goodParts = d["CLDCount"];
                        badParts = d["dScrapParts"];
                        grammage = d["Grammage"];
                        dTotal = d["dTotal"];
                        sPartId = d["sPartId"];
                        // sOperatorId = d["sOperatorId"];
                        TotalLoss = d["dManufacturingPerformanceLosses"];
                        unaccounted = d["dUnaccountedTimeOld"];
                        VOT = Math.round(d["dCalculatedVOT"]);
                        totalParts = d["dTotalParts"];
                        linename = d["WorkcellDesc"];


                    });

                    document.getElementById("oeelbl").innerHTML = dOEE.toFixed(0);
                    document.getElementById("prodcountlbl").innerHTML = CLDCount;
                    document.getElementById("TotalTime").innerHTML = dTotal;
                    document.getElementById("designSpeed").innerHTML = designSpeedVal;
                    document.getElementById("gParts").innerHTML = goodParts;
                    document.getElementById("bParts").innerHTML = badParts;
                    document.getElementById("sku").innerHTML = sPartId;
                    // document.getElementById("operator1").innerHTML = sOperatorId;
                    document.getElementById("totalloss").innerHTML = TotalLoss;
                    document.getElementById("unaccountedloss").innerHTML = unaccounted;
                    document.getElementById("valueoptime").innerHTML = VOT;
                    document.getElementById("tparts").innerHTML = totalParts;

                }
                else {
                    document.getElementById("oeelbl").innerHTML = "0";
                    document.getElementById("prodcountlbl").innerHTML = "0";
                    document.getElementById("TotalTime").innerHTML = "";
                    document.getElementById("designSpeed").innerHTML = "";
                    document.getElementById("gParts").innerHTML = "";
                    document.getElementById("bParts").innerHTML = "";
                    document.getElementById("sku").innerHTML = "";
                    // document.getElementById("operator1").innerHTML = "";
                    document.getElementById("totalloss").innerHTML = "";
                    document.getElementById("unaccountedloss").innerHTML = "";
                    document.getElementById("valueoptime").innerHTML = " ";

                }
            }

            // $.ajax({
            //     type: 'GET',
            //     url: '/flowWrapData',
            //     data: { selectDate: selectDate, shift: shift, machine: machine },
            //     async: false,
            //     success: function (data) {
            //         debugger;
            //         if (data != "") {
            //             var response = data.recordset;
            //             if (response.length > 0) {
            //                 var lineid, count;
            //                 var response = data.recordset;
            //                 $.each(response, function (i, d) {
            //                     lineid = d["lOEEConfigWorkCellId"];
            //                     count = d["dEnd"];
            //                 });

            //                 if (lineid == 1000005 || lineid == 1000006 || lineid == 1000007 || lineid == 1000001 || lineid == 1000002 || lineid == 1000003 || lineid == 1000004
            //                 ) {
            //                     document.getElementById("fwcnt").innerHTML = count;

            //                 }
            //                 // else if (lineid === undefined) {
            //                 //     // document.getElementById("fwcnt").innerHTML = count;
            //                 //     document.getElementById("flowCount").style.display == 'none';
            //                 // }
            //             }
            //             else if (response.length <= 0) {
            //                 document.getElementById("flowCount").style.display = 'none';
            //             }
            //         }
            //         // else if(data==""){
            //         //     document.getElementById("flowCount").style.display == 'none';
            //         // }

            //     }
            // });

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
    var shift = FinalShift;
    var machine = document.getElementById("machine").innerText;
    //  $('#Productiontbody').empty();
    if (chart) {
        chart.destroy();
    }
    $.ajax({
        type: 'GET',
        url: '/getGraphData',
        data: { selectDate: selectDate, shift: shift, machine: machine },
        async: false,
        success: function (data) {
            debugger;

            var k = 1;
            var OEEvalue = 0.0;
            if (data != "") {
                var response = data.recordset;
                if (response.length > 0) {
                    var dOEE = [], tEnd = [], total = [];
                    $.each(response, function (i, d) {
                        var st = d["tStart"];
                        var st1 = st.split("T");
                        var dt = st1[0];
                        var dt1 = st1[1].split(".");
                        var Sdt = dt1[0].split(":");
                        var St = Sdt[0];
                        var st1 = Sdt[1];
                        var startdt = St + ":" + st1 + ":" + Sdt[2];

                        OEEvalue = OEEvalue + d["dOEE"];

                        var finalOEE = OEEvalue / k;

                        dOEE[i] = finalOEE.toFixed(0);

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

                        var total1 = d["dTotalParts"];
                        total.push(total1);
                        // var row = '<tr>';
                        // row += '<td>' + i + '</td>';
                        // row += '<td>' + startdt + '</td>';
                        // row += '<td>' + totime + '</td>';
                        // row += '<td>' + d["CLDCount"] + '</td>';
                        // row += '<td>' + Math.round(d["dOEE"]) + '</td>';
                        // row += '</tr>';
                        // $('#Productiontbody').append(row);

                        k = k + 1;
                    });
                    chartjs(dOEE, tEnd, "myChart");
                  //  chartjs1(total, tEnd);
                }
            }
            getProductionData();
        }
    });
}


function getBarRate() {
    debugger;
    var selectDate = document.getElementById("lbldate").innerText;
    var shift = FinalShift;
    var machine = document.getElementById("machine").innerText;
    //  $('#Productiontbody').empty();
    // if (chart) {
    //     chart.destroy();
    // }
    $.ajax({
        type: 'GET',
        url: '/getBarRateData',
        data: { selectDate: selectDate, shift: shift, machine: machine },
        async: false,
        success: function (data) {
            debugger;

            var k = 1;
          
            if (data != "") {
                var response = data.recordset;
                if (response.length > 0) {
                    var  tEnd = [], total = [];
                    $.each(response, function (i, d) {
                       

                        var endtime = d["Timestamp"];
                        var To1 = endtime.split("T");
                        var t = To1[0];
                        var t1 = To1[1].split(".");
                        var Edt = t1[0].split(":");
                        var E = Edt[0];
                        var E1 = Edt[1];
                        var EndTm = E + ":" + E1;
                        var totime = E + ":" + E1 + ":" + Edt[2];
                        tEnd[i] = EndTm;

                        var total1 = d["BarRate"];
                        total.push(total1);
                        // var row = '<tr>';
                        // row += '<td>' + i + '</td>';
                        // row += '<td>' + startdt + '</td>';
                        // row += '<td>' + totime + '</td>';
                        // row += '<td>' + d["CLDCount"] + '</td>';
                        // row += '<td>' + Math.round(d["dOEE"]) + '</td>';
                        // row += '</tr>';
                        // $('#Productiontbody').append(row);

                        k = k + 1;
                    });
                    chartjs5(total, tEnd, "myChart1");
                  //  chartjs1(total, tEnd);
                }
            }
          // get5topLoss();
        }
    });
}

function chartjs5(total, tEnd, CanvasId) {
    debugger;
    // var MAX = 100, stepSize = 20, lbl = "OEE", lblstr = "OEE (%)";
    // if (CanvasId == 'prodChart') {
    //     MAX = dOEE[dOEE.length];
    //     lbl = 'CLDCount';
    //     lblstr = "CLDCount";
    //     stepSize = 100
    // }
    if(CanvasId == 'myChart1'){
        lbl = "Bar Rate"; 
        lblstr = "Bar Rate";
        stepSize = 200
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
                    data: total
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
                        max: 200,
                        min: 0,
                        stepSize: stepSize
                    }
                }]
            },

        }
    });
    chart.render();
}



function chartjs(dOEE, tEnd, CanvasId) {
    debugger;
    var MAX = 100, stepSize = 20, lbl = "OEE", lblstr = "OEE (%)";
    if (CanvasId == 'myChart2') {
        MAX = dOEE[dOEE.length];
        lbl = 'CLDCount';
        lblstr = "CLDCount";
        stepSize = 100
    }
    // if(CanvasId == 'myChart1'){
    //     lbl = "TotalParts"; 
    //     lblstr = "TotalParts";
    //     stepSize = 200
    // }

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
                        stepSize: stepSize
                    }
                }]
            },

        }
    });
    chart.render();
}



function getProductionData() {
     debugger;
    var selectDate = document.getElementById("lbldate").innerText;
    var shift = FinalShift
    var machine = document.getElementById("machine").innerText;
    //$('#Productiontbody').empty();


    $.ajax({
        type: 'GET',
        url: '/getProductionData',
        data: { selectDate: selectDate, shift: shift, machine: machine },
        async: false,
        success: function (data) {
            //debugger;
            if (data != "") {
                var response = data.recordset;
                if (response.length > 0) {
                    var cldcnt = [], time = [];
                    $.each(response, function (i, d) {
                        cldcnt.push(d["CLDCount"]);
                        
                       
                        var endtime=d["tStart"];
                        var To1 = endtime.split("T");
                        var t = To1[0];
                        var t1 = To1[1].split(".");
                        var Edt = t1[0].split(":");
                        var E = Edt[0];
                        var E1 = Edt[1];
                        var EndTm = E + ":" + E1;
                        time.push(EndTm);
                    });
                    chartjs(cldcnt, time, "myChart2");
                }
            }
           // get5topLoss();
        }
    });

    get5topLoss();
}

function get5topLoss() {
     debugger;
    var selectDate = document.getElementById("lbldate").innerText;
    var shift = FinalShift
    var machine = document.getElementById("machine").innerText;

    $('#top5lossId').empty();

    $.ajax({
        type: 'GET',
        url: '/gettime',
        data: { selectDate: selectDate, shift: shift, machine: machine },
        async: false,
        success: function (data) {
            debugger;

            if (data != "") {
                var response = data.recordset;
                if (response.length > 0) {
                    var time = 0.0;
                    $.each(response, function (i, d) {
                        time = d["dTotal"];

                    });
                    $.ajax({
                        type: 'GET',
                        url: '/gettop5loss',
                        data: { selectDate: selectDate, shift: shift, machine: machine },
                        async: false,
                        success: function (data) {
                            debugger;
                            if (data != "") {
                                var response = data.recordset;
                                if (response.length > 0) {

                                    var Lossname = "";
                                    var fMinutes = 0.0;
                                    var LossCount = 0;
                                    var percentage = 0.0;
                                    var k = response.length;
                                    var counter = 0;
                                    if (k > 5) {
                                        counter = 5;
                                    }
                                    else {
                                        counter = k;
                                    }

                                    for (var i = 0; i < counter; i++) {
                                        Lossname = response[i]["LossDesc"];
                                        fMinutes = response[i]["TotalSec"];
                                        fMinutes = fMinutes;
                                        const interval = moment.utc(fMinutes * 1000).format('HH:mm:ss');

                                        LossCount = response[i]["TotalCount"];
                                        percentage = (((fMinutes / 60) / time) * 100).toFixed(0);

                                        var row = '<tr>';
                                        row += '<td>' + i + '</td>';
                                        row += '<td>' + Lossname + '</td>';
                                        row += '<td>' + LossCount + '</td>';
                                        row += '<td>' + interval + '</td>';
                                        row += '<td>' + percentage + '</td>';
                                        row += '</tr>';
                                        $('#top5lossId').append(row);
                                    }

                                }
                            }
                        }
                    });
                    getBarRate();
                  
                }
            }

        }
    });
}




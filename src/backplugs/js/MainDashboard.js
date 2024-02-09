var starttime, endtime;
var myChart;
var FinalDate = window.localStorage.getItem('date');
var FinalShift = window.localStorage.getItem('Shift');
var Finalline = window.localStorage.getItem('machine');
var starttime = window.localStorage.getItem('starttime');
var endtime = window.localStorage.getItem('endtime');
//var Finalline ='Nordon';


$(document).ready(function () {
    debugger;
    if (starttime == '' || starttime == null) {
        getcurrentdateshift();
    }
    else {
        document.getElementById("lbldate").innerHTML = FinalDate;
        document.getElementById("lblshift").innerHTML = FinalShift;
        document.getElementById("line").innerHTML = Finalline;
    }
    getOEEData();
});

$("#Line1_dash").click(function () {
    localStorage.setItem('machine', 'Line1');
    window.location.href = "/LiveDashboard.html";
});

$("#Line2_dash").click(function () {
    localStorage.setItem('machine', 'Line2');
    window.location.href = "/LiveDashboard.html";
});

$("#Line3_dash").click(function () {
    localStorage.setItem('machine', 'Line3');
    window.location.href = "/LiveDashboard.html";
});

$("#Line4_dash").click(function () {
    localStorage.setItem('machine', 'Line4');
    window.location.href = "/LiveDashboard.html";
});

$("#Line5_dash").click(function () {
    localStorage.setItem('machine', 'Line5');
    window.location.href = "/LiveDashboard.html";
});

$("#Line6_dash").click(function () {
    localStorage.setItem('machine', 'Line6');
    window.location.href = "/LiveDashboard.html";
});

$("#Line7_dash").click(function () {
    localStorage.setItem('machine', 'Line7');
    window.location.href = "/LiveDashboard.html";
});

$("#Line8_dash").click(function () {
    localStorage.setItem('machine', 'Line8');
    window.location.href = "/LiveDashboard.html";
});

var dateFormat = "Y-m-d";
var datetimeformat = "Y-m-d H:i:s";
function getcurrentdateshift() {

    var today = new Date();

    var Edate = format(today, datetimeformat);
    FinalDate = format(today, dateFormat);

    var nextday = new Date(FinalDate);
    nextday.setDate(nextday.getDate() + 1);
    nextday = format(nextday, dateFormat);

    //Shift value
    var lblshift = FinalDate + " " + "07:00:00";
    var shift2 = FinalDate + " " + "15:00:00";
    var shift3 = FinalDate + " " + "23:00:00";
    var midnight = FinalDate + " " + "23:59:59";

    var newday = new Date(FinalDate);
    newday.setDate(newday.getDate() - 1);
    var d = newday.getDate();
    var m = newday.getMonth() + 1;
    var y = newday.getFullYear();

    newday = y + "-" + m + "-" + d + " " + "23:00:00";

    if (new Date(Edate).valueOf() >= new Date(lblshift).valueOf() &&
        new Date(Edate).valueOf() < new Date(shift2).valueOf()) {

        FinalShift = "ShiftA";
        starttime = lblshift;
        endtime = shift2;
        localStorage.setItem('starttime', lblshift);
        localStorage.setItem('endtime', shift2);
    }
    else if (new Date(Edate).valueOf() >= new Date(shift2).valueOf() &&
        new Date(Edate).valueOf() < new Date(shift3).valueOf()) {
        FinalShift = "ShiftB";
        starttime = shift2;
        endtime = shift3;
        localStorage.setItem('starttime', shift2);
        localStorage.setItem('endtime', shift3);
    }
    else if (new Date(Edate).valueOf() >= new Date(newday).valueOf() && new Date(Edate).valueOf() < new Date(lblshift).valueOf()
        || new Date(Edate).valueOf() >= new Date(shift3).valueOf()) {
        if (new Date(Edate).valueOf() >= new Date(shift3).valueOf()
            && new Date(Edate).valueOf() < new Date(midnight).valueOf()
        ) {
            FinalShift = "ShiftC";
            starttime = shift3;
            endtime = nextday + ' ' + '07:00:00';
            localStorage.setItem('starttime', shift3);
            localStorage.setItem('endtime', nextday + ' ' + '07:00:00');
        }
        if (new Date(Edate).valueOf() >= new Date(newday).valueOf() && new Date(Edate).valueOf() < new Date(lblshift).valueOf()) {
            FinalShift = "ShiftC";
            starttime = newday;
            endtime = lblshift;
            localStorage.setItem('starttime', newday);
            localStorage.setItem('endtime', lblshift);
        }
    }

    document.getElementById("lbldate").innerHTML = FinalDate;
    document.getElementById("lblshift").innerHTML = FinalShift;
    document.getElementById("line").innerHTML = Finalline;
}

setInterval(() => {
    RefreshData();
}, 300000);

function RefreshData() {

    getcurrentdateshift();

    localStorage.setItem('machine', Finalline);
    localStorage.setItem('date', FinalDate);
    localStorage.setItem('Shift', FinalShift);
    localStorage.setItem('starttime', starttime);
    localStorage.setItem('endtime', endtime);

    window.location.reload();
}


function getOEEData() {
    // debugger;
    var selectDate = document.getElementById("lbldate").innerText;
    var shift = document.getElementById("lblshift").innerText;
    var machine = document.getElementById("line").innerText;
    if (line != null) {
        $.ajax({
            type: 'GET',
            url: '/getOEEdata1',
            data: { selectDate: selectDate, machine: machine, shift: shift },
            //async: false,
            success: function (data) {
                debugger;
                if (data != "") {
                    var response = data.recordset;
                    if (response.length > 0) {
                        var dataVPC = [], dataVPC1 = [],  labelVPC = [], dataNMB = [],dataNMB1=[] ,labelNMB = []
                        $.each(response, function (i, d) {


                            dOEE = d["dOEE"];
                            if (dOEE > 100) {
                                dOEE = 100;
                            }
                            //  CLDCount = d["CLDCount"];

                            designSpeedVal = d["dDesignSpeed"];

                            goodParts = d["CLDCount"];
                            totaltime = d["dTotal"];
                            tabletPerCLD = d["TabletsPerCLD"];
                            skurunning = d["sPartId"];
                            line = d["WorkcellDesc"];
                            if (line == 'Line5' || line == 'Line6' || line == 'Line7' || line == 'Line8') {
                                dataVPC.push(dOEE.toFixed(2));
                                labelVPC.push(line);
                                dataVPC1.push(dOEE.toFixed(2));
                               
                            }
                            else {
                                dataNMB.push(dOEE.toFixed(2));
                                labelNMB.push(line);
                                dataNMB1.push(dOEE.toFixed(2));
                            }

                            // var designSpeedVal = d["designspeed"];
                            //  var goodParts = response[i]["goodpart"];
                            var expected = Math.round((designSpeedVal * totaltime) / tabletPerCLD);
                            
                            // var expected = 0;

                            if (response[i]["WorkcellDesc"] == 'Line5') {
                                document.getElementById("line5sku").innerHTML = skurunning;
                                document.getElementById("line5good").innerHTML = goodParts;
                                document.getElementById("line5expected").innerHTML = expected;
                                document.getElementById("line5Oeeid").innerHTML = dOEE.toFixed(2) + '%';
                                document.getElementById("line5proogres").style.width = dOEE.toFixed(0) + '%';

                                if (dOEE > 60 && dOEE < 80) {
                                    $("#line5proogres").removeClass("bg-danger");
                                    $("#line5proogres").addClass("bg-warning");
                                }
                                else if (dOEE > 80) {
                                    $("#line5proogres").removeClass("bg-danger");
                                    $("#line5proogres").addClass("bg-success");
                                }
                            }
                            else if (response[i]["WorkcellDesc"] == 'Line6') {
                                document.getElementById("line6sku").innerHTML = skurunning;
                                document.getElementById("line6good").innerHTML = goodParts;
                                document.getElementById("line6expected").innerHTML = expected;
                                document.getElementById("line6Oeeid").innerHTML = dOEE.toFixed(2) + '%';
                                document.getElementById("line6proogres").style.width = dOEE.toFixed(0) + '%';
                                if (dOEE > 60 && dOEE < 80) {
                                    $("#line6proogres").removeClass("bg-danger");
                                    $("#line6proogres").addClass("bg-warning");
                                }
                                else if (dOEE > 80) {
                                    $("#line6proogres").removeClass("bg-danger");
                                    $("#line6proogres").addClass("bg-success");
                                }
                            }
                            else if (response[i]["WorkcellDesc"] == 'Line7') {
                                document.getElementById("line7sku").innerHTML = skurunning;
                                document.getElementById("line7good").innerHTML = goodParts;
                                document.getElementById("line7expected").innerHTML = expected;
                                document.getElementById("line7Oeeid").innerHTML = dOEE.toFixed(2) + '%';
                                document.getElementById("line7proogres").style.width = dOEE.toFixed(0) + '%';

                                if (dOEE > 60 && dOEE < 80) {
                                    $("#line7proogres").removeClass("bg-danger");
                                    $("#line7proogres").addClass("bg-warning");
                                }
                                else if (dOEE > 80) {
                                    $("#line7proogres").removeClass("bg-danger");
                                    $("#line7proogres").addClass("bg-success");
                                }
                            }
                            else if (response[i]["WorkcellDesc"] == 'Line8') {
                                document.getElementById("line8sku").innerHTML = skurunning;
                                document.getElementById("line8good").innerHTML = goodParts;
                                document.getElementById("line8expected").innerHTML = expected;
                                document.getElementById("line8Oeeid").innerHTML = dOEE.toFixed(2) + '%';
                                document.getElementById("line8proogres").style.width = dOEE.toFixed(0) + '%';
                                if (dOEE > 60 && dOEE < 80) {
                                    $("#line8proogres").removeClass("bg-danger");
                                    $("#line8proogres").addClass("bg-warning");
                                }
                                else if (dOEE > 80) {
                                    $("#line8proogres").removeClass("bg-danger");
                                    $("#line8proogres").addClass("bg-success");
                                }
                            }
                            //NMB Mixer
                            else if (response[i]["WorkcellDesc"] == 'Line1') {
                                document.getElementById("line1sku").innerHTML = skurunning;
                                document.getElementById("line1good").innerHTML = goodParts;
                                document.getElementById("line1expected").innerHTML = expected;
                                document.getElementById("line1Oeeid").innerHTML = dOEE.toFixed(2) + '%';
                                document.getElementById("line1proogres").style.width = dOEE.toFixed(0) + '%';

                                if (dOEE > 60 && dOEE < 80) {
                                    $("#line1proogres").removeClass("bg-danger");
                                    $("#line1proogres").addClass("bg-warning");
                                }
                                else if (dOEE > 80) {
                                    $("#line1proogres").removeClass("bg-danger");
                                    $("#line1proogres").addClass("bg-success");
                                }
                            }
                            else if (response[i]["WorkcellDesc"] == 'Line2') {
                                document.getElementById("line2sku").innerHTML = skurunning;
                                document.getElementById("line2good").innerHTML = goodParts;
                                document.getElementById("line2expected").innerHTML = expected;
                                document.getElementById("line2Oeeid").innerHTML = dOEE.toFixed(2) + '%';
                                document.getElementById("line2proogres").style.width = dOEE.toFixed(0) + '%';

                                if (dOEE > 60 && dOEE < 80) {
                                    $("#line2proogres").removeClass("bg-danger");
                                    $("#line2proogres").addClass("bg-warning");
                                }
                                else if (dOEE > 80) {
                                    $("#line2proogres").removeClass("bg-danger");
                                    $("#line2proogres").addClass("bg-success");
                                }
                            }
                            else if (response[i]["WorkcellDesc"] == 'Line3') {
                                document.getElementById("line3sku").innerHTML = skurunning;
                                document.getElementById("line3good").innerHTML = goodParts;
                                document.getElementById("line3expected").innerHTML = expected;
                                document.getElementById("line3Oeeid").innerHTML = dOEE.toFixed(2) + '%';
                                document.getElementById("line3proogres").style.width = dOEE.toFixed(0) + '%';

                                if (dOEE > 60 && dOEE < 80) {
                                    $("#line3proogres").removeClass("bg-danger");
                                    $("#line3proogres").addClass("bg-warning");
                                }
                                else if (dOEE > 80) {
                                    $("#line3proogres").removeClass("bg-danger");
                                    $("#line3proogres").addClass("bg-success");
                                }
                            }
                            else if (response[i]["WorkcellDesc"] == 'Line4') {
                                document.getElementById("line4sku").innerHTML = skurunning;
                                document.getElementById("line4good").innerHTML = goodParts;
                                document.getElementById("line4expected").innerHTML = expected;
                                document.getElementById("line4Oeeid").innerHTML = dOEE.toFixed(2) + '%';
                                document.getElementById("line4proogres").style.width = dOEE.toFixed(0) + '%';

                                if (dOEE > 60 && dOEE < 80) {
                                    $("#line4proogres").removeClass("bg-danger");
                                    $("#line4proogres").addClass("bg-warning");
                                }
                                else if (dOEE > 80) {
                                    $("#line4proogres").removeClass("bg-danger");
                                    $("#line4proogres").addClass("bg-success");
                                }
                            }

                        });


                        //  simpleArraySum(dataVPC1) ;

                        // var sum = 0;
                        // for (var i = 0; i < dataVPC1.length; i++) {
                        //     sum += dataVPC1[i];
                        // }

                        var sum = dataVPC1.reduce(function (a, b) {
                            return  parseInt(a) + parseInt(b);
                        }, 0);
                        var sum1 = sum/4;
                     
                        dataVPC.push(sum1);
                        labelVPC.push('VPC');

                        var sumNMB = dataNMB1.reduce(function (a, b) {
                            return  parseInt(a) + parseInt(b);
                        }, 0);
                        var sumNMB1 = sumNMB/4;
                     
                        dataNMB.push(sumNMB1);
                        labelNMB.push('NMB');

                        DynaChart(dataVPC, labelVPC);
                        DynaChart1(dataNMB, labelNMB);
                    }
                }
                // getGraphData();
            }
        });
    }
}
var chart;
// function getGraphData() {
//     debugger;
//     var selectDate = document.getElementById("lbldate").innerText;
//     var shift = document.getElementById("lblshift").innerText;
//     var line = document.getElementById("line").innerText;
//     if (chart) {
//         chart.destroy();
//     }
//     $.ajax({
//         type: 'GET',
//         url: '/getGraphData',
//         data: { selectDate: selectDate, starttime, endtime, line: line },
//         // async: false,
//         success: function (data) {
//             debugger;
//             if (data != "") {
//                 var response = data.rows;
//                 if (response.length > 0) {
//                     var fillerData = response.filter(dd => (String(dd.MachineName) == ('Filler Machine')));
//                     var cartonerData = response.filter(dd => (String(dd.MachineName) == ('Cartoner Machine')));

//                     var oee = cartonerData[cartonerData.length - 1]["OEE"];
//                     document.getElementById("cartonerid").innerHTML = oee.toFixed(0) + '%';
//                     document.getElementById("cartnerproogres").style.width = oee.toFixed(0) + '%';

//                     var filleroee = fillerData[fillerData.length - 1]["OEE"];
//                     document.getElementById("fillerid").innerHTML = filleroee.toFixed(0) + '%';
//                     document.getElementById("fillerproogres").style.width = filleroee.toFixed(0) + '%';
//                 }
//             }
//         }
//     });
// }



function DynaChart(dataVPC, labelVPC) {
    debugger;
    var ctx = document.getElementById('vpcOee').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labelVPC,
            datasets: [{
                data: dataVPC,
                label: "OEE (%)",
                backgroundColor: "rgb(51, 255, 51)",
            }

            ]
        },
        tooltips: {
            mode: 'index',
            intersect: true,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        options: {

            barValueSpacing: 20,

            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,

                    }
                }]
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 15,
                    bottom: 0
                }
            },
            events: [],
            responsive: true,
            maintainAspectRatio: true,
            legend: {
                display: true,
                position: 'top'
            },

            animation: {
                duration: 1,
                onComplete: function () {
                    var chartInstance = this.chart,
                        ctx = chartInstance.ctx;

                    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';

                    this.data.datasets.forEach(function (dataset, i) {
                        var meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function (bar, index) {
                            if (dataset.data[index] > 0) {
                                var data = dataset.data[index];
                                ctx.fillText(data, bar._model.x, bar._model.y);
                            }
                        });
                    });
                }
            }
        },
    });

}

function DynaChart1(dataNMB, labelNMB) {
    debugger;
    var ctx = document.getElementById('nmbOee').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labelNMB,
            datasets: [{
                data: dataNMB,
                label: "OEE (%)",
                backgroundColor: "rgb(26, 117, 255)",
            }

            ]
        },
        tooltips: {
            mode: 'index',
            intersect: true,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        options: {

            barValueSpacing: 20,

            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,

                    }
                }]
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 15,
                    bottom: 0
                }
            },
            events: [],
            responsive: true,
            maintainAspectRatio: true,
            legend: {
                display: true,
                position: 'top'
            },

            animation: {
                duration: 1,
                onComplete: function () {
                    var chartInstance = this.chart,
                        ctx = chartInstance.ctx;

                    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';

                    this.data.datasets.forEach(function (dataset, i) {
                        var meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function (bar, index) {
                            if (dataset.data[index] > 0) {
                                var data = dataset.data[index];
                                ctx.fillText(data, bar._model.x, bar._model.y);
                            }
                        });
                    });
                }
            }
        },
    });

}








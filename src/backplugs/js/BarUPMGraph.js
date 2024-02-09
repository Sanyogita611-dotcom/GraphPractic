var enddate;
window.chart;
var myChart1;
debugger;

var FinalDate = window.localStorage.getItem('date');
var FinalShift = window.localStorage.getItem('Shift');

var FinalMachine = window.localStorage.getItem('machine')
// $(document).ready(function () {

//     getupmgraphData();
//   });


function getupmgraphData() {
    debugger;
  
    var selectDate = document.getElementById("fromdate").value;
  var shift = document.getElementById("graphshift").value;
    //  var line = document.getElementById("graphline").value;

    $.ajax({
        type: 'GET',
        url: '/getupmgraphData',
        data: { selectDate: selectDate, shift: shift },
        async: false,
        success: function (data) {
            debugger;

            if (data != "") {
                var response = data.recordset;
                if (response.length > 0) {
                    var upmData = [], tEnd = [], target = [], upmData1 = [], upmData2 = [], upmData3 = []
                    $.each(response, function (i, d) {

                        var line1 = d["UPM_Mazzoni"];
                        var line2 = d["UPM_Mazzoni1"];
                        var line3 = d["UPM_Mazzoni2"];
                        var line4 = d["UPM_Mazzoni3"];

                        var endtime = d["RowinsertTime"];
                        var To1 = endtime.split("T");
                        var t = To1[0];
                        var t1 = To1[1].split(".");
                        var Edt = t1[0].split(":");
                        var E = Edt[0];
                        var E1 = Edt[1];
                        var EndTm = E + ":" + E1;
                        var totime = E + ":" + E1 + ":" + Edt[2];
                        tEnd[i] = EndTm;

                        //  var totalparts = d["UPM_Mazzoni"];
                        // var totalparts = parseFloat((total1 / 10)).toFixed(2);
                        upmData.push(line1);
                        upmData1.push(line2);
                        upmData2.push(line3);
                        upmData3.push(line4);

                        var staticData = 220;
                        target.push(staticData);

                    });

                    chartjs2(upmData, upmData1, upmData2, upmData3, tEnd, target);
                }

            }
            // getFlowWrapGraphData();
        }
    });

}

function chartjs2(upmData, upmData1, upmData2, upmData3, tEnd, target) {
    debugger;
    // $('#upmgraphChart').empty();
    //  CanvasId = 'upmgraphChart'
    lblstr = "UPM Parts";
    // if (CanvasId == 'prodChart') {
    //     MAX = dOEE[dOEE.length];
    //     lbl = 'TotalParts';
    //     lblstr = "TotalParts";
    // }
    $('#upmgraphChart').remove();
    $('#bar').append('<canvas id="upmgraphChart"></canvas>');

    var chart = new Chart(document.getElementById("upmgraphChart").getContext("2d"), {

        type: 'line',
        data: {
            labels: tEnd,
            datasets: [
                {
                    label: "Line1",
                    backgroundColor: "white",
                    pointBackgroundColor: "#3e95cd",
                    borderColor: "rgb(62,149,205)",
                    fill: false,
                    data: upmData
                },
                {
                    label: "Line2",
                    backgroundColor: "white",
                    pointBackgroundColor: "#3e95cd",
                    borderColor: "rgb(0, 32, 128)",
                    fill: false,
                    data: upmData1
                },
                {
                    label: "Line3",
                    backgroundColor: "white",
                    pointBackgroundColor: "#3e95cd",
                    borderColor: "rgb(51, 102, 153)",
                    fill: false,
                    data: upmData2
                },
                {
                    label: "Line4",
                    backgroundColor: "white",
                    pointBackgroundColor: "#3e95cd",
                    borderColor: "rgb(255, 26, 140)",
                    fill: false,
                    data: upmData3
                },
                {
                    label: "Standard Set Value",
                    backgroundColor: "white",
                    //  pointBackgroundColor: "#3e95cd",
                    borderColor: "#008000",
                    fill: false,
                    data: target
                }

            ]

        },
        options: {
            tooltips: {
                enabled: false
            },
            hover: { mode: null },
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

                        min: 0,
                        stepSize: 20
                    }
                }]
            },

        }
    });
    chart.render();
}

window.onload = function () {
    debugger;
    var today = new Date().toISOString().slice(0, 10);
    document.getElementById('fromdate').value = today;
}
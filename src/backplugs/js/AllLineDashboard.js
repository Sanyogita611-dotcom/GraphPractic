//var starttime, endtime;
var myChart;
var FinalDate = window.localStorage.getItem('date');
var FinalShift = window.localStorage.getItem('Shift');
var Finalline = window.localStorage.getItem('machine');
/////var starttime = window.localStorage.getItem('starttime');
////var endtime = window.localStorage.getItem('endtime');
//var Finalline ='Nordon';


$(document).ready(function () {
    debugger;
    // if (starttime == '' || starttime == null) {
    //     getcurrentdateshift();
    // }
    // else {
    document.getElementById("lbldate").innerHTML = FinalDate;
    document.getElementById("lblshift").innerHTML = FinalShift;
    document.getElementById("line").innerHTML = Finalline;
    //  }
    AllLinedata();
   
   // casepackerData();
   // flowWrapData();
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
    //localStorage.setItem('starttime', starttime);
    // localStorage.setItem('endtime', endtime);

    window.location.reload();
}


function AllLinedata() {
    // debugger;
    var selectDate = document.getElementById("lbldate").innerText;
    var shift = document.getElementById("lblshift").innerText;
    // var machine = document.getElementById("line").innerText;

    $.ajax({
        type: 'GET',
        url: '/getAllLineData',
        data: { selectDate: selectDate, shift: shift },
        //async: false,
        success: function (data) {
            debugger;
            if (data != "") {
                var response = data.recordset;
                if (response.length > 0) {
                    var dataVPC = [], dataVPC1 = [], labelVPC = [], dataNMB = [], dataNMB1 = [], labelNMB = []
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


                        // var expected = 0;



                    });


                    //  simpleArraySum(dataVPC1) ;

                    // var sum = 0;
                    // for (var i = 0; i < dataVPC1.length; i++) {
                    //     sum += dataVPC1[i];
                    // }

                    var sum = dataVPC1.reduce(function (a, b) {
                        return parseInt(a) + parseInt(b);
                    }, 0);
                    var sum1 = sum / 4;

                    dataVPC.push(sum1);
                    labelVPC.push('VPC');

                    var sumNMB = dataNMB1.reduce(function (a, b) {
                        return parseInt(a) + parseInt(b);
                    }, 0);
                    var sumNMB1 = sumNMB / 4;

                    dataNMB.push(sumNMB1);
                    labelNMB.push('NMB');

                    DynaChart(dataVPC, labelVPC);
                    DynaChart1(dataNMB, labelNMB);
                }
            }
            barstamperData();
        }
    });

   

}


function barstamperData() {
    // debugger;
    var selectDate = document.getElementById("lbldate").innerText;
    var shift = document.getElementById("lblshift").innerText;
    // var machine = document.getElementById("line").innerText;

  

    $.ajax({
        type: 'GET',
        url: '/getAllLineData1',
        data: { selectDate: selectDate, shift: shift },
        //async: false,
        success: function (data) {
            debugger;
            if (data != "") {
                var response = data.recordset;
                if (response.length > 0) {
                    var dataVPCLine5 = [],
                        dataVPCLine6 = [],
                        dataVPCLine7 = [],
                        dataVPCLine8 = [],
                        dataNMBLine1 = [],
                        dataNMBLine2 = [],
                        dataNMBLine3 = [],
                        dataNMBLine4 = [], tEndVPC = [],tEndNMB=[]
                    $.each(response, function (i, d) {

                        var endtime = d["tEnd"];
                       
                        var totalparts = d["dTotalParts"];
                        line = d["WorkcellDesc"];
                        if (line == 'Line5') {
                            var To1 = endtime.split("T");
                            var t = To1[0];
                            var t1 = To1[1].split(".");
                            var Edt = t1[0].split(":");
                            var E = Edt[0];
                            var E1 = Edt[1];
                            var EndTm = E + ":" + E1;
                            var totime = E + ":" + E1 + ":" + Edt[2];
                            tEndVPC.push ( EndTm);
                            dataVPCLine5.push(totalparts);
                        }
                        if (line == 'Line6') {
                           
                            dataVPCLine6.push(totalparts);
                        }
                        if (line == 'Line7') {
                           
                            dataVPCLine7.push(totalparts);
                        }
                        if (line == 'Line8') {
                           
                            dataVPCLine8.push(totalparts);
                        }
                        if (line == 'Line1') {
                            var To1 = endtime.split("T");
                            var t = To1[0];
                            var t1 = To1[1].split(".");
                            var Edt = t1[0].split(":");
                            var E = Edt[0];
                            var E1 = Edt[1];
                            var EndTm = E + ":" + E1;
                            var totime = E + ":" + E1 + ":" + Edt[2];
                            tEndNMB.push(EndTm) ;
                            dataNMBLine1.push(totalparts);
                        }
                        if (line == 'Line2') {
                            
                            dataNMBLine2.push(totalparts);
                        }
                        if (line == 'Line3') {
                           
                            dataNMBLine3.push(totalparts);
                        }
                        if (line == 'Line4') {
                           
                            dataNMBLine4.push(totalparts);
                        }
                       

                    });
                    DynaChartVPCBarStamper(dataVPCLine5,dataVPCLine6,dataVPCLine7,dataVPCLine8,tEndVPC);
                    DynaChartNMBBarStamper(dataNMBLine1,dataNMBLine2,dataNMBLine3,dataNMBLine4,tEndNMB);
                }
            }
           flowWrapData();
        }
    });

}

function flowWrapData() {
    // debugger;
    var selectDate = document.getElementById("lbldate").innerText;
    var shift = document.getElementById("lblshift").innerText;
    // var machine = document.getElementById("line").innerText;

  

    $.ajax({
        type: 'GET',
        url: '/getAllLineData2',
        data: { selectDate: selectDate, shift: shift },
        //async: false,
        success: function (data) {
            debugger;
            if (data != "") {
                var response = data.recordset;
                if (response.length > 0) {
                    var dataVPCLine5flow = [],
                        dataVPCLine6flow = [],
                        dataVPCLine7flow = [],
                        dataVPCLine8flow = [],
                        dataNMBLine1flow = [],
                        dataNMBLine2flow = [],
                        dataNMBLine3flow = [],
                        dataNMBLine4flow = [], tEndVPCflow = [],tEndNMBflow=[]
                    $.each(response, function (i, d) {

                        var endtime = d["tEnd"];
                       
                        var flowWrapCount = d["dEnd"];
                        line = d["lOEEConfigWorkCellId"];
                        if (line == 1000001) {
                            var To1 = endtime.split("T");
                            var t = To1[0];
                            var t1 = To1[1].split(".");
                            var Edt = t1[0].split(":");
                            var E = Edt[0];
                            var E1 = Edt[1];
                            var EndTm = E + ":" + E1;
                            var totime = E + ":" + E1 + ":" + Edt[2];
                            tEndVPCflow.push ( EndTm);
                            dataVPCLine5flow.push(flowWrapCount);
                        }
                        if (line == 1000002) {
                           
                            dataVPCLine6flow.push(flowWrapCount);
                        }
                        if (line == 1000003) {
                           
                            dataVPCLine7flow.push(flowWrapCount);
                        }
                        if (line == 1000004) {
                           
                            dataVPCLine8flow.push(flowWrapCount);
                        }
                        if (line == 1000005) {
                            var To1 = endtime.split("T");
                            var t = To1[0];
                            var t1 = To1[1].split(".");
                            var Edt = t1[0].split(":");
                            var E = Edt[0];
                            var E1 = Edt[1];
                            var EndTm = E + ":" + E1;
                            var totime = E + ":" + E1 + ":" + Edt[2];
                            tEndNMBflow.push(EndTm) ;
                            dataNMBLine1flow.push(flowWrapCount);
                        }
                        if (line == 1000006) {
                            
                            dataNMBLine2flow.push(flowWrapCount);
                        }
                        if (line == 1000008) {
                           
                            dataNMBLine3flow.push(flowWrapCount);
                        }
                        if (line == 1000007) {
                           
                            dataNMBLine4flow.push(flowWrapCount);
                        }
                       

                    });
                    DynaChartVPCFlowWrap(dataVPCLine5flow,dataVPCLine6flow,dataVPCLine7flow,dataVPCLine8flow,tEndVPCflow);
                    DynaChartNMBFlowWrap(dataNMBLine1flow,dataNMBLine2flow,dataNMBLine3flow,dataNMBLine4flow,tEndNMBflow);
                }
            }
            casePackerData();
        }
    });

}

function casePackerData() {
    // debugger;
    var selectDate = document.getElementById("lbldate").innerText;
    var shift = document.getElementById("lblshift").innerText;
    // var machine = document.getElementById("line").innerText;

  

    $.ajax({
        type: 'GET',
        url: '/getAllLineData3',
        data: { selectDate: selectDate, shift: shift },
        //async: false,
        success: function (data) {
            debugger;
            if (data != "") {
                var response = data.recordset;
                if (response.length > 0) {
                    var dataVPCLine5case = [],
                        dataVPCLine6case = [],
                        dataVPCLine7case = [],
                        dataVPCLine8case = [],
                        dataNMBLine1case = [],
                        dataNMBLine2case = [],
                        dataNMBLine3case = [],
                        dataNMBLine4case = [], tEndVPCcase = [],tEndNMBcase=[]
                        $.each(response, function (i, d) {

                            var endtime = d["tEnd"];
                           
                            var cldcnt = d["CLDCount"];
                            line = d["WorkcellDesc"];
                            if (line == 'Line5') {
                                var To1 = endtime.split("T");
                                var t = To1[0];
                                var t1 = To1[1].split(".");
                                var Edt = t1[0].split(":");
                                var E = Edt[0];
                                var E1 = Edt[1];
                                var EndTm = E + ":" + E1;
                                var totime = E + ":" + E1 + ":" + Edt[2];
                                tEndVPCcase.push ( EndTm);
                                dataVPCLine5case.push(cldcnt);
                            }
                            if (line == 'Line6') {
                               
                                dataVPCLine6case.push(cldcnt);
                            }
                            if (line == 'Line7') {
                               
                                dataVPCLine7case.push(cldcnt);
                            }
                            if (line == 'Line8') {
                               
                                dataVPCLine8case.push(cldcnt);
                            }
                            if (line == 'Line1') {
                                var To1 = endtime.split("T");
                                var t = To1[0];
                                var t1 = To1[1].split(".");
                                var Edt = t1[0].split(":");
                                var E = Edt[0];
                                var E1 = Edt[1];
                                var EndTm = E + ":" + E1;
                                var totime = E + ":" + E1 + ":" + Edt[2];
                                tEndNMBcase.push(EndTm) ;
                                dataNMBLine1case.push(cldcnt);
                            }
                            if (line == 'Line2') {
                                
                                dataNMBLine2case.push(cldcnt);
                            }
                            if (line == 'Line3') {
                               
                                dataNMBLine3case.push(cldcnt);
                            }
                            if (line == 'Line4') {
                               
                                dataNMBLine4case.push(cldcnt);
                            }
                           
    
                        });
                    DynaChartVPCCasePacker(dataVPCLine5case,dataVPCLine6case,dataVPCLine7case,dataVPCLine8case,tEndVPCcase);
                    DynaChartNMBCasePacker(dataNMBLine1case,dataNMBLine2case,dataNMBLine3case,dataNMBLine4case,tEndNMBcase);
                }
            }
            //casePackerData();
        }
    });

}
var chart;




function DynaChart(dataVPC, labelVPC) {
    debugger;
    var ctx = document.getElementById('VpcChart').getContext('2d');

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
                        stepSize:25
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
    var ctx = document.getElementById('NMBChart').getContext('2d');

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
stepSize:25
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

function DynaChartVPCBarStamper(dataVPCLine5,dataVPCLine6,dataVPCLine7,dataVPCLine8,tEndVPC) {
   
    debugger;
  var ctx = document.getElementById('BarStamperChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: tEndVPC,
      datasets: [{
        data: dataVPCLine5,
        label: "Line5",
        borderColor: "rgb(62,149,205)",
        backgroundColor: "rgb(255, 255, 255)",
        borderWidth: 2,
        lineTension: 0
      },
      {
        data: dataVPCLine6,
        label: "Line6",
        borderColor: "rgb(0, 32, 128)",
        backgroundColor: "rgb(255, 255, 255)",
        borderWidth: 2,
        lineTension: 0
      },
      {
        data: dataVPCLine7,
        label: "Line7",
        borderColor: "rgb(51, 102, 153)",
        backgroundColor: "rgb(255, 255, 255)",
        borderWidth: 2,
        lineTension: 0
      },
      {
        data: dataVPCLine8,
        label: "Line8",
        borderColor: "rgb(255, 26, 140)",
        backgroundColor: "rgb(255, 255, 255)",
        borderWidth: 2,
        lineTension: 0
      }

      ]

    },
    options: {
      
        legend: {
          display: true,
          position:'top',
         
        
      },
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          ticks: {
           // max: 100,
            min: 0,
            stepSize: 1000
          }
          // stacked: true
        }],
      }
    },
  });

}

function DynaChartNMBBarStamper(dataNMBLine1,dataNMBLine2,dataNMBLine3,dataNMBLine4,tEndNMB) {
    debugger;
    debugger;
    var ctx = document.getElementById('BarStamperChartNMB').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: tEndNMB,
        datasets: [{
          data: dataNMBLine1,
          label: "Line1",
          borderColor: "rgb(62,149,205)",
          backgroundColor: "rgb(255, 255, 255)",
          borderWidth: 2,
          lineTension: 0
        },
        {
          data: dataNMBLine2,
          label: "Line2",
          borderColor: "rgb(0, 32, 128)",
          backgroundColor: "rgb(255, 255, 255)",
          borderWidth: 2,
          lineTension: 0
        },
        {
          data: dataNMBLine3,
          label: "Line3",
          borderColor: "rgb(51, 102, 153)",
          backgroundColor: "rgb(255, 255, 255)",
          borderWidth: 2,
          lineTension: 0
        },
        {
          data: dataNMBLine4,
          label: "Line4",
          borderColor: "rgb(255, 26, 140)",
          backgroundColor: "rgb(255, 255, 255)",
          borderWidth: 2,
          lineTension: 0
        }
  
        ]
  
      },
      options: {
        
          legend: {
            display: true,
            position:'top',
           
          
        },
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            ticks: {
             // max: 100,
              min: 0,
              stepSize:1000
            }
            // stacked: true
          }],
        }
      },
    });
}


function  DynaChartVPCFlowWrap(dataVPCLine5flow,dataVPCLine6flow,dataVPCLine7flow,dataVPCLine8flow,tEndVPCflow) {
   
    debugger;
  var ctx = document.getElementById('FlowWrapChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: tEndVPCflow,
      datasets: [{
        data: dataVPCLine5flow,
        label: "Line5",
        borderColor: "rgb(62,149,205)",
        backgroundColor: "rgb(255, 255, 255)",
        borderWidth: 2,
        lineTension: 0
      },
      {
        data: dataVPCLine6flow,
        label: "Line6",
        borderColor: "rgb(0, 32, 128)",
        backgroundColor: "rgb(255, 255, 255)",
        borderWidth: 2,
        lineTension: 0
      },
      {
        data: dataVPCLine7flow,
        label: "Line7",
        borderColor: "rgb(51, 102, 153)",
        backgroundColor: "rgb(255, 255, 255)",
        borderWidth: 2,
        lineTension: 0
      },
      {
        data: dataVPCLine8flow,
        label: "Line8",
        borderColor: "rgb(255, 26, 140)",
        backgroundColor: "rgb(255, 255, 255)",
        borderWidth: 2,
        lineTension: 0
      }

      ]

    },
    options: {
      
        legend: {
          display: true,
          position:'top',
         
        
      },
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          ticks: {
           // max: 100,
            min: 0,
            stepSize: 10000
          }
          // stacked: true
        }],
      }
    },
  });

}

function  DynaChartNMBFlowWrap(dataNMBLine1flow,dataNMBLine2flow,dataNMBLine3flow,dataNMBLine4flow,tEndNMBflow) {
    debugger;
    debugger;
    var ctx = document.getElementById('FlowWrapChartNMB').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: tEndNMBflow,
        datasets: [{
          data: dataNMBLine1flow,
          label: "Line1",
          borderColor: "rgb(62,149,205)",
          backgroundColor: "rgb(255, 255, 255)",
          borderWidth: 2,
          lineTension: 0
        },
        {
          data: dataNMBLine2flow,
          label: "Line2",
          borderColor: "rgb(0, 32, 128)",
          backgroundColor: "rgb(255, 255, 255)",
          borderWidth: 2,
          lineTension: 0
        },
        {
          data: dataNMBLine3flow,
          label: "Line3",
          borderColor: "rgb(51, 102, 153)",
          backgroundColor: "rgb(255, 255, 255)",
          borderWidth: 2,
          lineTension: 0
        },
        {
          data: dataNMBLine4flow,
          label: "Line4",
          borderColor: "rgb(255, 26, 140)",
          backgroundColor: "rgb(255, 255, 255)",
          borderWidth: 2,
          lineTension: 0
        }
  
        ]
  
      },
      options: {
        
          legend: {
            display: true,
            position:'top',
           
          
        },
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            ticks: {
             // max: 100,
              min: 0,
              stepSize:10000
            }
            // stacked: true
          }],
        }
      },
    });
}

function  DynaChartVPCCasePacker(dataVPCLine5case,dataVPCLine6case,dataVPCLine7case,dataVPCLine8case,tEndVPCcase) {
   
    debugger;
  var ctx = document.getElementById('CasePackerChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: tEndVPCcase,
      datasets: [{
        data: dataVPCLine5case,
        label: "Line5",
        borderColor: "rgb(62,149,205)",
        backgroundColor: "rgb(255, 255, 255)",
        borderWidth: 2,
        lineTension: 0
      },
      {
        data: dataVPCLine6case,
        label: "Line6",
        borderColor: "rgb(0, 32, 128)",
        backgroundColor: "rgb(255, 255, 255)",
        borderWidth: 2,
        lineTension: 0
      },
      {
        data: dataVPCLine7case,
        label: "Line7",
        borderColor: "rgb(51, 102, 153)",
        backgroundColor: "rgb(255, 255, 255)",
        borderWidth: 2,
        lineTension: 0
      },
      {
        data: dataVPCLine8case,
        label: "Line8",
        borderColor: "rgb(255, 26, 140)",
        backgroundColor: "rgb(255, 255, 255)",
        borderWidth: 2,
        lineTension: 0
      }

      ]

    },
    options: {
      
        legend: {
          display: true,
          position:'top',
         
        
      },
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          ticks: {
           // max: 100,
            min: 0,
            stepSize: 1000
          }
          // stacked: true
        }],
      }
    },
  });

}

function  DynaChartNMBCasePacker(dataNMBLine1case,dataNMBLine2case,dataNMBLine3case,dataNMBLine4case,tEndNMBcase) {
    debugger;
    debugger;
    var ctx = document.getElementById('CasePackerChartNMB').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: tEndNMBcase,
        datasets: [{
          data: dataNMBLine1case,
          label: "Line1",
          borderColor: "rgb(62,149,205)",
          backgroundColor: "rgb(255, 255, 255)",
          borderWidth: 2,
          lineTension: 0
        },
        {
          data: dataNMBLine2case,
          label: "Line2",
          borderColor: "rgb(0, 32, 128)",
          backgroundColor: "rgb(255, 255, 255)",
          borderWidth: 2,
          lineTension: 0
        },
        {
          data: dataNMBLine3case,
          label: "Line3",
          borderColor: "rgb(51, 102, 153)",
          backgroundColor: "rgb(255, 255, 255)",
          borderWidth: 2,
          lineTension: 0
        },
        {
          data: dataNMBLine4case,
          label: "Line4",
          borderColor: "rgb(255, 26, 140)",
          backgroundColor: "rgb(255, 255, 255)",
          borderWidth: 2,
          lineTension: 0
        }
  
        ]
  
      },
      options: {
        
          legend: {
            display: true,
            position:'top',
           
          
        },
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            ticks: {
             // max: 100,
              min: 0,
              stepSize:1000
            }
            // stacked: true
          }],
        }
      },
    });
}





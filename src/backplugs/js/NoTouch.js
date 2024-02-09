$(document).ready(function () {
    debugger;

    var date = localStorage.getItem('date');
    var Finalshift = window.localStorage.getItem('Shift');
    // var Finalshift =  window.localStorage.getItem('Shift');
    //  if (Finalshift == 'Shift1') {
    //      var shift1 = 'Shift A';
    //  }
    //  else if (Finalshift == 'Shift2') {
    //      var shift1 = 'Shift B';
    //  }
    //  else if (Finalshift == 'Shift3') {
    //      var shift1 = 'Shift C';
    //  }
 
    var machine = localStorage.getItem('machine');

    document.getElementById("lbldttm").innerHTML =date;
    document.getElementById("shift1").innerHTML = Finalshift;
    document.getElementById("machine").innerHTML = machine;

    notouchdashboard(Finalshift);
    
});

function notouchdashboard(Finalshift) {
    debugger;
    var selectDate = document.getElementById("lbldttm").innerText;
    var shift = Finalshift;
    var line = document.getElementById("machine").innerText;

    $.ajax({
        type: 'GET',
        url: '/notouch',
        data: { selectDate: selectDate, shift: shift, line: line },
        //async: false,
        success: function (data) {
            debugger;
            var maxlSeconds, avglSeconds, minlSeconds, count;
            if (data != "") {
                var response = data.recordset;
                if (response.length > 0) {

                    $.each(response, function (i, d) {
                        maxlSeconds = d["maxlSeconds"];
                        avglSeconds = d["avglSeconds"];
                        minlSeconds = d["minlSeconds"];
                        count = d["count"];
                        if(count <1)
                        {
                            count=0;
                        }
                       
                    });
                    const max = moment.utc(maxlSeconds * 1000).format('HH:mm:ss');
                    const avg = moment.utc(avglSeconds * 1000).format('HH:mm:ss');
                    const min = moment.utc(minlSeconds * 1000).format('HH:mm:ss');

                    document.getElementById("maxlbl").innerHTML = max;
                    document.getElementById("avglbl").innerHTML = avg;
                    document.getElementById("minlbl").innerHTML = min;
                    document.getElementById("countlbl").innerHTML = count;
                }
            }
            status(Finalshift);
        }
    });
}

function status(Finalshift) {
    $("#NoTouchtbody").empty();
    debugger;
    var selectDate = document.getElementById("lbldttm").innerText;
    var shift = Finalshift;
    var line = document.getElementById("machine").innerText;

    $.ajax({
        type: 'GET',
        url: '/StatusNotouchtab',
        data: { selectDate: selectDate, shift: shift, line: line},
       // async: false,
        success: function (data) {
            debugger;
            var category;
            if (data != "") {
                var response = data.recordset;
                if (response.length > 0) {
                    $.each(response, function (i, d) {
                        var k=i+1;
                        var st = d["tStart"];
                        var st1 = st.split("T");
                        var dt = st1[0];
                        var dt1 = st1[1].split(".");
                        var Sdt = dt1[0].split(":");
                        var St = Sdt[0];
                        var st1 = Sdt[1];
                        var start=dt+" "+St + ":" + st1 + ":" + Sdt[2];
                        var startdt = St + ":" + st1 + ":" + Sdt[2];


                        var endtime = d["tEnd"];
                        var To1 = endtime.split("T");
                        var t = To1[0];
                        var t1 = To1[1].split(".");
                        var Edt = t1[0].split(":");
                        var E = Edt[0];
                        var E1 = Edt[1];
                        var EndTm = t  + " " + E + ":" + E1 + ":" + Edt[2];
                        var totime = E + ":" + E1 + ":" + Edt[2];

                        var time = d["machinetime"];
                        var time1 = time.split("T");
                        var tm = time1[0];
                        var tm1 = time1[1].split(".");
                        var machinetime = tm1[0];

                        var sEventDesc = d["sCategory"];
                        if (sEventDesc == "Activity Area Running - Point") {
                            category = "Running";
                        }
                        else {
                            category = "Down";
                        }

                        var row = '<tr>';
                        row += '<td>' + k + '</td>';
                        row += '<td>' + startdt + '</td>';
                        row += '<td>' + totime + '</td>';
                        if (category == "Running") {
                            row += '<td>' + category + '</td>';
                        }
                        else {//<button class="btn btn-primary" onclick="return showpopup(this)">Down</button>   //onclick="ShowLossDesc("' + selectDate + '","' + shift + '" ,"' + line + '" ,"' + start + '", "' + EndTm + '")
                            row += '<td>' + '<a onclick="return ShowLossDesc(this)" style="color:red"> Down </a>' + '</td>';
                        }

                        row += '<td>' + machinetime + '</td>';
                        row += '</tr>';
                        $('#NoTouchtbody').append(row);

                    });
                }
            }
        }
    });
}

function ShowLossDesc(rowIndexOfGridview) {
    debugger;
    $("#Losstbody").empty();
    var Finalshift=window.localStorage.getItem('Shift');
    var selectDate = document.getElementById("lbldttm").innerText;
    var shift = Finalshift;
    var line = document.getElementById("machine").innerText;

    var row = rowIndexOfGridview.parentNode.parentNode;
    var rowIndex = row.rowIndex - 1;

    var st = row.cells[1].outerText;
    var tstart=selectDate+" "+st;
    var et = row.cells[2].outerText;
    var tEnd=selectDate+" "+et;

    document.getElementById("lbldate").innerHTML= tstart;

    $.ajax({
        type: 'GET',
        url: '/lossdesc',
        data: { selectDate: selectDate, shift: shift, line: line,tstart: tstart, tEnd: tEnd},
      //  async: false,
        success: function (data) {
            debugger;
            if (data != null) {
                var response = data.recordset;
                if (response.length > 0) {
                    $.each(response, function (i, d) {
                        var k=i+1;
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

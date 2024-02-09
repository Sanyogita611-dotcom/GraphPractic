var dTotal;
$(document).ready(function () {
    debugger;
    var date = localStorage.getItem('date');
    var shift = localStorage.getItem('Shift');
    var machine = localStorage.getItem('machine');

    document.getElementById("lbldttm").innerHTML = date//'2021-05-06'
    document.getElementById("shift1").innerHTML = shift//'Shift 1';
    document.getElementById("machine").innerHTML = machine;

    var url = window.location.search;
    if (url != '') {
        var tm = url.split('-');
        if (tm == null) {
            dTotal = 480;
        }
        else {
            dTotal = tm[1];
        }
    }
    else {
        dTotal = 480;
    }
    getOPEChart();
})

function getOPEChart() {
    /// debugger;
    var selectDate = document.getElementById("lbldttm").innerText;
    var shift = document.getElementById("shift1").innerText;
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
                    var perarr = [], descarr = [], totalper = 0.0, minarr = [], losscode = [];
                    for (x = 0; x < response.length; x++) {
                        minarr.push(response[x]["LMin"]);
                        var per = ((response[x]["LMin"] / dTotal) * 100);
                        perarr.push(per.toFixed(1));
                        descarr.push(response[x]["LossDesc"]);
                        losscode.push(response[x]["sEventDesc"]);

                        totalper += parseFloat(per);

                        var row = '<tr>';
                        row += '<td>' + x + '</td>';
                        row += '<td>' +response[x]["sEventDesc"] + '</td>';
                        row += '<td>' + response[x]["LossDesc"] + '</td>';
                        row += '<td>' + response[x]["LMin"] + '</td>';
                        row += '<td>' +per.toFixed(1)+"%" + '</td>';
                        row += '<td>' + response[x]["RootCause"] + '</td>';
                        row += '</tr>';
                        $('#OPEtbody').append(row);
                    }
                    totalper = totalper.toFixed(1);
                    if (totalper > 100) {
                        totalper = 100;
                    }
                    var withoutlossper = parseFloat(100 - totalper).toFixed(1);

                    perarr[response.length] = withoutlossper;
                    descarr[response.length] = ("Running");
                    losscode[response.length] = ("Running");

                    waterfall(losscode, perarr, 'container');
                }
                else{
                    waterfall("Running", 100, 'container');
                }
            }
        }
    });
}

function waterfall(Xarr, Yarr, DivId) {
    var data = [
        {
            //name: "2018",
            type: "waterfall",
            orientation: "v",
            //measure: measure,
            x: Xarr,
            textposition: "outside",
            text: Yarr,
            y: Yarr,
            // color:"#3c8dbc",

            connector: {
                line: {
                    color: "#3c8dbc"
                }
            },
        }
    ];
    layout = {
        // title: {
        //     text: "OPE Loss Details"
        // },
        xaxis: {
            type: "category"
        },
        yaxis: {
            type: "linear"
        },
        autosize: true,
        //showlegend: true
    };

    Plotly.newPlot(DivId, data, layout);
}

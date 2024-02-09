var buttonCommon;

$(document).ready(function () {
    debugger;
    buttonCommon = {
        exportOptions: {
            format: {
                body: function (data, row, column, node) {
                    // Strip $ from salary column to make it numeric
                    return column === 5 ?
                        data.replace(/[$,]/g, '') :
                        data;
                }
            }
        }
    }

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

    document.getElementById("lbldttm").innerHTML = date;
    document.getElementById("shift1").innerHTML = Finalshift;
    document.getElementById("machine").innerHTML = machine;

    getProductionDetailData(Finalshift);
});

function getProductionDetailData(Finalshift) {
    debugger;
    $('#ProductionDetailBody').empty();
    var selectDate = document.getElementById("lbldttm").innerText;
    var shift = Finalshift;
    var machine = document.getElementById("machine").innerText;

    $.ajax({
        type: 'GET',
        url: '/getProductionDetailData',
        data: { selectDate: selectDate, shift: shift, machine: machine },
        async: false,
        success: function (data) {
            debugger;

            if (data != "") {
                var response = data.recordset;
                if (response.length > 0) {

                    $.each(response, function (i, d) {
                        var tDate = d["tDate"];
                        var Date = tDate.split("T");
                        var date = Date[0];

                        var OEE1=d["dOEE"];
                        var OEE = OEE1.toFixed(2);
                        var upm= d["dTotalParts"]/10;
                        var row = '<tr>';
                        row += '<td>' + date + '</td>';
                        row += '<td>' + d["tStart"].split("T")[1].split(".")[0] + '</td>';
                        row += '<td>' + d["tEnd"].split("T")[1].split(".")[0] + '</td>';
                        row += '<td>' + d["sShift"] + '</td>';
                        row += '<td>' + d["WorkcellDesc"] + '</td>';
                       // row += '<td>' + d["dSpeed"] + '</td>';
                        row += '<td>' + d["sPartId"] + '</td>';
                        row += '<td>' + d["dGoodParts"] + '</td>';
                        row += '<td>' + d["dScrapParts"] + '</td>';
                        row += '<td>' + d["dTotalParts"] + '</td>';
                        row += '<td>' + upm + '</td>';

                        row += '<td>' + OEE+ '</td>';
                        // if(machine=='Process')
                        // {
                        //     row += '<td>' + d["dDesignSpeedProcess"] + '</td>';
                        //     row += '<td>' + d["sPartId"] + '</td>';                           
                        // }
                        // else
                        // {
                        //     row += '<td>' + d["dDesignSpeed"] + '</td>';
                        //     var sku= d["sPartId"].split(/(\d+)/);
                        //     row += '<td>' + sku[0] + '</td>';
                        // }
                       
                        // if(d["Grammage"]==null)
                        // {
                        //     row += '<td>' + 0+ '</td>';
                        // }
                        // else
                        // {
                        //     row += '<td>' + d["Grammage"] + '</td>';
                        // }
                        //row += '<td>' + d["CLDCount"] + '</td>';
                        row += '</tr>';
                        $('#tblProductionDetail').append(row);
                    });
                }
            }
        }
    });
    $('#tblProductionDetail').DataTable({
        dom: 'Bfrtip',
        buttons: [
            $.extend(true, {}, buttonCommon, {
                extend: 'excelHtml5',
                text: 'Export To Excel',
                color: "blue",
                filename: function () {
                    var filename = new Date();
                    var dateFormat = "Y-m-d H-i";
                    filename = format(filename, dateFormat);
                    var name = "Production Report" + " " + filename;
                    return name
                }
            }),
        ]
    });
}




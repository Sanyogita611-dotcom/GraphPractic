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
    var shift = localStorage.getItem('Shift');
    var machine = localStorage.getItem('machine');

    document.getElementById("lbldttm").innerHTML = date;
    document.getElementById("shift1").innerHTML = shift;
    document.getElementById("machine").innerHTML = machine;

    getProductionDetailData();
});

function getProductionDetailData() {
    debugger;
    $('#ProductionDetailBody').empty();
    var selectDate = document.getElementById("lbldttm").innerText;
    var shift = document.getElementById("shift1").innerText;
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
                                        
                    var row = '<tr>';
                   row += '<td>' +  date + '</td>';
                   row += '<td>' + d["sShift"] + '</td>';
                    row += '<td>' + d["tStart"] + '</td>';
                    row += '<td>' + d["tEnd"] + '</td>';
                    row += '<td>' + d["dTotalParts"] + '</td>';
                    row += '<td>' + d["dGoodParts"] + '</td>';
                    row += '<td>' + d["dScrapParts"] + '</td>';
                    row += '<td>' + d["dOEE"] + '</td>';
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




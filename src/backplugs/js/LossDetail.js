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
    // if (Finalshift == 'Shift1') {
    //     var shift1 = 'Shift A';
    // }
    // else if (Finalshift == 'Shift2') {
    //     var shift1 = 'Shift B';
    // }
    // else if (Finalshift == 'Shift3') {
    //     var shift1 = 'Shift C';
    // }
    var machine = localStorage.getItem('machine');

    document.getElementById("lbldttm").innerHTML = date;
    document.getElementById("shift1").innerHTML = Finalshift;
    document.getElementById("machine").innerHTML = machine;

    getLossDetailData(Finalshift);
});

function getLossDetailData(Finalshift) {
    debugger;
    $('#LossDetailBody').empty();
    var selectDate = document.getElementById("lbldttm").innerText;
    var shift = Finalshift;
    var machine = document.getElementById("machine").innerText;

    $.ajax({
        type: 'GET',
        url: '/getLossDetailData',
        data: { selectDate: selectDate, shift: shift, machine: machine },
        //async: false,
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
                        row += '<td>' + startdt + '</td>';
                        row += '<td>' + EndTm + '</td>';
                        row += '<td>' + time + '</td>';
                        row += '<td>' + d["LossDesc"] + '</td>';
                        // row += '<td>' + d["RootCause"] + '</td>';
                        row += '</tr>';
                        $('#LossDetailBody').append(row);

                    });
                }
            }
            $('#tbllossdetail').DataTable({
                            
               // dom: 'Bfrt<"col-md-6 inline"i> <"col-md-6 inline"p>',
                 dom: 'Bfrtip',

                    buttons: [
                        // $.extend(true, {}, buttonCommon, {
                        //     extend: 'copyHtml5'
                        // }),
                        $.extend(true, {}, buttonCommon, {
                            extend: 'excelHtml5',
                            text: 'Export To Excel',
                            color: "blue",
                            filename: function () {
                                var filename = new Date();
                                var dateFormat = "Y-m-d H-i";
                                filename = format(filename, dateFormat);
                                var name = "Loss Detail Report" + " " + filename;
                                return name
                            }
                        }),
                        // $.extend(true, {}, buttonCommon, {
                        //     extend: 'pdfHtml5'
                        // })
                      
                    ]
                
            });

        }

    });

}



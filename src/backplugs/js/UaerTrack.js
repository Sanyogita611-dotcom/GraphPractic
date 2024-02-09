


$(document).ready(function () {
    getUserTrackData()
});

function getUserTrackData() {

    $("#userbody").empty();
    $.ajax({
        type: "get",
        url: "/getUserTrackData",
        // dataType: "json",
        success: function (data) {
            debugger;
            var response = JSON.parse(JSON.stringify(data.recordset));

            $.each(response, function (i, d) {
                if(d["PageName"]!='/UserTrack.html'){
                var datetime = new Date(d["DateTime"]);
                var datetimeformat = "Y-m-d";
                datetime = format(datetime, datetimeformat);

                var pagename = d["PageName"].split('/');

                var row = '<tr>';
                row += '<td style="display:none">' + d["RowId"] + '</td>';
                row += '<td>' + (i + 1) + '</td>';
                row += '<td>' + datetime + '</td>';
                row += '<td>' + d["UserName"] + '</td>';
                row += '<td>' + pagename[1] + '</td>';
                row += '<td>' + d["PageCount"] + '</td>';
                row += '<td>' + '<img src="img/images.png" style="height:20px;" onclick="return showpopup(this)">' + '</td>';
                row += '</tr>';
                $('#userbody').append(row);
                }
            });
        }
    })
}

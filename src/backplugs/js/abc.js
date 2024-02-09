function getabc() {

    $("#tblerecirptbody").empty();

    $.ajax({
        type: 'get',
        url: "/getAbc",
        dataType: 'json',
        async: false,

        success: function (result) {
            debugger;
            var response = JSON.parse(JSON.stringify(result.recordset));
            $.each(response, function (i, d) {
                var row = '<tr>';
                row += '<td>' + d["Sr. No."] + '</td>';
                row += '<td>' + d["Shift"] + '</td>';
                row += '<td>' + d["Maintenance Type"] + '</td>';
                row += '<td>' + d["Operator"] + '</td>';
                row += '<td>' + d["Equipment"] + '</td>';
                row += '<td>' + '<button class="btn btn-primary" onclick="">Allocate<i class="fas fa-user-allocate"></i></button>' + '</td>';
                row += '</tr>';

                $('#tblerecirptbody').append(row);
            });
        }
    })
}


var password;
var pass1="1234";
password=prompt("Enter password to view page");

if(password==pass1){
    alert("welcome ...click on ok to view page")
}
else{
    window.location.href="header.html";
}
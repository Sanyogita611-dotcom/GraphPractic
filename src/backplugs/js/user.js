
//Global Variables
var selectedrow;
$(document).ready(function () {
    getUSers()
});

function getUSers() {

    $("#userbody").empty();
    $.ajax({
        type: "get",
        url: "/getusers",
        // dataType: "json",
        success: function (data) {
            debugger;
            var response = JSON.parse(JSON.stringify(data.recordset));

            $.each(response, function (i, d) {
                var row = '<tr>';
                row += '<td style="display:none">' + d["UserId"] + '</td>';
                row += '<td>' + (i + 1) + '</td>';
                row += '<td>' + d["Email"] + '</td>';
                row += '<td>' + d["ContactNo"] + '</td>';
                if (d["StatusFlag"] == 1) {
                    row += '<td>' + 'Active' + '</td>';
                }
                else {
                    row += '<td>' + 'Deactive' + '</td>';
                }
                row += '<td>' + '<img src="img/images.png" style="height:20px;" onclick="return showpopup(this)">' + '</td>';
                row += '</tr>';
                $('#userbody').append(row);

            });
        }
    })
}

function AddUserModal() {
    document.getElementById("txtEmail").value = '';
    document.getElementById("txtmobile").value = '';
    document.getElementById("txtPassword").value = '';
    $('#createModal').modal('show');
}

function sendDataToInsert() {
    debugger;
    // Required Field validation   
    var mobile = document.getElementById("txtmobile").value;
    var Email = document.getElementById("txtEmail").value;
    var Password = document.getElementById("txtPassword").value;
    var Status = document.getElementById("ddlstatus").value;

    var today = new Date();
    var dateFormat = "Y-m-d H:i:s";
    var date = format(today, dateFormat);

    if (Email == "" || Password == "" ||
        Email == null || Password == null) {
        alert("Some Field is missing.. Please Enter Data.");
    }
    else {
        $.post("/CreatUser", { mobile: mobile, Status: Status, Email: Email, Password: Password, date: date }, function (data) {
            debugger;
            //  var response = JSON.parse(JSON.stringify(data));           
            if (data.rowsAffected == 1) {
                $("#createModal").modal('hide');
                alert("Data saved successfully...");
                //window.location.reload(true);
                getUSers();
            }
        });
    }
}


// sending table data to popup window

function showpopup(rowIndexOfGridview) {

    debugger;
    selectedrow = rowIndexOfGridview.parentNode.parentNode;
    //var rowIndex = row.rowIndex - 1;

    var Id = selectedrow.cells[0].innerHTML;
    txtupdateUserId.value = Id;

    var Email = selectedrow.cells[2].innerHTML;
    txtupdateEmail.value = Email;
    var mono = selectedrow.cells[3].innerHTML;
    txtupdatemobile.value = mono;

    var gr = selectedrow.cells[4].innerHTML;
    var r = document.getElementById("updateStatus");
    var g = r.options[r.selectedIndex].text;
    if (gr.trim() != g.trim()) {
        $('#updateStatus option').removeProp('selected');
        $("#updateStatus option").each(function () {
            if ($(this).text() === gr) {
                $(this).prop("selected", "selected");
                $(this).innerHTML = gr;
                return;
            }
        });
    }

    $("#UpdateModal").modal('show');

}
function sendDataToUpdate() {
    // Required Field validation
    var Id = document.getElementById("txtupdateUserId").value;
    var mobile = document.getElementById("txtupdatemobile").value;
    var Email = document.getElementById("txtupdateEmail").value;
    var Status = document.getElementById("updateStatus").value;

    var today = new Date();
    var dateFormat = "Y-m-d H:i:s";
    var date = format(today, dateFormat);

    if (Id == "" || Email == "" ||
        Id == null || Email == null) {
        alert("Some Field is missing.. Please Enter Data.");
    }
    else {
        //Updation code for user updates

        $.post("/UpdateUser", {
            userid: Id, mobile: mobile, Status: Status, Email: Email, date: date
        }, function (data) {
            debugger;

            if (data.rowsAffected == 1) {
                $("#UpdateModal").modal('hide');
                alert("Data Updated successfully...");
                getUSers()
            }
        });
    }
}

function sendDataToDelete() {
    // Required Field validation
    debugger;
    var choice = confirm("Are you sure to delete this record?");
    if (choice == true) {

        var Id = document.getElementById("txtupdateUserId").value;


        if (Id == "" || Id == null) {
            alert("Some Field is missing.. Please Enter Data.");
        }
        else {
            //Deletion code for records

            $.post("/deleteUser", { userid: Id }, function (data) {
                debugger;
                if (data.rowsAffected == 1) {

                    $("#UpdateModal").modal('hide');
                    alert("Data Deleted successfully...");

                    //window.location.reload(true);

                    var i = selectedrow.rowIndex;
                    document.getElementById("tblUserData").deleteRow(i);

                }
            });

        }

    }

}

//#region reset password
function ResetPassword() {

    document.getElementById("txtPass").value = '';
    document.getElementById("txtConfirmPass").value = '';
    $("#UpdateModal").modal('hide');
    $('#ResetPasswordModal').modal('show');
}

function updateResetPassword() {
    debugger;
    // Required Field validation   
    var Id = document.getElementById("txtupdateUserId").value;
    var Pass = document.getElementById("txtPass").value;
    var ConfirmPass = document.getElementById("txtConfirmPass").value;

    if (Pass == "" || ConfirmPass == "" || Id == "" ||
        Pass == null || ConfirmPass == null) {
        alert("Some Field is missing.. Please Enter Data.");
    }
    else if (Pass != ConfirmPass) {
        alert("Password dose not matched...");
    }
    else {
        $.post("/ResetPassword", { Id, Pass }, function (data) {
            debugger;
            //  var response = JSON.parse(JSON.stringify(data));           
            if (data.rowsAffected == 1) {
                $("#ResetPasswordModal").modal('hide');
                alert("Password Reset Successfully...");
                //window.location.reload(true);
                getUSers();
            }
        });
    }
}
//#endregion

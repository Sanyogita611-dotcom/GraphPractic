
$(document).ready(function () {
    getMMPCOdeID();
    $('#ddltype').on('change', function (e) {
        DisplayData();
    })
});

function getMMPCOdeID() {
    debugger;

    $.ajax({
        type: 'GET',
        url: '/getMMPCodeID',
        dataType: 'json',
        async: false,
        success: function (result) {
            var response = result.recordset;
            var option = '';
            $.each(response, function (i, d) {
                if (i == 0) {
                    // option += '<option value="0" selected>' + '---Select Option---' + '</option>';
                    option += '<option value="' + response[i]["MMPCodeID"] + '">' + response[i]["MMPCodeDesc"] + '</option>';
                }
                else {
                    option += '<option value="' + response[i]["MMPCodeID"] + '">' + response[i]["MMPCodeDesc"] + '</option>';
                }
            });
            $('.mmpcode').html(option);
            $('.mmpcode_update').html(option);
            DisplayData();
        }
    })
}


function singleentrydata() {
    debugger;
    var mmplosscode = document.getElementById("mmplosscode").value;

    if (mmplosscode == "" || mmplosscode == null) {
        alert("Some Field is missing.. Please Enter Required Data.");
    }
    else {
        $.get("/singleentry",
            {
                mmplosscode: mmplosscode,
            },
            function (result) {
                var response = JSON.parse(JSON.stringify(result.recordset));
                if (response.length > 0) {
                    alert('Cannot Insert Data...Record Already Exists');

                    // DisplayData();
                    $("#createModal").modal("hide");
                    // $("#createModal").empty();

                } else {
                    sendDataToInsert();
                }
            });
    }

}

function DisplayData() {
    debugger;
    $("#rootcausebody").empty();
    var type = document.getElementById('ddltype').value;
    $.ajax({
        type: 'get',
        url: '/getRootCauseData',
        data: { type },
        success: function (result) {
            debugger;
            var data = (result.recordset);
            if (data.length > 0) {
                $.each(data, function (i, d) {
                    var row = '<tr>';
                    row += '<td>' + d["MMPLossCodeID"] + '</td>';
                    row += '<td>' + d["MMPLossCodeDesc"] + '</td>';
                    row += '<td>' + d["details"] + '</td>';
                    row += '<td>' + d["RootCause1"] + '</td>';
                    row += '<td>' + d["RootCause2"] + '</td>';
                    row += '<td>' + d["RootCause3"] + '</td>';
                    row += '<td>' + d["RootCause4"] + '</td>';
                    row += '<td>' + d["RootCause5"] + '</td>';
                    row += '<td>' + d["RootCause6"] + '</td>';
                    row += '<td>' + d["Type"] + '</td>';
                    row += '<td>' + '<img src="img/images.png" style="height:20px;" onclick="return showupdatepopup(this)">' + '</td>';
                    row += '</tr>';
                    $('#rootcausebody').append(row);

                });
            }
        }
    })
}


function ShowAdd() {

    document.getElementById("mmpcode").value = '';
    document.getElementById("mmplosscode").value = '';
    document.getElementById("mmplossdesc").value = '';
    document.getElementById("rootcause1").value = '';
    document.getElementById("rootcause2").value = '';
    document.getElementById("rootcause3").value = '';
    document.getElementById("rootcause4").value = '';
    document.getElementById("rootcause5").value = '';
    document.getElementById("rootcause5").value = '';
    $('#createModal').modal({

        backdrop: 'static',
        keyboard: false
    });
}
function sendDataToInsert() {

    debugger;
    // Required Field validation
    var mmpcode = document.getElementById("mmpcode").value;
    var mmplosscode = document.getElementById("mmplosscode").value;
    var mmplossdesc = document.getElementById("mmplossdesc").value;
    var rootcause1 = document.getElementById("rootcause1").value;
    var rootcause2 = document.getElementById("rootcause2").value;
    var rootcause3 = document.getElementById("rootcause3").value;
    var rootcause4 = document.getElementById("rootcause4").value;
    var rootcause5 = document.getElementById("rootcause5").value;
    var rootcause6 = document.getElementById("rootcause6").value;
    var type = document.getElementById("ddltypeid").value;

    if (mmpcode == "" || mmplosscode == "" || mmplossdesc == "" ||

        mmpcode == null || mmplosscode == null || mmplossdesc == null) {
        alert("Some Field is missing.. Please Enter Required Data.");
    }
    else {

        $.post("/addRootCauseData",
            {
                mmpcode: mmpcode,
                mmplosscode: mmplosscode,
                mmplossdesc: mmplossdesc,
                rootcause1: rootcause1,
                rootcause2: rootcause2,
                rootcause3: rootcause3,
                rootcause4: rootcause4,
                rootcause5: rootcause5,
                rootcause6: rootcause6,
                type: type
            },
            function (result) {
                var response = JSON.parse(JSON.stringify(result.rowsAffected));
                console.log(response);
                if (result.rowsAffected > 0) {
                    alert('Data submitted successfully..');
                    $("#createModal").modal("hide");
                    DisplayData();

                } else {
                    alert('Data not saved..');
                }
            });
    }

}
//update data

function showupdatepopup(rowIndexOfGridview) {
    selectedrow = rowIndexOfGridview.parentNode.parentNode;

    var mmpcode = selectedrow.cells[2].innerHTML;
    var r = document.getElementById("mmpcode_update");
    var g = r.options[r.selectedIndex].text;
    if (mmpcode.trim() != g.trim()) {
        $('#mmpcode_update option').removeProp('selected');
        $("#mmpcode_update option").each(function () {
            if ($(this).text() === mmpcode) {
                $(this).prop("selected", "selected");
                $(this).innerHTML = mmpcode;
                return;
            }
        });
    }

    var mmplosscode = selectedrow.cells[0].innerText;
    mmplosscode_update.value = mmplosscode;

    var mmplossdesc = selectedrow.cells[1].innerText;
    mmplossdesc_update.value = mmplossdesc;

    var rootcause1 = selectedrow.cells[3].innerText;
    rootcause1_update.value = rootcause1;

    var rootcause2 = selectedrow.cells[4].innerText;
    rootcause2_update.value = rootcause2;

    var rootcause3 = selectedrow.cells[5].innerText;
    rootcause3_update.value = rootcause3;

    var rootcause4 = selectedrow.cells[6].innerText;
    rootcause4_update.value = rootcause4;

    var rootcause5 = selectedrow.cells[7].innerText;
    rootcause5_update.value = rootcause5;

    var rootcause6 = selectedrow.cells[8].innerText;
    rootcause6_update.value = rootcause6;

    var ty = selectedrow.cells[9].innerHTML;
    var r1 = document.getElementById("updatetypeid");
    var g1 = r1.options[r1.selectedIndex].text;
    if (ty.trim() != g1.trim()) {
        $('#updatetypeid option').removeProp('selected');
        $("#updatetypeid option").each(function () {
            if ($(this).text() === ty) {
                $(this).prop("selected", "selected");
                $(this).innerHTML = ty;
                return;
            }
        });
    }

    $('#UpdateModal').modal({
        backdrop: 'static',
        keyboard: false
    });
}

function sendDataToUpdate() {
    debugger;
    var mmpcode = document.getElementById("mmpcode_update").value;
    var mmplosscode = document.getElementById("mmplosscode_update").value;
    var mmplossdesc = document.getElementById("mmplossdesc_update").value;
    var rootcause1 = document.getElementById("rootcause1_update").value;
    var rootcause2 = document.getElementById("rootcause2_update").value;
    var rootcause3 = document.getElementById("rootcause3_update").value;
    var rootcause4 = document.getElementById("rootcause4_update").value;
    var rootcause5 = document.getElementById("rootcause5_update").value;
    var rootcause6 = document.getElementById("rootcause6_update").value;
    var type = document.getElementById("updatetypeid").value;

    if (mmpcode == "" || mmplosscode == "" || mmplossdesc == "" ||
        mmpcode == null || mmplosscode == null || mmplossdesc == null) {
        alert("Some Fields are missing...Please enter required data.")
    }
    else {
        $.post("/updateRootCauseData",
            {
                mmpcode: mmpcode,
                mmplosscode: mmplosscode,
                mmplossdesc: mmplossdesc,
                rootcause1: rootcause1,
                rootcause2: rootcause2,
                rootcause3: rootcause3,
                rootcause4: rootcause4,
                rootcause5: rootcause5,
                rootcause6: rootcause6,
                type: type
            },
            function (data) {
                // var response = JSON.parse(JSON.stringify(data));
                // console.log(response);
                if (data.rowsAffected > 0) {
                    alert('Data Updated successfully..');

                    $("#UpdateModal").modal("hide");
                    DisplayData();

                } else {
                    alert('Data not saved..');
                }
            });
    }
}

function sendDataToDelete() {
    // Required Field validation

    var choice = confirm("Are you sure to delete this record?");
    if (choice == true) {

        var mmplosscode = document.getElementById("mmplosscode_update").value;


        if (mmplosscode == "" || mmplosscode == null) {
            alert("Some Field is missing.. Please Enter Data.");
        }
        else {
            //Deletion code for records

            $.post("/deleteRootCauseData", { mmplosscode: mmplosscode }, function (data) {

                if (data != null) {
                    var response = data.rowsAffected;
                    if (response.length > 0) {

                        alert("Data Deleted successfully...");
                        $("#UpdateModal").modal('hide');

                        DisplayData();
                    }
                }
            });
        }

    }


}





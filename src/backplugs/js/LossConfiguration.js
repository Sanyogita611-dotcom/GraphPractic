
$(document).ready(function () {
    getcategorycode();
   
});

function getcategorycode() {
    debugger;
    $.ajax({
        type: 'GET',
        url: '/getcategorycode',
        dataType: 'json',
        success: function (result) {
            var response = result.recordset;

            var categorycode = '';
            var machinecode = '';
            $.each(response, function (i, d) {
                if (i == 0) {
                    categorycode += '<option value="' + response[i]["MMPLossCodeID"] + '" >' + response[i]["MMPLossCodeDesc"] + '</option>';
                }
                else {
                    categorycode += '<option value="' + response[i]["MMPLossCodeID"] + '">' + response[i]["MMPLossCodeDesc"] + '</option>';
                }
            });
            $('.categorycode').html(categorycode);
            $('.ccode_update').html(categorycode);
           // getMachine();
           DisplayData();
        }
    });

}


function getMachine() {
    debugger;
    $.ajax({
        type: 'GET',
        url: '/getMachineCode',
        dataType: 'json',
        success: function (result) {
            var response = result.recordset;
            var option = '';
            $.each(response, function (i, d) {
                if (i == 0) {
                    option += '<option value="' + response[i]["MachineCode"] + '">' + response[i]["MachineName"] + '</option>';
                }
                else {
                    option += '<option value="' + response[i]["MachineCode"] + '">' + response[i]["MachineName"] + '</option>';
                }
            });
            $('.machinecode').html(option);
            $('.machine_update').html(option);
            $('#ddlmachine').html(option);
            DisplayData();
        }
    })
}

function DisplayData() {
    debugger;
    $("#tbodyLossConfig").empty();
//var machine=document.getElementById('ddlmachine').value;
    $.ajax({
        type: 'get',
        url: '/getLossData',
       // data:{machine},
        success: function (result) {
            debugger;
            var data = (result.recordset);
            if (data.length > 0) {
                $.each(data, function (i, d) {
                    var row = '<tr>';
                    row += '<td>' + d["LossCode"] + '</td>';
                    row += '<td>' + d["SmartTag"] + '</td>';
                    row += '<td>' + d["MMPLossCodeDesc"] + '</td>';
                    row += '<td>' + d["MachineName"] + '</td>';
                    row += '<td>' + '<img src="img/images.png" style="height:20px;" onclick="return updatepopup(this)">' + '</td>';
                    row += '</tr>';
                    $('#tbodyLossConfig').append(row);
                });
            }
        }
    })
}

function ShowLossConfiguration() {

    document.getElementById("losscode").value = '';
    document.getElementById("smarttag").value = '';
    document.getElementById("ctgry_code").value = '';
    document.getElementById("machine_code").value = '';
  

    $('#createModal').modal({
        backdrop: 'static',
        keyboard: false
    });
}

function checkLossCodeExist() {
    var losscode = document.getElementById("losscode").value;
    var machine=document.getElementById('machine_code').value;

    $.ajax({
        type: 'GET',
        url: '/checkLossCodeExist',
        dataType: 'json',
        data: { losscode,machine },
        success: function (result) {
            var response = result.recordset;
            if (response.length > 0) {
                alert('Loss Code is already exist.')
            }
            else {
                LossInsertData();
            }
        }
    })
}

function LossInsertData() {
    debugger;
    // Required Field validation
    var losscode = document.getElementById("losscode").value;
    var smartag = document.getElementById("smarttag").value;
    var catgrycode = document.getElementById("ctgry_code").value;
    var machinecode = document.getElementById("machine_code").value;

    if (losscode == "" || smartag == "" || catgrycode == "" || machinecode == "" ||

        losscode == null || smartag == null || catgrycode == null || machinecode == null ) {
        alert("Some Field is missing.. Please Enter Required Data.");
    }
    else {

        $.post("/InsertLossData",
            {
                losscode: losscode,
                smartag: smartag,
                catgrycode: catgrycode,
                machinecode: machinecode

            },
            function (result) {
                var response = JSON.parse(JSON.stringify(result.rowsAffected));
                console.log(response);
                if (result.rowsAffected > 0) {
                    alert('Data submitted successfully..');
                    DisplayData();
                    $("#createModal").modal("hide");

                } else {
                    alert('Data not saved..');
                }
            });
    }

}
//update data

function updatepopup(rowIndexOfGridview) {
    selectedrow = rowIndexOfGridview.parentNode.parentNode;

    var losscode = selectedrow.cells[0].innerText;
    losscode_update.value = losscode;

    var smartag = selectedrow.cells[1].innerText;
    smarttag_update.value = smartag;

    var catgrycode = selectedrow.cells[2].innerHTML;
    var r = document.getElementById("ctgry_codeupdate");
    var g = r.options[r.selectedIndex].text;
    if (catgrycode.trim() != g.trim()) {
        $('#ctgry_codeupdate option').removeProp('selected');
        $("#ctgry_codeupdate option").each(function () {
            if ($(this).text() === catgrycode) {
                $(this).prop("selected", "selected");
                $(this).innerHTML = catgrycode;
                return;
            }
        });
    }

   

    var machinecode = selectedrow.cells[3].innerHTML;
    var r1 = document.getElementById("machine_codeupdate");
    var g1 = r1.options[r1.selectedIndex].text;
    if (machinecode.trim() != g1.trim()) {
        $('#machine_codeupdate option').removeProp('selected');
        $("#machine_codeupdate option").each(function () {
            if ($(this).text() === machinecode) {
                $(this).prop("selected", "selected");
                $(this).innerHTML = machinecode;
                return;
            }
        });
    }

    

    $('#UpdateModal').modal({
        backdrop: 'static',
        keyboard: false
    });
}

function LossDataToUpdate() {
    debugger;
    var losscode = document.getElementById("losscode_update").value;
    var smartag = document.getElementById("smarttag_update").value;
    var catgrycode = document.getElementById("ctgry_codeupdate").value;
    var machinecode = document.getElementById("machine_codeupdate").value;


    if (losscode == "" || smartag == "" || catgrycode == "" || machinecode == "" || 
        losscode == null || smartag == null || catgrycode == null || machinecode == null ) {
        alert("Some Fields are missing...Please enter required data.")
    }
    else {
        $.post("/updateLossData",
            {
                losscode: losscode,
                smartag: smartag,
                catgrycode: catgrycode,
                machinecode: machinecode
            },
            function (data) {

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

function LossDataToDelete() {

    var choice = confirm("Are you sure to delete this record?");
    if (choice == true) {
        var losscode = document.getElementById("losscode_update").value;
        if (losscode == "" || losscode == null) {
            alert("Some Field is missing.. Please Enter Data.");
        }
        else {
            $.post("/deleteLossConfig", { losscode: losscode }, function (data) {

                if (data != null) {
                    var response = data.rowsAffected;
                    if (response > 0) {
                        alert("Data Deleted successfully...");
                        $("#UpdateModal").modal('hide');
                        DisplayData();
                    }
                }
            });
        }
    }
}


function getrootcause(a) {
    debugger;
    var catgrycode;
    if (a == 1) {
        catgrycode = document.getElementById("ctgry_code").value;
    } else {
        catgrycode = document.getElementById("ctgry_codeupdate").value;
    }

    $.ajax({
        type: 'GET',
        url: '/rootcause',
        dataType: 'json',
        data: { catgrycode: catgrycode },
        async:false,
        success: function (result) {
            var response = result.recordset;
            console.log(response)
            var catgrycode = '';
            var Rootcause1 = response[0]["RootCause1"];
            var Rootcause2 = response[0]["RootCause2"];
            var Rootcause3 = response[0]["RootCause3"];
            var Rootcause4 = response[0]["RootCause4"];
            var Rootcause5 = response[0]["RootCause5"];
            var Rootcause6 = response[0]["RootCause6"];
            var option = '';
            option += '<option value="Select Option" selected>' + '--Select Option--' + '</option>';

            for (var i = 1; i < 7; i++) {

                var rootname = "RootCause" + i

                var rootvalue = response[0][rootname];
                if (rootvalue == null || rootvalue == undefined) {

                } else {
                    option += '<option value="' + rootvalue + '" selected>' + rootvalue + '</option>';
                }
            }
            if (a == 1) {
                $('.rootcauses').html(option);
            }
            else {
                $('.rootcause_updates').html(option);
            }
        }
    });

}







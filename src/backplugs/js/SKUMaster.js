

$(document).ready(function () {

    DisplayData();
});


function DisplayData() {
    debugger;
    $("#skubody").empty();

    $.ajax({
        type: 'get',
        url: '/getData',
        success: function (result) {
            debugger;
            var data = (result.recordset);
            if (data.length > 0) {
                $.each(data, function (i, d) {
                    var row = '<tr>';
                    row += '<td>' + d["SKUId"] + '</td>';
                    row += '<td>' + d["SKUName"] + '</td>';
                    row += '<td>' + d["SKUTabletPerCLD"] + '</td>';
                    row += '<td>' + d["DesignSpeed"] + '</td>';
                    row += '<td>' + d["SKUGrammge"] + '</td>';
                    row += '<td>' + d["SKUPmGrammage"] + '</td>';
                    row += '<td>' + d["SKUTarget"] + '</td>';
                    row += '<td>' + '<img src="img/images.png" style="height:20px;" onclick="return showupdatepopup(this)">' + '</td>';
                    row += '</tr>';
                    $('#skubody').append(row);

                });

            }
        }

    })
}


function ShowAdd() {
    document.getElementById("SkuId").value = "";
    document.getElementById("configname").value = "";
    document.getElementById("tbltcld").value = '';
    document.getElementById("dsgnspd").value = '';
    document.getElementById("grmtblt").value = '';
    document.getElementById("grmppm").value = '';
    document.getElementById("skutrgt").value = '';
    $('#createModal').modal({
        backdrop: 'static',
        keyboard: false
    });
}
function sendDataToInsert() {

    debugger;
    // Required Field validation
    var skuid= document.getElementById("SkuId").value;
    var configname = document.getElementById("configname").value;
    var cld = document.getElementById("tbltcld").value;
    var speed = document.getElementById("dsgnspd").value;
    var gramtablet = document.getElementById("grmtblt").value;
    var grampm = document.getElementById("grmppm").value;
    var target = document.getElementById("skutrgt").value;


    if ( skuid=="" ||configname == "" || cld == "" || speed == "" || gramtablet == "" || grampm == "" || target == "" ||

    skuid==null || configname == null || cld == null || speed == null || gramtablet == null || grampm == null || target == null) {
        alert("Some Field is missing.. Please Enter Required Data.");
    }
    else {

        $.post("/addData",
            {
                skuid:skuid,
                configname: configname,
                cld: cld,
                speed: speed,
                gramtablet: gramtablet,
                grampm: grampm,
                target: target

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

    var skuid = selectedrow.cells[0].innerText;
    skuid_update.value = skuid;

    var configname = selectedrow.cells[1].innerText;
    configname_update.value = configname;

    var cld = selectedrow.cells[2].innerText;
    cld_update.value = cld;

    var speed = selectedrow.cells[3].innerText;
    dsgnspd_update.value = speed;

    var gramtablet = selectedrow.cells[4].innerText;
    grmsachet_update.value = gramtablet;

    var grampm = selectedrow.cells[5].innerText;
    grmppm_update.value = grampm;

    var target = selectedrow.cells[6].innerText;
    skutrgt_update.value = target;

    $('#UpdateModal').modal({
        backdrop: 'static',
        keyboard: false
    });
}

function sendDataToUpdate() {
    debugger;
    var skuid = document.getElementById("skuid_update").value;
    var configname = document.getElementById("configname_update").value;
    var cld = document.getElementById("cld_update").value;
    var speed = document.getElementById("dsgnspd_update").value;
    var gramtablet = document.getElementById("grmsachet_update").value;
    var grampm = document.getElementById("grmppm_update").value;
    var target = document.getElementById("skutrgt_update").value;

    if (skuid == "" || configname == "" || cld == "" || speed == "" || gramtablet == "" || grampm == "" || target == "" ||
        skuid == null || configname == null || cld == null || speed == null || gramtablet == null || grampm == null || target == null) {
        alert("Some Fields are missing...Please enter required data.")
    }
    else {
        $.post("/updateData",
            {
                skuid: skuid,
                configname: configname,
                cld: cld,
                speed: speed,
                gramtablet: gramtablet,
                grampm: grampm,
                target: target
            },
            function (data) {
                var response = JSON.parse(JSON.stringify(data));
                // console.log(response);
                if (response.rowsAffected > 0) {
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
    debugger;
    var choice = confirm("Are you sure to delete this record?");
    if (choice == true) {

        var skuid = document.getElementById("skuid_update").value;
        var configname = document.getElementById("configname_update").value;

        if (skuid == "" || skuid == null
            || configname == "" || configname == null) {
            alert("Some Field is missing.. Please Enter Data.");
        }
        else {
            //Deletion code for records

            $.post("/deleteData", { skuid: skuid, configname: configname }, function (data) {

                if (data != null) {
                    var response = data.rowsAffected;
                    if (response.length > 0) {

                        alert("Data Deleted successfully...");
                        $("#UpdateModal").modal('hide');
                        DisplayData();
                        // var i = selectedrow.rowIndex;
                        // document.getElementById("tblUserData").deleteRow(i);
                        // addSerialNumber("tblRecieptData");
                    }
                }
            });
        }

    }
}



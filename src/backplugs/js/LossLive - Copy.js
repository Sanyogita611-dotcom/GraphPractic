
//Global Variables
var lossname = [], lossid = [];
var OldLoss, OeeEventId, mLossCode;

$(document).ready(function () {
    debugger;

    var date = localStorage.getItem('date');
    var shift = localStorage.getItem('Shift');
    var machine = localStorage.getItem('machine');

    document.getElementById("lbldttm").innerHTML =  '2020-03-16';//date
    document.getElementById("shift1").innerHTML = 'Shift 1';// shift

    getWorkcellname()
});


function getWorkcellname() {
    $.ajax({
        type: 'GET',
        url: '/getWorkcellname',
        // async: false,
        success: function (data) {

            if (data != null) {
                var response = data.recordset;
                if (response.length > 0) {
                    var options = '';
                    $.each(response, function (i, d) {
                        if (i == 0) {
                            options += '<option value="' + d["sActivityAreaName"] + '">' + d["sActivityAreaName"] + '</option>';
                        }
                        else {
                            options += '<option value="' + d["sActivityAreaName"] + '">' + d["sActivityAreaName"] + '</option>';
                        }

                    });

                    $('.ddllinecls').append(options);
                }
            }
        }
    });
}

function getEventData() {
    debugger;
    $('#tbodyLoss').empty();
    var selectDate = document.getElementById("lbldttm").innerText; //"2020-03-16"
    var shift = document.getElementById("shift1").innerText; //"Shift 2";//
    var e = document.getElementById("ddlmachine");
    var machine = e.options[e.selectedIndex].innerHTML;

    if (machine == 'Select Machine') {
        alert('Select Machine');
    }
    else {
        $.ajax({
            type: 'GET',
            url: '/getEventData',
            data: { selectDate: selectDate, shift: shift, machine: machine },
            async: false,
            success: function (data) {
                debugger;

                if (data != "") {
                    var response = data.recordset;
                    if (response.length > 0) {

                        $.each(response, function (i, d) {
                            var st = d["tStart"];
                            var st1 = st.split("T");
                            var dt = st1[0];
                            var dt1 = st1[1].split(".");
                            var Sdt = dt1[0].split(":");
                            var St = Sdt[0];
                            var st1 = Sdt[1];
                            var start = dt + " " + St + ":" + st1 + ":" + Sdt[2];
                            var startdt = St + ":" + st1 + ":" + Sdt[2];


                            var endtime = d["tEnd"];
                            var To1 = endtime.split("T");
                            var t = To1[0];
                            var t1 = To1[1].split(".");
                            var Edt = t1[0].split(":");
                            var E = Edt[0];
                            var E1 = Edt[1];
                            var EndTm = t + " " + E + ":" + E1 + ":" + Edt[2];
                            var totime = E + ":" + E1 + ":" + Edt[2];

                            const Duration = moment.utc(d["lSeconds"] * 1000).format('HH:mm:ss');

                            var row = '<tr>';
                            row += '<td>' + start + '</td>';
                            row += '<td>' + EndTm + '</td>';
                            row += '<td>' + d["LossDesc"] + '</td>';
                            row += '<td>' + Duration + '</td>';
                            row += '<td>' + d["RootCause"] + '</td>';
                            row += '<td style="display:none">' + d["lMINTEventId"] + '</td>';
                            row += '<td>' + '<img src="img/images.png" class="imgtd" style="height:20px;" onclick="return showpopup(this)">' + '</td>';
                            // row += '<td>' + '<button style="color:green" onclick="return showpopup(this)"><i class="fas fa-user-edit"></i></button>' + '</td>';
                            row += '</tr>';
                            $('#tbodyLoss').append(row);

                            var row1 = '<tr>';
                            row1 += '<td>' + start + '</td>';
                            row1 += '<td>' + EndTm + '</td>';
                            row1 += '<td>' + d["LossDesc"] + '</td>';
                            row1 += '<td>' + Duration + '</td>';
                            row1 += '<td>' + d["RootCause"] + '</td>';
                            row1 += '<td style="display:none">' + d["lMINTEventId"] + '</td>';
                            row1 += '</tr>';

                            $('#tbodyLosshide').append(row1);
                        });

                    }
                }

            }
        });
    }
}

function showpopup(rowIndexOfGridview) {

    selectedrow = rowIndexOfGridview.parentNode.parentNode;

    OldLoss = selectedrow.cells[2].innerHTML;
    OeeEventId = selectedrow.cells[5].innerHTML;

    $("#MMPLossPopUp").show();
    $("#cover").show();
    $("#appButton").empty();
    $("#FrequentLossAppButton").empty();
    $.ajax({
        type: 'GET',
        url: '/GetMMPCategory',
        data: {},
        async: false,
        success: function (data) {
            debugger;

            if (data != "") {
                var response = data.recordset;
                if (response.length > 0) {

                    $.each(response, function (i, d) {
                        $("#appButton").append("<a nav-link onclick='showMachines(" + response[i]["CategoryCode"] + ")' class='btn btn-app'> <svg class='c-icon'><use xlink:href='icons/sprites/free.svg#cil-settings'></use> </svg> <br>"
                            + response[i]["MMPLossCodeDesc"] + "</a>");//darkturquoise
                    });

                }
            }

            lossid = ["414004", "8001", "413027", "313213", "8002", "419004",
                "117184", "117185", "117186", "117187", "117188",
                "117189", "117190", "117191", "117192", "117193",
                "117194", "117195", "117196", "117197", "117198",
                "117199"];
            lossname = ["Soft Batch", "JH", "Chill Drum Blade Replacement", "CPU Suction Cup Replacement", "Planned Maintenance", "Flowrap Wrapper Setting",
                "Lamination Jamming in Rotary Cutter", "Lamination Jamming in HOR Sealer", "Rotary Cutter Setting ", "Bulk Foaming Issue", "Perforation Blade Change & Cleaning",
                "Weight Setting", "Auto Collector Jamming", "Pistion Oring Change", "Pull Roller Change", "Lamination Jamming in Pull Roller",
                "Sealer Cleaning", "HT Change", "Roll Change", "HOR Lekage", "Electrical Failure",
                "Other"];
            for (var k = 0; k < lossid.length; k++) {
                $("#FrequentLossAppButton").append("<a  onclick='FrequentLoss(" + k + ")' class='btn btn-app'><svg class='c-icon'><use xlink:href='icons/sprites/free.svg#cil-settings'></use> </svg> <br>"
                    + lossname[k] + "</a>");
            }
            $("#FrequentLosses").hide();
        }

    });
    //$("#UpdateModal").modal('show');
    $('#UpdateModal').modal({
        backdrop: 'static',
        keyboard: false
    })
}

function showCatOrFreq(flag, ele) {
    debugger;
    if (flag == 'freq') {
        $("#FrequentLosses").show();
        $("#LossCategory").hide();
        $("#freqid").addClass('active');
        $("#catid").removeClass('active');
    }
    else {
        $("#LossCategory").show();
        $("#FrequentLosses").hide();
        $("#catid").addClass('active');
        $("#freqid").removeClass('active');
    }
}

function hidedata() {
    $("#MMPLossPopUp").hide();
    $("#cover").hide();
    $("#MMPLossPopUp1").hide();
    $("#cover1").hide();
    $("#confirmBox").hide();
    $("#Confirmcover").hide();
    $("#NoLoss").hide();
    $("#coverNoLoss").hide();
}

function showMachines(CategoryCode) {
    debugger;
    $("#MMPLossPopUp").hide();
    $("#cover").hide();
    $("#appButton2").empty();
    $("#UpdateModal").modal('hide');

    // $("#cover2").show();

    $.ajax({
        type: 'GET',
        url: '/GetCategoryMachines',
        data: { CategoryCode: CategoryCode },
        async: false,
        success: function (data) {
            debugger;
            var catarr = data.recordset;
            if (data != null) {
                $.each(catarr, function (i, d) {
                    $("#appButton2").append("<a onclick='machinloss(" + catarr[i]["MachineCode"] +
                        ", " + CategoryCode + ")' class='btn btn-app'><svg class='c-icon'><use xlink:href='icons/sprites/free.svg#cil-settings'></use> </svg> <br>" + catarr[i]["MachineName"] + "</a>");
                });
            }
        }
    });
    $('#MMPLossPopUp21').modal({
        backdrop: 'static',
        keyboard: false
    })
    //$("#MMPLossPopUp2").show();
    $("#cover2").show();
}

function machinloss(i, MMPCategory) {
    debugger;

    var sMachineLoss = i;
    var ddlLine1 = document.getElementById("ddlmachine");
    var strLine = ddlLine1.options[ddlLine1.selectedIndex].innerHTML;

    GetMachineLoss(sMachineLoss, strLine, MMPCategory);

    $("#MMPLossPopUp21").modal('hide');

    $("#cover2").hide();
    $("#cover1").show();
}

var MechArray = [];
function GetMachineLoss(sMachineLoss, strLine, MMPCategory) {
    $("#MMPLossPopUp1").show();
    $("#cover1").show();
    $('#MMPLossPopUp11').modal({
        backdrop: 'static',
        keyboard: false
    })
    $.ajax({
        type: 'GET',
        url: 'GetMachineLoss',
        data: { sMachineLoss: sMachineLoss, strLine: strLine, MMPCategory: MMPCategory },
        async: false,
        success: function (data) {
            debugger;
            MechArray = data.recordset;
            if (MechArray.length > 0) {

                $("#appButton1").empty();

                var lblLoss = document.getElementById("lblError");

                //$("#MMPLossPopUp1").hide();
                //$("#cover1").hide();

                for (var i = 0; i < MechArray.length; i++) {

                    if (MechArray[i]["LossDesc"] == null || MechArray[i]["LossDesc"] == "") {

                        lblLoss.innerHTML = 'There is no loss';
                        $("#MMPLossPopUp1").hide();
                        $("#cover1").hide();
                        $("#MMPLossPopUp11").modal('hide');

                        $("#NoLoss").show();
                        $("#coverNoLoss").show();
                        $("#NoLoss1").modal('hide');
                    }
                    else {

                        $("#appButton1").append("<a  onclick='MachSubLoss(" + i + ")' class='btn btn-app'><svg class='c-icon'><use xlink:href='icons/sprites/free.svg#cil-settings'></use> </svg> <br>" + MechArray[i]["LossDesc"] + "</a>");
                        $("#MMPLossPopUp1").show();
                        $("#cover1").show();
                        // $("#MMPLossPopUp11").modal('show');
                        $('#MMPLossPopUp11').modal({
                            backdrop: 'static',
                            keyboard: false
                        })
                    }
                }
            }
        },
        failure: function (data) {
            //alert(jsonarr);
            lblLoss.innerHTML = 'There is some issue in loading data';
        }

    });
}

function MachSubLoss(j) {
    debugger;
    //alert(j);
    var sMechLoss = MechArray[j]["LossDesc"];
    mLossCode = MechArray[j]["LossCode"];
    var LossSelect = document.getElementById("inpHide");
    LossSelect.value = sMechLoss;

    Rootcause(sMechLoss);

    getconfirm(sMechLoss);
}

function FrequentLoss(k) {
    $("#UpdateModal").modal('hide');
    debugger;
    var Lossnm = lossname[k];
    mLossCode = lossid[k];
    document.getElementById("inpHide").value = Lossnm;
    getconfirm(Lossnm);

}

function Rootcause(sMechLoss) {
    debugger;
    $("#MMPLossPopUp").hide();
    $("#cover").hide();
    $("#appButton2").empty();
    $("#UpdateModal").modal('hide');
    $('#MachSubLoss').modal('hide');
    // $("#cover2").show();

    $.ajax({
        type: 'GET',
        url: '/GetRootcause',
        data: { sMechLoss: sMechLoss },
        async: false,
        success: function (data) {
            debugger;
            var catarr = data.recordset;
            if (data != null) {
                $.each(catarr, function (i, d) {
                    $("#appButton2").append("<a onclick='machinloss(" + catarr[i]["MachineCode"] + ", " + catarr[i]["MachineName"] + ")' class='btn btn-app'><svg class='c-icon'><use xlink:href='icons/sprites/free.svg#cil-settings'></use> </svg> <br>" + catarr[i]["MachineName"] + "</a>");
                });
            }
        }
    });
    //$("#MMPLossPopUp2").show();
    $("#cover3").show();
}

function getconfirm(sMechLoss) {
    debugger;
    $("#MMPLossPopUp11").modal('hide');
    $("#MMPLossPopUp").hide();
    $("#cover").hide();
    $("#MMPLossPopUp1").hide();
    $("#cover1").hide();
    $("#NoLoss").hide();
    $("#coverNoLoss").hide();
    //     $("#cover3").show();

    $("#tbodyconfimtbl").empty();

    if (OldLoss == null || sMechLoss == null) {

    }
    else {

        var newloss = document.getElementById("inpHide").value;

        var row = '<tr>';
        row += '<td>' + 1 + '</td>';
        row += '<td>' + 'Loss Description' + '</td>';
        row += '<td>' + OldLoss + '</td>';
        row += '<td>' + newloss + '</td>';
        row += '</tr>';
        $('#tbodyconfimtbl').append(row);
        // $("#confirmBox1").modal('show');
        $("#confirmBox").show();
        $("#Confirmcover").show();
        $('#confirmBox1').modal({
            backdrop: 'static',
            keyboard: false
        })
    }
}

function sendDataToUpdate() {
    // Required Field validation
    debugger;
    var LossSelect = document.getElementById("inpHide").value;
    // var eventid =OeeEventId.trim()// OeeEventId.slice(1, 8);
    var eventid = OeeEventId.slice(1, 8)// OeeEventId.slice(1, 8);  lMINTEventId
    if (LossSelect == "" || OldLoss == "" ||
        LossSelect == null || OldLoss == null) {
        alert("Some Field is missing.. Please Enter Data.");
    }
    else {
        //Updation code for user updates

        $.post("/updateloss", { LossSelect: LossSelect, mLossCode: mLossCode, eventid: eventid }, function (data) {
            debugger;
            if (data != null) {
                var response = data.rowsAffected;
                if (response > 0) {
                    $("#UpdateModal").modal('hide');
                    $("#confirmBox1").modal('hide');
                    $("#confirmBox").hide();
                    $("#Confirmcover").hide();
                    alert("Data Updated successfully...");

                    // window.location.reload();
                    selectedrow.cells[2].innerHTML = LossSelect;
                    //getEventData();
                }
            }
        });
    }
}

function cancel() {
    debugger;
    $("#confirmBox1").modal('hide');

    $("#confirmBox").hide();
    $("#Confirmcover").hide();
}

function btnback() {
    // document.getElementById('<%= btnCancel.ClientID %>').click();
    $("#UpdateModal").modal('hide');
    $("#MMPLossPopUp2").modal('hide');
    $("#NoLoss").hide();
    $("#coverNoLoss").hide();
    $("#MMPLossPopUp1").hide();
    $("#cover1").hide();
    $("#MMPLossPopUp21").hide();
    $("#cover2").hide();

    showpopup();

}

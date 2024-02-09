
var FinalDate, FinalShift;

$(document).ready(function () {

    FinalDate = new Date().toISOString().slice(0, 10);
    var today = new Date();
    // var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = addZero(today.getHours()) + ":" + addZero(today.getMinutes()) + ":" + addZero(today.getSeconds());

    document.getElementById("lbldttm").innerHTML = FinalDate;

    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    if (time <= "15:00:00" && time >= "07:00:00") {
        FinalShift = 'Shift 1';
        document.getElementById("shiftVal1").innerHTML = FinalShift;

    }
    if (time <= "23:00:00" && time >= "15:00:00") {

        FinalShift = 'Shift 2';
        document.getElementById("shiftVal1").innerHTML = FinalShift;

    }

    if (time <= "07:00:00" && time >= "23:00:00") {

        FinalShift = 'Shift 3';
        document.getElementById("shiftVal1").innerHTML = FinalShift;

    }

    //BatchCount()

    getData();

   // upstreamPSM()
    //getSPCLivedata();
    //getLineStatusData();
    //upstreamPSM();
    //upstreamBoon();
    //getCas2MixerCurrAMPdata()
    //getSPCLivedata1();
    //upstreamPSM();
    //upstreamBoon();
    //getLineStatusData();

});


$("#Line1_OLE").click(function () {
    localStorage.setItem('machine', 'Line 1');
    window.location.href = "/LiveDashboard.html";
});

$("#Line2_OLE").click(function () {
    localStorage.setItem('machine', 'Line 2');
    window.location.href = "/LiveDashboard.html";
});
$("#Line3_OLE").click(function () {
    localStorage.setItem('machine', 'Line 3');
    window.location.href = "/LiveDashboard.html";
});

$("#Line4_OLE").click(function () {
    localStorage.setItem('machine', 'Line 4');
    window.location.href = "/LiveDashboard.html";
});
$("#Line5_OLE").click(function () {
    localStorage.setItem('machine', 'Line 5');
    window.location.href = "/LiveDashboard.html";
});
$("#Line6_OLE").click(function () {
    localStorage.setItem('machine', 'Line 6');
    window.location.href = "/LiveDashboard.html";
});
$("#Line7_OLE").click(function () {
    localStorage.setItem('machine', 'Line 7');
    window.location.href = "/LiveDashboard.html";
});
$("#Line8_OLE").click(function () {
    localStorage.setItem('machine', 'Line 8');
    window.location.href = "/LiveDashboard.html";
});
$("#Line10_OLE").click(function () {
    localStorage.setItem('machine', 'Line 10');
    window.location.href = "/LiveDashboard.html";
});
$("#Line11_OLE").click(function () {
    localStorage.setItem('machine', 'Line 11');
    window.location.href = "/LiveDashboard.html";
});
$("#Line12_OLE").click(function () {
    localStorage.setItem('machine', 'Line 12');
    window.location.href = "/LiveDashboard.html";
});

var targetCascade1 = 0.0;
var cldCascade1 = 0.0;
var OEECascade1 = 0.0;

var targetCascade2 = 0.0;
var cldCascade2 = 0.0;
var OEECascade2 = 0.0;

var targetCascade4 = 0.0;
var cldCascade4 = 0.0;
var OEECascade4 = 0.0;

function getData() {
    debugger;

    try {

        $.ajax({
            type: 'GET',
            url: '/cascadedata',
            data: {
                FinalDate: FinalDate,
                FinalShift: FinalShift,

            },
            //async: false,
            //async: false,
            success: function (data) {

                var response = data.recordset;

                $.each(response, function (i, d) {

                    var dOEE = 0.0;
                    var dTarget = 0.0;
                    var dCLDCount = 0.0;

                    var dMazzoniEfficiency = 0.0;
                    var dFWEfficiency = 0.0;
                    var dCPUEfficiency = 0.0;
                    var dElapsedTime = 0.0;

                    if (i == 0) {

                        // var sDate = Convert.toString(dt[0]["tDate"]);

                        var sDate = response[0]["tDate"];
                        var sShift = "";

                        if ((response[0]["sShift"]) == "A") {
                            sShift = "Shift 1";
                        }
                        else if ((response[0]["sShift"]) == "B") {
                            sShift = "Shift 2";
                        }
                        else if ((response[0]["sShift"]) == "C") {
                            sShift = "Shift 3";
                        }

                        lbldttm.Text = sDate;
                        shiftVal1.Text = sShift;

                    }

                    var sOEE = response[i]["OEE"];
                    //var sOEE = Convert.toString(dt[i]["OEECas"]);
                    var slineNo = response[i]["LineName"];
                    var sTarget = response[i]["productiontarget"];
                    var sCLDCount = response[i]["CLDCount"];
                    //var sCLDCount = Convert.toString(dt[i]["CLDCountCas"]);
                    var s1 = response[i]["SKUName"]

                    var s2 = s1.split(',')

                

                    if(s2.length == 2){
                        sGrammage = s2[0]
                    } else {

                        sGrammage = s1;
                    }
                     

                    var sMazzoniEfficiency = response[i]["MazzoniEfficiency"];
                    var sFWEfficiency = response[i]["FWEfficiency"];
                    var sCPUEfficiency = response[i]["CPUEfficiency"];
                    var sElapsedTime = response[i]["ElapsedTime"];
                    var dtabCLD = response[i]["tabCLD"].toString();
                    var dDesignSpeed = response[i]["DesignSpeed"].toString();



                    if (sMazzoniEfficiency != "") {
                        dMazzoniEfficiency = parseFloat(sMazzoniEfficiency);
                        dMazzoniEfficiency = Math.round(dMazzoniEfficiency);
                    }
                    if (sFWEfficiency != "") {
                        dFWEfficiency = parseFloat(sFWEfficiency);
                        dFWEfficiency = Math.round(dFWEfficiency);
                    }
                    if (sCPUEfficiency != "") {
                        dCPUEfficiency = parseFloat(sCPUEfficiency);
                        dCPUEfficiency = Math.round(dCPUEfficiency);
                    }

                    if (dMazzoniEfficiency < 0) {
                        dMazzoniEfficiency = 0;

                    }

                    if (dFWEfficiency < 0) {
                        dFWEfficiency = 0;

                    }

                    if (dCPUEfficiency < 0) {
                        dCPUEfficiency = 0;

                    }

                    if (sOEE != "") {
                        dOEE = parseFloat(sOEE);
                        dOEE = Math.round(dOEE, 0);

                        if (dOEE > 100) //added by np
                        {
                            dOEE = 100;
                        }
                    }

                    if (sTarget != "") {
                        dTarget = parseFloat(sTarget);
                        dTarget = Math.round(dTarget);
                    }
                    if (sCLDCount != "") {
                        dCLDCount = parseFloat(sCLDCount);
                        dCLDCount = Math.round(dCLDCount);
                    }
                    if (sElapsedTime != "") {
                        dElapsedTime = parseFloat(sElapsedTime);
                        dElapsedTime = Math.round(dElapsedTime);
                    }

                    var elapsedTarget = 0.0;
                    var calvot = 0.0;
                    if (dElapsedTime != 0.0) {
                        //elapsedTarget = ((parseFloat((parseFloat(dTarget) / 8.0))));

                        //elapsedTarget = elapsedTarget / 60.0;

                        calvot = (dTarget * dtabCLD) / dDesignSpeed;
                        elapsedTarget = dTarget / calvot;

                        elapsedTarget = elapsedTarget * dElapsedTime;

                    }

                    elapsedTarget = Math.round(elapsedTarget);

                    // #region Cascade Calculations

                    if (slineNo == "Line 1") {
                        targetCascade1 = targetCascade1 + elapsedTarget;
                        cldCascade1 = cldCascade1 + Math.round(dCLDCount);
                        OEECascade1 = OEECascade1 + dOEE;
                    }
                    else if (slineNo == "Line 2") {
                        targetCascade1 = targetCascade1 + elapsedTarget;
                        cldCascade1 = cldCascade1 + Math.round(dCLDCount);
                        OEECascade1 = OEECascade1 + dOEE;

                    }
                    else if (slineNo == "Line 3") {

                        targetCascade1 = targetCascade1 + elapsedTarget;
                        cldCascade1 = cldCascade1 + Math.round(dCLDCount);
                        OEECascade1 = OEECascade1 + dOEE;

                    }
                    else if (slineNo == "Line 4") {

                        targetCascade1 = targetCascade1 + elapsedTarget;
                        cldCascade1 = cldCascade1 + Math.round(dCLDCount);
                        OEECascade1 = OEECascade1 + dOEE;

                    }
                    else if (slineNo == "Line 5") {
                        targetCascade2 = targetCascade2 + elapsedTarget;
                        cldCascade2 = cldCascade2 + Math.round(dCLDCount);
                        OEECascade2 = OEECascade2 + dOEE;


                    }
                    else if (slineNo == "Line 6") {
                        targetCascade2 = targetCascade2 + elapsedTarget;
                        cldCascade2 = cldCascade2 + Math.round(dCLDCount);
                        OEECascade2 = OEECascade2 + dOEE;


                    }
                    else if (slineNo == "Line 7") {

                        targetCascade2 = targetCascade2 + elapsedTarget;
                        cldCascade2 = cldCascade2 + Math.round(dCLDCount);
                        OEECascade2 = OEECascade2 + dOEE;

                    }
                    else if (slineNo == "Line 8") {

                        targetCascade2 = targetCascade2 + elapsedTarget;
                        cldCascade2 = cldCascade2 + Math.round(dCLDCount);
                        OEECascade2 = OEECascade2 + dOEE;
                    }

                    else if (slineNo == "Line 10") {

                        targetCascade4 = targetCascade4 + elapsedTarget;
                        cldCascade4 = cldCascade4 + Math.round(dCLDCount);
                        OEECascade4 = OEECascade4 + dOEE;
                    }

                    else if (slineNo == "Line 11") {

                        targetCascade4 = targetCascade4 + elapsedTarget;
                        cldCascade4 = cldCascade4 + Math.round(dCLDCount);
                        OEECascade4 = OEECascade4 + dOEE;
                    }

                    else if (slineNo == "Line 12") {

                        targetCascade4 = targetCascade4 + elapsedTarget;
                        cldCascade4 = cldCascade4 + Math.round(dCLDCount);
                        OEECascade4 = OEECascade4 + dOEE;
                    }


                    if (dOEE < 60.0) {

                        // #region Danger

                        if (slineNo == "Line 1") {
                            document.getElementById('divLine1').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            //divLine1.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLine1').style.width = dOEE.toString() + "%";
                            // document.getElementById('divLine1').innerText = dOEE.toString() + "%";
                            document.getElementById('infoLine1').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l1SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Line 2") {
                            document.getElementById('divLine2').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            document.getElementById('divLine2').style.width = dOEE.toString() + "%";
                            //divLine2.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('infoLine2').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l2SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Line 3") {
                            document.getElementById('divLine3').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            document.getElementById('divLine3').style.width = dOEE.toString() + "%";
                            //document.getElementById('divLine3').style.width =  dOEE.toString()+"%";
                            //divLine3.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('infoLine3').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";

                            document.getElementById('l3SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Line 4") {
                            document.getElementById('divLine4').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            document.getElementById('divLine4').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine4').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l4SKU').innerText = sGrammage + " Gms.";

                        }
                        else if (slineNo == "Line 5") {
                            document.getElementById('divLine5').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            document.getElementById('divLine5').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine5').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";

                            document.getElementById('l5SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Line 6") {
                            document.getElementById('divLine6').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            document.getElementById('divLine6').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine6').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l6SKU').innerText = sGrammage + " Gms.";

                        }
                        else if (slineNo == "Line 7") {
                            document.getElementById('divLine7').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            document.getElementById('divLine7').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine7').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l7SKU').innerText = sGrammage + " Gms.";

                        }
                        else if (slineNo == "Line 8") {
                            document.getElementById('divLine8').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            document.getElementById('divLine8').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine8').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l8SKU').innerText = sGrammage + " Gms.";

                        }

                        else if (slineNo == "Line 10") {
                            document.getElementById('divLine10').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            document.getElementById('divLine10').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine10').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l10SKU').innerText = sGrammage + " Gms.";

                        }


                        else if (slineNo == "Line 11") {
                            document.getElementById('divLine11').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            document.getElementById('divLine11').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine11').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l11SKU').innerText = sGrammage + " Gms.";

                        }

                        else if (slineNo == "Line 12") {
                            document.getElementById('divLine12').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            document.getElementById('divLine12').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine12').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l12SKU').innerText = sGrammage + " Gms.";

                        }

                        // #endregion

                    }

                    else if (dOEE >= 60.0 && dOEE <= 80.0) {

                        // #region Warning

                        if (slineNo == "Line 1") {
                            document.getElementById('divLine1').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLine1').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine1').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l1SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Line 2") {
                            document.getElementById('divLine2').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLine2').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine2').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l2SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Line 3") {
                            document.getElementById('divLine3').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLine3').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine3').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l3SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Line 4") {
                            document.getElementById('divLine4').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLine4').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine4').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l4SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Line 5") {
                            document.getElementById('divLine5').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLine5').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine5').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l5SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Line 6") {
                            document.getElementById('divLine6').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLine6').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine6').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l6SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Line 7") {
                            document.getElementById('divLine7').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLine7').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine7').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l7SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Line 8") {
                            document.getElementById('divLine8').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLine8').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine8').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l8SKU').innerText = sGrammage + " Gms.";
                        }

                        else if (slineNo == "Line 10") {
                            document.getElementById('divLine10').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLine10').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine10').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l10SKU').innerText = sGrammage + " Gms.";
                        }

                        else if (slineNo == "Line 11") {
                            document.getElementById('divLine11').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLine11').style.width = dOEE.toString() + "%";
                           document.getElementById('infoLine11').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l11SKU').innerText = sGrammage + " Gms.";
                        }

                        else if (slineNo == "Line 12") {
                            document.getElementById('divLine12').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLine12').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine12').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l12SKU').innerText = sGrammage + " Gms.";
                        }

                        // #endregion

                    }
                    else if (dOEE > 80) {

                        // #region Success

                        if (slineNo == "Line 1") {
                            document.getElementById('divLine1').setAttribute("class", "progress-bar progress-bar-success  progress-bar-striped");
                            document.getElementById('divLine1').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine1').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l1SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Line 2") {
                            document.getElementById('divLine2').setAttribute("class", "progress-bar progress-bar-success  progress-bar-striped");
                            document.getElementById('divLine2').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine2').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l2SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Line 3") {
                            document.getElementById('divLine3').setAttribute("class", "progress-bar progress-bar-success  progress-bar-striped");
                            document.getElementById('divLine3').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine3').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l3SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Line 4") {
                            document.getElementById('divLine4').setAttribute("class", "progress-bar progress-bar-success  progress-bar-striped");
                            document.getElementById('divLine4').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine4').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l4SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Line 5") {
                            document.getElementById('divLine5').setAttribute("class", "progress-bar progress-bar-success  progress-bar-striped");
                            document.getElementById('divLine5').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine5').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l5SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Line 6") {
                            document.getElementById('divLine6').setAttribute("class", "progress-bar progress-bar-success  progress-bar-striped");
                            document.getElementById('divLine6').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine6').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l6SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Line 7") {
                            document.getElementById('divLine7').setAttribute("class", "progress-bar progress-bar-success  progress-bar-striped");
                            document.getElementById('divLine7').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine7').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l7SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Line 8") {
                            document.getElementById('divLine8').setAttribute("class", "progress-bar progress-bar-success  progress-bar-striped");
                            document.getElementById('divLine8').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine8').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l8SKU').innerText = sGrammage + " Gms.";
                        }

                        else if (slineNo == "Line 10") {
                            document.getElementById('divLine10').setAttribute("class", "progress-bar progress-bar-success  progress-bar-striped");
                            document.getElementById('divLine10').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine10').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l10SKU').innerText = sGrammage + " Gms.";
                        }

                        else if (slineNo == "Line 11") {
                            document.getElementById('divLine11').setAttribute("class", "progress-bar progress-bar-success  progress-bar-striped");
                            document.getElementById('divLine11').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine11').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l11SKU').innerText = sGrammage + " Gms.";
                        }

                        else if (slineNo == "Line 12") {
                            document.getElementById('divLine12').setAttribute("class", "progress-bar progress-bar-success  progress-bar-striped");
                            document.getElementById('divLine12').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine12').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l12SKU').innerText = sGrammage + " Gms.";
                        }

                    }
                    // #endregion

                    // #region OEE Mapping

                    if (dOEE < 60.0) {

                        // #region Danger

                        if (slineNo == "Line 1") {
                            divLineOEE1.setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            divLineOEE1.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo1').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 2") {
                            divLineOEE2.setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            divLineOEE2.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo2').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 3") {
                            divLineOEE3.setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            divLineOEE3.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo3').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 4") {
                            divLineOEE4.setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            divLineOEE4.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo4').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 5") {
                            divLineOEE5.setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            divLineOEE5.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo5').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 6") {
                            divLineOEE6.setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            // document.getElementById('divLineOEE6').style.width = "";
                            divLineOEE6.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo6').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 7") {
                            divLineOEE7.setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            divLineOEE7.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo7').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 8") {
                            divLineOEE8.setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            divLineOEE8.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo8').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 10") {
                            divLineOEE10.setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            divLineOEE10.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo10').innerText = dOEE.toString() + "%";
                        }

                        else if (slineNo == "Line 11") {
                            divLineOEE11.setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            divLineOEE11.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo11').innerText = dOEE.toString() + "%";
                        }

                        else if (slineNo == "Line 12") {
                            divLineOEE12.setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            divLineOEE12.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo12').innerText = dOEE.toString() + "%";
                        }

                        // #endregio
                    }

                    else if (dOEE > 60.0 && dOEE <= 80.0) {

                        // #region Warning

                        if (slineNo == "Line 1") {
                            document.getElementById('divLineOEEInfo12').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLineOEE1').setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo1').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 2") {
                            divLineOEE2.setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            divLineOEE2.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo2').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 3") {
                            divLineOEE3.setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            divLineOEE3.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo3').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 4") {
                            divLineOEE4.setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            divLineOEE4.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo4').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 5") {
                            divLineOEE5.setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            divLineOEE5.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo5').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 6") {
                            divLineOEE6.setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            divLineOEE6.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo6').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 7") {
                            divLineOEE7.setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            divLineOEE7.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo7').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 8") {
                            divLineOEE8.setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            divLineOEE8.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo8').innerText = dOEE.toString() + "%";
                        }

                        else if (slineNo == "Line 10") {
                            divLineOEE10.setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            divLineOEE10.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo10').innerText = dOEE.toString() + "%";
                        }

                        else if (slineNo == "Line 11") {
                            divLineOEE11.setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            divLineOEE11.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo11').innerText = dOEE.toString() + "%";
                        }

                        else if (slineNo == "Line 12") {
                            divLineOEE12.setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            divLineOEE12.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo12').innerText = dOEE.toString() + "%";
                        }

                        // #endregion

                    }


                    else if (dOEE > 80) {

                        // #region Success

                        if (slineNo == "Line 1") {
                            divLineOEE1.setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            divLineOEE1.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo1').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 2") {
                            divLineOEE2.setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            divLineOEE2.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo2').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 3") {
                            divLineOEE3.setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            divLineOEE3.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo3').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 4") {
                            divLineOEE4.setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            divLineOEE4.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo4').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 5") {
                            divLineOEE5.setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            divLineOEE5.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo5').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 6") {
                            divLineOEE6.setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            divLineOEE6.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo6').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 7") {
                            divLineOEE7.setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            divLineOEE7.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo7').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 8") {
                            divLineOEE8.setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            divLineOEE8.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo8').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 10") {
                            divLineOEE10.setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            divLineOEE10.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo10').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 11") {
                            divLineOEE11.setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            divLineOEE11.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo11').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 12") {
                            divLineOEE12.setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            divLineOEE12.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo12').innerText = dOEE.toString() + "%";
                        }

                        // #endregion

                    }

                    // #endregion

                    // #region MazzoniEfficiency

                    if (slineNo == "Line 1") {

                        //l1Mazzoni.innerText = dMazzoniEfficiency.toString() + " %";
                        document.getElementById('l1Mazzoni').innerText = dMazzoniEfficiency.toString() + " %";

                    }
                    else if (slineNo == "Line 2") {
                        document.getElementById('l2Mazzoni').innerText = dMazzoniEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Line 3") {
                        document.getElementById('l3Mazzoni').innerText = dMazzoniEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Line 4") {
                        document.getElementById('l4Mazzoni').innerText = dMazzoniEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Line 5") {
                        document.getElementById('l5Mazzoni').innerText = dMazzoniEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Line 6") {
                        document.getElementById('l6Mazzoni').innerText = dMazzoniEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Line 7") {
                        document.getElementById('l7Mazzoni').innerText = dMazzoniEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Line 8") {
                        document.getElementById('l8Mazzoni').innerText = dMazzoniEfficiency.toString() + " %";
                    }

                    else if (slineNo == "Line 10") {
                        document.getElementById('l10Mazzoni').innerText = dMazzoniEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Line 11") {
                        document.getElementById('l11Mazzoni').innerText = dMazzoniEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Line 12") {
                        document.getElementById('l12Mazzoni').innerText = dMazzoniEfficiency.toString() + " %";
                    }

                    // #endregion

                    // #region FWEfficiency

                    if (slineNo == "Line 1") {
                        document.getElementById('l1FW').innerText = dFWEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Line 2") {
                        document.getElementById('l2FW').innerText = dFWEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Line 3") {
                        document.getElementById('l3FW').innerText = dFWEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Line 4") {
                        document.getElementById('l4FW').innerText = dFWEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Line 5") {
                        document.getElementById('l5FW').innerText = dFWEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Line 6") {
                        document.getElementById('l6FW').innerText = dFWEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Line 7") {
                        document.getElementById('l7FW').innerText = dFWEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Line 8") {
                        document.getElementById('l8FW').innerText = dFWEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Line 10") {
                        document.getElementById('l10FW').innerText = dFWEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Line 11") {
                        document.getElementById('l11FW').innerText = dFWEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Line 12") {
                        document.getElementById('l12FW').innerText = dFWEfficiency.toString() + " %";
                    }

                    // #endregion
                    // #region CPUEfficiency

                    if (slineNo == "Line 1") {
                        document.getElementById('l1CPU').innerText = dCPUEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Line 2") {
                        document.getElementById('l2CPU').innerText = dCPUEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Line 3") {
                        document.getElementById('l3CPU').innerText = dCPUEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Line 4") {
                        document.getElementById('l4CPU').innerText = dCPUEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Line 5") {
                        document.getElementById('l5CPU').innerText = dCPUEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Line 6") {
                        document.getElementById('l6CPU').innerText = dCPUEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Line 7") {
                        document.getElementById('l7CPU').innerText = dCPUEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Line 8") {
                        document.getElementById('l8CPU').innerText = dCPUEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Line 10") {
                        document.getElementById('l10CPU').innerText = dCPUEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Line 11") {
                        document.getElementById('l11CPU').innerText = dCPUEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Line 12") {
                        document.getElementById('l12CPU').innerText = dCPUEfficiency.toString() + " %";
                    }

                    // #endregion

                });

                OEECascade1 = OEECascade1 / 4;
                OEECascade2 = OEECascade2 / 4;
                OEECascade4 = OEECascade4 / 3;

                OEECascade1 = Math.round(OEECascade1);
                OEECascade2 = Math.round(OEECascade2);
                OEECascade4 = Math.round(OEECascade4);


                document.getElementById('divCascade1').style.width = OEECascade1 + "%";
                // document.getElementById('divLine1').style.width = dOEE.toString() + "%";
                document.getElementById('infoCascade1').innerText = Math.round(cldCascade1) + "/" + Math.round(targetCascade1, 0) + ", " + OEECascade1.toString() + "%";

                if (OEECascade1 > 60 && OEECascade1 < 80) {

                    $("#divCascade1").removeClass("bg-danger");
                    $("#divCascade1").addClass("bg-warning");

                } else if (OEECascade1 > 80) {


                    $("#divCascade1").removeClass("bg-danger");
                    $("#divCascade1").addClass("bg-success");

                }


                document.getElementById('divCascade2').style.width = OEECascade2 + "%";
                document.getElementById('infoCascade2').innerText = Math.round(cldCascade2) + "/" + Math.round(targetCascade2, 0) + ", " + OEECascade2.toString() + "%";

                if (OEECascade2 > 60 && OEECascade2 < 80) {

                    $("#divCascade2").removeClass("bg-danger");
                    $("#divCascade2").addClass("bg-warning");

                } else if (OEECascade2 > 80) {


                    $("#divCascade2").removeClass("bg-danger");
                    $("#divCascade2").addClass("bg-success");

                }

                document.getElementById('infoCascade4').innerText =''

                document.getElementById('divCascade4').style.width = OEECascade4 + "%";
                document.getElementById('infoCascade4').innerText = Math.round(cldCascade4) + "/" + Math.round(targetCascade4, 0) + ", " + OEECascade4.toString() + "%";

                if (OEECascade4 > 60 && OEECascade4 < 80) {

                    $("#divCascade4").removeClass("bg-danger");
                    $("#divCascade4").addClass("bg-warning");

                } else if (OEECascade4 > 80) {


                    $("#divCascade4").removeClass("bg-danger");
                    $("#divCascade4").addClass("bg-success");

                }

                getLineStatusData();
            }

        });

        //getLineStatusData();
    }
    catch (error) {
        console.error("in error");
    }


}

function getLineStatusData() {
    debugger;

    try {

        $.ajax({
            type: 'GET',
            url: '/getLineStatusData',
            data: {
                FinalDate: FinalDate,
                FinalShift: FinalShift,

            },
            //async: false,
            //async: false,
            success: function (data) {

                var response = data.recordset;

                if (response.length > 0) {

                    $.each(response, function (i, d) {
                        var machineState = response[i]["MachineState"].toString()

                        var dur = response[i]["Duration"];



                        var sec = 0.0;
                        var duration = "";

                        if (dur.toString() != "") {
                            sec = dur;
                            //duration = TimeSpan.FromSeconds(sec).toString()
                            duration = new Date(sec * 1000).toISOString().substr(11, 8);
                        }
                        else {
                            sec = 0.0;
                            //duration = TimeSpan.FromSeconds(sec).toString()
                            duration = new Date(sec * 1000).toISOString().substr(11, 8);;
                        }

                        var workcell = response[i]["WorkcellDesc"];

                        if (workcell == "Line 1") {
                            //duration1.InnerText = "Since: " + duration;

                            if (machineState == "Losses") {
                                document.getElementById('duration1').innerHTML = "Down Since: " + duration;
                                //document.getElementById('Statelbl').Attributes["class"] = "small-box bg-red";
                                $("#Statelbl").removeClass("bg-yellow");
                                $("#Statelbl").addClass("bg-red");

                            }
                            else if (machineState == "Activity Area Running - Point") {
                                document.getElementById('duration1').innerHTML = " Running Since: " + duration;

                                //document.getElementById('Statelbl').Attributes["class"] = "small-box bg-green";
                                $("#Statelbl").removeClass("bg-yellow");
                                $("#Statelbl").addClass("bg-green");
                            }
                        }
                        else if (workcell == "Line 2") {
                            //duration2.InnerText = "Since: " + duration;

                            if (machineState == "Losses") {
                                document.getElementById('duration2').innerHTML = "Down Since: " + duration;

                                $("#Statelb2").removeClass("bg-yellow");
                                $("#Statelb2").addClass("bg-red");

                                //document.getElementById('Statelb2').Attributes["class"] = "small-box bg-red";

                            }
                            else if (machineState == "Activity Area Running - Point") {
                                document.getElementById('duration2').innerHTML = "Running Since: " + duration;

                                $("#Statelb2").removeClass("bg-yellow");
                                $("#Statelb2").addClass("bg-green");
                            }
                            // document.getElementById('Statelb2').Attributes["class"] = "small-box bg-green";

                        }

                        else if (workcell == "Line 3") {
                            //duration3.InnerText = "Since: " + duration;

                            if (machineState == "Losses") {
                                document.getElementById('duration3').innerHTML = "Down Since: " + duration;

                                $("#Statelb3").removeClass("bg-yellow");
                                $("#Statelb3").addClass("bg-red");

                                //document.getElementById('Statelb3').Attributes["class"] = "small-box bg-red";

                            }
                            else if (machineState == "Activity Area Running - Point") {
                                document.getElementById('duration3').innerHTML = "Running Since: " + duration;

                                //document.getElementById('Statelb3').Attributes["class"] = "small-box bg-green";
                                $("#Statelb3").removeClass("bg-yellow");
                                $("#Statelb3").addClass("bg-green");
                            }
                        }
                        else if (workcell == "Line 4") {
                            //duration4.InnerText = "Since: " + duration;

                            if (machineState == "Losses") {
                                document.getElementById('duration4').innerHTML = " Down Since: " + duration;

                                $("#Statelb4").removeClass("bg-yellow");
                                $("#Statelb4").addClass("bg-red");

                                // document.getElementById('Statelb4').Attributes["class"] = "small-box bg-red";
                            }
                            else if (machineState == "Activity Area Running - Point") {
                                document.getElementById('duration4').innerHTML = " Running Since: " + duration;

                                $("#Statelb4").removeClass("bg-yellow");
                                $("#Statelb4").addClass("bg-green");
                                //document.getElementById('Statelb4').Attributes["class"] = "small-box bg-green";
                            }
                        }
                        else if (workcell == "Line 5") {
                            //duration5.InnerText = "Since: " + duration;

                            if (machineState == "Losses") {
                                document.getElementById('duration5').innerHTML = "Down Since: " + duration;

                                $("#Statelb5").removeClass("bg-yellow");
                                $("#Statelb5").addClass("bg-red");

                                //document.getElementById('Statelb5').Attributes["class"] = "small-box bg-red";
                            }
                            else if (machineState == "Activity Area Running - Point") {
                                document.getElementById('duration5').innerHTML = " Running Since: " + duration;


                                $("#Statelb5").removeClass("bg-yellow");
                                $("#Statelb5").addClass("bg-green")
                                //document.getElementById('Statelb5').Attributes["class"] = "small-box bg-green";
                            }
                        }
                        else if (workcell == "Line 6") {
                            //duration6.InnerText = "Since: " + duration;

                            if (machineState == "Losses") {
                                document.getElementById('duration6').innerHTML = "Down Since: " + duration;

                                $("#Statelb6").removeClass("bg-yellow");
                                $("#Statelb6").addClass("bg-red");
                                // document.getElementById('Statelb6').Attributes["class"] = "small-box bg-red";
                            }
                            else if (machineState == "Activity Area Running - Point") {
                                document.getElementById('duration6').innerHTML = "Running Since: " + duration;

                                $("#Statelb6").removeClass("bg-yellow");
                                $("#Statelb6").addClass("bg-green");
                                // document.getElementById('Statelb6').Attributes["class"] = "small-box bg-green";
                            }
                        }
                        else if (workcell == "Line 7") {
                            //duration7.InnerText = "Since: " + duration;

                            if (machineState == "Losses") {
                                document.getElementById('duration7').innerHTML = "Down Since: " + duration;

                                $("#Statelb7").removeClass("bg-yellow");
                                $("#Statelb7").addClass("bg-red");
                                // document.getElementById('Statelb7').Attributes["class"] = "small-box bg-red";
                            }
                            else if (machineState == "Activity Area Running - Point") {
                                document.getElementById('duration7').innerHTML = " Running Since: " + duration;

                                $("#Statelb7").removeClass("bg-yellow");
                                $("#Statelb7").addClass("bg-green");
                                // document.getElementById('Statelb7').Attributes["class"] = "small-box bg-green";
                            }
                        }
                        else if (workcell == "Line 8") {

                            //duration8.InnerText = "Since: " + duration;

                            if (machineState == "Losses") {
                                document.getElementById('duration8').innerHTML = "Down Since: " + duration;

                                $("#Statelb8").removeClass("bg-yellow");
                                $("#Statelb8").addClass("bg-red");
                                // document.getElementById('Statelb8').Attributes["class"] = "small-box bg-red";
                            }
                            else if (machineState == "Activity Area Running - Point") {
                                document.getElementById('duration8').innerHTML = "Running Since: " + duration;
                                $("#Statelb8").removeClass("bg-yellow");
                                $("#Statelb8").addClass("bg-green");
                                //document.getElementById('Statelb8').Attributes["class"] = "small-box bg-green";
                            }
                        }
                        else if (workcell == "Line 10") {
                            //duration10.InnerText = "Since: " + duration;

                            if (machineState == "Losses") {
                                document.getElementById('duration10').innerHTML = "Down Since: " + duration;

                                $("#Statelb10").removeClass("bg-yellow");
                                $("#Statelb10").addClass("bg-red");
                                // document.getElementById('Statelb10').Attributes["class"] = "small-box bg-red";
                            }
                            else if (machineState == "Activity Area Running - Point") {
                                document.getElementById('duration10').innerHTML = "Running Since: " + duration;
                                $("#Statelb10").removeClass("bg-yellow");
                                $("#Statelb10").addClass("bg-green");
                                // document.getElementById('Statelb10').Attributes["class"] = "small-box bg-green";
                            }
                        }
                        else if (workcell == "Line 11") {
                            //duration11.InnerText = "Since: " + duration;

                            if (machineState == "Losses") {
                                document.getElementById('duration11').innerHTML = "Down Since: " + duration;
                                $("#Statelb11").removeClass("bg-yellow");
                                $("#Statelb11").addClass("bg-red");
                                // document.getElementById('Statelb11').Attributes["class"] = "small-box bg-red";
                            }
                            else if (machineState == "Activity Area Running - Point") {
                                document.getElementById('duration11').innerHTML = "Running Since: " + duration;
                                $("#Statelb11").removeClass("bg-yellow");
                                $("#Statelb11").addClass("bg-green");
                                //document.getElementById('Statelb11').Attributes["class"] = "small-box bg-green";
                            }
                        }
                        else if (workcell == "Line 12") {
                            //duration12.InnerText = "Since: " + duration;

                            if (machineState == "Losses") {
                                document.getElementById('duration12').innerHTML = "Down Since: " + duration;

                                $("#Statelb12").removeClass("bg-yellow");
                                $("#Statelb12").addClass("bg-red");
                                // document.getElementById('Statelb12').Attributes["class"] = "small-box bg-red";
                            }
                            else if (machineState == "Activity Area Running - Point") {
                                document.getElementById('duration12').innerHTML = "Running Since: " + duration;


                                $("#Statelb12").removeClass("bg-yellow");
                                $("#Statelb12").addClass("bg-green");
                                // document.getElementById('Statelb12').Attributes["class"] = "small-box bg-green";
                            }
                        }

                    });
                }

                // upstreamPSM();

                upstreamPSM();
            }


        });


    }
    catch (error) {
        console.error("in error");
    }



}

function upstreamPSM() {
    debugger;

    try {

        $.ajax({
            type: 'GET',
            url: '/upstreamPSM',
            data: {
                FinalDate: FinalDate,
                FinalShift: FinalShift,

            },
            // async: false,
            //async: false,
            success: function (data) {

                var response = data.recordset;

                // for (i = 0; i < response.length; i++) {
                //     console.count();
                //   }

                var batchNo_PSM = response.length;
                document.getElementById('mixerid').Value = parseFloat(batchNo_PSM);

                $('.knobmixer').val(batchNo_PSM).trigger('change');

                // upstreamBoon();

                upstreamBoon();

            }

        });

    }
    catch (error) {
        console.error("in error");
    }
    // upstreamBoon();
}

function upstreamBoon() {
    debugger;

    try {

        $.ajax({
            type: 'GET',
            url: '/upstreamBoon',
            data: {
                FinalDate: FinalDate,
                FinalShift: FinalShift,

            },
            // async: false,
            //async: false,
            success: function (data) {

                var response = data.recordset;
                // var dt = response["dtboon"];
                var batchNo_BOON = response.length;

                document.getElementById('chilldrum').Value = parseFloat(batchNo_BOON);
                $('.knobchilldrum').val(batchNo_BOON).trigger('change');

                // getSPCLivedata();

                getSPCLivedata();

            }


        });
    }
    catch (error) {
        console.error("in error");
    }

    // getSPCLivedata();

}

function getSPCLivedata() {
    debugger;

    try {

        $.ajax({
            type: 'GET',
            url: '/getSPCLivedata',
            data: {
                FinalDate: FinalDate,
                FinalShift: FinalShift,

            },
            //async: false,
            //async: false,
            success: function (data) {

                var response = data.recordset;
                var cascade = 1;
                var cascade2 = 2;

                if (response.length > 0) {

                    var cdRPM = (Math.round((parseFloat(response[0]["CDRPM"])), 3));
                    var cdInletTemp = (Math.round((parseFloat(response[0]["InletTemp"])), 3));
                    var cdOutletTemp = (Math.round((parseFloat(response[0]["CD1OutletTemp"])), 3));
                    var cdFlowRate = (Math.round((parseFloat(response[0]["CDFlowRate"])), 3));

                    var plodderLevel = (response[0]["FPLevel"]);
                    var plodderCurrent = (Math.round((parseFloat(response[0]["FPAMP"])), 3));
                    var plodderRPM = (Math.round((parseFloat(response[0]["FPRPM"])), 3));
                    var CD2LEVEL = (Math.round((parseFloat(response[0]["CD2LEVEL"])), 3));


                    if (plodderLevel == "0") {
                        plodderLevel = "Low";
                    }
                    else if (plodderLevel == "1") {
                        plodderLevel = "High";
                    }

                    if (cascade == "1") {

                        document.getElementById('C1CDRPM').innerHTML = cdRPM;
                        document.getElementById('C1CDInletTemp').innerHTML = cdInletTemp;
                        document.getElementById('C1CDOutletTemp').innerHTML = cdOutletTemp;
                        document.getElementById('C1CDFlowRate').innerHTML = cdFlowRate;

                        document.getElementById('C1PlodderLevel').innerHTML = plodderLevel;
                        document.getElementById('C1PlodderAmp').innerHTML = plodderCurrent;
                        document.getElementById('C1PlodderRPM').innerHTML = plodderRPM;
                        document.getElementById('C1CDLevel').innerHTML = CD2LEVEL;

                    }
                    if (cascade2 == "2") {

                        document.getElementById('C2CDRPM').innerHTML = cdRPM;
                        document.getElementById('C2CDInletTemp').innerHTML = cdInletTemp;
                        document.getElementById('C2CDOutletTemp').innerHTML = cdOutletTemp;
                        document.getElementById('C2CDFlowRate').innerHTML = cdFlowRate;

                        document.getElementById('C2PlodderLevel').innerHTML = plodderLevel;
                        document.getElementById('C2PlodderAmp').innerHTML = plodderCurrent;
                        document.getElementById('C2PlodderRPM').innerHTML = plodderRPM;
                        document.getElementById('C2CDLevel').innerHTML = CD2LEVEL;

                        document.getElementById('C2Motor2ACurrent').innerHTML = CD2LEVEL;
                        document.getElementById('C2Motor2BCurrent').innerHTML = CD2LEVEL;

                    }

                }
                BatchCount();
            }

        });
    }
    catch (error) {
        console.error("in error");
    }
}


function BatchCount() {
    debugger;

    try {

        $.ajax({
            type: 'GET',
            url: '/BatchCount',
            data: {
                FinalDate: FinalDate,
                FinalShift: FinalShift,

            },
            //async: false,
            //async: false,
            success: function (data) {

                var response = data.recordset;
                //   var cascade = 1;
                //   var cascade2 = 2;

                if (response.length > 0) {

                    var m1 = (Math.round((parseFloat(response[0]["batchCount1"])), 3));
                    var m2a = (Math.round((parseFloat(response[0]["batchCount2"])), 3));
                    var m2 = (Math.round((parseFloat(response[0]["batchCount2a"])), 3));
              
                    document.getElementById('mixer1BatchCount').innerHTML = m1;
                    document.getElementById('mixer2ABatchCount').innerHTML = m2a;
                    document.getElementById('mixer2BatchCount').innerHTML = m2;

                    
               
                }

            }

        });
    }
    catch (error) {
        console.error("in error");
    }
}
////////////////////////////////// pie chart psm and boon section/////




$(document).ready(function () {

    FinalDate = new Date().toISOString().slice(0, 10);
    var today = new Date();
    // var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = addZero(today.getHours()) + ":" + addZero(today.getMinutes()) + ":" + addZero(today.getSeconds());

    document.getElementById("lbldttm").innerHTML = FinalDate;
    debugger;
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

    getData();
    // getLineStatusData();
    // upstreamPSM();
    // upstreamBoon();
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


$("#Line1_OLE").click(function () {
    localStorage.setItem('machine', 'Powder_Line 1');
    window.location.href = "/LiveDashboard.html";
});
$("#Line2_OLE").click(function () {
    localStorage.setItem('machine', 'Powder_Line 2');
    window.location.href = "/LiveDashboard.html";
});
$("#Line3_OLE").click(function () {
    localStorage.setItem('machine', 'Powder_Line 3');
    window.location.href = "/LiveDashboard.html";
});
$("#Line4_OLE").click(function () {
    localStorage.setItem('machine', 'Powder_Line 4');
    window.location.href = "/LiveDashboard.html";
});
$("#Line5_OLE").click(function () {
    localStorage.setItem('machine', 'Powder_Line 5');
    window.location.href = "/LiveDashboard.html";
});
$("#Line6_OLE").click(function () {
    localStorage.setItem('machine', 'Powder_Line 6');
    window.location.href = "/LiveDashboard.html";
});
$("#Line7_OLE").click(function () {
    localStorage.setItem('machine', 'Powder_Line 7');
    window.location.href = "/LiveDashboard.html";
});

function getData() {
    debugger;
    try {
        $.ajax({
            type: 'GET',
            url: '/getPowderPViewData',
            data: {
                FinalDate: FinalDate,
                FinalShift: FinalShift,
            },
            //async: false,
            //async: false,
            success: function (data) {
                debugger;
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
                    //var sTarget = "";
                    //var sOEE = response[i]["OEE"];

                    var sOEE = response[i]["OEE"];
                    //var sOEE = Convert.toString(dt[i]["OEECas"]);
                    var slineNo = response[i]["LineName"];
                    var sTarget = response[i]["productiontarget"];
                    var sCLDCount = response[i]["CLDCount"];
                    //var sCLDCount = Convert.toString(dt[i]["CLDCountCas"]);
                    var sGrammage = response[i]["Grammage"];
                    var sMazzoniEfficiency = response[i]["MazzoniEfficiency"];
                    var sFWEfficiency = response[i]["FWEfficiency"];
                    var sCPUEfficiency = response[i]["CPUEfficiency"];
                    var sElapsedTime = response[i]["ElapsedTime"];
                    var dtabCLD = response[i]["tabCLD"].toString();
                    var dDesignSpeed = response[i]["DesignSpeed"].toString();

                    var dOEE = 0.0;
                    var dTarget = 0.0;
                    var dCLDCount = 0.0;
                    var dMazzoniEfficiency = 0.0;
                    var dFWEfficiency = 0.0;
                    var dCPUEfficiency = 0.0;
                    var dElapsedTime = 0.0;

                    if (sMazzoniEfficiency != "") {
                        dMazzoniEfficiency = parseFloat(sMazzoniEfficiency);
                        dMazzoniEfficiency = Math.round(dMazzoniEfficiency);

                        if (dMazzoniEfficiency > 100) {
                            dMazzoniEfficiency = 100;
                        }
                    }
                    if (sFWEfficiency != "") {
                        dFWEfficiency = parseFloat(sFWEfficiency);
                        dFWEfficiency = Math.round(dFWEfficiency);

                        if (dFWEfficiency > 100) {
                            dFWEfficiency = 100;
                        }

                    }
                    if (sCPUEfficiency != "") {
                        dCPUEfficiency = parseFloat(sCPUEfficiency);
                        dCPUEfficiency = Math.round(dCPUEfficiency);

                        if (dCPUEfficiency > 100) {
                            dCPUEfficiency = 100;
                        }
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
                        dOEE = Math.round(dOEE);

                        if (dOEE > 100) {
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

                    if (dElapsedTime != 0.0) {
                        elapsedTarget = ((parseFloat((parseFloat(dTarget) / 8.0))));

                        elapsedTarget = elapsedTarget / 60.0;

                        elapsedTarget = elapsedTarget * dElapsedTime;

                    }

                    elapsedTarget = Math.round(elapsedTarget);

                    var division = 0.0;

                    if (elapsedTarget != 0.0) {
                        division = parseFloat(parseFloat(dCLDCount) / parseFloat(elapsedTarget));
                    }

                    var perLine = parseFloat(division * 100);

                    // #region Cascade Calculations
                    if (slineNo == "Powder_Line 1") {
                        targetCascade1 = targetCascade1 + elapsedTarget;
                        cldCascade1 = cldCascade1 + Math.round(dCLDCount);
                        OEECascade1 = OEECascade1 + dOEE;
                    }
                    else if (slineNo == "Powder_Line 2") {
                        targetCascade1 = targetCascade1 + elapsedTarget;
                        cldCascade1 = cldCascade1 + Math.round(dCLDCount);
                        OEECascade1 = OEECascade1 + dOEE;

                    }
                    else if (slineNo == "Powder_Line 3") {

                        targetCascade1 = targetCascade1 + elapsedTarget;
                        cldCascade1 = cldCascade1 + Math.round(dCLDCount);
                        OEECascade1 = OEECascade1 + dOEE;

                    }
                    else if (slineNo == "Powder_Line 4") {

                        targetCascade1 = targetCascade1 + elapsedTarget;
                        cldCascade1 = cldCascade1 + Math.round(dCLDCount);
                        OEECascade1 = OEECascade1 + dOEE;

                    }
                    else if (slineNo == "Powder_Line 5") {
                        targetCascade2 = targetCascade2 + elapsedTarget;
                        cldCascade2 = cldCascade2 + Math.round(dCLDCount);
                        OEECascade2 = OEECascade2 + dOEE;


                    }
                    else if (slineNo == "Powder_Line 6") {
                        targetCascade2 = targetCascade2 + elapsedTarget;
                        cldCascade2 = cldCascade2 + Math.round(dCLDCount);
                        OEECascade2 = OEECascade2 + dOEE;


                    }
                    else if (slineNo == "Powder_Line 7") {

                        targetCascade2 = targetCascade2 + elapsedTarget;
                        cldCascade2 = cldCascade2 + Math.round(dCLDCount);
                        OEECascade2 = OEECascade2 + dOEE;

                    }


                    // #endregion

                    //  #region CLD Mapping

                    if (dOEE < 60.0) {

                        //  #region Danger

                        if (slineNo == "Powder_Line 1") {

                            document.getElementById('divLine1').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            //divLine1.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLine1').style.width = perLine.toString() + "%";
                            //document.getElementById('divLine1').innerText = perLine.toString() + "%";
                            document.getElementById('infoLine1').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l1SKU').innerText = sGrammage + " Gms."

                            // divLine1.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                            // divLine1.Style.Add(HtmlTextWriterStyle.Width, perLine.ToString() + "%");
                            // infoLine1.InnerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.ToString() + "%";
                            // l1SKU.InnerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Powder_Line 2") {
                            document.getElementById('divLine2').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            document.getElementById('divLine2').style.width = perLine.toString() + "%";
                            //divLine2.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('infoLine2').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l2SKU').innerText = sGrammage + " Gms.";
                            // divLine2.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                            // divLine2.Style.Add(HtmlTextWriterStyle.Width, perLine.ToString() + "%");
                            // infoLine2.InnerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.ToString() + "%";
                            // l2SKU.InnerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Powder_Line 3") {
                            // divLine3.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                            // divLine3.Style.Add(HtmlTextWriterStyle.Width, perLine.ToString() + "%");
                            // infoLine3.InnerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.ToString() + "%";

                            // l3SKU.InnerText = sGrammage + " Gms.";
                            document.getElementById('divLine3').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            document.getElementById('divLine3').style.width = perLine.toString() + "%";
                            //document.getElementById('divLine3').style.width =  dOEE.toString()+"%";
                            //divLine3.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('infoLine3').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";

                            document.getElementById('l3SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Powder_Line 4") {
                            // divLine4.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                            // divLine4.Style.Add(HtmlTextWriterStyle.Width, perLine.ToString() + "%");
                            // infoLine4.InnerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.ToString() + "%";
                            // l4SKU.InnerText = sGrammage + " Gms.";
                            document.getElementById('divLine4').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            document.getElementById('divLine4').style.width = perLine.toString() + "%";
                            document.getElementById('infoLine4').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l4SKU').innerText = sGrammage + " Gms.";

                        }
                        else if (slineNo == "Powder_Line 5") {
                            // divLine5.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                            // divLine5.Style.Add(HtmlTextWriterStyle.Width, perLine.ToString() + "%");
                            // infoLine5.InnerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.ToString() + "%";

                            // l5SKU.InnerText = sGrammage + " Gms.";
                            document.getElementById('divLine5').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            document.getElementById('divLine5').style.width = perLine.toString() + "%";
                            document.getElementById('infoLine5').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";

                            document.getElementById('l5SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Powder_Line 6") {
                            // divLine6.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                            // divLine6.Style.Add(HtmlTextWriterStyle.Width, perLine.ToString() + "%");
                            // infoLine6.InnerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.ToString() + "%";
                            // l6SKU.InnerText = sGrammage + " Gms.";
                            document.getElementById('divLine6').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            document.getElementById('divLine6').style.width = perLine.toString() + "%";
                            document.getElementById('infoLine6').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l6SKU').innerText = sGrammage + " Gms.";

                        }
                        else if (slineNo == "Powder_Line 7") {
                            // divLine7.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                            // divLine7.Style.Add(HtmlTextWriterStyle.Width, perLine.ToString() + "%");
                            // infoLine7.InnerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.ToString() + "%";
                            // l7SKU.InnerText = sGrammage + " Gms.";
                            document.getElementById('divLine7').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            document.getElementById('divLine7').style.width = perLine.toString() + "%";
                            document.getElementById('infoLine7').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l7SKU').innerText = sGrammage + " Gms.";
                        }
                        // #endregion

                    }
                    else if (dOEE >= 60.0 && dOEE <= 80.0) {

                        // #region Warning

                        if (slineNo == "Powder_Line 1") {
                            // divLine1.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                            // divLine1.Style.Add(HtmlTextWriterStyle.Width, perLine.ToString() + "%");
                            // infoLine1.InnerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.ToString() + "%";
                            // l1SKU.InnerText = sGrammage + " Gms.";
                            document.getElementById('divLine1').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            //divLine1.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLine1').style.width = perLine.toString() + "%";
                            //document.getElementById('divLine1').innerText = perLine.toString() + "%";
                            document.getElementById('infoLine1').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l1SKU').innerText = sGrammage + " Gms."
                        }
                        else if (slineNo == "Powder_Line 2") {
                            // divLine2.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                            // divLine2.Style.Add(HtmlTextWriterStyle.Width, perLine.ToString() + "%");
                            // infoLine2.InnerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.ToString() + "%";
                            // l2SKU.InnerText = sGrammage + " Gms.";
                            document.getElementById('divLine2').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLine2').style.width = perLine.toString() + "%";
                            //divLine2.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('infoLine2').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l2SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Powder_Line 3") {
                            // divLine3.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                            // divLine3.Style.Add(HtmlTextWriterStyle.Width, perLine.ToString() + "%");
                            // infoLine3.InnerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.ToString() + "%";
                            // l3SKU.InnerText = sGrammage + " Gms.";
                            document.getElementById('divLine3').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLine3').style.width = perLine.toString() + "%";
                            //document.getElementById('divLine3').style.width =  dOEE.toString()+"%";
                            //divLine3.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('infoLine3').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";

                            document.getElementById('l3SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Powder_Line 4") {
                            // divLine4.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                            // divLine4.Style.Add(HtmlTextWriterStyle.Width, perLine.ToString() + "%");
                            // infoLine4.InnerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.ToString() + "%";
                            // l4SKU.InnerText = sGrammage + " Gms.";

                            document.getElementById('divLine4').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLine4').style.width = perLine.toString() + "%";
                            document.getElementById('infoLine4').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l4SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Powder_Line 5") {
                            // divLine5.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                            // divLine5.Style.Add(HtmlTextWriterStyle.Width, perLine.ToString() + "%");
                            // infoLine5.InnerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.ToString() + "%";
                            // l5SKU.InnerText = sGrammage + " Gms.";
                            document.getElementById('divLine5').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLine5').style.width = perLine.toString() + "%";
                            document.getElementById('infoLine5').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";

                            document.getElementById('l5SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Powder_Line 6") {
                            // divLine6.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                            // divLine6.Style.Add(HtmlTextWriterStyle.Width, perLine.ToString() + "%");
                            // infoLine6.InnerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.ToString() + "%";
                            // l6SKU.InnerText = sGrammage + " Gms.";
                            document.getElementById('divLine6').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLine6').style.width = perLine.toString() + "%";
                            document.getElementById('infoLine6').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l6SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Powder_Line 7") {
                            // divLine7.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                            // divLine7.Style.Add(HtmlTextWriterStyle.Width, perLine.ToString() + "%");
                            // infoLine7.InnerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.ToString() + "%";
                            // l7SKU.InnerText = sGrammage + " Gms.";
                            document.getElementById('divLine7').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLine7').style.width = perLine.toString() + "%";
                            document.getElementById('infoLine7').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l7SKU').innerText = sGrammage + " Gms.";
                        }


                        // #endregion

                    }
                    else if (dOEE > 80) {

                        // #region Success

                        if (slineNo == "Powder_Line 1") {
                            // divLine1.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                            // divLine1.Style.Add(HtmlTextWriterStyle.Width, perLine.ToString() + "%");
                            // infoLine1.InnerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.ToString() + "%";
                            // l1SKU.InnerText = sGrammage + " Gms.";
                            document.getElementById('divLine1').setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            //divLine1.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLine1').style.width = perLine.toString() + "%";
                            document.getElementById('divLine1').innerText = perLine.toString() + "%";
                            document.getElementById('infoLine1').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l1SKU').innerText = sGrammage + " Gms."


                        }
                        else if (slineNo == "Powder_Line 2") {
                            // divLine2.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                            // divLine2.Style.Add(HtmlTextWriterStyle.Width, perLine.ToString() + "%");
                            // infoLine2.InnerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.ToString() + "%";
                            // l2SKU.InnerText = sGrammage + " Gms.";
                            document.getElementById('divLine2').setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            document.getElementById('divLine2').style.width = perLine.toString() + "%";
                            //divLine2.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('infoLine2').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l2SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Powder_Line 3") {
                            // divLine3.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                            // divLine3.Style.Add(HtmlTextWriterStyle.Width, perLine.ToString() + "%");
                            // infoLine3.InnerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.ToString() + "%";
                            // l3SKU.InnerText = sGrammage + " Gms.";

                            document.getElementById('divLine3').setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            document.getElementById('divLine3').style.width = perLine.toString() + "%";
                            //document.getElementById('divLine3').style.width =  dOEE.toString()+"%";
                            //divLine3.setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('infoLine3').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";

                            document.getElementById('l3SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Powder_Line 4") {
                            // divLine4.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                            // divLine4.Style.Add(HtmlTextWriterStyle.Width, perLine.ToString() + "%");
                            // infoLine4.InnerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.ToString() + "%";
                            // l4SKU.InnerText = sGrammage + " Gms.";

                            document.getElementById('divLine4').setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            document.getElementById('divLine4').style.width = perLine.toString() + "%";
                            document.getElementById('infoLine4').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l4SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Powder_Line 5") {
                            // divLine5.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                            // divLine5.Style.Add(HtmlTextWriterStyle.Width, perLine.ToString() + "%");
                            // infoLine5.InnerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.ToString() + "%";
                            // l5SKU.InnerText = sGrammage + " Gms.";


                            document.getElementById('divLine5').setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            document.getElementById('divLine5').style.width = perLine.toString() + "%";
                            document.getElementById('infoLine5').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";

                            document.getElementById('l5SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Powder_Line 6") {
                            // divLine6.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                            // divLine6.Style.Add(HtmlTextWriterStyle.Width, perLine.ToString() + "%");
                            // infoLine6.InnerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.ToString() + "%";
                            // l6SKU.InnerText = sGrammage + " Gms.";


                            document.getElementById('divLine6').setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            document.getElementById('divLine6').style.width = perLine.toString() + "%";
                            document.getElementById('infoLine6').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l6SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Powder_Line 7") {
                            // divLine7.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                            // divLine7.Style.Add(HtmlTextWriterStyle.Width, perLine.ToString() + "%");
                            // infoLine7.InnerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.ToString() + "%";
                            // l7SKU.InnerText = sGrammage + " Gms.";


                            document.getElementById('divLine7').setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            document.getElementById('divLine7').style.width = perLine.toString() + "%";
                            document.getElementById('infoLine7').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l7SKU').innerText = sGrammage + " Gms.";
                        }


                        // #endregion

                    }

                    // #endregion

                    // #region OEE Mapping



                    if (dOEE < 60.0) {

                        // #region Danger

                        if (slineNo == "Powder_Line 1") {
                            // divLineOEE1.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                            // divLineOEE1.Style.Add(HtmlTextWriterStyle.Width, dOEE.ToString() + "%");
                            // divLineOEEInfo1.InnerText = dOEE.ToString() + "%";


                            document.getElementById('divLineOEE1').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            document.getElementById('divLineOEE1').setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo1').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Powder_Line 2") {
                            // divLineOEE2.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                            // divLineOEE2.Style.Add(HtmlTextWriterStyle.Width, dOEE.ToString() + "%");
                            // divLineOEEInfo2.InnerText = dOEE.ToString() + "%";


                            document.getElementById('divLineOEE2').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            document.getElementById('divLineOEE2').setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo2').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Powder_Line 3") {
                            // divLineOEE3.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                            // divLineOEE3.Style.Add(HtmlTextWriterStyle.Width, dOEE.ToString() + "%");
                            // divLineOEEInfo3.InnerText = dOEE.ToString() + "%";


                            document.getElementById('divLineOEE3').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            document.getElementById('divLineOEE3').setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo3').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Powder_Line 4") {
                            // divLineOEE4.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                            // divLineOEE4.Style.Add(HtmlTextWriterStyle.Width, dOEE.ToString() + "%");
                            // divLineOEEInfo4.InnerText = dOEE.ToString() + "%";


                            document.getElementById('divLineOEE4').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            document.getElementById('divLineOEE4').setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo4').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Powder_Line 5") {
                            // divLineOEE5.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                            // divLineOEE5.Style.Add(HtmlTextWriterStyle.Width, dOEE.ToString() + "%");
                            // divLineOEEInfo5.InnerText = dOEE.ToString() + "%";


                            document.getElementById('divLineOEE5').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            document.getElementById('divLineOEE5').setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo5').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Powder_Line 6") {
                            // divLineOEE6.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                            // divLineOEE6.Style.Add(HtmlTextWriterStyle.Width, dOEE.ToString() + "%");
                            // divLineOEEInfo6.InnerText = dOEE.ToString() + "%";


                            document.getElementById('divLineOEE6').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            document.getElementById('divLineOEE6').setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo6').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Powder_Line 7") {
                            // divLineOEE7.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                            // divLineOEE7.Style.Add(HtmlTextWriterStyle.Width, dOEE.ToString() + "%");
                            // divLineOEEInfo7.InnerText = dOEE.ToString() + "%";

                            document.getElementById('divLineOEE7').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            document.getElementById('divLineOEE7').setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo7').innerText = dOEE.toString() + "%";
                        }

                        // #endregion

                    }

                    else if (dOEE > 60.0 && dOEE <= 80.0) {

                        // #region Warning

                        if (slineNo == "Powder_Line 1") {
                            // divLineOEE1.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                            // divLineOEE1.Style.Add(HtmlTextWriterStyle.Width, dOEE.ToString() + "%");
                            // divLineOEEInfo1.InnerText = dOEE.ToString() + "%";

                            document.getElementById('divLineOEE1').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLineOEE1').setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo1').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Powder_Line 2") {
                            // divLineOEE2.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                            // divLineOEE2.Style.Add(HtmlTextWriterStyle.Width, dOEE.ToString() + "%");
                            // divLineOEEInfo2.InnerText = dOEE.ToString() + "%";

                            document.getElementById('divLineOEE2').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLineOEE2').setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo2').innerText = dOEE.toString() + "%";

                        }
                        else if (slineNo == "Powder_Line 3") {
                            // divLineOEE3.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                            // divLineOEE3.Style.Add(HtmlTextWriterStyle.Width, dOEE.ToString() + "%");
                            // divLineOEEInfo3.InnerText = dOEE.ToString() + "%";

                            document.getElementById('divLineOEE3').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLineOEE3').setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo3').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Powder_Line 4") {
                            // divLineOEE4.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                            // divLineOEE4.Style.Add(HtmlTextWriterStyle.Width, dOEE.ToString() + "%");
                            // divLineOEEInfo4.InnerText = dOEE.ToString() + "%";


                            document.getElementById('divLineOEE4').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLineOEE4').setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo4').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Powder_Line 5") {
                            // divLineOEE5.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                            // divLineOEE5.Style.Add(HtmlTextWriterStyle.Width, dOEE.ToString() + "%");
                            // divLineOEEInfo5.InnerText = dOEE.ToString() + "%";


                            document.getElementById('divLineOEE5').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLineOEE5').setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo5').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Powder_Line 6") {
                            // divLineOEE6.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                            // divLineOEE6.Style.Add(HtmlTextWriterStyle.Width, dOEE.ToString() + "%");
                            // divLineOEEInfo6.InnerText = dOEE.ToString() + "%";


                            document.getElementById('divLineOEE6').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLineOEE6').setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo6').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Powder_Line 7") {
                            // divLineOEE7.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                            // divLineOEE7.Style.Add(HtmlTextWriterStyle.Width, dOEE.ToString() + "%");
                            // divLineOEEInfo7.InnerText = dOEE.ToString() + "%";


                            document.getElementById('divLineOEE7').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLineOEE7').setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo7').innerText = dOEE.toString() + "%";
                        }


                        // #endregion

                    }
                    else if (dOEE > 80) {

                        //#region Success

                        if (slineNo == "Powder_Line 1") {
                            // divLineOEE1.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                            // divLineOEE1.Style.Add(HtmlTextWriterStyle.Width, dOEE.ToString() + "%");
                            // divLineOEEInfo1.InnerText = dOEE.ToString() + "%";

                            document.getElementById('divLineOEE1').setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            document.getElementById('divLineOEE1').setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo1').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Powder_Line 2") {
                            // divLineOEE2.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                            // divLineOEE2.Style.Add(HtmlTextWriterStyle.Width, dOEE.ToString() + "%");
                            // divLineOEEInfo2.InnerText = dOEE.ToString() + "%";

                            document.getElementById('divLineOEE2').setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            document.getElementById('divLineOEE2').setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo2').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Powder_Line 3") {
                            // divLineOEE3.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                            // divLineOEE3.Style.Add(HtmlTextWriterStyle.Width, dOEE.ToString() + "%");
                            // divLineOEEInfo3.InnerText = dOEE.ToString() + "%";

                            document.getElementById('divLineOEE3').setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            document.getElementById('divLineOEE3').setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo3').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Powder_Line 4") {
                            // divLineOEE4.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                            // divLineOEE4.Style.Add(HtmlTextWriterStyle.Width, dOEE.ToString() + "%");
                            // divLineOEEInfo4.InnerText = dOEE.ToString() + "%";


                            document.getElementById('divLineOEE4').setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            document.getElementById('divLineOEE4').setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo4').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Powder_Line 5") {
                            // divLineOEE5.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                            // divLineOEE5.Style.Add(HtmlTextWriterStyle.Width, dOEE.ToString() + "%");
                            // divLineOEEInfo5.InnerText = dOEE.ToString() + "%";

                            document.getElementById('divLineOEE5').setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            document.getElementById('divLineOEE5').setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo5').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Powder_Line 6") {
                            // divLineOEE6.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                            // divLineOEE6.Style.Add(HtmlTextWriterStyle.Width, dOEE.ToString() + "%");
                            // divLineOEEInfo6.InnerText = dOEE.ToString() + "%";

                            document.getElementById('divLineOEE6').setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            document.getElementById('divLineOEE6').setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo6').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Powder_Line 7") {
                            // divLineOEE7.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                            // divLineOEE7.Style.Add(HtmlTextWriterStyle.Width, dOEE.ToString() + "%");
                            // divLineOEEInfo7.InnerText = dOEE.ToString() + "%";

                            document.getElementById('divLineOEE7').setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            document.getElementById('divLineOEE7').setAttribute('width', dOEE.toString() + "%");
                            document.getElementById('divLineOEEInfo7').innerText = dOEE.toString() + "%";
                        }


                        //  #endregion

                    }

                    //  #endregion

                    OEECascade1 = OEECascade1 / 4;
                    OEECascade2 = OEECascade2 / 4;
                    OEECascade4 = OEECascade4 / 3;

                    OEECascade1 = Math.round(OEECascade1);
                    OEECascade2 = Math.round(OEECascade2);
                    OEECascade4 = Math.round(OEECascade4);

                    // #region Cascade1 Mapping

                    // #region CLD

                    var divisionCascade1 = 0.0;

                    if (targetCascade1 != 0.0) {
                        divisionCascade1 = parseFloat(parseFloat(cldCascade1) / parseFloat(targetCascade1));
                    }

                    var perCascade1 = parseFloat(divisionCascade1 * 100);

                    if (OEECascade1 < 40.0) {
                        //    divCascade1.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                        //    divCascade1.Style.Add(HtmlTextWriterStyle.Width, perCascade1.ToString() + "%");
                        //    infoCascade1.InnerText = Math.round(cldCascade1) + "/" + Math.round(targetCascade1, 0) + ", " + OEECascade1.ToString() + "%";
                    }
                    else if (OEECascade1 >= 40.0 && OEECascade1 <= 70.0) {
                        //divCascade1.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                        //divCascade1.Style.Add(HtmlTextWriterStyle.Width, perCascade1.ToString() + "%");
                        //infoCascade1.InnerText = Math.round(cldCascade1) + "/" + Math.round(targetCascade1, 0) + ", " + OEECascade1.ToString() + "%";
                    }
                    else if (OEECascade1 > 70) {
                        //divCascade1.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                        //divCascade1.Style.Add(HtmlTextWriterStyle.Width, perCascade1.ToString() + "%");
                        //infoCascade1.InnerText = Math.round(cldCascade1) + "/" + Math.round(targetCascade1, 0) + ", " + OEECascade1.ToString() + "%";

                    }

                    // #endregion

                    // #region OEE

                    if (OEECascade1 < 40.0) {
                        document.getElementById('divCascadeOEE1').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                        document.getElementById('divCascadeOEE1').setAttribute('width', OEECascade1.toString() + "%");
                        document.getElementById('divCascadeOEEInfo1').innerText = OEECascade1.toString() + "%";


                        // divCascadeOEE1.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                        // divCascadeOEE1.Style.Add(HtmlTextWriterStyle.Width, OEECascade1.ToString() + "%");
                        // divCascadeOEEInfo1.InnerText = OEECascade1.ToString() + "%";
                    }
                    else if (OEECascade1 >= 40.0 && OEECascade1 <= 70.0) {
                        // divCascadeOEE1.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                        // divCascadeOEE1.Style.Add(HtmlTextWriterStyle.Width, OEECascade1.ToString() + "%");
                        // divCascadeOEEInfo1.InnerText = OEECascade1.ToString() + "%";


                        document.getElementById('divCascadeOEE1').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                        document.getElementById('divCascadeOEE1').setAttribute('width', OEECascade1.toString() + "%");
                        document.getElementById('divCascadeOEEInfo1').innerText = OEECascade1.toString() + "%";
                    }
                    else if (OEECascade1 > 70) {
                        // divCascadeOEE1.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                        // divCascadeOEE1.Style.Add(HtmlTextWriterStyle.Width, OEECascade1.ToString() + "%");
                        // divCascadeOEEInfo1.InnerText = OEECascade1.ToString() + "%";


                        document.getElementById('divCascadeOEE1').setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                        document.getElementById('divCascadeOEE1').setAttribute('width', OEECascade1.toString() + "%");
                        document.getElementById('divCascadeOEEInfo1').innerText = OEECascade1.toString() + "%";
                    }

                    // #endregion

                    // #endregion

                    // #region Cascade2 Mapping

                    // #region CLD

                    var divisionCascade2 = 0.0;

                    if (targetCascade2 != 0.0) {
                        divisionCascade2 = parseFloat(parseFloat(cldCascade2) / parseFloat(targetCascade2));
                    }

                    var perCascade2 = parseFloat(divisionCascade2 * 100);

                    if (OEECascade2 < 40.0) {
                        //divCascade2.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                        //divCascade2.Style.Add(HtmlTextWriterStyle.Width, perCascade2.ToString() + "%");
                        //infoCascade2.InnerText = Math.round(cldCascade2) + "/" + Math.round(targetCascade2, 0) + ", " + OEECascade2.ToString() + "%";

                    }
                    else if (OEECascade2 >= 40.0 && OEECascade2 <= 70.0) {
                        //divCascade2.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                        //divCascade2.Style.Add(HtmlTextWriterStyle.Width, perCascade2.ToString() + "%");
                        //infoCascade2.InnerText = Math.round(cldCascade2) + "/" + Math.round(targetCascade2, 0) + ", " + OEECascade2.ToString() + "%";

                    }
                    else if (OEECascade2 > 70) {
                        //divCascade2.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                        //divCascade2.Style.Add(HtmlTextWriterStyle.Width, perCascade2.ToString() + "%");
                        //infoCascade2.InnerText = Math.round(cldCascade2) + "/" + Math.round(targetCascade2, 0) + ", " + OEECascade2.ToString() + "%";

                    }

                    // #endregion

                    // #region OEE

                    if (OEECascade2 < 40.0) {
                        // divCascadeOEE2.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                        // divCascadeOEE2.Style.Add(HtmlTextWriterStyle.Width, OEECascade2.ToString() + "%");
                        // divCascadeOEEInfo2.InnerText = OEECascade2.ToString() + "%";


                        document.getElementById('divCascadeOEE2').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                        document.getElementById('divCascadeOEE2').setAttribute('width', OEECascade2.toString() + "%");
                        document.getElementById('divCascadeOEEInfo2').innerText = OEECascade2.toString() + "%";
                    }
                    else if (OEECascade2 >= 40.0 && OEECascade2 <= 70.0) {
                        // divCascadeOEE2.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                        // divCascadeOEE2.Style.Add(HtmlTextWriterStyle.Width, OEECascade2.ToString() + "%");
                        // divCascadeOEEInfo2.InnerText = OEECascade2.ToString() + "%";


                        document.getElementById('divCascadeOEE2').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                        document.getElementById('divCascadeOEE2').setAttribute('width', OEECascade2.toString() + "%");
                        document.getElementById('divCascadeOEEInfo2').innerText = OEECascade2.toString() + "%";
                    }
                    else if (OEECascade2 > 70) {
                        // divCascadeOEE2.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                        // divCascadeOEE2.Style.Add(HtmlTextWriterStyle.Width, OEECascade2.ToString() + "%");
                        // divCascadeOEEInfo2.InnerText = OEECascade2.ToString() + "%";

                        document.getElementById('divCascadeOEE2').setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                        document.getElementById('divCascadeOEE2').setAttribute('width', OEECascade2.toString() + "%");
                        document.getElementById('divCascadeOEEInfo2').innerText = OEECascade2.toString() + "%";
                    }

                    // #endregion

                    // #endregion

                    // #region Cascade4 Mapping

                    // #region CLD

                    var divisionCascade4 = 0.0;

                    if (targetCascade4 != 0.0) {
                        divisionCascade4 = parseFloat(parseFloat(cldCascade4) / parseFloat(targetCascade4));
                    }

                    var perCascade4 = parseFloat(divisionCascade4 * 100);

                    if (OEECascade4 < 40.0) {
                        //divCascade4.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                        //divCascade4.Style.Add(HtmlTextWriterStyle.Width, perCascade4.ToString() + "%");
                        //infoCascade4.InnerText = Math.round(cldCascade4) + "/" + Math.round(targetCascade4, 0) + ", " + OEECascade4.ToString() + "%";

                    }
                    else if (OEECascade4 >= 40.0 && OEECascade4 <= 70.0) {
                        //divCascade4.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                        //divCascade4.Style.Add(HtmlTextWriterStyle.Width, perCascade4.ToString() + "%");
                        //infoCascade4.InnerText = Math.round(cldCascade4) + "/" + Math.round(targetCascade4, 0) + ", " + OEECascade4.ToString() + "%";

                    }
                    else if (OEECascade4 > 70) {
                        //divCascade4.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                        //divCascade4.Style.Add(HtmlTextWriterStyle.Width, perCascade4.ToString() + "%");
                        //infoCascade4.InnerText = Math.round(cldCascade4) + "/" + Math.round(targetCascade4, 0) + ", " + OEECascade4.ToString() + "%";

                    }

                    // #endregion

                    // #region OEE

                    if (OEECascade4 < 40.0) {
                        // divCascadeOEE4.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                        // divCascadeOEE4.Style.Add(HtmlTextWriterStyle.Width, OEECascade4.ToString() + "%");
                        // divCascadeOEEInfo4.InnerText = OEECascade4.ToString() + "%";

                        document.getElementById('divCascadeOEE4').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                        document.getElementById('divCascadeOEE4').setAttribute('width', OEECascade4.toString() + "%");
                        document.getElementById('divCascadeOEEInfo4').innerText = OEECascade4.toString() + "%";
                    }
                    else if (OEECascade4 >= 40.0 && OEECascade4 <= 70.0) {
                        // divCascadeOEE4.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                        // divCascadeOEE4.Style.Add(HtmlTextWriterStyle.Width, OEECascade4.ToString() + "%");
                        // divCascadeOEEInfo4.InnerText = OEECascade4.ToString() + "%";

                        document.getElementById('divCascadeOEE4').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                        document.getElementById('divCascadeOEE4').setAttribute('width', OEECascade4.toString() + "%");
                        document.getElementById('divCascadeOEEInfo4').innerText = OEECascade4.toString() + "%";
                    }
                    else if (OEECascade4 > 70) {
                        // divCascadeOEE4.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                        // divCascadeOEE4.Style.Add(HtmlTextWriterStyle.Width, OEECascade4.ToString() + "%");
                        // divCascadeOEEInfo4.InnerText = OEECascade4.ToString() + "%";


                        document.getElementById('divCascadeOEE4').setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                        document.getElementById('divCascadeOEE4').setAttribute('width', OEECascade4.toString() + "%");
                        document.getElementById('divCascadeOEEInfo4').innerText = OEECascade4.toString() + "%";
                    }

                    // #endregion

                    // #endregion
                });

                getLineStatusData();
            }
        });
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
            url: '/getLineStatusData1',
            data: {
                FinalDate: FinalDate,
                FinalShift: FinalShift,

            },
            // async: false,
            //async: false,
            success: function (data) {
                debugger;
                var response = data.recordset;



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

                });




                upstreamPSM();

            }

        });


    }
    catch (error) {
        console.error("in error");
    }



}


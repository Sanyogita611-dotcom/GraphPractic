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
    // upstreampchart();

});

$("#Line1_OLE").click(function () {
    localStorage.setItem('machine', 'Unit-2 Line 1');
    window.location.href = "/LiveDashboard.html";
});

$("#Line2_OLE").click(function () {
    localStorage.setItem('machine', 'Unit-2 Line 2');
    window.location.href = "/LiveDashboard.html";
});

$("#Line3_OLE").click(function () {
    localStorage.setItem('machine', 'Unit-2 Line 3');
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

var dOEE = 0.0;
var dTarget = 0.0;
var dCLDCount = 0.0;

var dMazzoniEfficiency = 0.0;
var dFWEfficiency = 0.0;
var dCPUEfficiency = 0.0;
var dElapsedTime = 0.0;


function getData() {
    debugger;

    try {

        $.ajax({
            type: 'GET',
            url: '/unit2cascadedata',

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
                    var sGrammage = response[i]["Grammage"];
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
                        dOEE = Math.round(dOEE);

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

                    //double division = 0.0;
                    //if (elapsedTarget != 0.0)
                    //{
                    //    division = parseFloat(parseFloat(dCLDCount) / parseFloat(elapsedTarget));
                    //}
                    //double perLine = parseFloat(division * 100);
                    // #region Cascade Calculations


                    //if (slineNo == "Line 1") {
                        if (slineNo == "Unit-2 Line 1") {
                        targetCascade1 = targetCascade1 + elapsedTarget;
                        cldCascade1 = cldCascade1 + Math.round(dCLDCount);
                        OEECascade1 = OEECascade1 + dOEE;
                    }
                    //else if (slineNo == "Line 2") {
                        else if (slineNo == "Unit-2 Line 2") {
                        targetCascade1 = targetCascade1 + elapsedTarget;
                        cldCascade1 = cldCascade1 + Math.round(dCLDCount);
                        OEECascade1 = OEECascade1 + dOEE;

                    }
                    //else if (slineNo == "Line ") {
                         else if (slineNo == "Unit-2 Line 3") {

                        targetCascade1 = targetCascade1 + elapsedTarget;
                        cldCascade1 = cldCascade1 + Math.round(dCLDCount);
                        OEECascade1 = OEECascade1 + dOEE;

                    }


                    // #endregion

                    // #region CLD Mapping

                    if (dOEE < 40.0) {

                        // #region Danger

                        if (slineNo == "Unit-2 Line 1") {
                        //if (slineNo == "Line 1") {
                            // divLine1.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                            // divLine1.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                            // infoLine1.InnerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            // l1SKU.InnerText = sGrammage + " Gms.";

                            document.getElementById('divLine1').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            // document.getElementById('divLine1').style.width = dOEE.toString() + "%";
                            document.getElementById('divLine1').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine1').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l1SKU').innerText = sGrammage + " Gms.";


                            // document.getElementById('divLine1').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            // document.getElementById('divLine1').setAttribute('width', dOEE.toString() + "%");
                            // document.getElementById('infoLine1').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            // document.getElementById('l1SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Unit-2 Line 2") {
                        //else if (slineNo == "Line 2") {
                            // divLine2.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                            // divLine2.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                            // infoLine2.InnerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            // l2SKU.InnerText = sGrammage + " Gms.";

                            document.getElementById('divLine2').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            document.getElementById('divLine2').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine2').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l2SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Unit-2 Line 3") {
                       //else if (slineNo == "Unit-2 Line 1") {
                            // divLine3.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                            // divLine3.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                            // infoLine3.InnerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";

                            // l3SKU.InnerText = sGrammage + " Gms.";

                            document.getElementById('divLine3').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            document.getElementById('divLine3').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine3').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l3SKU').innerText = sGrammage + " Gms.";

                        }

                        // #endregion
                    }
                    else if (dOEE >= 40.0 && dOEE <= 70.0) {

                        // #region Warning

                             if (slineNo == "Unit-2 Line 1") {

                                  //if (slineNo == "Line 1") {
                            // divLine1.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                            // divLine1.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                            // infoLine1.InnerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            // l1SKU.InnerText = sGrammage + " Gms.";

                            document.getElementById('divLine1').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLine1').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine1').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l1SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Unit-2 Line 2") {
                        //else if (slineNo == "Line 2") {

                            // divLine2.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                            // divLine2.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                            // infoLine2.InnerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            // l2SKU.InnerText = sGrammage + " Gms.";


                            document.getElementById('divLine2').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLine2').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine2').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l2SKU').innerText = sGrammage + " Gms.";
                        }
                        else if (slineNo == "Unit-2 Line 3") {
                       // else if (slineNo == "Line 3") {
                            document.getElementById('divLine3').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLine3').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine3').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l3SKU').innerText = sGrammage + " Gms.";
                        }

                        // #endregion

                    }
                    else if (dOEE > 70) {

                        // #region Success

                        if (slineNo == "Unit-2 Line 1") 
                        {
                              //  if (slineNo == "Line 1") {


                            document.getElementById('divLine1').setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            document.getElementById('divLine1').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine1').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l1SKU').innerText = sGrammage + " Gms.";
                            // divLine1.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                            // divLine1.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                            // infoLine1.InnerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            // l1SKU.InnerText = sGrammage + " Gms.";
                        }
                         else if (slineNo == "Unit-2 Line 2") {
                        //else if (slineNo == "Line 2") {

                            document.getElementById('divLine2').setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            document.getElementById('divLine2').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine2').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l2SKU').innerText = sGrammage + " Gms.";

                            // divLine2.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                            // divLine2.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                            // infoLine2.InnerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            // l2SKU.InnerText = sGrammage + " Gms.";
                        }
                        //else if (slineNo == "Line 3") {
                        else if (slineNo == "Unit-2 Line 3") {

                            document.getElementById('divLine3').setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            document.getElementById('divLine3').style.width = dOEE.toString() + "%";
                            document.getElementById('infoLine3').innerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            document.getElementById('l3SKU').innerText = sGrammage + " Gms.";


                            // divLine3.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                            // divLine3.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                            // infoLine3.InnerText = Math.round(dCLDCount) + "/" + Math.round(elapsedTarget, 0) + ", " + dOEE.toString() + "%";
                            // l3SKU.InnerText = sGrammage + " Gms.";
                        }



                        // #endregion

                    }

                    // #endregion

                    // #region OEE Mapping

                    if (dOEE < 40.0) {

                        // #region Danger

                        if (slineNo == "Unit-2 Line 1") {

                            // divLineOEE1.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                            // divLineOEE1.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                            // divLineOEEInfo1.InnerText = dOEE.toString() + "%";



                            document.getElementById('divLineOEE1').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            document.getElementById('divLineOEE1').style.width = dOEE.toString() + "%";
                            document.getElementById('divLineOEEInfo1').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Unit-2 Line 2") {
                            // divLineOEE2.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                            // divLineOEE2.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                            // divLineOEEInfo2.InnerText = dOEE.toString() + "%";

                            document.getElementById('divLineOEE2').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                            document.getElementById('divLineOEE2').style.width = dOEE.toString() + "%";
                            document.getElementById('divLineOEEInfo2').innerText = dOEE.toString() + "%";
                        }
                    }
                    else if (slineNo == "Unit-2 Line 3") {
                        // divLineOEE3.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                        // divLineOEE3.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                        // divLineOEEInfo3.InnerText = dOEE.toString() + "%";

                        document.getElementById('divLineOEE3').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                        document.getElementById('divLineOEE3').style.width = dOEE.toString() + "%";
                        document.getElementById('divLineOEEInfo3').innerText = dOEE.toString() + "%";

                    }
                    else if (slineNo == "Line 1") {
                        // divLineOEE4.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                        // divLineOEE4.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                        // divLineOEEInfo4.InnerText = dOEE.toString() + "%";

                        document.getElementById('divLineOEE4').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                        document.getElementById('divLineOEE4').style.width = dOEE.toString() + "%";
                        document.getElementById('divLineOEEInfo4').innerText = dOEE.toString() + "%";
                    }

                    else if (slineNo == "Line 2") {
                        // divLineOEE5.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                        // divLineOEE5.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                        // divLineOEEInfo5.InnerText = dOEE.toString() + "%";

                        document.getElementById('divLineOEE5').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                        document.getElementById('divLineOEE5').style.width = dOEE.toString() + "%";
                        document.getElementById('divLineOEEInfo5').innerText = dOEE.toString() + "%";

                    }
                    else if (slineNo == "Line 3") {
                        // divLineOEE6.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                        // divLineOEE6.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                        // divLineOEEInfo6.InnerText = dOEE.toString() + "%";

                        document.getElementById('divLineOEE6').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                        document.getElementById('divLineOEE6').style.width = dOEE.toString() + "%";
                        document.getElementById('divLineOEEInfo6').innerText = dOEE.toString() + "%";

                    }
                    else if (slineNo == "Line 7") {
                        // divLineOEE7.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                        // divLineOEE7.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                        // divLineOEEInfo7.InnerText = dOEE.toString() + "%";

                        document.getElementById('divLineOEE7').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                        document.getElementById('divLineOEE7').style.width = dOEE.toString() + "%";
                        document.getElementById('divLineOEEInfo7').innerText = dOEE.toString() + "%";

                    }
                    else if (slineNo == "Line 8") {
                        // divLineOEE8.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                        // divLineOEE8.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                        // divLineOEEInfo8.InnerText = dOEE.toString() + "%";

                        document.getElementById('divLineOEE8').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                        document.getElementById('divLineOEE8').style.width = dOEE.toString() + "%";
                        document.getElementById('divLineOEEInfo8').innerText = dOEE.toString() + "%";

                    }
                    else if (slineNo == "Line 10") {
                        // divLineOEE10.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                        // divLineOEE10.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                        // divLineOEEInfo10.InnerText = dOEE.toString() + "%";

                        document.getElementById('divLineOEE10').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                        document.getElementById('divLineOEE10').style.width = dOEE.toString() + "%";
                        document.getElementById('divLineOEEInfo10').innerText = dOEE.toString() + "%";

                    }

                    else if (slineNo == "Line 11") {
                        // divLineOEE11.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                        // divLineOEE11.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                        // divLineOEEInfo11.InnerText = dOEE.toString() + "%";

                        document.getElementById('divLineOEE11').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                        document.getElementById('divLineOEE11').style.width = dOEE.toString() + "%";
                        document.getElementById('divLineOEEInfo11').innerText = dOEE.toString() + "%";
                    }


                    else if (slineNo == "Line 12") {
                        // divLineOEE12.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                        // divLineOEE12.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                        // divLineOEEInfo12.InnerText = dOEE.toString() + "%";

                        document.getElementById('divLineOEE12').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                        document.getElementById('divLineOEE12').style.width = dOEE.toString() + "%";
                        document.getElementById('divLineOEEInfo12').innerText = dOEE.toString() + "%";



                        // #endregion

                    }

                    else if (dOEE > 40.0 && dOEE <= 70.0) {

                        // #region Warning

                        if (slineNo == "Unit-2 Line 1") {
                            // divLineOEE1.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                            // divLineOEE1.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                            // divLineOEEInfo1.InnerText = dOEE.toString() + "%";

                            document.getElementById('divLineOEE1').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLineOEE1').style.width = dOEE.toString() + "%";
                            document.getElementById('divLineOEEInfo1').innerText = dOEE.toString() + "%";

                        }
                        else if (slineNo == "Unit-2 Line 2") {
                            // divLineOEE2.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                            // divLineOEE2.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                            // divLineOEEInfo2.InnerText = dOEE.toString() + "%";

                            document.getElementById('divLineOEE2').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLineOEE2').style.width = dOEE.toString() + "%";
                            document.getElementById('divLineOEEInfo2').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Unit-2 Line 3") {
                            // divLineOEE3.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                            // divLineOEE3.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                            // divLineOEEInfo3.InnerText = dOEE.toString() + "%";

                            document.getElementById('divLineOEE3').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLineOEE3').style.width = dOEE.toString() + "%";
                            document.getElementById('divLineOEEInfo3').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 4") {
                            // divLineOEE4.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                            // divLineOEE4.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                            // divLineOEEInfo4.InnerText = dOEE.toString() + "%";

                            document.getElementById('divLineOEE4').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLineOEE4').style.width = dOEE.toString() + "%";
                            document.getElementById('divLineOEEInfo4').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 5") {
                            // divLineOEE5.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                            // divLineOEE5.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                            // divLineOEEInfo5.InnerText = dOEE.toString() + "%";

                            document.getElementById('divLineOEE5').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLineOEE5').style.width = dOEE.toString() + "%";
                            document.getElementById('divLineOEEInfo5').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 6") {
                            // divLineOEE6.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                            // divLineOEE6.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                            // divLineOEEInfo6.InnerText = dOEE.toString() + "%";

                            document.getElementById('divLineOEE6').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLineOEE6').style.width = dOEE.toString() + "%";
                            document.getElementById('divLineOEEInfo6').innerText = dOEE.toString() + "%";


                        }
                        else if (slineNo == "Line 7") {
                            // divLineOEE7.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                            // divLineOEE7.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                            // divLineOEEInfo7.InnerText = dOEE.toString() + "%";

                            document.getElementById('divLineOEE7').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLineOEE7').style.width = dOEE.toString() + "%";
                            document.getElementById('divLineOEEInfo7').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 8") {
                            // divLineOEE8.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                            // divLineOEE8.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                            // divLineOEEInfo8.InnerText = dOEE.toString() + "%";

                            document.getElementById('divLineOEE8').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLineOEE8').style.width = dOEE.toString() + "%";
                            document.getElementById('divLineOEEInfo8').innerText = dOEE.toString() + "%";
                        }

                        else if (slineNo == "Line 10") {
                            // divLineOEE10.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                            // divLineOEE10.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                            // divLineOEEInfo10.InnerText = dOEE.toString() + "%";

                            document.getElementById('divLineOEE10').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLineOEE10').style.width = dOEE.toString() + "%";
                            document.getElementById('divLineOEEInfo10').innerText = dOEE.toString() + "%";
                        }

                        else if (slineNo == "Line 11") {
                            // divLineOEE11.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                            // divLineOEE11.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                            // divLineOEEInfo11.InnerText = dOEE.toString() + "%";

                            document.getElementById('divLineOEE11').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLineOEE11').style.width = dOEE.toString() + "%";
                            document.getElementById('divLineOEEInfo11').innerText = dOEE.toString() + "%";
                        }

                        else if (slineNo == "Line 12") {
                            // divLineOEE12.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                            // divLineOEE12.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                            // divLineOEEInfo12.InnerText = dOEE.toString() + "%";

                            document.getElementById('divLineOEE12').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                            document.getElementById('divLineOEE12').style.width = dOEE.toString() + "%";
                            document.getElementById('divLineOEEInfo12').innerText = dOEE.toString() + "%";
                        }
                        // #endregion

                    }
                    else if (dOEE > 70) {

                        // #region Success

                        if (slineNo == "Unit-2 Line 1") {
                            // divLineOEE1.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                            // divLineOEE1.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                            // divLineOEEInfo1.InnerText = dOEE.toString() + "%";

                            document.getElementById('divLineOEE1').setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            document.getElementById('divLineOEE1').style.width = dOEE.toString() + "%";
                            document.getElementById('divLineOEEInfo1').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Unit-2 Line 2") {
                            // divLineOEE2.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                            // divLineOEE2.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                            // divLineOEEInfo2.InnerText = dOEE.toString() + "%";

                            document.getElementById('divLineOEE2').setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            document.getElementById('divLineOEE2').style.width = dOEE.toString() + "%";
                            document.getElementById('divLineOEEInfo2').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Unit-2 Line 3") {
                            // divLineOEE3.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                            // divLineOEE3.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                            // divLineOEEInfo3.InnerText = dOEE.toString() + "%";

                            document.getElementById('divLineOEE2').setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            document.getElementById('divLineOEE2').style.width = dOEE.toString() + "%";
                            document.getElementById('divLineOEEInfo2').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 1") {
                            // divLineOEE4.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                            // divLineOEE4.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                            // divLineOEEInfo4.InnerText = dOEE.toString() + "%";

                            document.getElementById('divLineOEE4').setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            document.getElementById('divLineOEE4').style.width = dOEE.toString() + "%";
                            document.getElementById('divLineOEEInfo4').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 2") {
                            // divLineOEE5.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                            // divLineOEE5.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                            // divLineOEEInfo5.InnerText = dOEE.toString() + "%";

                            document.getElementById('divLineOEE5').setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            document.getElementById('divLineOEE5').style.width = dOEE.toString() + "%";
                            document.getElementById('divLineOEEInfo5').innerText = dOEE.toString() + "%";
                        }
                        else if (slineNo == "Line 3") {
                            // divLineOEE6.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                            // divLineOEE6.Style.Add(HtmlTextWriterStyle.Width, dOEE.toString() + "%");
                            // divLineOEEInfo6.InnerText = dOEE.toString() + "%";

                            document.getElementById('divLineOEE6').setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                            document.getElementById('divLineOEE6').style.width = dOEE.toString() + "%";
                            document.getElementById('divLineOEEInfo6').innerText = dOEE.toString() + "%";
                        }
     

                    }

                    // #endregion

                    // #region ASEfficiency

                    if (slineNo == "Unit-2 Line 1") {

                        document.getElementById('l1AS').innerHTML = dMazzoniEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Unit-2 Line 2") {
                        // l2AS.InnerText = dMazzoniEfficiency.toString() + " %";
                        document.getElementById('l2AS').innerHTML = dMazzoniEfficiency.toString() + " %";

                    }
                    else if (slineNo == "Unit-2 Line 3") {
                        // l3AS.InnerText = dMazzoniEfficiency.toString() + " %";
                        document.getElementById('l3AS').innerHTML = dMazzoniEfficiency.toString() + " %";
                    }

                    // #endregion

                    // #region FWEfficiency

                    if (slineNo == "Unit-2 Line 1") {
                        // l1FW.InnerText = dFWEfficiency.toString() + " %";
                        document.getElementById('l1FW').innerHTML = dFWEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Unit-2 Line 2") {
                        // l2FW.InnerText = dFWEfficiency.toString() + " %";
                        document.getElementById('l2FW').innerHTML = dFWEfficiency.toString() + " %";

                    }
                    else if (slineNo == "Unit-2 Line 3") {
                        // l3FW.InnerText = dFWEfficiency.toString() + " %";
                        document.getElementById('l3FW').innerHTML = dFWEfficiency.toString() + " %";

                    }

                    // #endregion
                    // #egion CPUEfficiency

                    if (slineNo == "Unit-2 Line 1") {
                        // l1Bundler.InnerText = dCPUEfficiency.toString() + " %";
                        document.getElementById('l1Bundler').innerHTML = dCPUEfficiency.toString() + " %";

                    }
                    else if (slineNo == "Unit-2 Line 2") {
                        // l2Bundler.InnerText = dCPUEfficiency.toString() + " %";
                        document.getElementById('l2Bundler').innerHTML = dCPUEfficiency.toString() + " %";
                    }
                    else if (slineNo == "Unit-2 Line 3") {
                        // l3Bundler.InnerText = dCPUEfficiency.toString() + " %";
                        document.getElementById('l3Bundler').innerHTML = dCPUEfficiency.toString() + " %";
                    }

                    // #endregion

                    // });

                    OEECascade1 = OEECascade1 / 3;
                    OEECascade2 = OEECascade2 / 3;
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
                       
                       document.getElementById('divCascade1').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");

                        document.getElementById('divCascade1').style.width = perCascade1 + "%";

                        //document.getElementById('divCascade1').setAttribute('width', perCascade1.toString() + "%");

                        document.getElementById('infoCascade1').innerHTML = Math.round(cldCascade1) + "/" + Math.round(targetCascade1, 0) + ", " + Math.round(perCascade1.toString()) + "%";

                        // divCascade1.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                        // divCascade1.Style.Add(HtmlTextWriterStyle.Width, perCascade1.toString() + "%");

                    }
                    else if (OEECascade1 >= 40.0 && OEECascade1 <= 70.0) {
                        // divCascade1.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                        // divCascade1.Style.Add(HtmlTextWriterStyle.Width, perCascade1.toString() + "%");
                        // infoCascade1.InnerText = Math.round(cldCascade1) + "/" + Math.round(targetCascade1, 0) + ", " + OEECascade1.toString() + "%";

                      document.getElementById('divCascade1').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");

                       document.getElementById('divCascade1').style.width = perCascade1 + "%";

                        //document.getElementById('divCascade1').setAttribute('width', perCascade1.toString() + "%");

                        document.getElementById('infoCascade1').innerHTML = Math.round(cldCascade1) + "/" + Math.round(targetCascade1, 0) + ", " + Math.round(perCascade1.toString())  + "%";

                    }
                    else if (OEECascade1 > 70) {
                        // divCascade1.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                        // divCascade1.Style.Add(HtmlTextWriterStyle.Width, perCascade1.toString() + "%");
                        // infoCascade1.InnerText = Math.round(cldCascade1) + "/" + Math.round(targetCascade1, 0) + ", " + OEECascade1.toString() + "%";

                        document.getElementById('divCascade1').setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");

                        document.getElementById('divCascade1').style.width = perCascade1 + "%";

                       // document.getElementById('divCascade1').setAttribute('width', perCascade1.toString() + "%");

                        document.getElementById('infoCascade1').innerHTML = Math.round(cldCascade1) + "/" + Math.round(targetCascade1, 0) + ", " + Math.round(perCascade1.toString())  + "%";

                    }

                    // #endregion

                    // #region OEE

                    if (OEECascade1 < 40.0) {
                        // divCascadeOEE1.Attributes.Add("class", "progress-bar progress-bar-danger progress-bar-striped");
                        // divCascadeOEE1.Style.Add(HtmlTextWriterStyle.Width, OEECascade1.toString() + "%");
                        // divCascadeOEEInfo1.InnerText = OEECascade1.toString() + "%";

                        document.getElementById('divCascadeOEE1').setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped");
                        document.getElementById('divCascadeOEE1').setAttribute('width', dOEE.toString() + "%");

                         document.getElementById('divCascadeOEE1').style.width = dOEE.toString() + "%";
                        
                        //document.getElementById('divCascadeOEEInfo1').InnerText = OEECascade1.toString() + "%";

                    }
                    else if (OEECascade1 >= 40.0 && OEECascade1 <= 70.0) {
                        // divCascadeOEE1.Attributes.Add("class", "progress-bar progress-bar-warning progress-bar-striped");
                        // divCascadeOEE1.Style.Add(HtmlTextWriterStyle.Width, OEECascade1.toString() + "%");
                        // divCascadeOEEInfo1.InnerText = OEECascade1.toString() + "%";

                        document.getElementById('divCascadeOEE1').setAttribute("class", "progress-bar progress-bar-warning progress-bar-striped");
                        document.getElementById('divCascadeOEE1').setAttribute('width', dOEE.toString() + "%");
                        // document.getElementById('divCascadeOEE1').style.width = dOEE.toString() + "%";
                        document.getElementById('divCascadeOEEInfo1').InnerText = OEECascade1.toString() + "%";
                    }
                    else if (OEECascade1 > 70) {
                        // divCascadeOEE1.Attributes.Add("class", "progress-bar progress-bar-success progress-bar-striped");
                        // divCascadeOEE1.Style.Add(HtmlTextWriterStyle.Width, OEECascade1.toString() + "%");
                        // divCascadeOEEInfo1.InnerText = OEECascade1.toString() + "%";

                        document.getElementById('divCascadeOEE1').setAttribute("class", "progress-bar progress-bar-success progress-bar-striped");
                        document.getElementById('divCascadeOEE1').setAttribute('width', dOEE.toString() + "%");
                        // document.getElementById('divCascadeOEE1').style.width = dOEE.toString() + "%";
                        document.getElementById('divCascadeOEEInfo1').InnerText = OEECascade1.toString() + "%";
                    }

                    // #endregion
                    // #endregion
                    // #region Cascade2 Mapping

                    
                });
                getLineStatusData();
      
            }

            
        });
          
        // getLineStatusData();
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
            url: '/getLineCascadedata',
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
                                $("#Statelb1").removeClass("bg-yellow");
                                $("#Statelb1").addClass("bg-red");

                            }

                            else if (machineState == "Activity Area Running - Point") {
                                document.getElementById('duration1').innerHTML = " Running Since: " + duration;

                                //document.getElementById('Statelbl').Attributes["class"] = "small-box bg-green";
                                $("#Statelb1").removeClass("bg-yellow");
                                $("#Statelb1").addClass("bg-green");
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
                                document.getElementById('duration3').innerText = "Down Since: " + duration;

                                $("#Statelb3").removeClass("bg-yellow");
                                $("#Statelb3").addClass("bg-red");

                                //document.getElementById('Statelb3').Attributes["class"] = "small-box bg-red";

                            }
                            else if (machineState == "Activity Area Running - Point") {
                                document.getElementById('duration3').innerText = "Running Since: " + duration;

                                //document.getElementById('Statelb3').Attributes["class"] = "small-box bg-green";
                                $("#Statelb3").removeClass("bg-yellow");
                                $("#Statelb3").addClass("bg-green");
                            }
                        }

                    });
            }
        });
    }

    catch (error) {
        console.error("in error");
    }

}

function upstreampchart() {
    debugger;

    try {

        $.ajax({
            type: 'GET',
            url: '/upstreampc',
            async: false,
            //async: false,
            success: function (data) {
                debugger;
                var response = data.recordset;



                adap.Fill(response);
                var x = new Array[response.Count];
                var y = new Array[response.Count];

                for (var i = 0; i < response.Count; i++) {
                    x[i] = dtprogress.Rows[i][0].ToString();
                    y[i] = parseInt(response[i][1]);
                }
                //Chart1.Series[0].Points.DataBindXY(x, y);
            }
        });
    }
    catch (error) {
        console.error("in error");
    }

}



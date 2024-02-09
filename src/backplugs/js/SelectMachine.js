$(document).ready(function () {
    getAllMachine();
});

function getAllMachine() {
    debugger;

    $.ajax({
        type: 'GET',
        url: '/getAllMachine',
        async:false,
        success: function (data) {
            debugger;
            if (data != null) {
                var packingData = data.recordset;
               
               // var packingData = res.filter(dd => (String(dd.LineDesc) == ('Line')));
               // if (packingData.length > 0) {
                    var lbl = '<label style="font-weight: bold"> Line: </label><br>';
                    $('#bindmachineid').append(lbl);
                    for (var i = 0; i < packingData.length; i++) {
                        var machine = packingData[i]["WorkcellDesc"];
                       
                        var btn = '<input type="button" value="' + machine + '" id="' + machine + '" onclick="_openMachine(this)" class="col-sm-2 btn btn-primary"  style="margin-right:2%">'
                     
                        $('#bindmachineid').append(btn);
                        // $('#bindmachineid').append(' ');
                    }
               // }
            }
        }
    });
}

function _openMachine(machine) {
    //debugger;
    localStorage.setItem('machine', machine.id);
    if( machine.id=='Process')
    {
        window.location.href = "/ProcessDashboard.html";
    }
    else{
    window.location.href = "/LiveDashboard.html";
    }
}
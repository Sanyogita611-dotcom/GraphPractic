
$(document).ready(function () {
    debugger;
    getData();
    // getTableData();
    
});


function getData() {
    debugger;
  

        debugger;
        $.ajax({
            type: 'GET',
            url: '/getTableData',
           
            success: function (data) {
                //  debugger;
                if (data != "") {
                    var response = data.recordset;
                    if (response.length > 0) {
                        if (response[0]) {
                            // var a[] = response["T1"];
                            // var T2[] = response["T2"];
                            // var T3[] = response["T3"];
                            var length=response.length;
                            var sum=0;
                           
                            for (var i = 0; i < response.length; i++) {
                                var T1 = response[i]["T1"];
                                sum=sum+T1;
                              }
                              var average=sum/length;
                             document.getElementById("T1Average").innerHTML = average.toFixed(2);
                             for (var i = 0; i < response.length; i++) {
                                var T2 = response[i]["T2"];
                                sum=sum+T2;
                              }
                              var average=sum/length;
                             document.getElementById("T2Average").innerHTML = average.toFixed(2);
                             for (var i = 0; i < response.length; i++) {
                                var T3 = response[i]["T3"];
                                sum=sum+T3;
                              }
                              var average=sum/length;
                             document.getElementById("T3Average").innerHTML = average.toFixed(2);
    
                             var min=response[0]["T1"];
                             for (var i = 0; i < response.length; i++) {
                                if(response[i]["T1"]<min) 
                                min=response[i]["T1"];
                              }
                             document.getElementById("T1Minimum").innerHTML = min;
                             var min=response[0]["T2"];
                             for (var i = 0; i < response.length; i++) {
                                if(response[i]["T2"]<min) 
                                min=response[i]["T2"];
                              }
                             document.getElementById("T2Minimum").innerHTML = min;
                             var min=response[0]["T3"];
                             for (var i = 0; i < response.length; i++) {
                                if(response[i]["T3"]<min) 
                                min=response[i]["T3"];
                              }
                             document.getElementById("T3Minimum").innerHTML = min;
                            
                             var max=response[0]["T1"];
                             for (var i = 0; i < response.length; i++) {
                                if(response[i]["T1"]>max) 
                                max=response[i]["T1"];
                              }
                             document.getElementById("T1Maximum").innerHTML = max;
                             var max=response[0]["T2"];
                             for (var i = 0; i < response.length; i++) {
                                if(response[i]["T2"]>max) 
                                max=response[i]["T2"];
                              }
                             document.getElementById("T2Maximum").innerHTML = max;
                             var max=response[0]["T3"];
                             for (var i = 0; i < response.length; i++) {
                                if(response[i]["T3"]>max) 
                                max=response[i]["T3"];
                              }
                             document.getElementById("T3Maximum").innerHTML = max;
    
                             var Addition=0;
    
                             for (var i = 0; i < response.length; i++) {
                                var T1 = response[i]["T1"];
                                Addition=Addition+T1;
                                var T1sum=Addition;
                              }
                              
                             document.getElementById("T1Sum").innerHTML = T1sum;
                             for (var i = 0; i < response.length; i++) {
                                var T2 = response[i]["T2"];
                                sum=sum+T2;
                              }
                             
                             document.getElementById("T2Sum").innerHTML =sum;
                             for (var i = 0; i < response.length; i++) {
                                var T3 = response[i]["T3"];
                                sum=sum+T3;
                              }
                              
                             document.getElementById("T3Sum").innerHTML = sum;
    
    
                             if (response.length > 0) {
                                var T1value = [], time = [],T2value=[],T3value=[];
                               
                               
                                $.each(response, function (i, d) {
            
                                    time[i] = d["DateTime"];
                                   
                                    T1value[i] = d["T1"];
                                    T2value[i] = d["T2"];
                                    T3value[i] = d["T3"];
                                    
                                });
            
                               
                            }
    
                             //for chart
                              
    
                             var ctx = $("#myChart");
    
    
      var data = {
        labels : time,
        datasets : [
          {
            label : "T1",
            data : T1value,
            backgroundColor : "blue",
            borderColor : "lightblue",
            fill : false,
            lineTension : 0,
            pointRadius : 5
          },
          {
            label : "T2",
            data : T2value,
            backgroundColor : "green",
            borderColor : "lightgreen",
            fill : false,
            lineTension : 0,
            pointRadius : 5
          },
                {
            label : "T3",
            data : T3value,
            backgroundColor : "red",
            borderColor : "lightred",
            fill : false,
            lineTension : 0,
            pointRadius : 5
          }
        ]
      };
    
      var options = {
        title : {
          display : true,
          position : "top",
          text : "Line Graph",
          fontSize : 18,
          fontColor : "#111"
        },
        legend : {
          display : true,
          position : "bottom"
        }
      };
    
      var chart = new Chart( ctx, {
        type : "line",
        data : data,
        options : options
      } );
    
    
                        }
                       
                    }
    
    
                }
                $.ajax({
                  type: 'GET',
                  url: '/getData',
                 //async: false,
                  success: function (data) {
                      debugger;
                      
                      if (data != "") {
                          var response = data.recordset;
                          var length = data.recordset.length;
                          var count = data.recordset[0][""];
                          if (length > 0) {
        
                           
                              document.getElementById("prodcountlbl").innerHTML = count;
        
                              }
                           }
                      }
              });  
            }
            
        });

       
}

 


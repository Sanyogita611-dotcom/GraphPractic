function check() {
  debugger;
  var emailId = document.getElementById("email").value;

  var pass = document.getElementById("pass").value;
  if (emailId == "" || emailId == null || pass == "" || pass == null) {

    document.getElementById("Label1").innerHTML = "*Please Enter Email Id & Password";
    return false;
  } else {
    document.getElementById("Label1").innerHTML = "";

    $.ajax({

      type: 'GET',
      url: "/login",
      // dataType: 'json',
      data: { emailId: emailId, pass: pass },
      success: function (result) {
        console.log(result);
        debugger;
        var response = JSON.parse(JSON.stringify(result.recordset));
        if (response.length > 0) {
          $.each(response, function (i, d) {

            var uname = d["Email"];
            // var rolenm = d["RoleId"];

            localStorage.setItem('user_key', JSON.stringify(uname));
            // localStorage.setItem('key2', JSON.stringify(rolenm));
            window.location.href = "/WideTableReport.html";
            //var emprole = JSON.parse(window.localStorage.getItem('key2'));

          });
        }
        else {
          document.getElementById("email").value = "";
          document.getElementById("pass").value = "";
          document.getElementById("Label1").innerHTML = "Invalid UserId Or Password..";
        }
      }

    });
  }
}

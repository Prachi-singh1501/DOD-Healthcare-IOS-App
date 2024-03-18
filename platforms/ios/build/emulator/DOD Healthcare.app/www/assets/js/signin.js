openFB.init({ appId: 'dsd45646456' });
var apiurl = window.Apiurl;
$(document).ready(function () {
   

});

function testbtn() {
    alert('ckrcl');
    openFB.login('https://www.google.com');
}


$('#PatientLogin').on("click", function () {
    var $this = $(this);
    $this.button('loading');
   
    var email = $("#emailaddress").val();
    var pass = $("#password").val();
    $.ajax({
        url: apiurl + "API/Patient/PatientLogin?email=" + email + "&password=" + pass,
        type: "POST",
        success: function (data) {
            console.log(data);
            if (data == "UserNotFound" || data.PatientType == "" || data.PatientType == null)
            {
               
                $this.button('reset');
                Toast.error("Invalid userid and password, please try again.!");
            }
            else {
                var logindetail = { "CorporateId": data.CorporateId, "PatientId": data.PatientId, "PatientType": data.PatientType, "Name": data.FirstName }
                localStorage.setItem("LogIn", JSON.stringify(logindetail));
                var detail = JSON.parse(localStorage.getItem('LogIn'));
                console.log(detail)
                $this.button('reset');
                if (data.PatientType == "Corporate")
                {
                    window.location.href = "CorporateHome.html"
                }
                else {
                    window.location.href = "index.html"
                }
               
            }
           
        },
        error: function (data) {
            console.log(data.responseJSON)
            $this.button('reset');
            Toast.error("Something went wrong, please try again.!");
        }
    });
})

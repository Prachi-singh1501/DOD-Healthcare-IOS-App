var apiurl = window.Apiurl;
$(document).ready(function () {
    var Age = "<option selected value=' '>--Select--</option><option value='0'>New Born</option>";
    for (var i = 1; i < 70; i++) {
        Age += "<option>" + i + "</option>";
    }
   $("#Age").html(Age);
});
$("#w1").click(function () {
  
    var $this = $(this);
    $this.button('loading');
    var MobileNo = $("#MobileNo").val();
    var reg = /^(0|91)?[6-9][0-9]{9}$/;;
    if (MobileNo != "") {
        if (reg.test(MobileNo) == false) {
             $this.button('reset');
            Toast.warning("Please Enter a valid mobile no.!");
            return false;
        }
        else {

            CheckEmailMobile("Individual", MobileNo, $this,"Mobile");
          
        }
    }
    else {
        $this.button('reset');
        Toast.warning("Please Enter mobile no.!");
    }
});
$("#w2").click(function () {
    var $this = $(this);
    $this.button('loading');
   var Entered_Otp = $("#Entered_Otp").val();
   var OTP = $("#MobileOtp").val();
   if (Entered_Otp != "")
   {
       if (Entered_Otp == OTP) {
           $("#otp_verify").hide();
           $("#mobile_verify").hide();
           $("#sign_up").show();
           $this.button('reset');
       }
       else {
           $this.button('reset');
           Toast.error("You have entered wrong otp, please try again.!");
       }
   }
   else {
       $this.button('reset');
       Toast.error("Please enter otp.!");
   }

    
   
});

function CheckEmailMobile(type,obj,btn_Obj,validationFor)
{
    $.ajax({
        url: apiurl + "API/Patient/EmailAndMobileValidation?type=" + type + "&obj=" + obj,
        type: "GET",
        success: function (data) {
            console.log(data);
            if (data == "Success" && validationFor == "Mobile")
            {
                MobileOTP(obj, btn_Obj)
            }
            else if (data == "Success" && validationFor == "Email") {
               
            }
            else {
                if (validationFor == "Mobile")
                {
                    btn_Obj.button('reset');
                    Toast.error("Mobile No. Already Register.!");
                }
                if (validationFor == "Email") {
                    $("#EmailId").val("");
                    Toast.error("EmailId. Already Register.!");
                }
               
            }

        },
        error: function (data) {
            console.log(data.responseJSON)
            btn_Obj.button('reset');
            Toast.error("Something went wrong, please try again.!");
        }
    });
}

function MobileOTP(MobileNo, btn_Obj) {
    $.ajax({
        url: apiurl + "API/Patient/MobileOTP?MobileNo=" + MobileNo,
        type: "GET",
        success: function (data) {
            console.log(data);
            if (data != null && data != "")
            {
                if (data == "Failed") {
                    Toast.error("Something went wrong, please try again.!");
                    btn_Obj.button('reset');
                   
                }
                else {
                  
                        btn_Obj.button('reset');
                        $("#otp_verify").show();

                        $("#mobile_verify").hide();
                        $("#sign_up").hide();
                        $("#MobileOtp").val(data);
                        $("#Entered_Otp").val(data);  // Auto Filling OTP
                        $("#resend_Otp").hide();
                        $("#timer").show();
                        let timerOn = true;
                        function timer(remaining) {


                            var m = Math.floor(remaining / 60);
                            var s = remaining % 60;

                            m = m < 10 ? '0' + m : m;
                            s = s < 10 ? '0' + s : s;
                            document.getElementById('timer').innerHTML = m + ':' + s;
                            remaining -= 1;

                            if (remaining >= 0 && timerOn) {
                                setTimeout(function () {
                                    timer(remaining);
                                }, 1000);
                                return;
                            }

                            if (!timerOn) {
                                // Do validate stuff here
                                return;
                            }

                            // Do timeout stuff here
                            // alert('Timeout for otp');
                           
                           
                            $("#resend_Otp").show();
                            $("#timer").hide();
                        }
                        timer(60);

                }
            }
            else {
                Toast.error("Something went wrong, please try again.!");
            }
          

        },
        error: function (data) {
            console.log(data.responseJSON)
            btn_Obj.button('reset');
            Toast.error("Something went wrong, please try again.!");
        }
    });
}

$("#resend_Otp").click(function () {
    var MobileNo = $("#MobileNo").val();
    MobileOTP(MobileNo, $(this))
})


function EmailValidation(email)
{
    var type = "Individual";
    var ch = $("#settingscheck1").val();
    if (ch == "1") {
        type = "Corporate";
    }
    var Emailid = email.value;
  //  alert(Emailid);
    if (Emailid != "")
    {
        var reg = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      
        if (reg.test(Emailid) == false) {
            $("#EmailId").val("");
            Toast.warning("Please Enter a valid EmailId.!");
            return false;
        }
        else {
            CheckEmailMobile(type, Emailid, Emailid,"Email")
        }
    }
    else {
        $("#EmailId").val("");
        Toast.warning("Please Enter EmailId.!");
    }
   
}
function validationPass() {
    var pass = $("#Password").val();
    var confpass = $("#confirmpassword").val();
    if (pass != "" && confpass != "") {
        if (pass != confpass) {
            $("#confirmpassword").val('');
            Toast.warning("Password and confirm password must be same.!!");
        }
    }
    else {

    }
}

$("#CreateAcount").click(function () {
    var $this = $(this);
    $this.button('loading');
    var status = true;
    var check = $(".checkInput");

    for (var i = 0; i < check.length; i++) {
        var a = $(check[i]).val();
     
        if (a == "" || a == null) {

            status = false;
        }
    }

    if( status==true)
    {
        var type = "Individual";
       var ch= $("#settingscheck1").val();
       if (ch == "1")
       {
           type = "Corporate";
       }
        var CompanyName = $("#CompanyName").val();
        var MobileNo = $("#MobileNo").val();
        var username = $("#username").val();
        var EmailId = $("#EmailId").val();
        var Age = $("#Age").val();
        var Gender = $("#Gender").val();
        var title = $("#Title").val();
        var Password = $("#Password").val();
        $.ajax({
            url: apiurl + "API/Patient/sign_up?username=" + username + "&email=" + EmailId + "&password=" + Password + "&age=" + Age + "&gender=" + Gender + "&mobile=" + MobileNo + "&CompanyName=" + CompanyName + "&type=" + type + "&title=" + title,
            type: "GET",
            success: function (data) {
                console.log(data);
                if (data != null && data != "Failed") {
                    var logindetail = { "CorporateId": data.CorporateId, "PatientId": data.PatientId, "PatientType": data.PatientType, "Name": data.FirstName }
                    localStorage.setItem("LogIn", JSON.stringify(logindetail));
                    var detail = JSON.parse(localStorage.getItem('LogIn'));
                    console.log(detail)
                    $this.button('reset');
                    if (data.PatientType == "Corporate") {
                        window.location.href = "CorporateHome.html"
                    }
                    else {
                        window.location.href = "index.html"
                    }
                }
                else if (data == "Already Register") {
                    Toast.error("Already Register, please try again.!");
                }
                else
                {
                    Toast.error("Something went wrong, please try again.!");
                }


            },
            error: function (data) {
                console.log(data.responseJSON)
                $this.button('reset');
                Toast.error("Something went wrong, please try again.!");
            }
        });
    }
    else {
        $this.button('reset');
        Toast.warning("Please fill all inputs and try again");
    }
})


$("#settingscheck1").change(function () {
    var btn = $(this).val();
    if(btn=="0")
    {
        $("#Company_Name").show();
        $("#CompanyName").addClass("checkInput");
        $("#settingscheck1").val("1");
         $("#EmailId").val("");
    }
    else {
        $("#Company_Name").hide();
        $("#CompanyName").removeClass("checkInput");
        $("#settingscheck1").val("0");
        $("#EmailId").val("");
    }

})

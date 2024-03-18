var apiurl = window.Apiurl;
var detail = JSON.parse(localStorage.getItem('LogIn'));
console.log(detail)
$(document).ready(function () {
    GetPass();
   
});
function GetPass() {
    $.ajax({
        url: apiurl + "API/Patient/CorporateProfile?CorporateId=" + detail.CorporateId,
        type: "GET",
        success: function (data) {
            console.log(data);
            if (data.patient != null) {
               
                
                $("#Password").val(data.patient.Password);
                $("#CurrentPassword").val(data.patient.Password);
               
                
            }

        },
        error: function (data) {
            console.log(data.responseJSON)

            Toast.error("Something went wrong, please try again.!");
        }
    });
    $(".loader-wrap").hide();
}
$("#ValidatePass").click(function ()
    //function ValidatePass() 
{
    var tthis = $(this);
    tthis.button('loading');
  
    var curoldpass = $("#CurrentPassword").val();
    var OldPassword = $("#OldPassword").val();
    var NewPassword = $("#NewPassword").val();
    var confirmpassword = $("#confirmpassword").val();
    if (NewPassword != '' && OldPassword != '' && confirmpassword != '') {
        if (OldPassword != curoldpass) {
            tthis.button('reset');
            Toast.warning('Please Enter Correct Old Password.!!');
            $("#OldPassword").val('');
        } else {
            if (NewPassword != '' && confirmpassword != '') {
                if (NewPassword == confirmpassword) {
                    if (NewPassword != curoldpass) {
                        UpdatePass(OldPassword, NewPassword, tthis);
                        // $("#passform").submit();
                        // alert("submit");
                    }
                    else {
                        tthis.button('reset');
                        Toast.warning('Old Password And New Password  Same Please Try With Other Password.!');
                    }


                } else {
                    tthis.button('reset');
                    Toast.warning('New Password And Confirm Password Must Be Same.!!');
                }

            } else {
                tthis.button('reset');
                Toast.warning('Please Fill All the Fields .!!');
            }

        }

    } else {
        tthis.button('reset');
        Toast.warning('Please Enter Password.!!');
    }


})
function UpdatePass(oldpass, newpass, tthis) {
    $.ajax({
        type: "GET",
        url: apiurl + "API/Patient/CorporateUpdatePassword",
        data: { CorporateId: detail.CorporateId, CurrPass: oldpass, NewPass: newpass },
        success: function (data) {
            tthis.button('reset');
            Toast.info("Password Updated Successfully.!!");
            
             $("#OldPassword").val('');
             $("#NewPassword").val('');
             $("#confirmpassword").val('');
            GetPass()
            //  window.location.reload();

        },
        error: function (data) {
            tthis.button('reset');
            Toast.error("Something went wrong, please try again.!!");
        }
    });
}
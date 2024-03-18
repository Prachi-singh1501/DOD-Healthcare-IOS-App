var apiurl = window.Apiurl;
var detail = JSON.parse(localStorage.getItem('LogIn'));
console.log(detail)
$(document).ready(function () {
    GetState();
    GetProfile();
   
});

function GetProfile() {
    $.ajax({
        url: apiurl + "API/Patient/CorporateProfile?CorporateId=" + detail.CorporateId,
        type: "GET",
        success: function (data) {
            console.log(data);
            if(data.patient!=null)
            {
                var ProfilePic = "assets/img/defaultuser.png";
                if (data.patient.ProfilePic != null) {
                    ProfilePic = data.patient.ProfilePic.replace("~", "https://dev.dodind.com/");
                }
                $(".User_Img").attr('src', ProfilePic);
                $("#Address").val(data.patient.Address);
                $(".Address").text(data.patient.Address);
                var lastname = "";
                if (data.patient.LastName != null)
                {
                    lastname = data.patient.LastName;
                }
                $(".UserName").text(data.patient.FirstName + "" + lastname);
                $("#Age").val(data.patient.Age);
                $("#BloodGroup").val(data.patient.BloodGroup).attr('selected');
                $("#CityId").val(data.patient.CityId);
                $("#Email").val(data.patient.Email);
                $("#FirstName").val(data.patient.FirstName);
                $("#Gender").val(data.patient.Gender).attr('selected');
                $("#LastName").val(data.patient.LastName);
                $("#MaritalStatus").val(data.patient.MaritalStatus).attr('selected');
                $("#MobileNo").val(data.patient.MobileNo);
                $("#Password").val(data.patient.Password);
                $("#PatientId").val(data.patient.PatientId);
                $("#CompanyName").val(data.patient.CompanyName);
                $("#PinCode").val(data.patient.PinCode);
                $("#Title").val(data.patient.Title).attr('selected');
                if (data.patient.CityId != null)
                {
                    $("#StatesList").val(data.StateId.StateId).attr('selected');
                    SelectCity(data.patient.CityId);
                   
                }
               
            }

        },
        error: function (data) {
            console.log(data.responseJSON)

            Toast.error("Something went wrong, please try again.!");
        }
    });
    $(".loader-wrap").hide();
}
function GetState() {
    $.ajax({
        url: apiurl + "API/Patient/GetState",
        type: "GET",
        success: function (data) {
            console.log(data);
            if (data.length>0)
            {
                var state = '<option value="">Choose...</option>';
                for (var i = 0; i < data.length; i++) {
                    state += '<option value="' + data[i].StateId + '">' + data[i].StateName + '</option>';

                }
                $("#StatesList").html(state);
            }

        },
        error: function (data) {
            console.log(data.responseJSON)

            Toast.error("Something went wrong, please try again.!");
        }
    });
  
}

function GetCity() {
    var stateId = $("#StatesList").val();
    $.ajax({
        url: apiurl + "API/Patient/GetCities?StateId=" + stateId,
        type: "GET",
        success: function (data) {
            console.log(data);
            if (data.length > 0) {
                var state = '<option value="">Choose...</option>';
                for (var i = 0; i < data.length; i++) {
                    state += '<option value="' + data[i].CityId + '">' + data[i].CityName + '</option>';

                }
                $("#CityList").html(state);
            }

        },
        error: function (data) {
            console.log(data.responseJSON)

            Toast.error("Something went wrong, please try again.!");
        }
    });
}
function SelectCity(id) {
    var stateId = $("#StatesList").val();
    $.ajax({
        url: apiurl + "API/Patient/GetCities?StateId=" + stateId,
        type: "GET",
        success: function (data) {
            console.log(data);
            if (data.length > 0) {
                var state = '<option value="">Choose...</option>';
                for (var i = 0; i < data.length; i++) {
                    state += '<option value="' + data[i].CityId + '">' + data[i].CityName + '</option>';

                }
                $("#CityList").html(state);
            }
            $("#CityList").val(id).attr('selected');
        },
        error: function (data) {
            console.log(data.responseJSON)

            Toast.error("Something went wrong, please try again.!");
        }
    });
}

function UpdateProfile() {
    var status = true;
    var check = $(".Profilecheck");

    for (var i = 0; i < check.length; i++) {
        var a = $(check[i]).val();
       // alert(a)
        if (a == "" || a == null) {
          
            status = false;
        }
    }
    if (status == true) {
       
        var profile = $("#ProfileForm").serialize();
        console.log(profile)
        $.post(apiurl + "API/Patient/CorporateProfile?CorporateId=" + detail.CorporateId, profile, function (data) {
            console.log(data)

            if (data == "Success") {
                Toast.info("Profile Updated Successfully.!");
            }
            else {
                Toast.error("Something went wrong, please try again.!");
            }

        }).fail(function (response) {
            console.log(response)
            Toast.error("Something went wrong, please try again.!");
        });
    }
    else {
        Toast.warning("Please fill all inputs and try again");
    }
}
$("#edit_pic").click(function () {
    $("#fileinput").trigger('click');
});

var loadFile = function (event) {
    var image = document.getElementById("profile_pic");
    image.src = URL.createObjectURL(event.target.files[0]);
    var formData = new FormData();
    formData.append('file', $('#fileinput')[0].files[0]);
    formData.append('CorporateId', detail.CorporateId);
    $.ajax({
        processData: false,
        contentType: false,
        url: "https://dev.dodind.com/Corporate/ProfilePicUpdateMobile",
        type: "POST",
        data: formData,
        datatype: "json",
        success: function (data) {
            console.log(data)
            if (data == "Success") {
                GetProfile();
                Toast.warning('Profile Picture Updated.!!');
            }
            else {
                Toast.error("Something went wrong, please try again.!!");
            }
        }
       ,
        error: function (data) {
            console.log(data)
            Toast.error("Something went wrong, please try again.!!");
        }
    });
};
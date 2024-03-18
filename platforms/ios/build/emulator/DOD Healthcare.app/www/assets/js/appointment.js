var apiurl = window.Apiurl;
var detail = JSON.parse(localStorage.getItem('LogIn'));
console.log(detail)
$(document).ready(function () {
    $("#PatientId").val(detail.PatientId)
    GetDetails();
});
function GetDetails() {
    $.ajax({
        url: apiurl + "API/Patient/SelfPatientAppointment?PatientId=" + detail.PatientId,
        type: "GET",
        success: function (data) {
            console.log(data);
            if (data != null) {
                var Deplist = ' <option selected value="">Choose..</option>'
                if (data.Departmentlist.length > 0) {
                    for (var i = 0; i < data.Departmentlist.length; i++) {
                       
                        Deplist += '<option value="' + data.Departmentlist[i].DepId + '">' + data.Departmentlist[i].Name + '</option>'
                    }
                }
                $("#Deplist").html(Deplist);


                var doctorlist = ' <option selected value="">Choose..</option>'
                if (data.doctorlist.length > 0) {
                    for (var i = 0; i < data.doctorlist.length; i++) {
                        var lastname = "";
                        if (data.doctorlist[i].LastName != null) {
                            lastname = data.doctorlist[i].LastName
                        }
                        doctorlist += '<option value="' + data.doctorlist[i].DoctorId + '">' + data.doctorlist[i].FirstName + ' ' + lastname + '</option>'
                    }
                }
                $("#doctorlist1").html(doctorlist);
                // Health issue name
                var healthissuename = ' <option selected value="">Choose..</option>'
                if (data.allhealthissuename.length > 0) {
                    for (var i = 0; i < data.allhealthissuename.length; i++) {
                        healthissuename += '<option>' + data.allhealthissuename[i].Complaint_Name + ' </option>'
                    }
                }
                $("#HealthIssues").html(healthissuename);
            }
        },
        error: function (data) {
            console.log(data.responseJSON)
            Toast.error("Something went wrong, please try again.!");
        }
    });
}
function GetDoctor(id)
{
    Reset()
    var DepId = id.value;
    $.ajax({
        url: apiurl + "API/Patient/GetDoctor?DepId=" + DepId,
        type: "GET",
        success: function (data) {
            console.log(data);
            var doctorlist = ' <option selected value="">Choose..</option>'
            if (data != "NoDataFound") {
              
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        var lastname = "";
                        if (data[i].LastName != null) {
                            lastname = data[i].LastName
                        }
                        doctorlist += '<option value="' + data[i].DoctorId + '">' + data[i].FirstName + ' ' + lastname + '</option>'
                    }
                
                }
               
              
            }
            else {
                doctorlist = ' <option selected value="">No Doctor Found</option>'
            }
            $("#doctorlist").html(doctorlist);
        },
        error: function (data) {
            console.log(data.responseJSON)
            Toast.error("Something went wrong, please try again.!");
        }
    });
}
function GetLocation() {
    $("#AppTime").val('');
    var doctorId = $("#doctorlist").val();
    $.ajax({
        url: apiurl + "API/Patient/GetLocationHistory?DoctorId=" + doctorId,
        type: "GET",
        success: function (data) {
            console.log(data);
            if (data != null) {
                var location = ' <option selected value="">Choose...</option>'
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        location += '<option value="' + data[i].Id + '">' + data[i].Name + '</option>'
                    }
                }
                else {
                    location = ' <option selected value="">No Location Found</option>';
                }
                $("#locationlist").html(location);
            }
            else {
            }
        },
        error: function (data) {
            console.log(data.responseJSON)
            Toast.error("Something went wrong, please try again.!");
        }
    });
    GetAvailability();
}
$("#doctorlist").change(function () {
    $("#AppTime").val('')
    $("#locationlist").val('');
    GetLocation()
})
$("#locationlist").change(function () {
    $("#AppTime").val('');
    GetAvailability();
})
function GetAvailability() {
    $("#AppTime").val('')
    var doctorId = $("#doctorlist").val();
    var LocationId = $("#locationlist").val();
    var AppDate = $("#AppointmentDate").val();
    var da = new Date(AppDate);
    var day = da.getDay();
    if (doctorId != "" && LocationId != "" && AppDate != "") {
        $.ajax({
            url: apiurl + "API/Patient/DoctorCheckAvailability?DoctorId=" + doctorId + "&LocationId=" + LocationId + "&AppDate=" + AppDate + "&day=" + day,
            type: "GET",
            success: function (data) {
                console.log(data);
                if (data != "Error") {
                    AvailableSlots = ""
                    if (data.flst.length > 0) {
                        for (var i = 0; i < data.flst.length; i++) {
                            AvailableSlots += "<span class='spstyle'>" + data.flst[i] + "</span>";
                        }
                    }
                    if (data.slst.length > 0) {
                        for (var i = 0; i < data.slst.length; i++) {
                            AvailableSlots += "<span class='spstyle'>" + data.slst[i] + "</span>";
                        }
                    }
                    if (AvailableSlots == "") {
                        AvailableSlots = 'No Doctor Availabilty'
                    }
                    $("#AvailableSlots").html(AvailableSlots);
                    fetchConsultationType()
                }
                else {
                    $("#AvailableSlots").html('No Doctor Availabilty');
                }
            },
            error: function (data) {
                console.log(data.responseJSON)
                $("#AvailableSlots").html('No Doctor Availabilty');
                Toast.error("Something went wrong, please try again.!");
            }
        });
    }
    else {
        $("#AvailableSlots").html('');
    }
}
$(document).on("click", ".spstyle", function () {
    var time = $(this).text();
    $("#AppTime").val(time)
})
function GetFees() {
    var LocationId = $("#locationlist").val();
    var Consult_Type = $('#Consultation').val();
    $.ajax({
        url: apiurl + "API/Patient/GetLocationFees",
        data: { LocationId: LocationId },
        type: "Get",
        success: function (data) {
            if (data != "") {
                if (Consult_Type == "Follow up Consultation") {
                    $(".Consult_Type").val('Follow up Consultation');
                    $('#Fees').val(data.follwupconsult);
                }
                else if (Consult_Type == "First Consultation") {
                    $(".Consult_Type").val('First Consultation');
                    $('#Fees').val(data.firstconsult);
                }
                else {
                    $(".Consult_Type").val('Follow up Free');
                    $('#Fees').val('0');
                }
            }
        }, error: function (err) {
            swal('Opps!', 'Something Went Wrong .!!', 'error');
        }
    })
}
function fetchConsultationType() {
    var DoctorId = $("#doctorlist").val();
    var LocationId = $("#locationlist").val();
    var AppDate = $("#AppointmentDate").val();
    var PatientId = detail.PatientId;
    $.ajax({
        url: apiurl + "API/Patient/GetConsultationType",
        data: { DoctorId: DoctorId, AppDate: AppDate, LocationId: LocationId, PatientId: PatientId },
        type: "Get",
        success: function (data) {
            if (data != "") {
                if (data == "FollowUpConsultation") {
                    $("#Consultation").val('Follow up Consultation').attr('selected');
                    GetFees();
                } else if (data == "FirstConsultation") {
                    $("#Consultation").val('First Consultation').attr('selected');
                    GetFees();
                } else if (data == "FreeConsultation") {
                    $("#Consultation").val('Follow up Free').attr('selected');
                    GetFees();
                }
            }
            else {
            }
        }, error: function (err) {
            alert(err)
            swal('Opps!', 'Something Went Wrong .!!', 'error');
        }
    })
}
$(document).on("click", ".addbtn", function () {
    var HealthIssues = $(this).parent().parent().find('#HealthIssues').val();
    var Duration = $(this).parent().parent().find('#Duration').val();
    if (HealthIssues != "" && Duration != "") {
        var check = $("#health_Issues").html();
        if (check.includes(HealthIssues)) {
        }
        else {
            var health = '<tr><td><input hidden class="HealthIssuesid" value="' + HealthIssues + '"/>' + HealthIssues + '</td><td><input class="Duration" hidden value="' + Duration + '"/>' + Duration + ' Days</td><td><i class="bi bi-trash text-danger removeissuess"></i></td></tr>';
            $("#health_Issues").append(health);
            var healthIssues = $(this).parent().parent().find('.HealthIssuesid');
          //  alert(healthIssues.length)
            var health_ = "";
            for (var i = 0; i < healthIssues.length; i++) {
                var a = $(healthIssues[i]).val();
                if (a != "" || a != null) {
                    if (i == 0)
                    {
                        health_ +=  a
                    }
                    else {
                        health_ += ',' + a
                    }
                  
                }
            }

            $("#_healthissues").val(health_)
        }
    }
    //var a = $(this).parent().parent().html();
    //$(this).parent().after(a)
    //$(this).hide();
})
$(document).on("click", ".removeissuess", function () {
    $(this).parent().parent().remove();
    var healthIssues = $('.HealthIssuesid');
   
    var health_ = "";
    if (healthIssues.length > 0)
    {
        for (var i = 0; i < healthIssues.length; i++) {
            var a = $(healthIssues[i]).val();
            if (a != "" || a != null) {
                if (i == 0) {
                    health_ += a
                }
                else {
                    health_ += ',' + a
                }

            }
        }
    }
    else {
        health_ = "choose...";
    }
   

    $("#_healthissues").val(health_)
})
function AppAdd() {
    var status = true;
    var check = $(".appcheck");
    for (var i = 0; i < check.length; i++) {
        var a = $(check[i]).val();
        if (a == "" || a == null) {
            status = false;
        }
    }
    var healthissue = [];
    dt = {};
    var HealthIssues = $(".HealthIssuesid");
    for (var i = 0; i < HealthIssues.length; i++) {
        var a = $(HealthIssues[i]).val();
        if (a != "" && a != null) {
            healthissue.push({ "name": a, "duration": "" });
        }
    }
    var durations = [];
    var duration = $(".Duration");
    for (var i = 0; i < duration.length; i++) {
        var a = $(duration[i]).val();
        if (a != "" && a != null) {
            durations.push({ "name": "", "duration": a + " Days"});
        }
    }
    if (HealthIssues.length <= 0) {
        status = false;
    }
    if (status == true) {
        var Consultation = $("#Consultation").val();
        console.log(healthissue)
        console.log(durations)
        var appointment = $("#appform").serialize();
        console.log(appointment)
        $.post(apiurl + "API/Patient/SelfPatientAppointment?Consultation=" + Consultation + "&HealthIssueName=" + JSON.stringify(healthissue) + "&NoOfDays=" + JSON.stringify(durations), appointment, function (data) {
            console.log(data)
            if (data == "Success") {
                Reset()
                Toast.info("Appointment Booked Successfully.!");
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

function Reset()
{
    $("#locationlist").html('<option selected value="">Choose...</option>');
    $("#doctorlist").html('<option selected value="">Choose...</option>');
    $("#AvailableSlots").html('');
    $("#AppTime").val('');
    $("#Fees").val('');
    
}
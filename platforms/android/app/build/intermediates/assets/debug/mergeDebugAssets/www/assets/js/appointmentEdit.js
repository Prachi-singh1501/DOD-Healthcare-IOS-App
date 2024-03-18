var apiurl = window.Apiurl;
var detail = JSON.parse(localStorage.getItem('LogIn'));
console.log(detail)
$(document).ready(function () {
    $("#PatientId").val(detail.PatientId)
    // GetDetails1();
    GetApp()
});

function getdate(date) {

    var dt = new Date(date);
    let day = dt.getDate();
    let month = dt.getMonth();
    let year = dt.getFullYear();
    return year + "-" + (month + 1) + "-" + day;
}


function GetApp() {
    var appId = $("#AppId").val();
    $.ajax({
        url: apiurl + "API/Patient/SelfPatientAppointmentEdit?AppId=" + appId,
        type: "GET",
        success: function (data) {
            console.log(data);
            if (data != null) {
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
                $("#doctorlist").html(doctorlist);


                // Health issue name
                var healthissuename = ' <option selected value="">Choose..</option>'
                if (data.allhealthissuename.length > 0) {
                    for (var i = 0; i < data.allhealthissuename.length; i++) {

                        healthissuename += '<option>' + data.allhealthissuename[i].Complaint_Name + ' </option>'
                    }
                }
                $("#HealthIssues").html(healthissuename);
            }
            if (data.appointment != null) {
                $("#doctorlist").val(data.appointment.DoctorId).attr('selected');
                $("#locationlist").val(data.appointment.Doctor_LocationId).attr('selected');
                GetLocationonLoad(data.appointment.Doctor_LocationId)
                $("#AppTime").val(data.appointment.App_Time);
                $("#Consultation").val(data.appointment.Consult_Type).attr('selected');
                $("#Fees").val(data.appointment.Fees);
                $("#Mode").val(data.appointment.Mode).attr('selected');

                var dt = new Date(data.appointment.App_Date);
                let day = dt.getDate();
                let month = dt.getMonth();
                let year = dt.getFullYear();
                var dateee = year + "-" + (month + 1) + "-" + day;
                // alert(dateee)
                $("#AppointmentDate").val(dateee);
                $("#AppointmentDate").attr('type', 'date');

                if (data.appointment.healthIssues.length > 0) {
                    var health = '';
                    for (var i = 0; i < data.appointment.healthIssues.length; i++) {
                        health += '<tr><td><input hidden class="HealthIssuesid" value="' + data.appointment.healthIssues[i].HealthIssue_Name + '"/>' + data.appointment.healthIssues[i].HealthIssue_Name + '</td><td><input class="Duration" hidden value="' + data.appointment.healthIssues[i].No_Of_Days + '"/>' + data.appointment.healthIssues[i].No_Of_Days + '</td><td><i class="bi bi-trash text-danger removeissuess"></i></td></tr>';

                    }
                    $("#health_Issues").html(health);
                }
            }

        },
        error: function (data) {
            console.log(data.responseJSON)

            Toast.error("Something went wrong, please try again.!");
        }
    });

}

function GetDetails() {
    $.ajax({
        url: apiurl + "API/Patient/SelfPatientAppointment?PatientId=" + detail.PatientId,
        type: "GET",
        success: function (data) {
            console.log(data);
            if (data != null) {
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
                $("#doctorlist").html(doctorlist);


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
function GetLocationonLoad(id) {
    //  alert(id)
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

                $("#locationlist").val(id).attr('selected');

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
    // alert(AppDate);
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
            var health = '<tr><td><input hidden class="HealthIssuesid" value="' + HealthIssues + '"/>' + HealthIssues + '</td><td><input class="Duration" hidden value="' + Duration + '"/>' + Duration + 'Days</td><td><i class="bi bi-trash text-danger removeissuess"></i></td></tr>';
            $("#health_Issues").append(health);
        }

    }

    //var a = $(this).parent().parent().html();
    //$(this).parent().after(a)
    //$(this).hide();
})

$(document).on("click", ".removeissuess", function () {

    $(this).parent().parent().remove();

})

function UpdateApp() {
    var status = true;
    var check = $(".appcheck1");

    for (var i = 0; i < check.length; i++) {
        var a = $(check[i]).val();

        if (a == "" || a == null) {

            status = false;
        }
    }
    if (status == true) {
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

                durations.push({ "name": "", "duration": a + " Days" });
            }
        }
        var Consultation = $("#Consultation").val();
        console.log(healthissue)
        console.log(durations)
        var appointment = $("#appEditform").serialize();
        console.log(appointment)
        $.post(apiurl + "API/Patient/SelfPatientAppointmentEdit?Consultation=" + Consultation + "&HealthIssueName=" + JSON.stringify(healthissue) + "&NoOfDays=" + JSON.stringify(durations), appointment, function (data) {
            console.log(data)

            if (data == "Success") {
                Toast.info("Appointment Updated Successfully.!");
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
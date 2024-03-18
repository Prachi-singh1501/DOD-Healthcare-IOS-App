var apiurl = window.Apiurl;
var detail = JSON.parse(localStorage.getItem('LogIn'));
console.log(detail)
$(document).ready(function () {
    if (detail == null || detail == "") {
        window.location.href = "landing.html"
    }
   
    GetDetails();
});
function logout() {
    window.location.href = "landing.html"
}
function DownloadPDF() {
    downloadurl = "https://dev.dodind.com/";
    downloadurl = "http://localhost:56779/";
    $.ajax({
        url: downloadurl + "Patient/Generate_Prescription_Mobile?id=76cae3e6",
        type: "GET",
        success: function (data) {
            console.log(data);
            alert(data);

        },
        error: function (data) {
            console.log(data)

            Toast.error("Something went wrong, please try again.!");
        }
    });

}

function getdate(date) {

    var dt = new Date(date);
    let day = dt.getDate();
    let month = dt.getMonth();
    let year = dt.getFullYear();
    return day + "/" + (month + 1) + "/" + year;
}
function GetDetails() {
    $.ajax({
        url: apiurl + "API/Patient/IndividualDashboard?PatientId=" + detail.PatientId,
        type: "GET",
        success: function (data) {
            console.log(data);
            if (data != null && data != "No Data Available")
            {
                if (data.pendingPayment != null)
                {
                    $(".pending_payment").html("₹" + data.pendingPayment);
                }
                else {
                    $(".pending_payment").html("₹" + 0);
                }
              
                
                    $(".total_test").text(0);
               
               
                var activepack = "";
                if (data.ActiveSubscription.length > 0)
                {
                    for (var i = 0; i < data.ActiveSubscription.length; i++) {
                        var dt = getdate(data.ActiveSubscription[i].date)
                        activepack += '<div class="swiper-slide" > <div class="row mb-2"> <div class="col-12 col-md-6 col-lg-4"> <a href="#" class="card shadow-sm mb-3 product text-normal"> <div class="card-body"> <div class="row"> <div class="col-auto"> <figure class="text-center mb-0 avatar avatar-40 page-bg rounded p-1"> <img src="assets/img/health-insurance.png" alt=""> </figure> </div><div class="col align-self-center"> <p>' + data.ActiveSubscription[i].package.PackageName + '<br><small class="text-opac">' + dt + '</small></p></div><div class="col-auto align-self-center"> <span class="badge bg-success badges_padding">' + data.ActiveSubscription[i].status + '</span> </div></div></div></a> </div></div></div>';
                    }
                }
                else
                {
                    activepack = "<div class='text-center mx-auto'><h6>No Data Found</h6></div>";
                }
              

                
                $("#ActivePack").html(activepack);

                // Test Report

                var testreport = "";
                if (data.testReport.length > 0) {
                    for (var i = 0; i < data.testReport.length; i++) {
                        var link = "assets/img/defaultuser.png";
                        if (data.testReport[i].TestReporName != null) {
                            link = data.testReport[i].TestReporName.replace("~", "https://dev.dodind.com/");
                        }
                        var dt = getdate(data.testReport[i].CreateDate)
                        testreport += '<div class="swiper-slide"> <div class="row mb-2"> <div class="col-12 col-md-6 col-lg-3"> <div class="form-floating"> <input type="text" readonly class="form-control is-valid" id="couponcode" placeholder="Coupon Code" value="'+dt+'"> <label for="couponcode">' + data.testReport[i].Membership.Package.PackageName + '</label> <button type="button" class="btn btn-link text-success tooltip-btn "><a href="'+link+'"> <i class="bi bi-cloud-arrow-down-fill"></i></a> </button> </div></div></div></div>';
                    }
                }
                else {
                    testreport = "<div class='text-center'><h6>No Data Found</h6></div>";
                }



                $("#testreport").html(testreport);



                if (data.patient != null)
                {
                    var LastName = "";
                    if (data.patient.LastName != null)
                    {
                        LastName = data.patient.LastName;
                    }
                    $(".username").text(data.patient.FirstName + " " + LastName);
                    
                    $(".address").text(data.patient.Address);
                    
                    var ProfilePic = "assets/img/defaultuser.png";
                    if (data.patient.ProfilePic != null) {
                        ProfilePic = data.patient.ProfilePic.replace("~", "https://dev.dodind.com/");
                    }
                  $(".profileImage").attr('src', ProfilePic);
                }
                var UpcomingAppointmentList = "";

                if (data.FutureAppointmetList.length > 0)
                {
                   
                    for (var i = 0; i < data.FutureAppointmetList.length; i++) {
                        var lastname = "";
                        if (data.FutureAppointmetList[i].Doctor.LastName != null) {
                            lastname = data.FutureAppointmetList[i].Doctor.LastName;
                        }
                        var ProfilePic = "assets/img/defaultuser.png";
                        if (data.FutureAppointmetList[i].Doctor.ProfilePic != null && data.FutureAppointmetList[i].Doctor.ProfilePic != "") {
                            ProfilePic = data.FutureAppointmetList[i].Doctor.ProfilePic("~", "https://dev.dodind.com/");
                        }
                      
                        var apptype = '';
                        var apptypehref = 'javascript:void(0)';
                        switch (data.FutureAppointmetList[i].Mode)
                        {
                            case  "VideoConsultation":
                                apptype = '<i class="bi bi-camera-video" style="font-size: 22px;"></i>';
                                apptypehref = '/video_chat/' + data.FutureAppointmetList[i].App_ID + '/' + data.FutureAppointmetList[i].Doctor.DoctorId + '/' + data.FutureAppointmetList[i].Mode + '/' + detail.PatientId + '/' + data.FutureAppointmetList[i].Doctor.FirstName + '/';
                                break;
                            case "AudioConsultation":
                                apptype = '<i class="bi bi-volume-up" style="font-size: 22px;"></i>';
                                apptypehref = '/video_chat/' + data.FutureAppointmetList[i].App_ID + '/' + data.FutureAppointmetList[i].Doctor.DoctorId + '/' + data.FutureAppointmetList[i].Mode + '/' + detail.PatientId + '/' + data.FutureAppointmetList[i].Doctor.FirstName + '/';
                                break;
                            case "InPerson":
                                apptype = '<i class="bi bi-person" style="font-size: 22px;"></i>';
                               
                        }
                        UpcomingAppointmentList += '<div class="col-12 col-md-6 col-lg-3"> <div class="card shadow-sm mb-3"> <div class="card-body"> <div class="row"> <div class="col-auto"> <figure class="text-center mb-0 avatar avatar-90  page-bg rounded"> <img src="' + ProfilePic + '" alt=""> </figure> </div><div class="col ps-0"> <p class="small d-block mb-2"> <span class="text-opac">Upcoming</span> <span class="float-end"><span class="text-opac">' + data.FutureAppointmetList[i].App_Date + '</span> <i class="bi bi-clock"></i></span> </p><div class="row align-items-center"> <div class="col"> <h6> In Person Appointment booked with the Doctor </h6> </div><div class="col-auto badges_side"><a href="' + apptypehref + '" style="text-decoration: none;"><span class="badge badge-warning badge_icon">' + data.FutureAppointmetList[i].App_Time + ' &nbsp;&nbsp;' + apptype + '</span> </a> </div></div><div class="mb-1"> ' + data.FutureAppointmetList[i].Doctor.FirstName + ' ' + lastname + '</div></div></div></div></div></div>';
                    }
                }
                else {
                    UpcomingAppointmentList = '<div class="col-12 col-md-6 col-lg-3"> <div class="card shadow-sm mb-3"> <div class="card-body"> <div class="row text-center"> <h6></br> No Data Found </br></br></h6> </div></div></div></div>';
                }
                $(".upcomingAppointment").html(UpcomingAppointmentList);


            }

        },
        error: function (data) {
            console.log(data.responseJSON)
           
            Toast.error("Something went wrong, please try again.!");
        }
    });
    $(".loader-wrap").hide();
}

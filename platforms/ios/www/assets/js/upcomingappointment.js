
var apiurl = window.Apiurl;
openFB.init({ appId: 'dsd45646456' });

var detail = JSON.parse(localStorage.getItem('LogIn'));
console.log(detail)
$(document).ready(function () {
   
    GetDetails();
});

function GetDetails() {
    $.ajax({
        url: apiurl + "API/Patient/IndividualAppointmentList?PatientId=" + detail.PatientId,
        type: "GET",
        success: function (data) {
            console.log(data);
            if (data != null) {

                var PastAppointmentList = "";
                if (data.PastAppointmentList.length > 0) {

                    for (var i = 0; i < data.PastAppointmentList.length; i++) {
                        var lastname = "";
                        if (data.PastAppointmentList[i].Doctor.LastName != null) {
                            lastname = data.PastAppointmentList[i].Doctor.LastName;
                        }
                        var ProfilePic = "assets/img/defaultuser.png";
                        if (data.PastAppointmentList[i].Doctor.ProfilePic != null && data.PastAppointmentList[i].Doctor.ProfilePic != "") {
                            ProfilePic = data.PastAppointmentList[i].Doctor.ProfilePic("~", "https://dev.dodind.com/");
                        }
                        var status = "";
                        switch (data.PastAppointmentList[i].Status) {

                            case "AwaitingPayment":
                                status = '<span class="badge bg-purple">Pending Payment</span>';
                                break;

                            case "Cancel":
                                status = ' <span class="badge bg-danger">Cancel</span>'
                                break;

                            case "Closed":
                                status = '<span class="badge bg-success">Closed</span>'
                                break;

                            case "Pending":
                                status = '<span class="badge bg-warning">Pending</span>'
                                break;
                            default:
                                status = '<span class="badge text-dark">-</span>';
                                break;
                        }

                        var btn = "";
                        switch (data.PastAppointmentList[i].Status) {

                            case "AwaitingPayment":
                                btn = '<li><a class="dropdown-item CancelApp" id="' + data.PastAppointmentList[i].App_ID + '" title="Cancel" ><i class="bi bi-x-circle"></i>&nbsp;Cancel Appointment</a></li>';
                                break;

                            case "Cancel":
                                // btn = '<li><a class="dropdown-item" href="#">Payment</a></li><li><a class="dropdown-item" href="#">Edit</a></li><li><a class="dropdown-item" href="#">Cancel Appointment</a></li><li><a class="dropdown-item" href="#">Details</a></li>';
                                break;

                            case "Closed":
                                btn = '<li><a class="dropdown-item PaymentInvoice"  id="' + data.PastAppointmentList[i].App_ID + '"><i class="bi bi-credit-card"></i>&nbsp;Payment Invoice</a></li><li><a class="dropdown-item ViewPrescription" id="' + data.PastAppointmentList[i].App_ID + '"><i class="bi bi-file-pdf"></i>&nbsp;View Prescription</a></li><li><a class="dropdown-item DownloadPrescription" id="' + data.PastAppointmentList[i].App_ID + '"><i class="bi bi-download"></i>&nbsp;Download Prescription</a></li><li><a class="dropdown-item" href="/appointmentDetail/' + data.PastAppointmentList[i].App_ID + ' /"><i class="bi bi-info-circle"></i>&nbsp;Details</a></li>';
                                break;

                            case "Pending":
                                btn = '<li><a class="dropdown-item" href="/appointmentEdit/' + data.PastAppointmentList[i].App_ID + '/"><i class="bi bi-credit-card"></i>&nbsp;Edit</a></li><li><a class="dropdown-item CancelApp" id="' + data.PastAppointmentList[i].App_ID + '" title="Cancel" ><i class="bi bi-credit-card"></i>&nbsp;Cancel Appointment</a></li><li><a class="dropdown-item" href="#"><i class="bi bi-credit-card"></i>&nbsp;Video Consultation</a></li>';
                                break;

                        }
                        PastAppointmentList += '<div class="col-12 col-md-6 col-lg-3"> <div class="card shadow-sm mb-3"> <div class="card-body"> <div class="row"> <div class="col-auto"> <figure class="text-center mb-0 avatar avatar-90  page-bg rounded"> <img src="' + ProfilePic + '" alt=""> </figure> </div><div class="col ps-0"> <p class="small d-block mb-2"> <span class="text-opac">' + status + '</span> <span class="float-end"><span class="text-opac">' + data.PastAppointmentList[i].App_Date + '</span> <i class="bi bi-clock"></i></span> </p><div class="row"> <div class="col"> <h6> In Person Appointment booked with the Doctor </h6></div><div class="col-auto"><button class="btn dropdown-toggle" type="button" id="dropdownMenuButton' + i + '" data-bs-toggle="dropdown" aria-expanded="false"> <i class="bi bi-three-dots-vertical"></i> </button><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton' + i + '" style="">' + btn + '</ul> </div></div><div class="mb-1"> ' + data.PastAppointmentList[i].Doctor.FirstName + ' ' + lastname + '</div></div></div></div></div></div>';
                    }

                }
                else {
                    PastAppointmentList = "<div class='text-center'></br></br></br></br></br></br></br></br><h5>No Data Found</h5></div>"
                }
                $(".Past").html(PastAppointmentList);


                var UpcomingAppointmentList = "";
                if (data.FutureAppointmetList.length > 0) {

                    for (var i = 0; i < data.FutureAppointmetList.length; i++) {
                        var lastname = "";
                        if (data.FutureAppointmetList[i].Doctor.LastName != null) {
                            lastname = data.FutureAppointmetList[i].Doctor.LastName;
                        }
                        var status = "";
                        switch (data.FutureAppointmetList[i].Status) {

                            case "AwaitingPayment":
                                status = '<span class="badge bg-purple">Pending Payment</span>';
                                break;

                            case "Cancel":
                                status = ' <span class="badge bg-danger">Cancel</span>'
                                break;

                            case "Closed":
                                status = '<span class="badge bg-success">Closed</span>'
                                break;

                            case "Pending":
                                status = '<span class="badge bg-warning">Pending</span>'
                                break;
                            default:
                                status = '<span class="badge text-dark">-</span>';
                                break;
                        }

                        var btn = "";
                        switch (data.FutureAppointmetList[i].Status) {

                            case "AwaitingPayment":
                                btn = '<li><a class="dropdown-item MakeAppPayment" id="' + data.FutureAppointmetList[i].App_ID + '" title="' + data.FutureAppointmetList[i].Fees + '"><i class="bi bi-credit-card"></i>&nbsp;Payment</a></li><li><a class="dropdown-item" href="/appointmentEdit/' + data.FutureAppointmetList[i].App_ID + '/"><i class="bi bi-pencil"></i>&nbsp;Edit</a></li><li><a class="dropdown-item CancelApp" id="' + data.FutureAppointmetList[i].App_ID + '" title="Cancel" ><i class="bi bi-x-circle"></i>&nbsp;Cancel Appointment</a></li><li><a class="dropdown-item" href="/appointmentDetail/' + data.FutureAppointmetList[i].App_ID + ' /"><i class="bi bi-card-list"></i>&nbsp;Details</a></li>';
                                break;

                            case "Cancel":
                                // btn = '<li><a class="dropdown-item" href="#">Payment</a></li><li><a class="dropdown-item" href="#">Edit</a></li><li><a class="dropdown-item" href="#">Cancel Appointment</a></li><li><a class="dropdown-item" href="#">Details</a></li>';
                                break;

                            case "Closed":
                                //btn = '<li><a class="dropdown-item Payment Invoice" href="#"><i class="bi bi-credit-card"></i>&nbsp;Payment Invoice</a></li><li><a class="dropdown-item ViewPrescription" id="' + data.FutureAppointmetList[i].App_ID + '">View Prescription</a></li><li><a class="dropdown-item" href="/appointmentDetail/' + data.FutureAppointmetList[i].App_ID + ' /">Details</a></li>';

                                btn = '<li><a class="dropdown-item PaymentInvoice"  id="' + data.FutureAppointmetList[i].App_ID + '"><i class="bi bi-credit-card"></i>&nbsp;Payment Invoice</a></li><li><a class="dropdown-item ViewPrescription" id="' + data.FutureAppointmetList[i].App_ID + '"><i class="bi bi-file-pdf"></i>&nbsp;View Prescription</a></li><li><a class="dropdown-item DownloadPrescription" id="' + data.FutureAppointmetList[i].App_ID + '"><i class="bi bi-download"></i>&nbsp;Download Prescription</a></li><li><a class="dropdown-item" href="/appointmentDetail/' + data.FutureAppointmetList[i].App_ID + ' /"><i class="bi bi-info-circle"></i>&nbsp;Details</a></li>';


                                break;

                            case "Pending":
                                btn = '<li><a class="dropdown-item" href="/appointmentEdit/' + data.FutureAppointmetList[i].App_ID + '/">Edit</a></li><li><a class="dropdown-item CancelApp" id="' + data.FutureAppointmetList[i].App_ID + '" title="Cancel" >Cancel Appointment</a></li><li><a class="dropdown-item" href="#">Video Consultation</a></li>';
                                break;

                        }

                        var ProfilePic = "assets/img/defaultuser.png";
                        if (data.FutureAppointmetList[i].Doctor.ProfilePic != null && data.FutureAppointmetList[i].Doctor.ProfilePic != "") {
                            ProfilePic = data.FutureAppointmetList[i].Doctor.ProfilePic("~", "https://dev.dodind.com/");
                        }
                        UpcomingAppointmentList += '<div class="col-12 col-md-6 col-lg-3"> <div class="card shadow-sm mb-3"> <div class="card-body"> <div class="row"> <div class="col-auto"> <figure class="text-center mb-0 avatar avatar-90  page-bg rounded"> <img src="' + ProfilePic + '" alt=""> </figure> </div><div class="col ps-0"> <p class="small d-block mb-2"> <span class="text-opac">' + status + '</span> <span class="float-end"><span class="text-opac">' + data.FutureAppointmetList[i].App_Date + '</span> <i class="bi bi-clock"></i></span> </p><div class="row"> <div class="col"> <h6> In Person Appointment booked with the Doctor </h6> </div><div class="col-auto"><button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1' + i + '" data-bs-toggle="dropdown" aria-expanded="false"> <i class="bi bi-three-dots-vertical"></i> </button><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1' + i + '" style="">' + btn + '</ul> </div></div><div class="mb-1"> ' + data.FutureAppointmetList[i].Doctor.FirstName + ' ' + lastname + '</div></div></div></div></div></div>';
                    }
                }
                else {
                    UpcomingAppointmentList = "<div class='text-center'></br></br></br></br></br></br></br></br><h5>No Data Found</h5></div>"
                }
                $(".Upcoming").html(UpcomingAppointmentList);
                // $(".loader-wrap").hide();
            }
            
            TriggerButtonClicks();
        },
        error: function (data) {
            console.log(data.responseJSON)
            // $(".loader-wrap").hide();

            Toast.error("Something went wrong, please try again.!");
        }
    });
}
function TriggerButtonClicks() {
    $('.CancelApp').click(function () {
        var answer = window.confirm("Are you sure you want to Cancel Appointment?");
        if (answer == true) {
            var AppId = $(this).attr("id");
            var status = $(this).attr("title");
            $.ajax({
                url: apiurl + "API/Patient/AppointmentStatus?PatientId=" + detail.PatientId + "&Status=" + status + "&AppId=" + AppId,
                type: "GET",
                success: function (data) {
                    console.log(data);

                    if (data == "Success") {
                        Toast.info("Appointment status updated Successfully.!");
                        GetDetails();
                    }
                    else {
                        Toast.info("Unable to update status, please try again.!");
                    }

                },
                error: function (data) {
                    console.log(data.responseJSON)

                    Toast.error("Something went wrong, please try again.!");
                }
            });
        }

    });
    $('.MakeAppPayment').click(function () {
        var appid = $(this).attr("id");
        var Amount = $(this).attr("title");
        // alert(Amount)
        var url = ('https://dev.dodind.com/AppPayment/CreateOrder?userid=' + detail.PatientId + '&paymentFor=Appointment&packageid=&UserType=Patient&Amount=' + Amount + '&AppId=' + appid);
        openFB.login(url);
        //window.open(url, '_self', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
    });
    $('.DownloadPrescription').click(function () {
        var appid = $(this).attr("id");
        //alert(appid);
        downloadurl = "https://dev.dodind.com/";
        //downloadurl = "http://localhost:56779/";
        $.ajax({
            url: downloadurl + "Patient/Generate_Prescription_Mobile?id=" + appid,
            type: "GET",
            success: function (data) {
                console.log(data);
                if (data.includes('Success')) {
                    var getfile = data.slice(data.indexOf('-') + 1); //data.split('-')[1];
                    getfile = getfile.replace("~", "http://dev.dodind.com/");
                    //alert(getfile);
                    //var blob = dataURItoBlob(getfile);
                    //download(getfile, blob, blob.type);


                    DownloadFile(getfile)
                }
                else {
                    Toast.error("Something went wrong, please try again.!");
                }

            },
            error: function (data) {
                console.log(data)

                Toast.error("Something went wrong, please try again.!");
            }
        });
    });
    $('.ViewPrescription').click(function () {
        var appid = $(this).attr("id");
        var url = ('https://dev.dodind.com/Patient/PrescriptionInvoice_ForMobile?Appid=' + appid);
        openFB.login(url);
    });

    $('.PaymentInvoice').click(function () {
        var appid = $(this).attr("id");
        var url = ('https://dev.dodind.com/Patient/PaymentInvoice_ForMobile?MembershipId=&AppId=' + appid);
        openFB.login(url);
    });

}


function download(filename, data, mimeType) {
    var blob = new Blob([data], {
        type: mimeType
    });
    if (window.cordova && cordova.platformId !== "browser") {
        document.addEventListener("deviceready", function () {
            var storageLocation = "";

            switch (device.platform) {
                case "Android":
                    storageLocation = "///storage/emulated/0/DCIM";
                    break;

                case "iOS":
                    storageLocation = cordova.file.documentsDirectory;
                    break;
            }

            var folderPath = storageLocation;

            window.resolveLocalFileSystemURL(
                folderPath,
                function (dir) {
                    dir.getFile(
                        filename,
                        {
                            create: true
                        },
                        function (file) {
                            file.createWriter(
                                function (fileWriter) {
                                    fileWriter.write(blob);

                                    fileWriter.onwriteend = function () {
                                        var url = file.toURL();
                                        cordova.plugins.fileOpener2.open(url, mimeType, {
                                            error: function error(err) {
                                                console.error(err);
                                                alert("Unable to download");
                                            },
                                            success: function success() {
                                                console.log("success with opening the file");
                                            }
                                        });
                                    };

                                    fileWriter.onerror = function (err) {
                                        alert("Unable to download");
                                        console.error(err);
                                    };
                                },
                                function (err) {
                                    // failed
                                    alert("Unable to download");
                                    console.error(err);
                                }
                            );
                        },
                        function (err) {
                            alert("Unable to download");
                            console.error(err);
                        }
                    );
                },
                function (err) {
                    alert("Unable to download");
                    console.error(err);
                }
            );
        });
    } else {
        saveAs(blob, filename);
    }
}

function DownloadFile(pdfurl) {
    Toast.info("Please wait while we download the file");
    //alert("Downloadpdf -" + pdfurl)
    var guid = GenerateGuid();
    console.log();

    var fileTransfer = new FileTransfer();
    var uri = encodeURI(pdfurl);
    var fileURL = "///storage/emulated/0/DCIM";
    // fileURL = cordova.file.externalApplicationStorageDirectory + 'PCBTQuiz.pdf';
    fileURL = "file:///storage/emulated/0/Download/PrescriptionInvoice-" + guid.substring(0, 8) + ".pdf"
    var newpath = `${cordova.file.externalDataDirectory}`;
    //fileURL = newpath + "PrescriptionInvoice-" + guid.substring(0, 8) + ".pdf";
    fileTransfer.download(
        uri, fileURL, function (entry) {
            //alert("download complete: " + entry.toURL());
            Toast.info("Download Complete, Please check your download folder");
        },

        function (error) {
            Toast.error("Something went wrong, please try again later");
           // alert("download error source " + error.source);
           // alert("download error target " + error.target);
            //alert("download error code" + error.code);
        },

        false, {
        headers: {
            "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
        }
    }
    );

};


function GenerateGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}




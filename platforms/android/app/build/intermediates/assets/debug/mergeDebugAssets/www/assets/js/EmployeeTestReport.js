var apiurl = window.Apiurl;
var detail = JSON.parse(localStorage.getItem('LogIn'));
console.log(detail)
$(document).ready(function () {
    GetReport();
});
function getdate(date) {

    var dt = new Date(date);
    let day = dt.getDate();
    let month = dt.getMonth();
    let year = dt.getFullYear();
    return day + "/" + (month + 1) + "/" + year;
}
function GetReport() {
    var patientId = $("#PatientId").val();
    $.ajax({
        url: apiurl + "API/Patient/IndividualTestReport?PatientId=" + patientId,
        type: "GET",
        success: function (data) {
            console.log(data);
            if (data != null && data != "No Data Available") {

                // Test Report

                var testreport = "";
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        var link = "";
                        if (data[i].TestReporName != null) {
                            link = data[i].TestReporName.replace("~", "https://dev.dodind.com/");
                        }

                        var dt = getdate(data[i].CreateDate)
                        testreport += '<div class="row mb-2"> <div class="col-12 col-md-6 col-lg-3"> <div class="form-floating mb-3"> <input type="text" class="form-control is-valid" id="couponcode" readonly  value="' + dt + '"> <label for="couponcode">' + data[i].package.PackageName + '</label> <button type="button" class="btn btn-link text-success tooltip-btn valid-tooltip" data-bs-toggle="tooltip" data-bs-placement="left" title="" data-bs-original-title="Email is valid"><a href="' + link + '"> <i class="bi bi-cloud-arrow-down-fill"></i></a> </button> </div></div></div>';
                    }
                }
                else {
                    testreport = "<div class='text-center'></br></br></br></br></br></br></br></br><h5>No Data Found</h5></div>";
                }



                $("#Test_Report").html(testreport);


            }

        },
        error: function (data) {
            console.log(data.responseJSON)

            Toast.error("Something went wrong, please try again.!");
        }
    });
    $(".loader-wrap").hide();
}

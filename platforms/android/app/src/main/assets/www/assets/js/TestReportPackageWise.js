var apiurl = window.Apiurl;
var detail = JSON.parse(localStorage.getItem('LogIn'));
console.log(detail)
$(document).ready(function () {
   
    GetEmp();
});
function getdate(date) {

    var dt = new Date(date);
    let day = dt.getDate();
    let month = dt.getMonth();
    let year = dt.getFullYear();
    return day + "-" + (month + 1) + "-" + year;
}
function GetEmp() {
    var MembershipId = $("#MembershipId").val();
    $.ajax({
        url: apiurl + "API/Patient/TestReportListPackageWise?MembershipId=" + MembershipId,
        type: "GET",
        success: function (data) {
            console.log(data);
            var employee = '';
            if (data != "NoPackages") {

                if (data.DiagnosticName != null && data.DiagnosticName != "")
                {
                    employee += '<div class="col-12 col-md-6 col-lg-3"> <div class="card shadow-sm mb-3"> <div class="card-body"> <div class="row text-center"><h6>Diagnostic Name:' + data.DiagnosticName + '</h6> </div></div></div></div>';
                }
                for (var i = 0; i < data.EmployeeReportList.length; i++) {
                    var link = "javascript:void(0)";
                    if (data.EmployeeReportList[i].test != null) {
                        link = data.EmployeeReportList[i].test.replace("~", "https://dev.dodind.com/");
                    }
                    var dt = getdate(data.EmployeeReportList[i].CreateDate)
                    employee += '<div class="col-12 col-md-6 col-lg-3"> <div class="card shadow-sm mb-3"> <div class="card-body"> <div class="row"> <div class="row"> <div class="col"> <h6> Employee Code: </h6> </div><div class="col-auto"> ' + data.EmployeeReportList[i].Patient.PatientCode + ' </div><div class="row"> <div class="col"> <h6> Name: </h6> </div><div class="col-auto"> ' + data.EmployeeReportList[i].Patient.FirstName + ' </div><div class="col-auto"> </div></div><div class="row"> <div class="col"> <h6> Gender: </h6> </div><div class="col-auto"> ' + data.EmployeeReportList[i].Patient.Gender + ' </div><div class="col-auto"> </div></div><div class="row"> <div class="col"> <h6> Marital Status: </h6> </div><div class="col-auto"> ' + data.EmployeeReportList[i].Patient.MaritalStatus + ' </div><div class="col-auto"> <a href="'+link+'" type="button" class="btn btn-link text-success tooltip-btn "><i class="bi bi-cloud-arrow-down-fill"></i></a> </div></div><div class="row"> <div class="col"> <h6> Blood Group: </h6> </div><div class="col-auto"> ' + data.EmployeeReportList[i].Patient.BloodGroup + ' </div><div class="col-auto"> </div></div><div class="row"> <div class="col"> <h6> Create Date: </h6> </div><div class="col-auto"> ' + dt + ' </div><div class="col-auto"> </div></div></div></div></div></div>';
                }

            }
            else {
                employee = "<div class='text-center'></br></br></br></br></br></br></br></br><h5>No Data Found</h5></div>";
            }
            $("#Employee_List1").html(employee);
        },
        error: function (data) {
            console.log(data.responseJSON)

            Toast.error("Something went wrong, please try again.!");
        }
    });
}
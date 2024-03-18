var apiurl = window.Apiurl;
var detail = JSON.parse(localStorage.getItem('LogIn'));
console.log(detail)
$(document).ready(function () {
   
    GetDetails();
});
function getdate(date) {

    var dt = new Date(date);
    let day = dt.getDate();
    let month = dt.getMonth();
    let year = dt.getFullYear();
    return day + "-" + (month + 1) + "-" + year;
}
function GetDetails() {
    $.ajax({
        url: apiurl + "API/Patient/EmployeeList?CorporateId=" + detail.CorporateId ,
        type: "GET",
        success: function (data) {
            console.log(data);
            var employee = '';
            if (data.length > 0) {


                for (var i = 0; i < data.length; i++) {
                  
                    employee += '<div class="col-12 col-md-6 col-lg-3"> <div class="card shadow-sm mb-3"> <div class="card-body"> <div class="row"> <div class="row"> <div class="col"> <h6> Employee Code: </h6> </div><div class="col-auto"> ' + data[i].PatientCode + ' </div><div class="row"> <div class="col"> <h6> Name: </h6> </div><div class="col-auto"> ' + data[i].FirstName + ' </div><div class="col-auto"> </div></div><div class="row"> <div class="col"> <h6> Email: </h6> </div><div class="col-auto"> ' + data[i].Email + ' </div><div class="col-auto"> </div></div><div class="row"> <div class="col"> <h6> Mobile: </h6> </div><div class="col-auto"> ' + data[i].MobileNo + ' </div><div class="col-auto"> <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton' + i + '" data-bs-toggle="dropdown" aria-expanded="false"> <i class="bi bi-three-dots-vertical"></i> </button><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton' + i + '" style=""><li><a href="/EmployeeTestReport/' + data[i].PatientId + '/" class="dropdown-item "><i class="bi bi-printer"></i> &nbsp;Report</a></li></ul> </div></div><div class="row"> <div class="col"> <h6> Age: </h6> </div><div class="col-auto"> ' + data[i].Age + ' </div><div class="col-auto"> </div></div><div class="row"> <div class="col"> <h6> Blood Group: </h6> </div><div class="col-auto"> ' + data[i].BloodGroup + ' </div><div class="col-auto"> </div></div></div></div></div></div>';
                }

            }
            else {
                employee = "<div class='text-center'></br></br></br></br></br></br></br></br><h5>No Data Found</h5></div>";
            }
            $("#Employee_List").html(employee);
        },
        error: function (data) {
            console.log(data.responseJSON)

            Toast.error("Something went wrong, please try again.!");
        }
    });
}
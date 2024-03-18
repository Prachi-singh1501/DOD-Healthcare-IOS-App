var apiurl = window.Apiurl;
var detail = JSON.parse(localStorage.getItem('LogIn'));
console.log(detail)
$(document).ready(function () {
    //$(".nav-link").removeClass('active');
    //$("#upcomingappointment").addClass('active');
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
        url: apiurl + "API/Patient/PaymentListOfPatient?CorporateId=" + detail.CorporateId + "&LoginType=Corporate&PatientId=",
        type: "GET",
        success: function (data) {
            console.log(data);
            var payments = '';
            if(data.length>0)
            {
               
              
                for (var i = 0; i < data.length; i++) {
                    var dt = getdate(data[i].PayDate)
                    var payfor = '';
                    
                        payfor = "Package: " + data[i].package.PackageName;
                   
                    var status='';
                    switch (data[i].Status)
                    {

                        case "Paid":
                            status = '<span class="badge bg-success badges_padding">Paid</span>';
                            break;

                        case "Unpaid":
                            status = '<span class="badge bg-danger badges_padding">Cancel</span>';
                            break;


                        default:
                            status = '<span class="badge text-dark badges_padding">-</span>';
                            break;
                    }
                    var btn = '';
                    if (data[i].MembershipId == null)
                    {
                        btn = '<li><a class="dropdown-item PaymentInvoice" id="'+data[i].App_Id+'"><i class="bi bi-printer"></i> &nbsp;Payment Invoice</a></li>';
                    }
                    else if (data[i].App_Id == null)
                    {
                        btn = '<li><a class="dropdown-item PaymentInvoice" id="' + data[i].MembershipId + '"><i class="bi bi-printer"></i> &nbsp;Payment Invoice</a></li>';
                    }
                    else {
                        btn = '<li><a class="dropdown-item CancelApp"><i class="bi bi-printer"></i> &nbsp;No Invoice</a></li>';
                    }
                    payments += '<div class="col-12 col-md-6 col-lg-3"> <div class="card shadow-sm mb-3"> <div class="card-body"> <div class="row"> <div class="row"> <div class="col"> <h6> PayId: </h6> </div><div class="col-auto"> ' + data[i].PaymentCode + ' </div><div class="col-auto"> </div></div><div class="row"> <div class="col"> <h6> PayDate: </h6> </div><div class="col-auto"> ' + dt + ' </div><div class="col-auto"> </div></div><div class="row"> <div class="col"> <h6> PayMode: </h6> </div><div class="col-auto"> ' + data[i].PayMode + ' </div><div class="col-auto"> <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton' + i + '" data-bs-toggle="dropdown" aria-expanded="false"> <i class="bi bi-three-dots-vertical"></i> </button><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton' + i + '" style="">' + btn + '</ul> </div></div><div class="row"> <div class="col"> <h6> Pay For: </h6> </div><div class="col-auto"> ' + payfor + ' </div><div class="col-auto"> </div></div><div class="row"> <div class="col"> <h6> Amount: </h6> </div><div class="col-auto"> ₹' + data[i].Amount + ' </div><div class="col-auto"> </div></div><div class="row"> <div class="col"> <h6> Status: </h6> </div><div class="col-auto"> ' + status + ' </div><div class="col-auto"> </div></div></div></div></div></div>';
                }
             
            }
            else {
                payments = "<div class='text-center'></br></br></br></br></br></br></br></br><h5>No Data Found</h5></div>";
            }
            $("#Payment_List").html(payments);
        },
        error: function (data) {
            console.log(data.responseJSON)

            Toast.error("Something went wrong, please try again.!");
        }
    });
}

$(document).unbind().on("click", ".PaymentInvoice", function () {
    // alert();
    var membershipId = $(this).attr("id");
   
    var url = ('https://dev.dodind.com/AppPayment/CreateOrder?userid=' + detail.CorporateId + '&paymentFor=Package&packageid=' + PackageId + '&UserType=Patient&Amount=' + Amount + '&AppId=');
    //openFB.login(url);
    //window.open(url, '_self', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
    openFB.login(url);
});
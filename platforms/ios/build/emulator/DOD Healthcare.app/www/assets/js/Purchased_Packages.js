var apiurl = window.Apiurl;
var detail = JSON.parse(localStorage.getItem('LogIn'));
console.log(detail)
$(document).ready(function () {
   
    GetPackage();
});
function getdate(date) {

    var dt = new Date(date);
    let day = dt.getDate();
    let month = dt.getMonth();
    let year = dt.getFullYear();
    return day + "-" + (month + 1) + "-" + year;
}
function GetPackage() {
    $.ajax({
        url: apiurl + "API/Patient/CorporatePurchasedPackages?CorporateId=" + detail.CorporateId,
        type: "GET",
        success: function (data) {
         
            console.log(data);
            var packages = '';
            if (data.length > 0) {


                for (var i = 0; i < data.length; i++) {
                    
                    var dt = getdate(data[i].CreateDate);
                    var status = "";
                    var li = '';
                    switch (data[i].Status)
                    {

                        case "Pending":
                            status='<span class="badge bg-primary">Pending </span>';
                            break;

                        case "Rejected":
                            status = '<span class="badge bg-danger">Rejected </span>';
                            break;

                        case "Accepted":
                            status = '<span class="badge bg-success">Accepted </span>';

                            break;

                        case "Assigned":
                            status = '<span class="badge bg-warning">Assigned </span>';

                            break;
                        case "SampleCollected":
                            status = '<span class="badge bg-info">Sample Collected </span>';

                            break;
                        case "Closed":
                            status = '<span class="bg-dark text-white">Closed</span>';
                            li = '<li><a href="/TestReportPackageWise/' + data[i].MembershipId + '/" class="dropdown-item "><i class="bi bi-printer"></i> &nbsp;Test Report</a></li>';
                            break;
                        
                            }
                    packages += '<div class="col-12 col-md-6 col-lg-3"> <div class="card shadow-sm mb-3"> <div class="card-body"> <div class="row"> <div class="row"> <div class="col"> <h6> Package Name: </h6> </div><div class="col-auto"> ' + data[i].Package.PackageName + ' </div><div class="row"> <div class="col"> <h6> Package Amount: </h6> </div><div class="col-auto"> ' + data[i].Package.Amount + ' </div><div class="col-auto"> <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton' + i + '" data-bs-toggle="dropdown" aria-expanded="false"> <i class="bi bi-three-dots-vertical"></i> </button><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton' + i + '" style=""><li><a href="javascript:void(0)" class="dropdown-item PaymentInvoice" id="' + data[i].MembershipId + '"><i class="bi bi-printer"></i> &nbsp;Payment Invoice</a></li>' + li + '</ul> </div></div><div class="row"> <div class="col"> <h6> Purchase Date: </h6> </div><div class="col-auto"> ' + dt + ' </div><div class="col-auto"> </div></div><div class="row"> <div class="col"> <h6> Status: </h6> </div><div class="col-auto"> ' + status + ' </div></div></div></div></div></div></div>';
                }

            }
            else {
                packages = "<div class='text-center'></br></br></br></br></br></br></br></br><h5>No Data Found</h5></div>";
            }
            $("#Purchased_Packages").html(packages);
        },
        error: function (data) {
          
            console.log(data)

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
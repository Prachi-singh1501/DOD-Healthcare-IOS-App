var apiurl = window.Apiurl;
openFB.init({ appId: 'dsd45646456' });

var detail = JSON.parse(localStorage.getItem('LogIn'));
console.log(detail)
$(document).ready(function () {
   
    getservice();
});



function getservice()
{
    var id = $("#PackageId").val();
    var Amount = $("#Amount").val();
    var PackageType = $("#PackageType").val();
    var PackageName = $("#PackageName").val();
    $.ajax({
        url: apiurl + "API/Patient/BindService?PackageId=" + id,
        type: "GET",
        success: function (responce) {
            var services = '';
            services += '<div class="col-12 col-md-6 col-lg-6"><div class="card shadow-sm product mb-4"><div class="card-body"><div class="row"> <div class="col"><a href="#" class="text-normal text-color-theme"> <h3 class="mb-1">' + PackageName + '</h3> </a>';
            services += '<p class="mb-1"><h3 class="product_price">₹&nbsp;' + Amount + '</h3>  </p>'
            console.log(responce);
            if (responce.length > 0) {
                for (var x = 0; x < responce.length; x++) {
                   
                    if (responce[x].Status == "Yes") {
                        headname = ''
                        if (responce[x].HeadName != "") {
                            headname = '<h6 class="text-color-theme mt-2 mb-2">' + responce[x].HeadName + '</h6>'
                        }
                        services += '' + headname + ' <p class="mb-1"><i class="bi bi-arrow-up-right-circle text-color-theme"></i> &nbsp;' + responce[x].ServiceName + '</p>';
                    }
                    else {
                        headname = ''
                        if (responce[x].HeadName != "") {
                            headname = '<h6 class="text-color-theme mt-2 mb-2">' + responce[x].HeadName + '</h6>'
                        }
                        services+= '' + headname + ' <p class="mb-1"><i class="bi bi-arrow-up-right-circle text-danger"></i> &nbsp;' + responce[x].ServiceName + ' </p>';
                    }
                }
            }
            services += '<div class="text-end d-grid mt-4"><div id="ribbon-container"><a href="#" id="ribbon">' + PackageType + '</a></div><button class="btn btn-default shadow detail_btn MakePackagePayment"> Buy Now</button> </div></div></div></div></div></div>';
            $("#packagedetail").html(services);
        },
        error: function (responce) {
            console.log(responce.responseJSON)

            Toast.error("Something went wrong, please try again.!");
        }
    });
  
}
$(document).unbind().on("click", ".MakePackagePayment", function () {
    var PackageId = $("#PackageId").val();
    var Amount = $("#Amount").val();
    // alert(Amount)
    var url = ('https://dev.dodind.com/AppPayment/CreateOrder?userid=' + detail.PatientId + '&paymentFor=Package&packageid=' + PackageId + '&UserType=Patient&Amount=' + Amount + '&AppId=');
    //openFB.login(url);
    //window.open(url, '_self', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
    openFB.login(url);
});
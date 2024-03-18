var apiurl = window.Apiurl;
var detail = JSON.parse(localStorage.getItem('LogIn'));
console.log(detail)
$(document).ready(function () {
   
    GetPackage();
});

function GetPackage() {
    $.ajax({
        url: apiurl + "API/Patient/IndividualHealthcarePacakge",
        type: "GET",
        success: function (data) {
            console.log(data);
            var packages = "";
            if(data.length>0)
            {
               
                for (var i = 0; i < data.length; i++) {
                    //var services = getservice(data[i].PackageId)
                  
                  
                    packages += '<div class="col-6 col-md-4 col-lg-3"> <div class="card shadow-sm product mb-4"> <div class="card-body"> <div class="row"> <div class="col"><div class="ribbon_section"><div id="ribbon-container"><a href="#" id="ribbon">' + data[i].PackageType + '</a></div><p class="mb-2 product_price"> ₹&nbsp;' + data[i].Amount + ' <small class="text-opac"></small> </p></div> <a href="#" class="text-normal text-color-theme"> <h6 class="mb-1">' + data[i].PackageName + '</h6> </a> <p class="mb-1 count">' + data[i].Count + ' Test Category included <small class="text-opac"></small> </p><div class="text-end d-grid mt-4"><a class="btn btn-default shadow" href="/package_detail/' + data[i].PackageId + '/' + data[i].PackageName + '/' + data[i].Amount + '/' + data[i].PackageType + '/"> Detail</a> </div></div></div></div></div></div>';
                    
                   // console.log(services)
                   
                }
              //  console.log(packages)
               
            }
            else {
                packages = "<div class='text-center'></br></br></br></br></br></br></br></br><h5>No Data Found</h5></div>";
            }
            $("#packagedata").html(packages)


        },
        error: function (data) {
            console.log(data.responseJSON)

            Toast.error("Something went wrong, please try again.!");
        }
    });
}

function getservice(id)
{
    alert(id);
   
    $.ajax({
        url: apiurl + "API/Patient/BindService?PackageId=" + id,
        type: "GET",
        success: function (responce) {
            var services = '';
            console.log(responce);
            if (responce.length > 0) {
                for (var x = 0; x < responce.length; x++) {
                    if (responce[x].Status == "Yes") {
                        headname = ''
                        if (headname != "") {
                            headname = '<h6 class="text-color-theme mt-2 mb-2">' + responce[x].HeadName + '</h6>'
                        }
                        services+= '' + headname + ' <p class="mb-1"><i class="bi bi-arrow-up-right-circle text-color-theme"></i> &nbsp;ECG </p>';
                    }
                    else {
                        headname = ''
                        if (headname != "") {
                            headname = '<h6 class="text-color-theme mt-2 mb-2">' + responce[x].HeadName + '</h6>'
                        }
                        services+= '' + headname + ' <p class="mb-1"><i class="bi bi-arrow-up-right-circle text-danger"></i> &nbsp;' + responce[x].ServiceName + ' </p>';
                    }
                }
            }
           console.log(services)
            return services;
        },
        error: function (responce) {
            console.log(responce.responseJSON)

            Toast.error("Something went wrong, please try again.!");
        }
    });
  
}

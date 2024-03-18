var apiurl = window.Apiurl;
var detail = JSON.parse(localStorage.getItem('LogIn'));
console.log(detail)
$(document).ready(function () {
   
    GetPackage();
});

function GetPackage() {
    $.ajax({
        url: apiurl + "API/Patient/CorporatePackage?CorporateId=" + detail.CorporateId,
        type: "GET",
        success: function (data) {
            console.log(data);
            if (data != null) {
                var packages = "";
                var AllPackage = data.AllPackage;
                if (AllPackage.length > 0) {

                    for (var i = 0; i < AllPackage.length; i++) {
                       
                        packages += '<div class="col-6 col-md-4 col-lg-3"> <div class="card shadow-sm product mb-4"> <div class="card-body"> <div class="row"> <div class="col"><div class="ribbon_section"><div id="ribbon-container"><a href="#" id="ribbon">' + AllPackage[i].PackageType + '</a></div><p class="mb-2 product_price"> ₹&nbsp;' + AllPackage[i].Amount + ' <small class="text-opac"></small> </p></div> <a href="#" class="text-normal text-color-theme"> <h6 class="mb-1">' + AllPackage[i].PackageName + '</h6> </a> <p class="mb-1 count">' + AllPackage[i].Count + ' Test Category included <small class="text-opac"></small> </p><div class="text-end d-grid mt-4"><a class="btn btn-default shadow" href="/corporate_package_detail/' + AllPackage[i].PackageId + '/' + AllPackage[i].PackageName + '/' + AllPackage[i].Amount + '/' + AllPackage[i].PackageType + '/"> Detail</a> </div></div></div></div></div></div>';

                        // console.log(services)

                    }
                    //  console.log(packages)

                }
                else {
                    packages = "<div class='text-center'></br></br></br></br></br></br></br></br><h5>No Data Found</h5></div>";
                }
                $(".package_data").html(packages)

                // Custom Package
                var packages_custom = "";
                var Custom_packages = data.Custom_packages;
                if (Custom_packages.length > 0) {

                    for (var i = 0; i < Custom_packages.length; i++) {

                        packages_custom += '<div class="col-6 col-md-4 col-lg-3"> <div class="card shadow-sm product mb-4"> <div class="card-body"> <div class="row"> <div class="col"><div class="ribbon_section"><div id="ribbon-container"><a href="#" id="ribbon">' + Custom_packages[i].PackageType + '</a></div><p class="mb-2 product_price"> ₹&nbsp;' + Custom_packages[i].Amount + ' <small class="text-opac"></small> </p></div> <a href="#" class="text-normal text-color-theme"> <h6 class="mb-1">' + Custom_packages[i].PackageName + '</h6> </a> <p class="mb-1 count">' + Custom_packages[i].Count + ' Test Category included <small class="text-opac"></small> </p><div class="text-end d-grid mt-4"><a class="btn btn-default shadow" href="/custom_package_detail/' + Custom_packages[i].PackageId + '/' + Custom_packages[i].PackageName + '/' + Custom_packages[i].Amount + '/' + Custom_packages[i].PackageType + '/' + Custom_packages[i].PackageStatus + '/"> Detail</a> </div></div></div></div></div></div>';

                        // console.log(services)

                    }
                    //  console.log(packages)

                }
                else {
                    packages_custom = "<div class='text-center'></br></br></br></br></br></br></br></br><h5>No Data Found</h5></div>";
                }
                $(".packages_custom").html(packages_custom)
            }
           
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

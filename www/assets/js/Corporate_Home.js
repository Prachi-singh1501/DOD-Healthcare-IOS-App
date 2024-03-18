var apiurl = window.Apiurl;
var detail = JSON.parse(localStorage.getItem('LogIn'));
console.log(detail)
$(document).ready(function () {
    if (detail == null || detail == "") {
        window.location.href = "landing.html"
    }
    //$(".nav-link").removeClass('active');
    //$("#homePage").addClass('active');
    GetDetails();
});
function logout() {
    window.location.href = "landing.html"
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
        url: apiurl + "API/Patient/CorporateDashboard?CorporateId=" + detail.CorporateId,
        type: "GET",
        success: function (data) {
            console.log(data);
            if (data != null && data != "")
            {
                if (data.totaltest != null)
                {
                    $(".totaltest").text(data.totaltest);
                }
                if (data.TotalPayment != null) {
                    $(".Payment").text("₹ "+data.TotalPayment);
                }
                if (data.totalemp != null) {
                    $(".totalemp").text(data.totalemp);
                }
                if (data.packagecount != null) {
                    $(".packagecount").text(data.packagecount);
                }
                var activepack = "";
                if (data.ActiveSubscription.length > 0) {
                    for (var i = 0; i < data.ActiveSubscription.length; i++) {
                        var dt = getdate(data.ActiveSubscription[i].date)
                        activepack += '<div class="swiper-slide" > <div class="row mb-2"> <div class="col-12 col-md-6 col-lg-4"> <a href="#" class="card shadow-sm mb-3 product text-normal"> <div class="card-body"> <div class="row"> <div class="col-auto"> <figure class="text-center mb-0 avatar avatar-40 page-bg rounded p-1"> <img src="assets/img/health-insurance.png" alt=""> </figure> </div><div class="col align-self-center"> <p>' + data.ActiveSubscription[i].package.PackageName + '<br><small class="text-opac">' + dt + '</small></p></div><div class="col-auto align-self-center"> <span class="badge bg-success badges_padding">' + data.ActiveSubscription[i].status + '</span> </div></div></div></a> </div></div></div>';
                    }
                }
                else {
                    activepack = "<div class='text-center'><h6>No Data Found</h6></div>";
                }



                $("#ActivePack").html(activepack);
                if (data.corporate != null) {
                    var LastName = "";
                    if (data.corporate.LastName != null) {
                        LastName = data.corporate.LastName;
                    }
                    $(".User_Name").text(data.corporate.FirstName + " " + LastName);

                    $(".User_Address").text(data.corporate.Address);

                    var ProfilePic = "assets/img/defaultuser.png";
                    if (data.corporate.ProfilePic != null) {
                        ProfilePic = data.corporate.ProfilePic.replace("~", "https://dev.dodind.com/");
                    }
                    $(".User_Img").attr('src', ProfilePic);
                }
            }
            else {

            }

        },
        error: function (data) {
            console.log(data.responseJSON)

            Toast.error("Something went wrong, please try again.!");
        }
    });
    $(".loader-wrap").hide();
}

var apiurl = window.Apiurl;
var detail = JSON.parse(localStorage.getItem('LogIn'));
console.log(detail)
$(document).ready(function () {
   
    GetServiceHead();
});
function getdate(date) {

    var dt = new Date(date);
    let day = dt.getDate();
    let month = dt.getMonth();
    let year = dt.getFullYear();
    return day + "-" + (month + 1) + "-" + year;
}
function GetServiceHead() {
    $.ajax({
        url: apiurl + "API/Patient/GetServiceHead",
        type: "GET",
        success: function (data) {
            console.log(data);
            var services = '<option value="">Select </option>';
            if (data != "NoServicehead")
            {
                for (var i = 0; i < data.length; i++) {
                    services += '<option value="' + data[i].ServiceHeadId + '">' + data[i].ServiceHeadName + '</option>'
                }
               
            }
            else {
                services = '<option value="">No Data Found </option>';
            }
            $("#ServiceHead").html(services);
        },
        error: function (data) {
            console.log(data.responseJSON)

            Toast.error("Something went wrong, please try again.!");
        }
    });
}
function GetService(id) {
    $.ajax({
        url: apiurl + "API/Patient/GetService?id=" + id.value,
        type: "GET",
        success: function (data) {
            console.log(data);
            var services = '  ';
            if (data != "NoServicehead") {
                for (var i = 0; i < data.length; i++) {
                    services += '<input type="checkbox" name="' + data[i].ServiceName + '" class="SerId form-check-input" value="' + data[i].ServiceId + '"/>&nbsp;&nbsp;&nbsp;' + data[i].ServiceName + "</br>";
                }

            }
            else {
                services = '<option value="">No Services Found</option>';
            }
            $("#Service").html(services);
        },
        error: function (data) {
            console.log(data.responseJSON)

            Toast.error("Something went wrong, please try again.!");
        }
    });
}
$(document).on("click", ".addbtn", function () {
    var serviceHead = $('#ServiceHead').val();
    var serviceName = $('#ServiceHead :selected').text();
   // var Duration = $(this).parent().parent().find('#Duration').val();

    var services = $(".SerId:checked");
   // alert(services.length);
    var service_Name = "";
    var Services_Id = "";
    if (services.length>0)
    {
        for (var i = 0; i < services.length; i++) {
            var a = $(services[i]).val();
            var b = $(services[i]).attr("name");
            if (a != "" || a != null) {
                service_Name += b + ',';
                Services_Id += a + ',';
            }
           
        }
       
    }

    if (serviceHead != "" ) {
        var check = $("#Services_Data").html();
        if (check.includes(serviceHead)) {
        }
        else {
            var health = '<tr><td><input hidden class="ServiceHeadId" value="' + serviceHead + '"/>' + serviceName + '</td><td><input class="ServicesId" hidden value="' + Services_Id + '"/>' + service_Name + '</td><td><i class="bi bi-trash text-danger removeissuess"></i></td></tr>';
            $("#Services_Data").append(health);
        }
    }
    //var a = $(this).parent().parent().html();
    //$(this).parent().after(a)
    //$(this).hide();
})
$(document).on("click", ".removeissuess", function () {
    $(this).parent().parent().remove();
})

function CreatePackage()
{
    var ServiceHeadId = $(".ServiceHeadId");
    var serviceid = $(".ServicesId");

    if (ServiceHeadId.length > 0 && serviceid.length > 0)
    {
        var ServiceHead = [];
        var Service = [];
        for (var i = 0; i < ServiceHeadId.length; i++) {
            var a = $(ServiceHeadId[i]).val();
            if (a != "" && a != null) {
                ServiceHead.push({ "ServicesHeadId": a });
            }
        }
        for (var x = 0; x < serviceid.length; x++) {
            var a = $(serviceid[x]).val();
            if (a != "" && a != null) {
                Service.push({ "ServicesId": a });
            }
        }

      //  console.log(ServiceHead);
     //   console.log(Service);

        $.post(apiurl + "API/Patient/CustomPackageCreate?CorporateId=" + detail.CorporateId + "&headid=" + JSON.stringify(ServiceHead) + "&servicid=" + JSON.stringify(Service), function (data) {
            console.log(data)
            if (data == "Success") {
                Toast.info("Package Created Successfully.!");
            }
            else {
                Toast.error("Something went wrong, please try again.!");
            }
        }).fail(function (response) {
            console.log(response)
            Toast.error("Something went wrong, please try again.!");
        });
    }

    else {
        Toast.warning("Please Add Services and try again.!");
    }


}
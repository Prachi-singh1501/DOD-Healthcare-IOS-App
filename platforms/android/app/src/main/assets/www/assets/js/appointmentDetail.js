var apiurl = window.Apiurl;
var detail = JSON.parse(localStorage.getItem('LogIn'));
console.log(detail)
$(document).ready(function () {
   
   
    GetAppDetail()
});

function getdate(date) {

    var dt = new Date(date);
    let day = dt.getDate();
    let month = dt.getMonth();
    let year = dt.getFullYear();
    return year + "-" + (month + 1) + "-" + day;
}



function GetAppDetail() {
    var appId = $("#AppId").val();
    $.ajax({
        url: apiurl + "API/Patient/AppointmentDetails?AppId=" + appId,
        type: "GET",
        success: function (data) {
            console.log(data);
            if(data.appointmentDetail!=null)
            {
                $(".PatientName").text(detail.Name);
                $(".AppointmentDate").text(data.appointmentDetail.App_Date);
                $(".Appointmenttime").text(data.appointmentDetail.App_Time);
                $(".BloodPressure").text(data.appointmentDetail.BloodPressure);
                $(".Diagnosis").text(data.appointmentDetail.Diagnosis);
                $(".DoctorName").text(data.appointmentDetail.Doctor.FirstName);
                $(".DoctorLocation").text(data.appointmentDetail.Doctor_Locations.Name);
                $(".ConsultationType").text(data.appointmentDetail.Consult_Type);
                $(".ConsultationFees").text(data.appointmentDetail.Fees);
                $(".Diagnosis").text(data.appointmentDetail.Diagnosis);
                $(".OldMedication").text(data.appointmentDetail.Old_Medication);
                $(".Sugar").text(data.appointmentDetail.Sugar);
                $(".Temperature").text(data.appointmentDetail.Temperature);
                $(".SPO2").text(data.appointmentDetail.SPO2);
                $(".Weight").text(data.appointmentDetail.Weight);
                $(".AppointmentMode").text(data.appointmentDetail.Mode);
                //$(".CreateBy").text(data.appointmentDetail.CreateBy);
                $(".CreateDate").text(data.appointmentDetail.CreateDate);
                $(".UpdateDate").text(data.appointmentDetail.UpdateDate);
               
                var status = "";
                switch (data.appointmentDetail.Status) {

                    case "AwaitingPayment":
                        status = '<span class="badge bg-purple">Pending Payment</span>';
                        break;

                    case "Cancel":
                        status = ' <span class="badge bg-danger">Cancel</span>'
                        break;

                    case "Closed":
                        status = '<span class="badge bg-success">Closed</span>'
                        break;

                    case "Pending":
                        status = '<span class="badge bg-warning">Pending</span>'
                        break;
                    default:
                        status = '<span class="badge text-dark">-</span>';
                        break;
                }
                $(".AppointmentStatus").html(status);
            }
            if(data.HealthIssus.length>0)
            {
                var health = "";
                for (var i = 0; i < data.HealthIssus.length; i++) {
                    health += data.HealthIssus[i].HealthIssue_Name+" "+data.HealthIssus[i].No_Of_Days+" Days, "
                }
                $(".HealthIssues").html(health);
            }

            if(data.pay!=null)
            {
                $(".PaymentId").text(data.pay.PaymentId);
                $(".PayStatus").text(data.pay.Status);
                $(".PayMode").text(data.pay.PayMode);
            }

        },
        error: function (data) {
            console.log(data.responseJSON)

            Toast.error("Something went wrong, please try again.!");
        }
    });

}
const loadScript = path => {
    let $script = document.createElement("script");

    $script.type = "text/javascript";
    $script.async = false;
    $script.src = path;
    document.body.appendChild($script);
};

const onDeviceReady = () => {
    if (window.device.platform === "Android") {
        //alert('PlatformReady');
        const { permissions } = cordova.plugins;

        permissions.requestPermissions([permissions.CAMERA, permissions.RECORD_AUDIO, permissions.WRITE_EXTERNAL_STORAGE, permissions.READ_EXTERNAL_STORAGE, permissions.MODIFY_AUDIO_SETTINGS]);
    }
    // cordova.plugins.backgroundMode.setEnabled(true);
    //var backgroundactive = cordova.plugins.backgroundMode.isActive();
    //alert(backgroundactive);
    // if (backgroundactive == true) {
    //    UserExitChatAll();
    //}
    document.addEventListener("backbutton", onBackKeyDown, false);

    if (window.device.platform === "iOS") {
        const { iosrtc } = cordova.plugins;

        // Connect 'iosrtc' plugin, only for iOS devices
        iosrtc.registerGlobals();
        // Use speaker audio output
        iosrtc.selectAudioOutput("speaker");
        // Request audio and/or camera permission if not requested yet
        iosrtc.requestPermission(true, true, function (permissionApproved) {
            console.log("requestPermission status: ", permissionApproved ? "Approved" : "Rejected");
        });
        // Refresh video element
        window.addEventListener("orientationchange", () => iosrtc.refreshVideos());
        window.addEventListener("scroll", () => iosrtc.refreshVideos());
    }

    loadScript("plugin-main.js");
};

document.addEventListener("deviceready", onDeviceReady, false);
var currentPage = app.views.main.router.url;
var view = app.views.current.history.length;

var backcount = 1;
function onBackKeyDown() {
    getcurrentview = app.view.main;

    //alert(currentPage + " - " + getcurrentview + "-" + view);
    if (currentPage.includes("home") || currentPage.includes("signin") || currentPage.includes("Signin") || view <= 1) {


        if (backcount == 2) {
            //alert('1-'+backcount);
            navigator.app.exitApp();

        }
        if (backcount > 2) {
            backcount = 1;
            //Toast.info("Press 'BACK' again to Exit..!!");
        }
        if (backcount < 2) {
            //Toast.info("Press 'BACK' again to Exit..!!");
            backcount++;
        }

    }

}



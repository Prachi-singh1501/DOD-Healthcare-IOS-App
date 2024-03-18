document.addEventListener("backbutton", onBackKeyDown, false);

var getcurrentview = app.view.main.main;
var currentPage = app.views.main.router.url;

//alert(currentPage);
var backcount = 1;
function onBackKeyDown() {
     getcurrentview = app.view.main.main;

    if (currentPage.includes("home")  || currentPage.includes("signin") || currentPage.includes("Signin")) {
        //alert('1-'+backcount);
        Toast.info("App is closing");
        navigator.app.exitApp();




        //app.toast.create({
        //    text: 'Press back twice to exit app.',
        //    closeButton: true,
        //    closeButtonText: 'Close',
        //    closeButtonColor: 'red',
        //    closeTimeout: 2000,
        //    on: {
        //        closeButtonClick: function () {
        //            navigator.app.exitApp();
        //            e.preventDefault();
        //        },
        //    }
        //}).open();

    }
    else {
        var view = app.views.current;
        //view.router.back(view.history[0], { force: true });
        //app.router.back('/', force: true);

        

        //app.popup.close();
        app.router.back();
    }



}
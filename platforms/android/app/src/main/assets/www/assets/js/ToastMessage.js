function Toastify(options) {
    $('.toast').hide();
   
        M.toast({ html: options.text, classes: options.classes })
}


var Toast = {
    info: (msg) => {
        Toastify({
            text: msg,
            classes: "info-toast",
singleton:true

        })
    },
    notice: (msg) => {
        Toastify({
            text: msg,
            classes: "notice-toast",
singleton:true
        })
    },
warning: (msg) => {
        Toastify({
            text: msg,
            classes: "warning-toast",
singleton:true
        })
    },
    error: (msg) => {
        Toastify({
            text: msg,
            classes: "error-toast",
singleton:true
        })
    }
}

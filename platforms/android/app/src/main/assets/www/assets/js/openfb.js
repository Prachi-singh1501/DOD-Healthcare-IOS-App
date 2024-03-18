var openFB = (function () {

    var loginURL = 'https://www.pcbttutorials.com/Mobile/Mobile_Practice_Paper?id=1ef0db6d&userid=PCBTS-000004&mainpackage=Test%20Class%20pack',



        logoutURL = 'https://api.pcbttutorials.com/oauthcallback.html',

        // By default we store fbtoken in sessionStorage. This can be overridden in init()
        tokenStore = window.sessionStorage,

        // The Facebook App Id. Required. Set using init().
        fbAppId,

        context = window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/")),

        baseURL = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + context,

        // Default OAuth redirect URL. Can be overriden in init()
        oauthRedirectURL = baseURL + '/oauthcallback.html',

        // Default Cordova OAuth redirect URL. Can be overriden in init()
        //cordovaOAuthRedirectURL = "https://www.facebook.com/connect/login_success.html",
        cordovaOAuthRedirectURL = "https://api.pcbttutorials.com/oauthcallback.html",

        // Default Logout redirect URL. Can be overriden in init()
        logoutRedirectURL = baseURL + '/logoutcallback.html',

        // Because the OAuth login spans multiple processes, we need to keep the login callback function as a variable
        // inside the module instead of keeping it local within the login function.
        loginCallback,

        // Indicates if the app is running inside Cordova
        runningInCordova,

        // Used in the exit event handler to identify if the login has already been processed elsewhere (in the oauthCallback function)
        loginProcessed;

    // MAKE SURE YOU INCLUDE <script src="cordova.js"></script> IN YOUR index.html, OTHERWISE runningInCordova will always by false.
    // You don't need to (and should not) add the actual cordova.js file to your file system: it will be added automatically
    // by the Cordova build process
    document.addEventListener("deviceready", function () {
        //alert('device ready');
        runningInCordova = true;
    }, false);

    /**
     * Initialize the OpenFB module. You must use this function and initialize the module with an appId before you can
     * use any other function.
     * @param params - init paramters
     *  appId: (Required) The id of the Facebook app,
     *  tokenStore: (optional) The store used to save the Facebook token. If not provided, we use sessionStorage.
     *  loginURL: (optional) The OAuth login URL. Defaults to https://www.facebook.com/dialog/oauth.
     *  logoutURL: (optional) The logout URL. Defaults to https://www.facebook.com/logout.php.
     *  oauthRedirectURL: (optional) The OAuth redirect URL. Defaults to [baseURL]/oauthcallback.html.
     *  cordovaOAuthRedirectURL: (optional) The OAuth redirect URL. Defaults to https://www.facebook.com/connect/login_success.html.
     *  logoutRedirectURL: (optional) The logout redirect URL. Defaults to [baseURL]/logoutcallback.html.
     *  accessToken: (optional) An already authenticated access token.
     */
    function init(params) {
        //alert(baseURL);
        //if (params.appId) {
        //    fbAppId = params.appId;
        //} else {
        //    throw 'appId parameter not set in init()';
        //}

        //if (params.tokenStore) {
        //    tokenStore = params.tokenStore;
        //}

        //if (params.accessToken) {
        //    tokenStore.fbAccessToken = params.accessToken;
        //}

        loginURL = params.loginURL || loginURL;
        logoutURL = params.logoutURL || logoutURL;
        oauthRedirectURL = params.oauthRedirectURL || oauthRedirectURL;
        cordovaOAuthRedirectURL = params.cordovaOAuthRedirectURL || cordovaOAuthRedirectURL;
        logoutRedirectURL = params.logoutRedirectURL || logoutRedirectURL;

    }

    /**
     * Checks if the user has logged in with openFB and currently has a session api token.
     * @param callback the function that receives the loginstatus
     */
    function getLoginStatus(callback) {
        var token = tokenStore.fbAccessToken,
            loginStatus = {};
        if (token) {
            loginStatus.status = 'connected';
            loginStatus.authResponse = { accessToken: token };
        } else {
            loginStatus.status = 'unknown';
        }
        if (callback) callback(loginStatus);
    }

    /**
     * Login to Facebook using OAuth. If running in a Browser, the OAuth workflow happens in a a popup window.
     * If running in Cordova container, it happens using the In-App Browser. Don't forget to install the In-App Browser
     * plugin in your Cordova project: cordova plugins add org.apache.cordova.inappbrowser.
     *
     * @param callback - Callback function to invoke when the login process succeeds
     * @param options - options.scope: The set of Facebook permissions requested
     * @returns {*}
     */
    function login(url) {
        $('.loader_allpage').css('display', 'block');
        loginURL = url;
        //alert(callback + "- Options :" + options);
        //alert('Running - ' + runningInCordova);
        var loginWindow,
            startTime,
            scope = '',
            //redirectURL = runningInCordova ? cordovaOAuthRedirectURL : oauthRedirectURL;
        redirectURL = runningInCordova ? cordovaOAuthRedirectURL : oauthRedirectURL;
        //alert('redirectURL');
        //if (!fbAppId) {
        //    //alert('fbAppId');
        //    return callback({ status: 'unknown', error: 'Facebook App Id not set.' });
        //}
        loginWindow = cordova.InAppBrowser.open(loginURL + '&redirect_uri=' + redirectURL +
            '&response_type=token&scope=' + scope, '_blank', 'location=no,zoom=no,clearcache=yes');
        //loginWindow.addEventListener("loadstop", function () {
        //    alert('loadsrop');
        //    setTimeout(function () {
        //        loginWindow.close();
        //    }, 5000);
        //});

        if (runningInCordova) {
            //alert('runningInCordova' + runningInCordova);
            loginWindow.addEventListener('loadstart', loginWindow_loadStartHandler);
            loginWindow.addEventListener('loadstop', loginWindow_loadStopHandler);
            loginWindow.addEventListener('exit', loginWindow_exitHandler);
            loginWindow.addEventListener('message', messageCallBack);
        }

        // Inappbrowser load start handler: Used when running in Cordova only
        function loginWindow_loadStartHandler(event) {
           // alert('loginWindow_loadStartHandler');
            //alert(event.url);
           // $('.loader_allpage').css('display', 'block');
            var url = event.url;
            //alert(url);
            if (event.url.includes("Success")) {
                setTimeout(function () { app.router.navigate('/payment/', { reloadAll: true }); }, 2000);


            }
            else if (event.url.includes("Failed")) {
                setTimeout(function () { app.router.navigate('/package/', { reloadAll: true }); }, 2000);
                //                app.router.navigate('/package/', { reloadAll: true });
            }

            if (event.url.includes("Submit"))
            {
                Toast.error("Please wait, while we are redirecting..!!");

                //alert('got access token');
                // When we get the access token fast, the login window (inappbrowser) is still opening with animation
                // in the Cordova app, and trying to close it while it's animating generates an exception. Wait a little...
                var timeout = 600 - (new Date().getTime() - startTime);
                setTimeout(function () {
                    //alert('close');
                    loginWindow.close();
                    // alert('finally close');
                    //var getinf = document.getElementById('getinfo');
                    //getinf.click();

                }, timeout > 0 ? timeout : 0);
                oauthCallback(url);
            }
        }

        function loginWindow_loadStopHandler(event) {
            $('.loader_allpage').css('display', 'none');
           //alert(event.url);
           // //alert('loginWindow_loadStopHandler');
           // //if (event.url == 'https://api.pcbttutorials.com/oauthcallback.html')
           // $('.loader_allpage').css('display', 'none');
           // if (event.url.includes("Result") )
           // {
           //    alert("url matched");
           //     setTimeout(function () {
           //     loginWindow.close();
           // }, 2000);
           //     app.router.navigate('/studentperformance/', { reloadAll: true });
           //     loginWindow.loginWindow_exitHandler(event);
           // }

           // if (event.url.includes("Success")) {
           //     // alert("url matched");
           //     setTimeout(function () {
           //         loginWindow.close();
           //     }, 3000);
           //     app.router.navigate('/my-package/', { reloadAll: true });
           //     loginWindow.loginWindow_exitHandler(event);
           // }
           // if (event.url.includes("Failed")) {
           //     // alert("url matched");
           //     setTimeout(function () {
           //         loginWindow.close();
           //     }, 3000);
           //     app.router.navigate('/package-library/', { reloadAll: true });
           //     loginWindow.loginWindow_exitHandler(event);
           // }
           // if (event.url.includes("PDFdone")) {
           //     // alert("url matched");
           //     setTimeout(function () {
           //         loginWindow.close();
           //     }, 3000);
           //     app.router.navigate('/studentperformance/', { reloadAll: true });
           //     loginWindow.loginWindow_exitHandler(event);
           // }
        }
        // Inappbrowser exit handler: Used when running in Cordova only
        function loginWindow_exitHandler(event) {
            //alert("Exit:" + event.url)
            //Toast.error(event.url);
            if (event.url.includes("Success")) {
                setTimeout(function () { app.router.navigate('/payment/', { reloadAll: true });}, 2000);

                
            }
            else if (event.url.includes("Failed")) {
                setTimeout(function () { app.router.navigate('/package/', { reloadAll: true }); }, 2000);
//                app.router.navigate('/package/', { reloadAll: true });
            }
            
            
           
            console.log('exit and remove listeners');
            // Handle the situation where the user closes the login window manually before completing the login process
            if (loginCallback && !loginProcessed) loginCallback({ status: 'user_cancelled' });

            loginWindow.removeEventListener('loadstop', loginWindow_loadStopHandler);
            loginWindow.removeEventListener('exit', loginWindow_exitHandler);
            loginWindow = null;
            console.log('done removing listeners');
        }

        if (options && options.scope) {
            scope = options.scope;
        }

        loginCallback = callback;
        loginProcessed = false;

        startTime = new Date().getTime();
        loginWindow = cordova.InAppBrowser.open(loginURL + '&redirect_uri=' + redirectURL +
            '&response_type=token&scope=' + scope, '_blank', 'location=no,zoom=no,clearcache=yes');

        window.setTimeout(function () {
            loginWindow.addEventListener('loadstart', loginWindow_loadStartHandler);

        }, 1000);
        // alert('call listener');
        // If the app is running in Cordova, listen to URL changes in the InAppBrowser until we get a URL with an access_token or an error
       
        // Note: if the app is running in the browser the loginWindow dialog will call back by invoking the
        // oauthCallback() function. See oauthcallback.html for details.

    }

    /**
     * Called either by oauthcallback.html (when the app is running the browser) or by the loginWindow loadstart event
     * handler defined in the login() function (when the app is running in the Cordova/PhoneGap container).
     * @param url - The oautchRedictURL called by Facebook with the access_token in the querystring at the ned of the
     * OAuth workflow.
     */
    function messageCallBack(params) {
        //alert(params);
    }
    function oauthCallback(url) {
        //alert("oauthCallback : " + url);
        app.router.navigate('/studentperformance/', { reloadAll: true });
        // Parse the OAuth data received from Facebook
        if(event.url.includes("Submit"))
        {
            alert("url matched");
            setTimeout(function () {
                loginWindow.close();
            }, 2000);
           
           // loginWindow.loginWindow_exitHandler();
        }
    }

    /**
     * Logout from Facebook, and remove the token.
     * IMPORTANT: For the Facebook logout to work, the logoutRedirectURL must be on the domain specified in "Site URL" in your Facebook App Settings
     *
     */
    function logout(callback) {
        //alert(callback);
        var logoutWindow,
            token = tokenStore.fbAccessToken;
        //alert('token' + tokenStore.fbAccessToken);
        /* Remove token. Will fail silently if does not exist */
        tokenStore.removeItem('fbtoken');

        if (token) {
            logoutWindow = cordova.InAppBrowser.open(logoutURL + '?access_token=' + token + '&next=' + logoutRedirectURL, '_self', 'location=no,zoom=no,clearcache=yes');
            if (runningInCordova) {
                //alert('close');
                setTimeout(function () {
                    //alert('finalclose');
                    logoutWindow.close();
                }, 700);
            }
        }

        if (callback) {
            callback();
        }

    }

    /**
     * Lets you make any Facebook Graph API request.
     * @param obj - Request configuration object. Can include:
     *  method:  HTTP method: GET, POST, etc. Optional - Default is 'GET'
     *  path:    path in the Facebook graph: /me, /me.friends, etc. - Required
     *  params:  queryString parameters as a map - Optional
     *  success: callback function when operation succeeds - Optional
     *  error:   callback function when operation fails - Optional
     */
    function api(obj) {

        var method = obj.method || 'GET',
            params = obj.params || {},
            xhr = new XMLHttpRequest(),
            url;

        params['access_token'] = tokenStore.fbAccessToken;
        //params['fields'] = "id,name,email,birthday,gender,hometown,picture";

        params['fields'] = "id,name,email,hometown,picture";


        url = 'https://graph.facebook.com' + obj.path + '?' + toQueryString(params);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if (obj.success) obj.success(JSON.parse(xhr.responseText));
                } else {
                    var error = xhr.responseText ? JSON.parse(xhr.responseText).error : { message: 'An error has occurred' };
                    if (obj.error) obj.error(error);
                }
            }
        };

        xhr.open(method, url, true);
        xhr.send();
    }

    /**
     * Helper function to de-authorize the app
     * @param success
     * @param error
     * @returns {*}
     */
    function revokePermissions(success, error) {
        return api({
            method: 'DELETE',
            path: '/me/permissions',
            success: function () {
                success();
            },
            error: error
        });
    }

    function parseQueryString(queryString) {
        var qs = decodeURIComponent(queryString),
            obj = {},
            params = qs.split('&');
        params.forEach(function (param) {
            var splitter = param.split('=');
            obj[splitter[0]] = splitter[1];
        });
        return obj;
    }

    function toQueryString(obj) {
        var parts = [];
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
            }
        }
        return parts.join("&");
    }

    // The public API
    return {
        init: init,
        login: login,
        logout: logout,
        revokePermissions: revokePermissions,
        api: api,
        oauthCallback: oauthCallback,
        getLoginStatus: getLoginStatus
    }

}());
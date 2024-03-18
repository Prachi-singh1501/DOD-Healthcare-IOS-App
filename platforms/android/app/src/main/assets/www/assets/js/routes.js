var timestamp = Date.now();
routes = [
  {
      path: '/index/',
      url: './index.html',
  },
  
  
  ,

     {
         path: '/landingpage/',
         url: './landing.html?' + timestamp,
     },
     
      {
          path: '/signin/',
          componentUrl: './pages/signin.html?' + timestamp,
      },
      {
          path: '/signup/',
          componentUrl: './pages/signup.html?' + timestamp,
      },
      {
          path: '/verify/',
          componentUrl: './pages/verify.html?',
      },
      {
          path: '/thankyou/',
          componentUrl: './pages/thankyou.html?',
      },
      {
          path: '/landings/',
          componentUrl: './pages/landings.html?',
      },
      {
          path: '/home/',
          componentUrl: './pages/home.html?',
      },
      {
          path: '/Corporate_Home/',
          componentUrl: './pages/Corporate_Home.html?',
      },
        {
            path: '/index/',
            componentUrl: './pages/index.html?',
        },
        {
            path: '/profile/',
            componentUrl: './pages/profile.html?',
        },
        {
            path: '/dashboard/',
            componentUrl: './pages/dashboard.html?',
        },
        {
            path: '/settings/',
            componentUrl: './pages/settings.html?',
         },
         {
            path: '/upcomingappointment/',
            componentUrl: './pages/upcomingappointment.html?',
            },
            {
                path: '/reports/',
                componentUrl: './pages/reports.html?',
            },
            {
                path: '/payment/',
                componentUrl: './pages/payment.html?',
            },
            {
                path: '/appointment/',
                componentUrl: './pages/appointment.html?',
            },
            {
                path: '/appointmentEdit/:AppId/',
                componentUrl: './pages/appointmentEdit.html?',
            },
             {
                 path: '/appointmentDetail/:AppId/',
                 componentUrl: './pages/appointmentDetail.html?',
             },
              {
                  path: '/package/',
                  componentUrl: './pages/package.html?',
              },
              {
                  path: '/package_detail/:PackageId/:PackageName/:Amount/:PackageType/',
                  componentUrl: './pages/package_detail.html?',
              },
               {
                   path: '/video_chat/:App_ID/:DoctorId/:Mode/:PatientId/:DoctorName/',
                   componentUrl: './pages/video_chat.html?',
               },
                {
                    path: '/change_password/',
                    componentUrl: './pages/change_password.html?',
                },
               //{
               //    path: '/audio_chat/:App_ID/:DoctorId/:Mode/:Location_Id/:DoctorName/',
               //    componentUrl: './pages/audio_chat.html?',
               //},
                {
                    path: '/CorporatePayment/',
                    componentUrl: './pages/CorporatePayment.html?',
                },
                 {
                     path: '/CorporatePayment/',
                     componentUrl: './pages/CorporatePayment.html?',
                 },
                  {
                      path: '/EmployeeList/',
                      componentUrl: './pages/EmployeeList.html?',
                  },
                  {
                      path: '/EmployeeTestReport/:PatientId/',
                      componentUrl: './pages/EmployeeTestReport.html?',
                  },
                   {
                       path: '/Corporate_Package/',
                       componentUrl: './pages/Corporate_Package.html?',
                   },
                   {
                       path: '/corporate_package_detail/:PackageId/:PackageName/:Amount/:PackageType/',
                       componentUrl: './pages/corporate_package_detail.html?',
                   },
                   {
                       path: '/custom_package_detail/:PackageId/:PackageName/:Amount/:PackageType/:PackageStatus/',
                       componentUrl: './pages/custom_package_detail.html?',
                   },
                   {
                       path: '/Create_Custom_Package/',
                       componentUrl: './pages/Create_Custom_Package.html?',
                   },
                  {
                      path: '/Purchased_Packages/',
                      componentUrl: './pages/Purchased_Packages.html?',
                  },
                  {
                      path: '/Corporate_Profile/',
                      componentUrl: './pages/Corporate_Profile.html?',
                  },
                  {
                      path: '/Corporate_change_password/',
                      componentUrl: './pages/Corporate_change_password.html?',
                  },
                  {
                      path: '/TestReportPackageWise/:MembershipId/',
                      componentUrl: './pages/TestReportPackageWise.html?',
                  },
  // Page Loaders & Router
  {
      path: '/page-loader-template7/:user/:userId/:posts/:postId/',
      templateUrl: './pages/page-loader-template7.html',
  },
  {
      path: '/page-loader-component/:user/:userId/:posts/:postId/',
      componentUrl: './pages/page-loader-component.html',
  },
  {
      path: '/request-and-load/user/:userId/',
      async: function (routeTo, routeFrom, resolve, reject) {
          // Router instance
          var router = this;

          // App instance
          var app = router.app;

          // Show Preloader
          app.preloader.show();

          // User ID from request
          var userId = routeTo.params.userId;

          // Simulate Ajax Request
          setTimeout(function () {
              // We got user data from request
              var user = {
                  firstName: 'Vladimir',
                  lastName: 'Kharlampidi',
                  about: 'Hello, i am creator of Framework7! Hope you like it!',
                  links: [
                    {
                        title: 'Framework7 Website',
                        url: 'http://framework7.io',
                    },
                    {
                        title: 'Framework7 Forum',
                        url: 'http://forum.framework7.io',
                    },
                  ]
              };
              // Hide Preloader
              app.preloader.hide();

              // Resolve route to load pages
              resolve(
                {
                    componentUrl: './pages/request-and-load.html',
                },
                {
                    context: {
                        user: user,
                    }
                }
              );
          }, 1000);
      },
  },
  // Default route (404 page). MUST BE THE LAST
  {
      path: '(.*)',
      url: './pages/404.html',
  },
];

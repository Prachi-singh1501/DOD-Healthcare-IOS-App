var $ = Dom7,
    app = new Framework7({
        root: "#app",
        id: "com.phonegap.tilepagesapp",
        name: "Framework7",
        //theme: 'aurora',
        pushState: true,
        animateNavBackIcon: true, // for iOS dynamic navbar

        cache: !1,
        panel: { swipe: "left" },
        data: function () {
            return {
                user: { firstName: "John", lastName: "Doe" },
                products: [
                    {
                        id: "1",
                        title: "Apple iPhone 8",
                        description:
                            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.",
                    },
                    {
                        id: "2",
                        title: "Apple iPhone 8 Plus",
                        description:
                            "Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!",
                    },
                    {
                        id: "3",
                        title: "Apple iPhone X",
                        description:
                            "Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.",
                    },
                ],
            };
        },
        methods: {
            helloWorld: function () {
                //app.dialog.alert("Hello World!");
            },
        },
        routes: routes,
    }),
    homeView = app.views.create("#Corporate-home", { url: "/Corporate_Home/" });

//homeView = app.views.create("#view-home", {
//    url: "/home/",
//    pushState: true,
//    pushStateSeparator: '#',
//    animate: true
//});
//app.preloader.show(),
app.on("pageInit", function (e) {
    console.log("Page is now initialized");
    //app.preloader.hide();
});
//window.Apiurl = "http://localhost:11386/";
window.Apiurl = "https://dodapi.vorrowtech.com/";







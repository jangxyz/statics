if (!window.console) window.console = {log: function() {}};


// google analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-37640894-3', 'jangxyz.github.io');
ga('send', 'pageview');


// feeduck
document.addEventListener("DOMContentLoaded", function(event) {
    if (Feeduck && Feeduck.init) {
        Feeduck.init({
            form_id: "1XBTSkrmCm3J9-vlw70w_booFk1YZxDhSDDi4GjTmFpo",
            entry_id: "930713216",
            placeholder: "의견을 남겨주세요.",
            thanks_message: "<p>소중한 의견 감사합니다.</p>",
            send_callback: function(text) {
            },
        });
    }
});

// facebook
document.addEventListener("DOMContentLoaded", function(event) {
    window.fbAsyncInit = function() {
        console.log('connecting to facebook...');
        var appId = document.location.href.match(/jangxyz.net/) ? '234794293350263' : "620410998004546";
        FB.init({ appId: appId, channelUrl: "//jangxyz.net/play/fb/channel.html", status: true, cookie: true, xfbml : true });
        

        // Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
        // for any authentication related change, such as login, logout or session refresh. This means that
        // whenever someone who was previously logged out tries to log in again, the correct case below 
        // will be handled. 
        FB.Event.subscribe('auth.authResponseChange', function(response) {
            // Here we specify what we do with the response anytime this event occurs. 
            if (response.status === 'connected') {
                // The response object is returned with a status field that lets the app know the current
                // login status of the person. In this case, we're handling the situation where they 
                // have logged in to the app.

                startApp();
                testAPI();
            } else if (response.status === 'not_authorized') {
                // In this case, the person is logged into Facebook, but not into the app, so we call
                // FB.login() to prompt them to do so. 
                // In real-life usage, you wouldn't want to immediately prompt someone to login 
                // like this, for two reasons:
                // (1) JavaScript created popup windows are blocked by most browsers unless they 
                // result from direct interaction from people using the app (such as a mouse click)
                // (2) it is a bad experience to be continually prompted to login upon page load.
                console.log('not authorized to facebook. logging in..');
                loginFacebook();
            } else {
                // In this case, the person is not logged into Facebook, so we call the login() 
                // function to prompt them to do so. Note that at this stage there is no indication
                // of whether they are logged into the app. If they aren't then they'll see the Login
                // dialog right after they log in to Facebook. 
                // The same caveats as above apply to the FB.login() call here.
                console.log('user is not logged into Facebook. loggin in..');
                loginFacebook();
            }
        });
        //FB.Event.subscribe('auth.login', function(response) { console.log('auth.login', response); });
        //FB.Event.subscribe('auth.logout', function(response) { console.log('auth.logout', response); });
        //FB.Event.subscribe('auth.statusChange', function(response) { console.log('auth.statusChange', response); });

        FB.getLoginStatus(function(response) {
            console.log('getLoginStatus:', response);
            if (response.status === 'connected') {
                 // the user is logged in and has authenticated your
                 // app, and response.authResponse supplies
                 // the user's ID, a valid access token, a signed
                 // request, and the time the access token 
                 // and signed request each expire
                 var uid = response.authResponse.userID;
                 var accessToken = response.authResponse.accessToken;
             } else if (response.status === 'not_authorized') {
                 // the user is logged in to Facebook, 
                 // but has not authenticated your app
                 handleLogin();
             } else if (response.status === "unknown") {
                 handleLogin();
             } 
        });
    };
    // Load the SDK asynchronously
    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/all.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    function handleLogin() {
        $('.checking-login-status').hide();
        $('.actions li.login').show();
        $('.actions a.login').on('click', function(e) {
            e.preventDefault();
            loginFacebook();
        });
    }

    function testAPI() {
        _status.log('Welcome! 어디보자...');
        FB.api('/me', function(response) {
            _status.log(response.name + ' 님의 모든 데이터를 뽑아가겠습니다.');
        });
    }

    function logoutFacebook() {
        console.log('logging out..');
        FB.logout(function(response) {
             // Person is now logged out
             console.log('bye bye');
        });
    }

    function loginFacebook(callback) {
        callback = callback || function(response) {};

        FB.login(
            function(response) { return callback(response); },
            {scope:'friends_photos,read_stream'}
        ); 
    }
});

function runQuery(query, callback) {
    callback = callback || function(response) {
        console.log('response:', response);
    }

    var method   = _.isObject(query) ? "fql.multiquery" : "fql.query";
    var queryArg = _.isObject(query) ? "queries"        : "query";

    var apiArgObject = {}
    apiArgObject['method'] = method;
    apiArgObject[queryArg] = query;

    console.log("FB.api:", apiArgObject);

    FB.api(apiArgObject, function(response) {
            callback(response);
        }
    );
}


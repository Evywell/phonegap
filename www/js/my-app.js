// Initialize app
var myApp = new Framework7();

// Ajax
/**
var request = new XMLHttpRequest();
if (!request) {
    console.error("Une erreur est survenu lors de l'initialisation de l'Ajax");
}

request.onreadystatechange = function () {
    console.log(request);
    if (request.readyState == XMLHttpRequest.DONE) {
        if (request.status == 200) {
            console.log(request.responseText);
        } else {
            console.error("Wrong request !");
        }
    }
}
request.open('GET', "https://jsonplaceholder.typicode.com/posts/1", true);
request.send(null);
**/
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

var ajaxGETRequest = function (url, callback) {
    $$.get(url, null, function (data, status, xhr) {
        callback(data, status, xhr);
    }, function (xhr, status) {
        console.error("Ajax error", xhr, status);
    })
}

var loadposts = function () {
    ajaxGETRequest('https://jsonplaceholder.typicode.com/posts', function (data, status, xhr) {
        var parsedData = JSON.parse(data);
        var divs = "";
        for (var i = 0; i < parsedData.length; i++) {
            var line = parsedData[i];
            var div = '<div class="content-block"><div class="content-block-title"><a href="view.html?id=' + line.id + '">' + line.title + '</a></div><div' +
                ' class="content-block-inner">' + line.body + '</div></div>';
            divs += div;
        }
        $$('#content-ajax').append(divs);
    })

}

var loadPost = function(id) {
    ajaxGETRequest('https://jsonplaceholder.typicode.com/posts/' + id, function (data, status, xhr) {
        data = JSON.parse(data);
        $$('#view-title').text(data.title);
        $$('#view-content').text(data.body);
    })
}

loadposts();

// load posts
myApp.onPageInit('index', function (page) {
    loadposts();
})

myApp.onPageInit('view', function (page) {
   loadPost(page.query.id);
});

// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    myApp.alert('ATRZATYZUYATZ');
})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        // myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    // myApp.alert('Here comes About page');
})

myApp.onPageInit('test', function (page) {
    myApp.alert("Bienvenue sur la page de test");
})
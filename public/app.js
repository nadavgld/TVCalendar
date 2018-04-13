var app = angular.module('TVCal-App',['ngRoute']);

var _user = {'shows':[]};
var lastSearch;

app.config(function($routeProvider) {
    $routeProvider.when('/',{
        controller: 'Cindex',
        templateUrl: 'views/Vindex.html'
    })
    .when('/myShows', {
        controller: 'CmyShows',
        templateUrl: 'views/VmyShows.html'
    })
    .when('/today', {
        controller: 'Ctoday',
        templateUrl: 'views/Vtoday.html'
    })
    .otherwise({
        redirectTo: '/404'
    });
});
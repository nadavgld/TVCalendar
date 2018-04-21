var app = angular.module('TVCal-App',['ngRoute']);

var _user = {'shows':[]};
var lastSearch;
var _selectedShowsEpisodes;
var _selectedShow;

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
    .when('/show', {
        controller: 'Cshow',
        templateUrl: 'views/Vshow.html'
    })
    .otherwise({
        redirectTo: '/404'
    });
});

app.controller('CmyShows', ['$scope', '$http', '$location', '$routeParams', function ($scope, $http, $location, $routeParams) {
    $scope.user;

    $scope.getShow = function (id) {

        _selectedShow = id;
        fetchShow(id, $http, $location);

    }

    $scope.updateScope = function () {
        fetchMyShows($http);
        $scope.user = _user;
    }
}]);

function fetchShow(id, http, location) {
    http.get('/api/show/' + id).then((response) => {
        console.log(response.data);
        _selectedShowsEpisodes = response.data;

        location.path('/show').replace();
    });
}
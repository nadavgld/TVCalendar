app.controller('Cindex', ['$scope', '$http', '$location', '$routeParams', function ($scope, $http, $location, $routeParams) {
    $scope._search;
    $scope.searchResult;
    $scope.hasSearched = false;
    $scope.showList = [];

    $scope.reload = function () {

        fetchMyShows($http);

        $scope.hasSearched = true;

        if (lastSearch != undefined) {
            $scope._search = lastSearch;
            $scope.search();
        }
    }

    $scope.$on('fetch', function(){
        console.log("fetching");
    });

    $scope.search = function (e) {
        var key = e != undefined ? e.which : 13;

        if (key === 13) {
            lastSearch = $scope._search;

            $http.get('/api/shows/' + $scope._search).then((response) => {
                $scope.searchResult = response.data;
                $scope.hasSearched = true;

                $scope.updateScope();
            });
        }
    }

    $scope.favoriteShow = function (show) {
        // var id = show.show.id;
        // _user.shows[id] = show;
        _user.shows.push(show.show);
        $scope.insertShowToDB(show.show.id, show.show.name, _user.shows.indexOf(show.show));

        $scope.updateScope();
    }

    $scope.insertShowToDB = function (id, name, showIdx) {
        $http.post('/api/show/', { id: id, name: name }).then((response) => {
            _user.shows[showIdx]._id = response.data._id.$oid;
        });
    }

    $scope.unFavoriteShow = function (show) {

        // var id = show.show.id;   
        // _user.shows.splice(id,1);

        var idx = getShowIndexById(show.show.id);
        var id = _user.shows[idx]._id;

        $http.delete('/api/show/' + id).then((response) => {

            if (response.data._id != undefined) {
                _user.shows.splice(idx, 1);
                $scope.updateScope();
            }
        });

    }

    $scope.updateScope = function () {
        $scope.user = _user;
        $scope.showList = _user.shows.map(s => s.id);
    }
}]);

function userContainsShow(id) {
    for (let j = 0; j < _user.shows.length; j++)
        if (_user.shows[j].id == id)
            return true;
    return false;
}

function getShowIndexById(id) {
    for (let j = 0; j < _user.shows.length; j++)
        if (_user.shows[j].id == id)
            return j;
    return -1;
}

function fetchMyShows(http) {
    http.get('/shows/').then((response) => {
        var myShows = response.data;

        for (let i = 0; i < myShows.length; i++) {
            http.get('/api/shows/' + myShows[i].name).then((res) => {
                var show = res.data[0];

                if (!userContainsShow(show.show.id) && show != undefined) {
                    show.show._id = myShows[i]._id.$oid;
                    _user.shows.push(show.show);
                }
            });
        }
    });
}
var currentShow;

app.controller('Cshow', ['$scope', '$http', '$location', '$routeParams', function ($scope, $http, $location, $routeParams) {
    $scope.loadEpisodes = function () {

        if (!_selectedShow)
            $location.path('/myShows').replace();

        else {
            currentShow = _user.shows.filter(s => s.id == _selectedShow)[0];
            fetchShow(_selectedShow, $http, $location);
            $scope.episodes = _selectedShowsEpisodes;
            $scope.show = _selectedShow;

            for (var i = 0; i < _selectedShowsEpisodes.length; i++) {
                // if (!currentShow.seasons[parseInt(_selectedShowsEpisodes[i].season)]) {
                //     currentShow.seasons[parseInt(_selectedShowsEpisodes[i].season)] = [{
                //         'episodes': [{
                //             "number": _selectedShowsEpisodes[i].episode,
                //             "watched": false,
                //             "downloaded": false
                //         }]
                //     }];
                // }
                // else {
                //     currentShow.seasons[_selectedShowsEpisodes[i].season].episodes.push({
                //         "number": _selectedShowsEpisodes[i].episode,
                //         "watched": false,
                //         "downloaded": false 
                //     });
                // }
            }
        }
    }

    $scope.toggleEpisode = function (id, season, episode) {
        currentShow.seasons[season].episodes[episode] = true;
    }

}]);
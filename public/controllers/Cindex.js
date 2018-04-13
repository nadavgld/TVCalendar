app.controller('Cindex',['$scope','$http','$location','$routeParams',function($scope,$http,$location,$routeParams){
    $scope._search;
    $scope.searchResult;
    $scope.hasSearched = false;
    $scope.showList = [];

    $scope.reload = function(){
        $scope.hasSearched = true;
        if(lastSearch != undefined){
            $scope._search = lastSearch;
            $scope.search();
        }
    }

    $scope.search = function(e){
        var key = e != undefined ? e.which : 13;

        if (key === 13){
            lastSearch = $scope._search;

            $http.get('/api/shows/' + $scope._search).then((response)=>{
                console.log(response.data);
                $scope.searchResult = response.data;
                $scope.hasSearched = true;

                $scope.updateScope();
            });
        }
    }

    $scope.favoriteShow = function(show){
        console.log(show);

        // var id = show.show.id;
        // _user.shows[id] = show;
        _user.shows.push(show);

        $scope.updateScope();
    }

    $scope.unFavoriteShow = function(show){
        console.log(show);

        // var id = show.show.id;   
        // _user.shows.splice(id,1);

        var idx = _user.shows.indexOf(show);
        _user.shows.splice(idx,1);

        $scope.updateScope();
    }

    $scope.updateScope = function(){
        $scope.user = _user;
        $scope.showList = _user.shows.map(s => s.show.id);
    }
}]);

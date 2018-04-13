app.controller('CmyShows',['$scope','$http','$location','$routeParams',function($scope,$http,$location,$routeParams){
    $scope.user;

    $scope.getShow = function(id){
        $http.get('/api/show/' + id).then((response)=>{
            console.log(response.data);
            $scope.show = response.data;
        });
    }

    $scope.updateScope = function(){
        $scope.user = _user;
    }
}]);

app.controller('Ctoday',['$scope','$http','$location','$routeParams',function($scope,$http,$location,$routeParams){
    $scope.user;
    $scope.shows;

    $scope.getToday = function(){

        var date = formatDate(new Date());
        $http.get('/api/schedule/' + date).then((response)=>{
            console.log(response.data);
            $scope.shows = response.data./*filter( s => s.airstamp.includes(date)).*/sort((a,b)=>{
                return  a.show.name.localeCompare(b.show.name);
            });
        });
    }

    $scope.updateScope = function(){
        $scope.user = _user;
    }
}]);

function formatDate(date){
    var month = parseInt(date.getMonth())+1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth()+1;
    var day = parseInt(date.getDate()) < 10 ? '0' + date.getDate() : date.getDate();
    return `${date.getFullYear()}-${month}-${day}`;
}

(function () {
    angular
        .module('app')
        .controller('raceCtrl', function ($scope, $interval, $stateParams, $state) {
            $scope.count = 0;
            $scope.countdown = $stateParams.time;

            $scope.updateCount = function() {
                $scope.count++;
            }

            var timer = $interval(function() {
                $scope.countdown--;

                if($scope.countdown <= 0) {
                    $interval.cancel(timer);
                    $state.go('gameOver', {points: $scope.count})
                }
            }, 1000);
        });
})();

(function () {
    angular
        .module('app')
        .controller('raceCtrl', function ($scope, $interval, $stateParams, $state, $timeout) {
            $scope.count = 0;
            $scope.countdown = $stateParams.time;
            $scope.fish = "img/fish.png";
            $scope.pos = {
                top: 0,
                left: 0
            };

            var finishAudio = new Audio('audio/finish.mp3');
            var clickAudio = new Audio('audio/click.mp3');

            $scope.updateCount = function () {
                if ($scope.countdown > 0)
                    $scope.count++;
                    //clickAudio.play();
            };

            $scope.updateFish = function () {
                $scope.fish = "img/fishTap.png";
                $scope.updateCount();
            };

            $scope.fishBack = function () {
                $scope.fish = "img/fish.png";
            }

            var timer = $interval(function () {
                $scope.countdown--;

                if ($scope.countdown <= 0) {
                    finishAudio.play();
                    $interval.cancel(timer);

                    $timeout(function () {
                        $state.go('gameOver', {
                            points: $scope.count,
                            time: $stateParams.time
                        })
                    }, 1500);
                }
            }, 1000);

            $scope.newPos = function () {
                // calculate however you'd like:
                $scope.pos.top = Math.random() * 400 + "px";
                $scope.pos.left = Math.random() * 500 + "px";
            }

            //$interval($scope.newPos, 1000);
        });
})();

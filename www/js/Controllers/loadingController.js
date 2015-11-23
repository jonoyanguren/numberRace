(function () {
    angular.module('app')
        .controller('loadingCtrl', function ($scope, $state, $timeout, $stateParams) {
            console.log("Login controller");

            var loadingTips = [
                "Strech your fingers every 2 hours",
                "Tapping too hard will tire out you faster",
                "Tap on the screen to get one point"
            ];

            $scope.tip = loadingTips[Math.floor(Math.random() * loadingTips.length)];

            $timeout(function() {
                $state.go('race', {time: $stateParams.time});
            }, 2300);
        });
})();

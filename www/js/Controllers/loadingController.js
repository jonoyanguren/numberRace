(function () {
    angular.module('app')
        .controller('loadingCtrl', function ($scope, $state, $timeout, $stateParams) {
            $timeout(function() {
                $state.go('race', {time: $stateParams.time});
            }, 1000);
        });
})();

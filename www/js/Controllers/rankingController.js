(function () {
    angular
        .module('app')
        .controller('rankingCtrl', function ($scope, $firebaseArray) {
            var url = "https://fingerbreaker.firebaseio.com/10ranking";
            var ref = new Firebase(url)
                .orderByChild("score")
                .limitToFirst(100);

            $scope.rankings = $firebaseArray(ref);

            $scope.rankings.$loaded()
                .then(function () {
                    $scope.hideSpinner = true;
                })
                .catch(function (err) {
                    console.error(err);
                });
        });
})();

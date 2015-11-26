(function () {
    angular
        .module('app')
        .controller('rankingCtrl', function ($scope, $firebaseArray, dataService, $q, $stateParams) {
            $scope.rankings = {};
            $stateParams.type;

            switch ($stateParams.type) {
                case("10"):
                    dataService.get10Ranking().then(function (result) {
                        $scope.ranking = result.data.data;
                        $scope.hideSpinner = true;
                    });
                    break;
                case("20"):
                    dataService.get20Ranking().then(function (result) {
                        $scope.ranking = result.data.data;
                        $scope.hideSpinner = true;
                    });
                    break;
                case("30"):
                    dataService.get30Ranking().then(function (result) {
                        $scope.ranking = result.data.data;
                        $scope.hideSpinner = true;
                    });
                    break;
            };

            // Firebase
            //var url = "https://fingerbreaker.firebaseio.com/10ranking";
            //var ref = new Firebase(url)
            //    .orderByChild("score")
            //    .limitToFirst(100);
            //$scope.rankings = $firebaseArray(ref);
            //
            //$scope.rankings.$loaded()
            //    .then(function () {
            //        $scope.hideSpinner = true;
            //    })
            //    .catch(function (err) {
            //        console.error(err);
            //    });
        });
})();

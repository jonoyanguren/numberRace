(function () {
    angular.module('app')
        .controller('gameOverCtrl', function ($scope, $stateParams, $ionicActionSheet, $state) {
            $scope.points = $stateParams.points;
            $scope.time = $stateParams.time;

            var levelNames = ["FingerZombie", "FingerBaby", "FingerJumper", "FingerDance", "FingerBreaker"];

            if ($scope.time == 10) {
                if ($scope.points >= 0 && $scope.points <= 49)
                    $scope.rank = levelNames[0];
                if ($scope.points >= 50 && $scope.points <= 99)
                    $scope.rank = levelNames[1];
                if ($scope.points >= 100 && $scope.points <= 119)
                    $scope.rank = levelNames[2];
                if ($scope.points >= 120 && $scope.points <= 149)
                    $scope.rank = levelNames[3];
                if ($scope.points >= 150)
                    $scope.rank = levelNames[4];
            }

            $scope.retry = function () {
                $scope.points = 0;
                $state.go('start');
            }

            $scope.showActionSheet = function () {
                // Show the action sheet
                var hideSheet = $ionicActionSheet.show({
                    buttons: [
                        {text: '<i class="icon ion-social-facebook facebook-icon"></i> Share on facebook'},
                        {text: '<i class="icon ion-social-twitter twitter-icon"></i> Share on twitter'},
                        {text: '<i class="icon ion-social-whatsapp whatsapp-icon"></i> Share on whtasapp'}
                    ],
                    titleText: 'Menu',
                    cancel: function () {
                        // add cancel code..
                        console.log("cancel");
                    },
                    buttonClicked: function (index) {
                        switch (index) {
                            case 0:
                                console.log('share on facebook');
                                window.plugins.socialsharing.shareViaFacebook('I have done a score of ' + $scope.points + ' in NumberRace', null /* img */, null /* url */, function () {
                                    console.log('share ok')
                                }, function (errormsg) {
                                    alert(errormsg)
                                })
                                break;
                            case 1:
                                console.log('share on twitter');
                                window.plugins.socialsharing.shareViaTwitter('I have done a score of ' + $scope.points + ' in NumberRace');
                                break;
                            case 2:
                                console.log('share on whatsapp');
                                window.plugins.socialsharing.shareViaWhatsApp('I have done a score of ' + $scope.points + ' in NumberRace', null /* img */, null /* url */, function () {
                                    console.log('share ok')
                                }, function (errormsg) {
                                    alert(errormsg)
                                })
                                break;
                        }
                        return true;
                    }
                });

                // For example's sake, hide the sheet after two seconds
                //$timeout(function () {
                //    hideSheet();
                //}, 4000);

            };
        });
})();


(function () {
    angular.module('app')
        .controller('gameOverCtrl', function ($scope, $stateParams, $ionicActionSheet, $timeout) {
            $scope.points = $stateParams.points;

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
                                window.plugins.socialsharing.shareViaFacebook('Message via Facebook', null /* img */, null /* url */, function () {
                                    console.log('share ok')
                                }, function (errormsg) {
                                    alert(errormsg)
                                })
                                break;
                            case 1:
                                console.log('share on twitter');
                                window.plugins.socialsharing.shareViaTwitter('Message via Twitter');
                                break;
                            case 2:
                                console.log('share on whatsapp');
                                window.plugins.socialsharing.shareViaWhatsApp('Message via WhatsApp', null /* img */, null /* url */, function () {
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


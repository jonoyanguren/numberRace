(function () {
    angular.module('app')
        .controller('gameOverCtrl', function ($scope,
                                              $stateParams,
                                              $ionicActionSheet,
                                              $state,
                                              $ionicPopup,
                                              dataService) {
            $scope.points = $stateParams.points;
            $scope.time = $stateParams.time;
            $scope.popup = {};
            $scope.rankingUploaded = false;
            $scope.notNick = false;
            $scope.notEmail = false;

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

            $scope.showPopup = function () {
                $scope.data = {}
                $scope.rankingUploaded = true;

                // An elaborate, custom popup
                var myPopup = $ionicPopup.show({
                    template: '' +
                    '<form name="sendDataForm">' +
                    '<input type="text" ng-model="data.nick" placeholder="nick"><br/>' +
                    '<p ng-if="notNick" class="error">Please enter a nick</p><br/>' +
                    '<input type="email" name="email" ng-model="data.email" placeholder="Enter a valid email"><br/>' +
                    '<p ng-if="notEmail" class="error">Please enter a valid email</p>' +
                    '</form>',
                    title: 'Enter your nick and mail',
                    subTitle: 'we will not spam you, promise',
                    scope: $scope,
                    buttons: [
                        {text: 'Cancel'},
                        {
                            text: '<b>Send</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                if (!$scope.data.nick) {
                                    $scope.notNick = true;
                                    e.preventDefault();
                                } else if (!$scope.data.email || sendDataForm.email.$error) {
                                    $scope.notEmail = true;
                                    $scope.notNick = false;
                                    e.preventDefault();
                                } else {
                                    var userObject = {
                                        nick: $scope.data.nick,
                                        email: $scope.data.email,
                                        score: $scope.points
                                    }
                                    return userObject;
                                }
                            }
                        }
                    ]
                });
                myPopup.then(function (res) {
                    addUser(res);
                    //addUserToFirebase(res);
                });
            };

            var addUser = function (user) {
                dataService.postRanking($scope.time, user)
                    .success(function (result) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Complete!!',
                            template: 'Thank you, now score is now in the world ranking!!'
                        });
                        alertPopup.then(function (res) {
                            $state.go('start');
                        });
                    })
                    .error(function (result) {
                        alert("something whent wrong");
                    })
            };

            var addUserToFirebase = function (user) {
                var url = 'https://fingerbreaker.firebaseio.com/';
                url += $scope.time + 'ranking';
                var ranking = new Firebase(url);

                ranking.push(user, function (error) {
                    if (error) {
                        alert("something happened");
                        $scope.rankingUploaded = false;
                    } else {
                        alert("Data stored");
                        $scope.rankingUploaded = true;
                    }
                });
            }
        });
})();


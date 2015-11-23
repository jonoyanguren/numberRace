angular.module('app.routes', [])

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
            .state('start', {
                url: '/start',
                templateUrl: 'templates/start.html',
                controller: 'startCtrl',
                cache: false
            })
            .state('loading', {
                url: '/loading',
                templateUrl: 'templates/loading.html',
                controller: 'loadingCtrl',
                params: {
                    time: "20"
                },
                cache: false
            })
            .state('options', {
                url: '/options',
                templateUrl: 'templates/options.html',
                controller: 'optionsCtrl',
                cache: false
            })
            .state('race', {
                url: '/race',
                templateUrl: 'templates/race.html',
                controller: 'raceCtrl',
                params: {
                    time: "20"
                },
                cache: false
            })
            .state('gameOver', {
                url: '/gameOver',
                templateUrl: 'templates/gameOver.html',
                controller: 'gameOverCtrl',
                params: {
                    points: "0",
                    time: "0"
                },
                cache: false
            })
            .state('tutorial', {
                url: '/tutorial',
                templateUrl: 'templates/tutorial.html',
                cache: false
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/start');

    });
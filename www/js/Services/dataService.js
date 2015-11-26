angular.module('app')
    .factory('dataService', function ($http, Backand) {
        var get10Ranking = function () {
            return $http({
                method: 'GET',
                url: Backand.getApiUrl() + '/1/objects/' + '10ranking',
                params: {
                    pageSize: 20,
                    pageNumber: 1,
                    sort: [{"fieldName": "score", "order": "desc"}]
                }
            });
        };

        var get20Ranking = function () {
            return $http({
                method: 'GET',
                url: Backand.getApiUrl() + '/1/objects/' + '20ranking',
                params: {
                    pageSize: 20,
                    pageNumber: 1,
                    sort: [{"fieldName": "score", "order": "desc"}]
                }
            });
        };

        var get30Ranking = function () {
            return $http({
                method: 'GET',
                url: Backand.getApiUrl() + '/1/objects/' + '30ranking',
                params: {
                    pageSize: 20,
                    pageNumber: 1,
                    sort: [{"fieldName": "score", "order": "desc"}]
                }
            });
        };

        var postRanking = function (time, user) {
            var url = Backand.getApiUrl() + '/1/objects/' + time + 'ranking';

            return $http.post(url, user);
        };

        var service = {
            get10Ranking: get10Ranking,
            get20Ranking: get20Ranking,
            get30Ranking: get30Ranking,
            postRanking: postRanking
        };

        return service;
    });

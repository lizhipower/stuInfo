/**
 * Created by Zhi_LI on 2015/10/28.
 */

var stuInfo =angular.module('stuInfo',[
    'ngRoute'
    ,'ngTable'
]);

stuInfo.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/info/all',{
            templateUrl: '/partials/all.html'
            ,controller: 'allInfoCtrl as allInfo'
        })
        .when('/info/new',{
            templateUrl: '/partials/new.html'
            ,controller: 'newInfoCtrl as newInfo'
        })
        .otherwise({
            redirectTo: '/info/all'
        }
    );
}]);
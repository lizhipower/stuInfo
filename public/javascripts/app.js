/**
 * Created by Zhi_LI on 2015/10/28.
 */

var stuInfo =angular.module('stuInfo',[
    'ngRoute'
    ,'ngTable'
]);

//console.log('hi');
stuInfo.config(['$routeProvider', function ($routeProvider) {
    //console.log('hhh');
    $routeProvider
        .when('/info/all',{
            templateUrl: '/partials/all.html'
            ,controller: 'allInfoCtrl as allInfo'
        })
        .otherwise({
            redirectTo: '/'
        }
    );
}]);
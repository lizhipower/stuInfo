/**
 * Created by Dell on 2015/11/12.
 */
(function () {
        'use strict';
        stuInfo.service('newInfoService',newInfoService);
        function newInfoService($rootScope) {
            var backup = {};
            var service = {
                data: [
                    {name: "tom",
                        age:1,
                        money:222},
                    {name: "tom",
                        age:2,
                        money:22},
                    {name: "tom2",
                        age:3,
                        money:22},
                    {name: "tom",
                        age:4,
                        money:22},
                    {name: "tom",
                        age:5,
                        money:22},
                    {name: "tom",
                        age:6,
                        money:22},
                    {name: "tom2",
                        age:7,
                        money:22},
                    {name: "tom3",
                        age:8,
                        money:22},
                    {name: "tom",
                        age:9,
                        money:22},
                    {name: "tom",
                        age:10,
                        money:22},
                    {name: "tom",
                        age:11,
                        money:22}]
                ,remove: remove
                //,backup: {}
                ,reset: reset
            };
            function doBackup () {
                backup = angular.copy(service.data);
            }
            function remove (index) {
                service.data.splice(index, 1);
                doBackup();
                $rootScope.$broadcast('updated')

            }
            function reset() {
                service.data = angular.copy(backup);
                $rootScope.$broadcast('updated')

            }
            function addIndex () {
                angular.forEach(service.data, function (e, key) {
                    console.log(key);
                    e.index = key + 1;
                });
                doBackup();
            }

            addIndex();
            return service;
        }
    }

)();
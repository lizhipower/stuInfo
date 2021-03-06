/**
 * Created by Dell on 2015/11/12.
 */
(function () {
        'use strict';
        stuInfo.service('allInfoService',allInfoService);
        function allInfoService($rootScope, $http, $q) {
            var backup = {};
            var ignoreCol = [];
            var showColString = 'num class 学号 姓名 性别 手机 major teacher';
            var showColArr = showColString.split(' ');
            console.log(showColArr);
            var column = [];
            var changeLog = {
                editArr: []
                ,removeArr: []
            };
            var urlAll = '/dbAll';

            var service = {
                data: {}
                ,query: query
                ,column: column
                ,remove: remove
                ,confirm: confirm
                ,reset: reset
                ,save: save
                ,showColArr: showColArr
                ,ignoreCol: ignoreCol
            };

            $rootScope.$on('dataChanged', function (event, oldData, newData,type) {
                console.log('dataChanged');
                console.log(oldData);
                console.log(type);
                oldData = formatData(oldData);
                newData = formatData(newData);
                var editData = {};
                editData.data = oldData;
                editData.newData = newData;
                console.log('formated oldData: ', oldData);
                console.log('formated newData: ', newData);
                if (type == 'edit') {
                    changeLog.editArr.push(editData);
                } else if(type == 'remove') {
                    changeLog.removeArr.push(oldData);
                }
            });

            function query() {
                var deffered = $q.defer();
                $http.get(urlAll).success(function (data) {
                    service.data = data;
                    //console.log(data);
                    addIndex();
                    getColumn();

                    deffered.resolve(data);
                    //dbUtil.shutdown();
                });
                return deffered.promise;
            }
            function save() {
                $http.post(urlAll, {
                    data: changeLog

                }).success(getData);
            }
            function getData(data, status, headers, config) {
                console.log('data got');
                service.data = data;
                console.log(service.data);
                addIndex();
                doBackup();
                $rootScope.$broadcast('reRender');
            }
            function getColumn() {
                //console.log(service.data);
                var data = service.data[0];
                console.log('getCol', data);
                var column = [];
                var ignoreCol = [];
                angular.forEach(data, function (val, key) {
                    //console.log(key);
                    if (key !== '_id' && key !== 'index'){
                        column.push(key);
                        if (service.showColArr.indexOf(key) == -1) {
                            ignoreCol.push(key);
                        }
                    }
                });
                console.log(ignoreCol);
                service.column = column;
                service.ignoreCol = ignoreCol;
                $rootScope.$broadcast('ignoreCol');

            }
            function doBackup () {
                backup = angular.copy(service.data);
            }
            function confirm(index, oldData, row) {
                var data = service.data[index-1];
                var newData = row;
                $rootScope.$broadcast('dataChanged', oldData, newData,'edit');

                angular.forEach(column, function (colName) {
                    (data)[colName] = newData[colName];
                });
                doBackup();
            }
            function remove (index) {
                $rootScope.$broadcast('dataChanged', service.data[index-1], {},'remove');
                service.data.splice(index, 1);
                addIndex();
                doBackup();
                $rootScope.$broadcast('reRender');
            }
            function reset() {
                service.data = angular.copy(backup);
                $rootScope.$broadcast('reRender')

            }
            function addIndex () {
                angular.forEach(service.data, function (e, key) {
                    e.index = key + 1;
                });
                doBackup();
            }
            function formatData(data) {
                var newData = {};
                angular.forEach(column, function (colName) {
                    if (colName !== 'index') {
                        newData[colName] = data[colName];
                    }
                });
                return newData;
            }

            return service;
        }
    }

)();
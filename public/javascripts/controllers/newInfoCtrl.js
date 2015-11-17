/**
 * Created by Dell on 2015/11/12.
 */
(function () {
    stuInfo.controller('newInfoCtrl',['$scope','newInfoService','ngTableParams', '$filter',function ($scope, newInfoService, ngTableParams, $filter){
        var vm = this;
        var stuInfoData, colName;
        var promise = newInfoService.query();
        promise.then(stuInfoMain);
        function stuInfoMain(data) {

            stuInfoData = data;
            vm.data = stuInfoData;
            colName = newInfoService.column;
            //console.log(colName);
            vm.column = formCol(colName);
            //console.log(vm.column);
            vm.table = new ngTableParams(
                {
                    page: 1,
                    count: 5,
                    sorting: {
                        num: 'asc'
                    },
                    filter: {}
                },
                {
                    getData: function ($defer, params) {
                        var filteredData, sortedByData;
                        if  (!isEmpty(params.filter())) {
                            //console.log('filter not empty');
                            filteredData = $filter('filter')(stuInfoData, params.filter());
                        }else {
                            //console.log('filter empty');
                            filteredData = newInfoService.data;
                        }
                        if (!isEmpty(params.sorting())) {
                            //console.log('order not empty');
                            sortedByData = $filter('orderBy')(filteredData, params.orderBy());
                        }else {
                            //console.log('filter empty');
                            sortedByData = filteredData;
                        }
                        params.total(sortedByData.length);
                        $defer.resolve(sortedByData.slice((params.page() - 1) * params.count(), params.page() * params.count()));

                        function isEmpty(obj) {
                            for (attr in obj) {
                                if (obj[attr]) {
                                    return false;
                                }
                            }
                            return true
                        }
                    }
                }
            );
        }
        $scope.$on('reRender', reloadTable);
        function reloadTable() {
            console.log('table Reloaded');
            //console.log(newInfoService.data);
            newInfo = angular.copy(newInfoService.data);
            vm.table.total(newInfo.length);
            vm.table.reload();
        }
        function formCol (colName) {
            var column = [];
            var ignoreCol = newInfoService.ignoreCol;
            //console.log(ignoreCol);
            angular.forEach(colName, function(col) {
                if (ignoreCol.indexOf(col) == -1){
                    var colEle = {};
                    colEle.field = col;
                    colEle.title = col;
                    colEle.sortable = col;
                    var filter = {};
                    if (col == 'num') {
                        filter[col] = 'number';
                    } else {
                        filter[col] = 'text';

                    }
                    colEle.filter = filter;
                    column.push(colEle);
                }

            });
            column.push({field: "command", title: "command", sortable: ''});
            return column;

        }
    }])
})();
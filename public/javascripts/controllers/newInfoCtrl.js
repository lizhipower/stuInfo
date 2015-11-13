/**
 * Created by Dell on 2015/11/12.
 */
(function () {
    stuInfo.controller('newInfoCtrl',['$scope','newInfoService','ngTableParams', '$filter',function ($scope, newInfoService, ngTableParams, $filter){
        var vm = this;
        //console.log(newInfoService)
        var newInfo = angular.copy(newInfoService);
        vm.column =  [
            { field: "index", title: "Index", sortable: "index", show: true, dataType: 'number'},
            { field: "name", title: "Name", sortable: "name", dataType: 'text'},
            { field: "age", title: "Age", sortable: "age", dataType: 'number'},
            { field: "money", title: "Money", dataType: 'number'},
            { field: "command", title: "Command", dataType: 'command' }
        ];
        vm.colwidth = ['10%', '30%', '20%', '20%', '20%'];
        vm.table = new ngTableParams(
            {
                page: 1,
                count: 5,
                sorting: {
                    index: 'asc'
                }
            },
            {
                //total: newInfo.length,
                getData: function ($defer, params) {
                    var filteredData, sortedByData;
                    if  (!isEmpty(params.filter())) {
                        console.log('filter not empty');
                        filteredData = $filter('filter')(newInfoService.data, params.filter());
                    }else {
                        console.log('filter empty');
                        filteredData = newInfoService.data;

                    }
                    if (!isEmpty(params.sorting())) {
                        //console.log(params.sorting());
                        //console.log(params.orderBy());
                        console.log('order not empty');
                        sortedByData = $filter('orderBy')(filteredData, params.orderBy());
                    }else {
                        console.log('filter empty');
                        sortedByData = filteredData;
                    }
                    params.total(sortedByData.length);
                    $defer.resolve(sortedByData.slice((params.page() - 1) * params.count(), params.page() * params.count()));

                    //return newInfo.data;
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
        $scope.$on('updated', reloadTable);
        function reloadTable() {
            console.log('table Reloaded');
            console.log(newInfoService.data);
            newInfo = angular.copy(newInfoService);
            vm.table.total(newInfo.data.length);
            vm.table.reload();
        }
    }])
})();
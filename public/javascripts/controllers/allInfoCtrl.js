/**
 * Created by Dell on 2015/11/12.
 */
(function () {
    stuInfo.controller('allInfoCtrl',['$scope','allInfoService','ngTableParams', '$filter',function ($scope, allInfoService, ngTableParams, $filter){
        var vm = this;
        var stuInfoData, colName;
        var promise = allInfoService.query();
        promise.then(stuInfoMain);
        function stuInfoMain(data) {

            stuInfoData = data;
            vm.data = stuInfoData;
            colName = allInfoService.column;
            console.log(colName);
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
                        console.log(params.sorting());
                        if  (!isEmpty(params.filter())) {
                            //console.log('filter not empty');
                            filteredData = $filter('filter')(stuInfoData, params.filter());
                        }else {
                            //console.log('filter empty');
                            filteredData = allInfoService.data;
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
                                    //console.log(attr);
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
            //console.log(allInfoService.data);
            newInfo = angular.copy(allInfoService.data);
            vm.table.total(newInfo.length);
            vm.table.reload();
        }
        function formCol (colName) {
            var column = [];
            var showColArr = allInfoService.showColArr;
            console.log(showColArr);
            angular.forEach(colName, function(col) {
                if (showColArr.indexOf(col) !== -1){
                    //console.log('col',col);
                    var colEle = {};

                    colEle.field = col;
                    //colEle.sortable = col;
                    var filter = {};


                    if (col == 'num') {
                        colEle.title = '序号';
                        filter[col] = 'number';
                        colEle.sortable = col;
                    }else if (col == 'class') {
                        colEle.title = '班级';
                        filter[col] = 'text';
                        colEle.sortable = 'class';
                    }else if (col == 'teacher') {
                        colEle.title = '导师';
                        filter[col] = 'text';
                        colEle.sortable = 'teacher';
                    }else if (col == 'major') {
                        colEle.title = '专业';
                        filter[col] = 'text';
                        colEle.sortable = 'major';
                    }else {
                        //console.log(col);
                        colEle.title = col;

                        filter[col] = 'text';

                    }
                    colEle.filter = filter;
                    //console.log(colEle.title);
                    column.push(colEle);
                }

            });
            column.push({field: "command", title: "编辑信息", sortable: ''});
            return column;

        }
    }])
})();
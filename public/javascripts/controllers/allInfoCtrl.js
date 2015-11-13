/**
 * Created by Zhi_LI on 2015/10/28.
 */
(function () {
    stuInfo.controller(
        'allInfoCtrl', function ($scope, $http, $filter, ngTableParams) {
            var vm = this;
            //console.log('allInfoCtrl');
            var url = '/dbAll';

            vm.filters = {
                className: ''
            };
            readDB_all(url);
            vm.doRefresh = function () {
                vm.data = [{class: "超大15硕",
                major: "电气工程",
                minzu: "汉族",
                name: "唐圣鹏",
                num: 121,
                sex: "男",
                stuID: 21510143}];
                //console.log(vm.data);
                //vm.tableParams.total(vm.data.length);
                vm.tableParams.reload();
            };
            function readDB_all (url) {
                console.log(url);
                $http.get(url, {
                    params : {
                        mode: encodeURI('read')
                    }
                }).success(function (data, status, headers, config) {
                    console.log('read all students infomation success');
                    //console.log(data);
                    vm.data = angular.copy(data);
                    vm.tableParams = new ngTableParams(
                        {
                            page: 1,// show first page
                            count: 20,// count per pages
                            sorting: {
                                class: 'dasc'
                            }
                        },
                        {
                            total: vm.data.length,
                            getData: function ($defer, params) {
                                var filteredData, sortedByData;
                                if  (!isEmpty(params.filter())) {
                                    console.log('filter not empty');
                                    filteredData = $filter('filter')(vm.data, params.filter());
                                }else {
                                    console.log('filter empty');
                                    filteredData = vm.data;

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
                })
            }
        }

    );
})();
//
//
//(function() {
//    "use strict";
//
//    stuInfo.controller("demoController", demoController);
//    demoController.$inject = ["NgTableParams", "ngTableSimpleList"];
//
//    function demoController(NgTableParams, simpleList) {
//        var self = this;
//        console.log(simpleList)
//        var originalData = angular.copy(simpleList);
//
//        self.tableParams = new NgTableParams({}, {
//            filterDelay: 0,
//            //dataset: angular.copy(simpleList)
//            getData: function ($defer, params) {
//                return simpleList
//            }
//        });
//
//        self.cancel = cancel;
//        self.del = del;
//        self.save = save;
//
//        //////////
//
//        function cancel(row, rowForm) {
//            var originalRow = resetRow(row, rowForm);
//            angular.extend(row, originalRow);
//        }
//
//        function del(row) {
//            _.remove(self.tableParams.settings().dataset, function(item) {
//                return row === item;
//            });
//            self.tableParams.reload().then(function(data) {
//                if (data.length === 0 && self.tableParams.total() > 0) {
//                    self.tableParams.page(self.tableParams.page() - 1);
//                    self.tableParams.reload();
//                }
//            });
//        }
//
//        function resetRow(row, rowForm){
//            row.isEditing = false;
//            rowForm.$setPristine();
//            self.tableTracker.untrack(row);
//            return _.findWhere(originalData, function(r){
//                return r.id === row.id;
//            });
//        }
//
//        function save(row, rowForm) {
//            var originalRow = resetRow(row, rowForm);
//            angular.extend(originalRow, row);
//        }
//    }
//})();
//
//
//(function() {
//    "use strict";
//
//    stuInfo.run(configureDefaults);
//    configureDefaults.$inject = ["ngTableDefaults"];
//
//    function configureDefaults(ngTableDefaults) {
//        ngTableDefaults.params.count = 5;
//        ngTableDefaults.settings.counts = [];
//    }
//})();
//
///**********
// The following directives are necessary in order to track dirty state and validity of the rows
// in the table as the user pages within the grid
// ------------------------
// */
//
//(function() {
//    stuInfo.directive("demoTrackedTable", demoTrackedTable);
//
//    demoTrackedTable.$inject = [];
//
//    function demoTrackedTable() {
//        return {
//            restrict: "A",
//            priority: -1,
//            require: "ngForm",
//            controller: demoTrackedTableController
//        };
//    }
//
//    demoTrackedTableController.$inject = ["$scope", "$parse", "$attrs", "$element"];
//
//    function demoTrackedTableController($scope, $parse, $attrs, $element) {
//        var self = this;
//        var tableForm = $element.controller("form");
//        var dirtyCellsByRow = [];
//        var invalidCellsByRow = [];
//
//        init();
//
//        ////////
//
//        function init() {
//            var setter = $parse($attrs.demoTrackedTable).assign;
//            setter($scope, self);
//            $scope.$on("$destroy", function() {
//                setter(null);
//            });
//
//            self.reset = reset;
//            self.isCellDirty = isCellDirty;
//            self.setCellDirty = setCellDirty;
//            self.setCellInvalid = setCellInvalid;
//            self.untrack = untrack;
//        }
//
//        function getCellsForRow(row, cellsByRow) {
//            return _.find(cellsByRow, function(entry) {
//                return entry.row === row;
//            })
//        }
//
//        function isCellDirty(row, cell) {
//            var rowCells = getCellsForRow(row, dirtyCellsByRow);
//            return rowCells && rowCells.cells.indexOf(cell) !== -1;
//        }
//
//        function reset() {
//            dirtyCellsByRow = [];
//            invalidCellsByRow = [];
//            setInvalid(false);
//        }
//
//        function setCellDirty(row, cell, isDirty) {
//            setCellStatus(row, cell, isDirty, dirtyCellsByRow);
//        }
//
//        function setCellInvalid(row, cell, isInvalid) {
//            setCellStatus(row, cell, isInvalid, invalidCellsByRow);
//            setInvalid(invalidCellsByRow.length > 0);
//        }
//
//        function setCellStatus(row, cell, value, cellsByRow) {
//            var rowCells = getCellsForRow(row, cellsByRow);
//            if (!rowCells && !value) {
//                return;
//            }
//
//            if (value) {
//                if (!rowCells) {
//                    rowCells = {
//                        row: row,
//                        cells: []
//                    };
//                    cellsByRow.push(rowCells);
//                }
//                if (rowCells.cells.indexOf(cell) === -1) {
//                    rowCells.cells.push(cell);
//                }
//            } else {
//                _.remove(rowCells.cells, function(item) {
//                    return cell === item;
//                });
//                if (rowCells.cells.length === 0) {
//                    _.remove(cellsByRow, function(item) {
//                        return rowCells === item;
//                    });
//                }
//            }
//        }
//
//        function setInvalid(isInvalid) {
//            self.$invalid = isInvalid;
//            self.$valid = !isInvalid;
//        }
//
//        function untrack(row) {
//            _.remove(invalidCellsByRow, function(item) {
//                return item.row === row;
//            });
//            _.remove(dirtyCellsByRow, function(item) {
//                return item.row === row;
//            });
//            setInvalid(invalidCellsByRow.length > 0);
//        }
//    }
//})();
//
//(function() {
//    stuInfo.directive("demoTrackedTableRow", demoTrackedTableRow);
//
//    demoTrackedTableRow.$inject = [];
//
//    function demoTrackedTableRow() {
//        return {
//            restrict: "A",
//            priority: -1,
//            require: ["^demoTrackedTable", "ngForm"],
//            controller: demoTrackedTableRowController
//        };
//    }
//
//    demoTrackedTableRowController.$inject = ["$attrs", "$element", "$parse", "$scope"];
//
//    function demoTrackedTableRowController($attrs, $element, $parse, $scope) {
//        var self = this;
//        var row = $parse($attrs.demoTrackedTableRow)($scope);
//        var rowFormCtrl = $element.controller("form");
//        var trackedTableCtrl = $element.controller("demoTrackedTable");
//
//        self.isCellDirty = isCellDirty;
//        self.setCellDirty = setCellDirty;
//        self.setCellInvalid = setCellInvalid;
//
//        function isCellDirty(cell) {
//            return trackedTableCtrl.isCellDirty(row, cell);
//        }
//
//        function setCellDirty(cell, isDirty) {
//            trackedTableCtrl.setCellDirty(row, cell, isDirty)
//        }
//
//        function setCellInvalid(cell, isInvalid) {
//            trackedTableCtrl.setCellInvalid(row, cell, isInvalid)
//        }
//    }
//})();
//
//(function() {
//    stuInfo.directive("demoTrackedTableCell", demoTrackedTableCell);
//
//    demoTrackedTableCell.$inject = [];
//
//    function demoTrackedTableCell() {
//        return {
//            restrict: "A",
//            priority: -1,
//            scope: true,
//            require: ["^demoTrackedTableRow", "ngForm"],
//            controller: demoTrackedTableCellController
//        };
//    }
//
//    demoTrackedTableCellController.$inject = ["$attrs", "$element", "$scope"];
//
//    function demoTrackedTableCellController($attrs, $element, $scope) {
//        var self = this;
//        var cellFormCtrl = $element.controller("form");
//        var cellName = cellFormCtrl.$name;
//        var trackedTableRowCtrl = $element.controller("demoTrackedTableRow");
//
//        if (trackedTableRowCtrl.isCellDirty(cellName)) {
//            cellFormCtrl.$setDirty();
//        } else {
//            cellFormCtrl.$setPristine();
//        }
//        // note: we don't have to force setting validaty as angular will run validations
//        // when we page back to a row that contains invalid data
//
//        $scope.$watch(function() {
//            return cellFormCtrl.$dirty;
//        }, function(newValue, oldValue) {
//            if (newValue === oldValue) return;
//
//            trackedTableRowCtrl.setCellDirty(cellName, newValue);
//        });
//
//        $scope.$watch(function() {
//            return cellFormCtrl.$invalid;
//        }, function(newValue, oldValue) {
//            if (newValue === oldValue) return;
//
//            trackedTableRowCtrl.setCellInvalid(cellName, newValue);
//        });
//    }
//})();
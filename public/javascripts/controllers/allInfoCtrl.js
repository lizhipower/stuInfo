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
                            //filter: {
                            //    name: ''
                            //}
                            sorting: {
                                class: 'dasc'
                            }
                        },
                        {
                            //dataset: vm.data
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
                                //console.log(sortedByData);
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
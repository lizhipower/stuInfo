/**
 * Created by Dell on 2015/11/12.
 */
(function () {
    stuInfo.directive('xtable', function (newInfoService,$compile) {
            return {
            restrict: 'E'
            ,scope: {
                    table: '='
                    ,column: "="
                    ,colwidth: '='
                    ,data: "="
            }
            ,templateUrl:'./javascripts/directives/xtable/xtable.html'
            ,link: function (scope, element, attrs) {
                    var toggleFlag = false;
                    var addEle;
                    scope.doEdit = doEdit;
                    scope.doRemove = doRemove;
                    scope.doCancel = doCancel;
                    scope.doConfirm = doConfirm;
                    scope.doReset = doReset;
                    scope.save = save;
                    scope.isChange = false;
                    scope.doToggle = doToggle;

                    //scope.data = newInfoService.data;
                    scope.cols = newInfoService.ignoreCol;

                    function doToggle(event,row) {
                        //console.log(event.target.parentNode);
                        var index = row.index;
                        scope.isEditing = row.isEditing;
                        scope.eleData = scope.data[index-1];

                        var tarEle = angular.element(event.target);
                        if (event.target.nodeName.toUpperCase() == 'BUTTON') {
                            return;
                        }
                        var tr = tarEle.parent('tr');
                        //console.log('row',tr);
                        var trScope = tr.scope();
                        if (!toggleFlag) {
                            addEle = angular.element('<tr><td colspan="{{$columns.length}}"><xtd data="eleData" cols="cols" status="isEditing"></xtd></td></tr>');
                            toggleEle = tr.after($compile(addEle)(trScope));
                            toggleFlag = !toggleFlag;
                        } else {

                            addEle.remove();
                            toggleFlag = !toggleFlag;


                        }
                    }
                    function save()  {
                        newInfoService.save();
                        scope.isChange = false;
                    }
                    function changed() {
                        scope.isChange = true;
                    }
                    function doEdit(row) {
                        //newInfoService.reset();
                        var index = row.index;

                        console.log('rowEdit row: ', row);
                        console.log('rowEdit index: ', index);
                        row.initialStateRow = angular.copy(row);
                        row.initialStateRow.isEditing = false;
                        row.isEditing = true;
                        //console.log(row);
                    }
                    function doRemove(row) {
                        var index = row.index;
                        console.log('index: ', index);

                        console.log('doRemove: ', row);
                        newInfoService.remove(index);
                        changed();
                    }
                    function doConfirm(row) {
                        //console.log('rowConfirm: ', row);
                        var index = row.index;
                        console.log(row.initialStateRow);
                        console.log(row);
                        newInfoService.confirm(index, row.initialStateRow, row);
                        row.isEditing = false;
                        changed();
                    }
                    function doCancel(row) {
                        angular.forEach(row.initialStateRow, function (val, key) {
                            row[key] = val;
                        });
                        row.isEditing = false;

                        console.log('rowCancel: ', row);

                    }
                    function doReset($event) {
                        //console.log($event.target.tagName);
                        var targetName = $event.target.tagName.toUpperCase();
                        if ( targetName!== 'BUTTON' && targetName != 'INPUT') {
                            //TODO
                            //newInfoService.reset();
                        }

                    }
            }
        }
    })
})();

(function () {
    stuInfo.directive('xtd', function () {
        return {
            restrict: 'E'
            ,scope: {
                data: '='
                ,cols: "="
                ,status: "="
            }
            ,templateUrl:'./javascripts/directives/xtable/xtd.html'
            ,link: function (scope, element, attrs) {
            }
        }
    })
})();

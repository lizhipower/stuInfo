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
            }
            ,templateUrl:'./javascripts/directives/xtable/xtable.html'
            ,link: function (scope, element, attrs) {
                    var toggleFlag = false;
                    //var toggleEle;
                    var addEle;
                    scope.doEdit = doEdit;
                    scope.doRemove = doRemove;
                    scope.doCancel = doCancel;
                    scope.doConfirm = doConfirm;
                    scope.doReset = doReset;
                    scope.save = save;
                    scope.isChange = false;
                    scope.doToggle = doToggle;
                    function doToggle(event) {
                        //console.log(event.target.parentNode);
                        var tr = angular.element(event.target.parentNode);
                        var trScope = tr.scope();
                        console.log(tr);
                        if (!toggleFlag) {
                            addEle = angular.element('<tr><td colspan="{{$columns.length}}">yoooo</td></tr>');
                            toggleEle = tr.after($compile(addEle)(trScope));
                            console.log(addEle);
                            toggleFlag = !toggleFlag;
                        } else {
                            console.log(addEle);

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
    stuInfo.directive('xtr', function () {
        return {
            restrict: 'E'
            //,scope: {
            //    table: '='
            //    ,column: "="
            //    ,colwidth: '='
            //}
            //,templateUrl:'./javascripts/directives/xtable/xtable.html'
            ,link: function (scope, element, attrs) {

            }
        }
    })
})();

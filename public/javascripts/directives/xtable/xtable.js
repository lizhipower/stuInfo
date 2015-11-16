/**
 * Created by Dell on 2015/11/12.
 */
(function () {
    stuInfo.directive('xtable', function (newInfoService) {
            return {
            restrict: 'E'
            ,scope: {
                    table: '='
                    ,column: "="
                    ,colwidth: '='
            }
            ,templateUrl:'./javascripts/directives/xtable/xtable.html'
            ,link: function (scope, element, attrs) {
                    scope.doEdit = doEdit;
                    scope.doRemove = doRemove;
                    scope.doCancel = doCancel;
                    scope.doConfirm = doConfirm;
                    scope.doReset = doReset;
                    scope.save = save;
                    scope.isChange = false;
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
                            newInfoService.reset();
                        }

                    }
            }
        }
    })
})();

/**
 * Created by Zhi_LI on 2015/11/7.
 */
stuInfo.directive('autoHeight', ['$compile','$location',function ($compile,$location) {
    function autoHeight(ft, hd, sd, bd) {
        $(document).ready(function() {
            resetHeight();
        });
        resetHeight();
        function resetHeight() {
            var documentHeight,headerHeight,headerFooter,rowHeight;
            documentHeight = $(window).height();

            headerHeight = hd.height();
            headerFooter = ft.height();
            //console.log('documentHeight',documentHeight);
            rowHeight = documentHeight - headerHeight -headerFooter;
            //console.log('rowHeight',rowHeight);
            sd.height(rowHeight);
            bd.height(rowHeight);
        }




    }
    return {
        restrict: 'A'
        ,link: function(scope, element, attrs) {
            var ft, hd, sd, bd;
            hd = $('div#header');
            ft = $('div#footer');
            sd = $('div#sd');
            bd = $('div#bd');
            autoHeight(ft, hd, sd, bd);
            $(window).resize(function () {
                autoHeight(ft, hd, sd, bd);
                //alert('resized')
            })
        }

    }

}]),
    (function () {
})();
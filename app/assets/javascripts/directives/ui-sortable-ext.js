angular.module('todoApp').directive('uiSortableExt', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var toggleSortable;
            toggleSortable = function() {
                return element.sortable(scope[attrs.uiSortableExt] ? 'enable' : 'disable');
            };
            return scope.$watch(attrs.uiSortableExt, toggleSortable, true);
        }
    };
});

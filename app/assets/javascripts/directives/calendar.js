angular.module('todoApp').directive('calendar', function() {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        template: '<div ng-transclude class="calendar-button"></div>',
        scope: {
            model: '=',
            onChange: '&'
        },
        link: function(scope, element, attrs) {
            var createHiddenInput, hiddenInput, hideInput;
            createHiddenInput = function() {
                var input;
                input = angular.element("<input type='text'>");
                element.parent().append(input);
                hideInput(input);
                return input;
            };
            hideInput = function(input) {
                input.css("width", "0");
                input.css("height", "0");
                input.css("opacity", "0");
                input.css("filter", "alpha(opacity=0)");
                input.css("-moz-opacity", "0");
                input.css("-khtml-opacity", "0");
                input.css("position", "relative");
                return input.css("top", "-15px");
            };
            hiddenInput = createHiddenInput();
            hiddenInput.datepicker({
                dateFormat: 'yy-mm-dd'
            });
            hiddenInput.datepicker('setDate', scope.model);
            element.bind("click", function(event) {
                return hiddenInput.datepicker('show');
            });
            return hiddenInput.bind('change', function() {
                scope.model = hiddenInput.val();
                scope.$apply();
                scope.onChange();
                return scope.$apply();
            });
        }
    };
});
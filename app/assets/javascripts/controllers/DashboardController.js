angular.module('todoApp').controller("DashboardController", function($scope, $routeParams, $location, TaskList) {
    var serverErrorHandler;
    $scope.init = function() {
        this.listsService = new TaskList(serverErrorHandler);
        return $scope.lists = this.listsService.all();
    };
    $scope.createList = function(name) {
        return this.listsService.create({
            name: name
        }, function(list) {
            return $location.url("/task_lists/" + list.id);
        });
    };
    $scope.deleteList = function(list, index) {
        var result;
        result = confirm("Are you sure you want to remove this list?");
        if (result) {
            this.listsService["delete"](list);
            return $scope.lists.splice(index, 1);
        }
    };
    return serverErrorHandler = function() {
        return alert("There was a server error, please reload the page and try again.");
    };
});

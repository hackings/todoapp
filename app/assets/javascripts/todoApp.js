var todoApp;

todoApp = angular.module('todoApp', ['ngResource', 'ngRoute', 'mk.editablespan', 'ui.sortable']);

todoApp.config(function($httpProvider) {
    var authToken;
    authToken = $("meta[name=\"csrf-token\"]").attr("content");
    return $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = authToken;
});

todoApp.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.when('/', {
        redirectTo: '/dashboard'
    });
    $routeProvider.when('/dashboard', {
        templateUrl: '/templates/dashboard.html',
        controller: 'DashboardController'
    });
    return $routeProvider.when('/task_lists/:list_id', {
        templateUrl: '/templates/task_list.html',
        controller: 'TodoListController'
    });
});

$(document).on('page:load', function() {
    return $('[ng-app]').each(function() {
        var module;
        module = $(this).attr('ng-app');
        return angular.bootstrap(this, [module]);
    });
});
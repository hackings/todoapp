angular.module('todoApp').factory('Task', function($resource, $http) {
    var Task;
    return Task = (function() {
        function Task(taskListId, errorHandler) {
            var defaults;
            this.service = $resource('/api/task_lists/:task_list_id/tasks/:id', {
                task_list_id: taskListId,
                id: '@id'
            }, {
                update: {
                    method: 'PATCH'
                }
            });
            this.errorHandler = errorHandler;
            defaults = $http.defaults.headers;
            defaults.patch = defaults.patch || {};
            defaults.patch['Content-Type'] = 'application/json';
        }

        Task.prototype.create = function(attrs) {
            new this.service({
                task: attrs
            }).$save((function(task) {
                    return attrs.id = task.id;
                }), this.errorHandler);
            return attrs;
        };

        Task.prototype["delete"] = function(task) {
            return new this.service().$delete({
                id: task.id
            }, (function() {
                return null;
            }), this.errorHandler);
        };

        Task.prototype.update = function(task, attrs) {
            return new this.service({
                task: attrs
            }).$update({
                    id: task.id
                }, (function() {
                return null;
            }), this.errorHandler);
        };

        Task.prototype.all = function() {
            return this.service.query((function() {
                return null;
            }), this.errorHandler);
        };

        return Task;

    })();
});
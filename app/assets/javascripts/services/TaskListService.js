angular.module('todoApp').factory('TaskList', function($resource, $http) {
    var TaskList;
    return TaskList = (function() {
        function TaskList(errorHandler) {
            var defaults;
            this.service = $resource('/api/task_lists/:id', {
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

        TaskList.prototype.create = function(attrs, successHandler) {
            return new this.service({
                list: attrs
            }).$save((function(list) {
                    return successHandler(list);
                }), this.errorHandler);
        };

        TaskList.prototype["delete"] = function(list) {
            return new this.service().$delete({
                id: list.id
            }, (function() {
                return null;
            }), this.errorHandler);
        };

        TaskList.prototype.update = function(list, attrs) {
            return new this.service({
                list: attrs
            }).$update({
                    id: list.id
                }, (function() {
                return null;
            }), this.errorHandler);
        };

        TaskList.prototype.all = function() {
            return this.service.query((function() {
                return null;
            }), this.errorHandler);
        };

        TaskList.prototype.find = function(id, successHandler) {
            return this.service.get({
                id: id
            }, (function(list) {
                if (typeof successHandler === "function") {
                    successHandler(list);
                }
                return list;
            }), this.errorHandler);
        };

        return TaskList;

    })();
});
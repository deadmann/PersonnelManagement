/**
 * Created by Hassan on 11/18/2016.
 */
(function(){
    "use strict";

    var service = function ($resource) {
        return $resource("/rest/works/:id", {

        },{
            "get": {
                method :"GET",
                /** @param data {WorkVm} */
                transformResult: function (data) {
                    return ModelHelper.toWork(data);
                }
            },
            "query": {
                method: "GET",
                isArray: true,
                /** @param data {Array<WorkVm>} */
                transformResult: function (data) {
                    return ModelHelper.toArray(data, ModelType.Work);
                }
            },
            // 'save': {method: 'POST'},
            // 'remove': {method: 'DELETE'},
            // 'delete': {method: 'DELETE'}
        })
    };

    service.$inject = ["$resource"];

    angular.module("personnelManagement")
        .service("workService", service);
})();
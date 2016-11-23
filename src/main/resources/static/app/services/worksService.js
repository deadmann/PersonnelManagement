/**
 * Created by Hassan on 11/18/2016.
 */
(function(){
    "use strict";

    var service = function ($resource) {
        return $resource("/rest/works/:id:param1/:param2/:param3/:param4", {

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
            "getAllWorksByPersonAndMonth": {
                method: "GET",
                isArray: true,
                params: {
                    param1: "by-person-and-month",
                    param2: "@param2",//@personId
                    param3: "@param3",//@year
                    param4: "@param4"//@month
                },
                /** @param data {Array<WorkVm>} */
                transformResult: function (data) {
                    return ModelHelper.toArray(data, ModelType.Work)
                }
            },
            // 'save': {method: 'POST'},
            // 'remove': {method: 'DELETE'},
            // 'delete': {method: 'DELETE'}
        })
    };

    service.$inject = ["$resource"];

    angular.module("personnelManagement")
        .service("worksService", service);
})();
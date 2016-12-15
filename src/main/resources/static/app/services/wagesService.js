/**
 * Created by Hassan on 11/18/2016.
 */
(function(){
    "use strict";

    var service = function ($resource) {
        return $resource("/rest/wages/:id:param1/:param2", {

        },{
            "get": {
                method :"GET",
                /** @param data {WageVm} */
                transformResult: function (data) {
                    return ModelHelper.toWage(data);
                }
            },
            "query": {
                method: "GET",
                isArray: true,
                /** @param data {Array<WageVm>} */
                transformResult: function (data) {
                    return ModelHelper.toArray(data, ModelType.Wage);
                }
            },
            "queryByPositionId": {
                method: "GET",
                isArray: true,
                params:{
                    param1: "by-position-id",
                    param2: "@param2",//@positionId
                },
                /** @param data {Array<WageVm>} */
                transformResult: function (data) {
                    return ModelHelper.toArray(data, ModelType.Wage);
                }
            },
            'save': {
                method: 'POST',
                /** @param data {WageVm} */
                transformResult: function (data) {
                    return ModelHelper.toWage(data);
                }
            },
            // 'remove': {method: 'DELETE'},
            // 'delete': {method: 'DELETE'}
            'update': {
                method: "PUT",
                /** @param data {WageVm} */
                transformResult: function (data) {
                    return ModelHelper.toWage(data);
                }
            }
        })
    };

    service.$inject = ["$resource"];

    angular.module("personnelManagement")
        .service("wagesService", service);
})();
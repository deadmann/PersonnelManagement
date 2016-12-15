/**
 * Created by Hassan on 11/18/2016.
 */
(function(){
    "use strict";

    var service = function ($resource) {
        return $resource("/rest/positions/:id:param1", {

        },{
            "get": {
                method :"GET",
                /** @param data {PositionVm} */
                transformResult: function (data) {
                    return ModelHelper.toPosition(data);
                }
            },
            "query": {
                method: "GET",
                isArray: true,
                /** @param data {Array<PositionVm>} */
                transformResult: function (data) {
                    return ModelHelper.toArray(data, ModelType.Position);
                }
            },
            "queryFetchWages": {
                method: "GET",
                isArray: true,
                params:{
                    param1: 'fetch-wage'
                },
                /** @param data {Array<PositionVm>} */
                transformResult: function (data) {
                    return ModelHelper.toArray(data, ModelType.Position);
                }
            },
            'save': {
                method: 'POST',
                /** @param data {PositionVm} */
                transformResult: function (data) {
                    return ModelHelper.toPosition(data);
                }
            },
            // 'remove': {method: 'DELETE'},
            // 'delete': {method: 'DELETE'}
            'update': {
                method: 'PUT',
                /** @param data {PositionVm} */
                transformResult: function (data) {
                    return ModelHelper.toPosition(data);
                }
            }
        })
    };

    service.$inject = ["$resource"];

    angular.module("personnelManagement")
        .service("positionsService", service);
})();
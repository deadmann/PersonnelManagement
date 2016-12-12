/**
 * Created by Hassan on 11/18/2016.
 */
(function(){
    "use strict";

    var service = function ($resource) {
        return $resource("/rest/positions/:id", {

        },{
            "get": {
                method :"GET",
                /** @param data {PositionVm} */
                transformResult: function (data) {
                    return ModelHelper.toBuilding(data);
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
                /** @param data {Array<PositionVm>} */
                transformResult: function (data) {
                    return ModelHelper.toArray(data, ModelType.Position);
                }
            },
            // 'save': {method: 'POST'},
            // 'remove': {method: 'DELETE'},
            // 'delete': {method: 'DELETE'}
            'update': {method: 'PUT'}
        })
    };

    service.$inject = ["$resource"];

    angular.module("personnelManagement")
        .service("positionsService", service);
})();
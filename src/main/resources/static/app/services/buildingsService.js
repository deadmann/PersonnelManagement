/**
 * Created by Hassan on 11/18/2016.
 */
(function(){
    "use strict";

    var service = function ($resource) {
        return $resource("/rest/buildings/:id", {

        },{
            "get": {
                method :"GET",
                /** @param data {BuildingVm} */
                transformResult: function (data) {
                    return ModelHelper.toBuilding(data);
                }
            },
            "query": {
                method: "GET",
                isArray: true,
                /** @param data {Array<BuildingVm>} */
                transformResult: function (data) {
                    return ModelHelper.toArray(data, ModelType.Building);
                }
            },
            // 'save': {method: 'POST'},
            // 'remove': {method: 'DELETE'},
            // 'delete': {method: 'DELETE'}
        });
    };

    service.$inject = ["$resource"];

    angular.module("personnelManagement")
        .service("buildingsService", service);
})();
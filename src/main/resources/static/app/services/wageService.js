/**
 * Created by Hassan on 11/18/2016.
 */
(function(){
    "use strict";

    var service = function ($resource) {
        return $resource("/rest/wages/:id", {

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
            // 'save': {method: 'POST'},
            // 'remove': {method: 'DELETE'},
            // 'delete': {method: 'DELETE'}
        })
    };

    service.$inject = ["$resource"];

    angular.module("personnelManagement")
        .service("wageService", service);
})();
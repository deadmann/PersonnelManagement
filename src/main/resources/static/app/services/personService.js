/**
 * Created by Hassan on 11/18/2016.
 */
(function(){
    "use strict";

    var service = function ($resource) {
        return $resource("/rest/personnel/:id", {

        },{
            "get": {
                method :"GET",
                /** @param data {PersonVm} */
                transformResult: function (data) {
                    return ModelHelper.toPerson(data);
                }
            },
            "query": {
                method: "GET",
                isArray: true,
                /** @param data {Array<PersonVm>} */
                transformResult: function (data) {
                    return ModelHelper.toArray(data, ModelType.Person);
                }
            },
            // 'save': {method: 'POST'},
            // 'remove': {method: 'DELETE'},
            // 'delete': {method: 'DELETE'}
        })
    };

    service.$inject = ["$resource"];

    angular.module("personnelManagement")
        .service("personService", service);
})();
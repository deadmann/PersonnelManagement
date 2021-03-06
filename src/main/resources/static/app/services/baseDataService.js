/**
 * Created by Hassan on 11/20/2016.
 */
(function(){
    'use strict';

    var service = function ($resource) {
        return $resource("/rest/base-data/:param1/:param2/:param3", {
            // "param1" : "@param1",
            // "param2" : "@param2",
            // "param3" : "@param3"
        },{
            "getCopyRightInfo": {
                method: "GET",
                params:{
                    param1: "copy-right-info"
                },
                transformResult: function (data) {
                    return ModelHelper.toCopyRightInfo(data);
                }
            },
            "getDaysInMonth": {
                method: "GET",
                params: {
                    param1: "days-in-month",
                    param2: "@param2",//@year
                    param3: "@param3"//@month
                },
                transformResponse: function (data) {
                    return {value: parseInt(data)}
                },
                transformResult: function (data) {
                    return data.value;
                }
            },
            "getCurrentYear": {
                method: "GET",
                params:{
                    param1: "current-year"
                },
                transformResponse: function (data) {
                    return {value: parseInt(data)}
                },
                transformResult: function (data) {
                    return data.value;
                }
            },
            "getStartYear": {
                method: "GET",
                params:{
                    param1: "start-year"
                },
                transformResponse: function (data) {
                    return {value: parseInt(data)}
                },
                transformResult: function (data) {
                    return data.value;
                }
            }
        })
    };

    service.$inject = ["$resource"];

    angular.module("personnelManagement")
        .service("baseDataService", service);
})();
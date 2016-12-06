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
            /** We should supply personId(param2), startDate(@param3) as yyyy-mm-dd, and endDate(@param4) as yyyy-mm-dd for it to work  */
            "getWorksByPersonAndDateBetween":{
                method: "GET",
                isArray: true,
                params: {
                    param1: "by-person-and-date-between",
                    param2: "@param2",//@personId
                    param3: "@param3",//@startDate
                    param4: "@param4"//@endDate
                },
                /** @param data {Array<WorkVm>} */
                transformResult: function (data) {
                    return ModelHelper.toArray(data, ModelType.Work);
                }
            },
            /** We should supply buildingId(param2), startDate(@param3) as yyyy-mm-dd, and endDate(@param4) as yyyy-mm-dd for it to work  */
            "getWorksByBuildingAndDateBetween":{
                method: "GET",
                isArray: true,
                params: {
                    param1: "by-building-and-date-between",
                    param2: "@param2",//@buildingId
                    param3: "@param3",//@startDate
                    param4: "@param4"//@endDate
                },
                /** @param data {Array<WorkVm>} */
                transformResult: function (data) {
                    return ModelHelper.toArray(data, ModelType.Work);
                }
            },
            /** We should supply positionId(param2), startDate(@param3) as yyyy-mm-dd, and endDate(@param4) as yyyy-mm-dd for it to work  */
            "getWorksByPositionAndDateBetween":{
                method: "GET",
                isArray: true,
                params: {
                    param1: "by-position-and-date-between",
                    param2: "@param2",//@positionId
                    param3: "@param3",//@startDate
                    param4: "@param4"//@endDate
                },
                /** @param data {Array<WorkVm>} */
                transformResult: function (data) {
                    return ModelHelper.toArray(data, ModelType.Work);
                }
            },
            /** We should supply personId(param2), year(@param3), and month(@param4) for it to work  */
            "getWorksByPersonAndMonth": {
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
            /** We should supply personId(param2), year(@param3), and month(@param4) for it to work  */
            "getWorkPerDaysByPersonAndMonth":{
                method: "GET",
                isArray: true,
                params: {
                    param1: "work-per-days-by-person-and-month",
                    param2: "@param2",//@personId
                    param3: "@param3",//@year
                    param4: "@param4"//@month
                },
                /** @param data {Array<WorkPerDayDto>} */
                transformResult: function (data) {
                    return ModelHelper.toArray(data, ModelType.WorkPerDayDto);
                }
            },
            // 'save': {method: 'POST'},
            /** We should supply personId(param2), year(@param3), and month(@param4) for it to work  */
            "saveWorkPerDaysClearPersonMonth": {
                method: "POST",
                params: {
                    param1: "save-work-per-days-clear-person-month",
                    param2: "@param2",//@personId
                    param3: "@param3",//@year
                    param4: "@param4"//@month
                }
            }
            // 'remove': {method: 'DELETE'},
            // 'delete': {method: 'DELETE'}
        })
    };

    service.$inject = ["$resource"];

    angular.module("personnelManagement")
        .service("worksService", service);
})();
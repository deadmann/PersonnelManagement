/**
 * Created by Hassan on 11/20/2016.
 */
(function(){
    'use strict';

    var service = function ($resource) {
        return $resource("/rest/base-data/:param1",{

        },{
            "daysInMonth": {
                method: "GET",
                params:{
                    param1: "days-in-month"
                }
            }
        })
    };

    service.$inject = ["$resource"];

    angular.module("personnelManagement")
        .service("baseDataService", service);
})();
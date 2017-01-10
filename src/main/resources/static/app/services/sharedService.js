/**
 * Created by Hassan on 1/4/2017.
 */
(function(){
    'use strict';

    var sharedData = null;

    var service = function () {
        if(sharedData == null)
            sharedData = new SharedModel();
        return {
            getSharedData:function(){
                return sharedData;
            }
        };
    };

    service.$inject = ["$resource"];

    angular.module("personnelManagement")
        .service("sharedService", service);
})();
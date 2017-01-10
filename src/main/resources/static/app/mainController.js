/**
 * Created by Hassan on 1/4/2017.
 */
(function(){
    "use strict";

    var controller = function ($scope, sharedService, toaster) {
        var self = this;
        var logger = ErrorHandler.getInstance();

        self.view={
            /** @type {SharedModel} */
            sharedData: null
        };

        function initialize() {
            self.view.sharedData = sharedService.getSharedData();
            self.view.sharedData.title = "نرم افزار مدیریت کارکرد پرسنل";
        }

        initialize();
    };

    controller.$inject = ["$scope", "sharedService", "toaster"];

    angular.module("personnelManagement")
        .controller("mainController", controller);
})();
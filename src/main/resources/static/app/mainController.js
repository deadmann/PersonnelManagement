/**
 * Created by Hassan on 1/4/2017.
 */
(function(){
    "use strict";

    var controller = function ($scope, sharedService, baseDataService, toaster) {
        var self = this;
        var logger = ErrorHandler.getInstance();

        self.view={
            /** @type {SharedModel} */
            sharedData: null,
            /** @type {CopyRightInfo} */
            copyRightInfo: null
        };

        function initialize() {
            baseDataService.getCopyRightInfo().$promise
                .then(function(data){
                    self.view.copyRightInfo = data;
                },function(err){
                    logger.pop(toaster, new ToasterData(
                        "error", "خطا"
                        , "در هنگام دریافت اطلاعات حق کپی خطایی رخ داده است"
                        , null));
                });

            self.view.sharedData = sharedService.getSharedData();
            self.view.sharedData.title = "نرم افزار مدیریت کارکرد پرسنل";
        }

        initialize();
    };

    controller.$inject = ["$scope", "sharedService" , "baseDataService", "toaster"];

    angular.module("personnelManagement")
        .controller("mainController", controller);
})();
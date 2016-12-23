/**
 * Created by Hassan on 11/18/2016.
 */
(function(){
    "use strict";

    var controller = function ($location, buildingsService, toaster) {
        var self = this;
        var logger = ErrorHandler.getInstance();

        self.view={
            /** @type {BuildingVm}*/
            building: null
        };

        self.event={
            save: function() {
                buildingsService.save({}, self.view.building).$promise
                    .then(function (data) {
                        //self.view.buildings = data;
                        $location.path("/building");
                    }, function (err) {
                        logger.pop(toaster, new ToasterData(
                            "error",
                            "خطا",
                            "در هنگام ذخیره اطلاعات ساختمان یک خطا رخ داده است"
                        ));
                    });
            },
            cancel: function(){
                $location.path("/building");
            }
        };

        function initialize() {
            self.view.building = new BuildingVm();
        }

        initialize();
    };

    controller.$inject = ["$location", "buildingsService", "toaster"];

    angular.module("personnelManagement")
        .controller("buildingInsertController", controller);
})();
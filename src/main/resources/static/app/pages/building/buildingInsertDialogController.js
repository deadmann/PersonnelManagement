/**
 * Created by Hassan on 11/18/2016.
 */
(function(){
    "use strict";

    var controller = function ($scope, buildingsService, toaster) {
        var self = this;
        var logger = ErrorHandler.getInstance();

        self.view={
            /** @type {BuildingVm}*/
            building: null
        };

        self.event={
            close: function () {
                $scope.closeThisDialog();
            },
            save: function() {
                buildingsService.save({}, self.view.building).$promise
                    .then(function (data) {
                        logger.pop( toaster, new ToasterData(
                            "success",
                            "توضیحات",
                            "پروژه " + self.view.building.name + " با موفقیت افزوده شد"
                        ));
                        $scope.confirm(data);
                    }, function (err) {
                        logger.pop( toaster, new ToasterData(
                            "error",
                            "خطا",
                            "یک خطای ناشناس در هنگام افزودن پروژه " + self.view.building.name + " رخ داده است"
                        ));
                    });
            }
        };

        function initialize() {
            self.view.building = new BuildingVm();
        }

        initialize();
    };

    controller.$inject = ["$scope", "buildingsService", "toaster"];

    angular.module("personnelManagement")
        .controller("buildingInsertDialogController", controller);
})();
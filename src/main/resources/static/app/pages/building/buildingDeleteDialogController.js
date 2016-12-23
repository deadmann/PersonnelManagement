/**
 * Created by Hassan on 12/10/2016.
 */
(function(){
    "use strict";

    var controller = function ($scope, selectedItem, buildingsService, toaster) {
        var self = this;
        var logger = ErrorHandler.getInstance();

        self.view={
            /** @type {BuildingVm} */
            building: null
        };

        self.event={
            close: function () {
                $scope.closeThisDialog();
            },
            confirmDelete: function() {
                buildingsService.remove({id: self.view.building.id}).$promise
                    .then(function (data) {
                        logger.pop( toaster, new ToasterData(
                            "success",
                            "توضیحات",
                            "پروژه " + self.view.building.name + " با موفقیت حذف گشت"
                        ));
                        $scope.confirm(self.view.building);
                    }, function (err) {
                        if (err.status === 404) {
                            logger.pop( toaster, new ToasterData(
                                "warning",
                                "اخطار",
                                "پروژه " + self.view.building.name + " پیدا نشد"
                            ));
                        } else if (err.status === 409) {
                            logger.pop( toaster, new ToasterData(
                                "warning",
                                "اخطار",
                                "پروژه " + self.view.building.name + " توسط اجزای دیگر برنامه در حال استفاده می باشد"
                            ));
                        } else {
                            logger.pop( toaster, new ToasterData(
                                "error",
                                "خطا",
                                "یک خطای ناشناس در هنگام حذف پروژه " + self.view.building.name + " رخ داده است"
                            ));
                        }
                    });
            }
        };

        function initialize() {
            self.view.building = selectedItem;
        }

        initialize();
    };

    controller.$inject = ["$scope", "selectedItem", "buildingsService", "toaster"];

    angular.module("personnelManagement")
        .controller("buildingDeleteDialogController", controller);
})();
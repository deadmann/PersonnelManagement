/**
 * Created by Hassan on 12/11/2016.
 */
(function(){
    "use strict";

    var controller = function ($scope, selectedItem, buildingsService, toaster) {
        var self = this;
        var logger = ErrorHandler.getInstance();

        self.view={
            /** @type {BuildingVm}*/
            building: null
        };

        self.event= {
            close: function () {
                $scope.closeThisDialog();
            },
            save: function () {
                buildingsService.update({id:self.view.building.id}, self.view.building).$promise
                    .then(function (data) {
                        logger.pop( toaster, new ToasterData(
                            "success",
                            "توضیحات",
                            "پروژه " + self.view.building.name + " با موفقیت ویرایش شد"
                        ));
                        $scope.confirm(data);
                    }, function (err) {
                        if (err.status === 404) {
                            logger.pop( toaster, new ToasterData(
                                "warning",
                                "اخطار",
                                "پروژه " + selectedItem.name + " پیدا نشد"
                            ));
                        } else {
                            logger.pop( toaster, new ToasterData(
                                "error",
                                "خطا",
                                "یک خطای ناشناس در هنگام ذخیره اطلاعات پروژه " + self.view.building.name + " رخ داده است"
                            ));
                        }
                    });
            }
        };


        function initialize() {
            //1. We do not want to edit original item
            //2. We want to fetch last version of data
            buildingsService.get({id:selectedItem.id}).$promise
                .then(/** @param data {BuildingVm}*/function(data){
                    self.view.building = data;
                }, function (err) {
                    if (err.status === 404) {
                        logger.pop( toaster, new ToasterData(
                            "warning",
                            "اخطار",
                            "ساختمان " + selectedItem.name + " پیدا نشد"
                        ));
                    } else {
                        logger.pop( toaster, new ToasterData(
                            "error",
                            "خطا",
                            "یک خطای ناشناس در هنگام دریافت آخرین اطلاعات ساختمان " + selectedItem.name + " رخ داده است"
                        ));
                    }
                });
        }

        initialize();
    };

    controller.$inject = ["$scope", "selectedItem", "buildingsService", "toaster"];

    angular.module("personnelManagement")
        .controller("buildingUpdateDialogController", controller);
})();
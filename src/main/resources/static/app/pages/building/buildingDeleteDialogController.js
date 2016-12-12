/**
 * Created by Hassan on 12/10/2016.
 */
(function(){
    "use strict";

    var controller = function ($scope, selectedItem, buildingsService, toaster) {
        var self = this;

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
                        toaster.pop({
                            type: "success",
                            title: "توضیحات",
                            body: "ساختمان " + self.view.building.name + " با موفقیت حذف گشت"
                        });
                        $scope.confirm(self.view.building);
                    }, function (err) {
                        if (err.status === 404) {
                            toaster.pop({
                                type: "warning",
                                title: "اخطار",
                                body: "ساختمان " + self.view.building.name + " پیدا نشد"
                            });
                        } else if (err.status === 409) {
                            toaster.pop({
                                type: "warning",
                                title: "اخطار",
                                body: "ساختمان " + self.view.building.name + " توسط اجزای دیگر برنامه در حال استفاده می باشد"
                            });
                        } else {
                            toaster.pop({
                                type: "error",
                                title: "خطا",
                                body: "یک خطای ناشناس در هنگام حذف ساختمان " + self.view.building.name + " رخ داده است"
                            });
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
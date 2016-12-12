/**
 * Created by Hassan on 12/13/2016.
 */
(function(){
    "use strict";

    var controller = function ($scope, selectedItem, positionsService, toaster) {
        var self = this;

        self.view={
            /** @type {PositionVm} */
            position: null
        };

        self.event={
            close: function () {
                $scope.closeThisDialog();
            },
            confirmDelete: function() {
                positionsService.remove({id: self.view.position.id}).$promise
                    .then(function (data) {
                        toaster.pop({
                            type: "success",
                            title: "توضیحات",
                            body: "سمت " + self.view.position.title + " با موفقیت حذف گشت"
                        });
                        $scope.confirm(self.view.position);
                    }, function (err) {
                        if (err.status === 404) {
                            toaster.pop({
                                type: "warning",
                                title: "اخطار",
                                body: "سمت " + self.view.position.title + " پیدا نشد"
                            });
                        } else if (err.status === 409) {
                            toaster.pop({
                                type: "warning",
                                title: "اخطار",
                                body: "سمت " + self.view.position.title + " توسط اجزای دیگر برنامه در حال استفاده می باشد"
                            });
                        } else {
                            toaster.pop({
                                type: "error",
                                title: "خطا",
                                body: "یک خطای ناشناس در هنگام حذف سمت " + self.view.position.title + " رخ داده است"
                            });
                        }
                    });
            }
        };

        function initialize() {
            self.view.position = selectedItem;
        }

        initialize();
    };

    controller.$inject = ["$scope", "selectedItem", "positionsService", "toaster"];

    angular.module("personnelManagement")
        .controller("positionDeleteDialogController", controller);
})();
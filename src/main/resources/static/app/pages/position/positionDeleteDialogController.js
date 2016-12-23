/**
 * Created by Hassan on 12/13/2016.
 */
(function(){
    "use strict";

    var controller = function ($scope, selectedItem, positionsService, toaster) {
        var self = this;
        var logger = ErrorHandler.getInstance();

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
                        logger.pop( toaster, new ToasterData(
                            "success",
                            "توضیحات",
                            "سمت " + self.view.position.title + " با موفقیت حذف گشت"
                        ));
                        $scope.confirm(self.view.position);
                    }, function (err) {
                        if (err.status === 404) {
                            logger.pop( toaster, new ToasterData(
                                "warning",
                                "اخطار",
                                "سمت " + self.view.position.title + " پیدا نشد"
                            ));
                        } else if (err.status === 409) {
                            logger.pop( toaster, new ToasterData(
                                "warning",
                                "اخطار",
                                "سمت " + self.view.position.title + " توسط اجزای دیگر برنامه در حال استفاده می باشد"
                            ));
                        } else {
                            logger.pop( toaster, new ToasterData(
                                "error",
                                "خطا",
                                "یک خطای ناشناس در هنگام حذف سمت " + self.view.position.title + " رخ داده است"
                            ));
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
/**
 * Created by Hassan on 12/13/2016.
 */
(function(){
    "use strict";

    var controller = function ($scope, selectedItem, personnelService, toaster) {
        var self = this;
        var logger = ErrorHandler.getInstance();

        self.view={
            /** @type {PersonVm} */
            person: null
        };

        self.event={
            close: function () {
                $scope.closeThisDialog();
            },
            confirmDelete: function() {
                personnelService.remove({id: self.view.person.id}).$promise
                    .then(function (data) {
                        logger.pop( toaster, new ToasterData(
                            "success",
                            "توضیحات",
                            "شخص " + self.view.person.getFullName() + " با موفقیت حذف گشت"
                        ));
                        $scope.confirm(self.view.person);
                    }, function (err) {
                        if (err.status === 404) {
                            logger.pop( toaster, new ToasterData(
                                "warning",
                                "اخطار",
                                "شخص " + self.view.person.getFullName() + " پیدا نشد"
                            ));
                        } else if (err.status === 409) {
                            logger.pop( toaster, new ToasterData(
                                "warning",
                                "اخطار",
                                "شخص " + self.view.person.getFullName() + " توسط اجزای دیگر برنامه در حال استفاده می باشد"
                            ));
                        } else {
                            logger.pop( toaster, new ToasterData(
                                "error",
                                "خطا",
                                "یک خطای ناشناس در هنگام حذف ساختمان " + self.view.person.getFullName() + " رخ داده است"
                            ));
                        }
                    });
            }
        };

        function initialize() {
            self.view.person = selectedItem;
        }

        initialize();
    };

    controller.$inject = ["$scope", "selectedItem", "personnelService", "toaster"];

    angular.module("personnelManagement")
        .controller("personDeleteDialogController", controller);
})();
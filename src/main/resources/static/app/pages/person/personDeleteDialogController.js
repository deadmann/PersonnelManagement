/**
 * Created by Hassan on 12/13/2016.
 */
(function(){
    "use strict";

    var controller = function ($scope, selectedItem, personnelService, toaster) {
        var self = this;

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
                        toaster.pop({
                            type: "success",
                            title: "توضیحات",
                            body: "شخص " + self.view.person.getFullName() + " با موفقیت حذف گشت"
                        });
                        $scope.confirm(self.view.person);
                    }, function (err) {
                        if (err.status === 404) {
                            toaster.pop({
                                type: "warning",
                                title: "اخطار",
                                body: "شخص " + self.view.person.getFullName() + " پیدا نشد"
                            });
                        } else if (err.status === 409) {
                            toaster.pop({
                                type: "warning",
                                title: "اخطار",
                                body: "شخص " + self.view.person.getFullName() + " توسط اجزای دیگر برنامه در حال استفاده می باشد"
                            });
                        } else {
                            toaster.pop({
                                type: "error",
                                title: "خطا",
                                body: "یک خطای ناشناس در هنگام حذف ساختمان " + self.view.person.getFullName() + " رخ داده است"
                            });
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
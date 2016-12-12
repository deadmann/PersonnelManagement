/**
 * Created by Hassan on 12/12/2016.
 */

(function(){
    "use strict";

    var controller = function ($scope, personnelService, positionsService, toaster) {
        var self = this;

        self.view={
            /** @type {PersonVm}*/
            person: null,
            /** @type {Array<PositionVm>} */
            positions: null
        };

        self.event={
            close: function () {
                $scope.closeThisDialog();
            },
            save: function() {
                personnelService.save({}, self.view.person).$promise
                    .then(function (data) {
                        toaster.pop({
                            type: "success",
                            title: "توضیحات",
                            body: "شخص " + self.view.person.getFullName() + " با موفقیت افزوده شد"
                        });
                        $scope.confirm(data);
                    }, function (err) {
                        toaster.pop({
                            type: "error",
                            title: "خطا",
                            body: "یک خطای ناشناس در هنگام افزودن شخص " + self.view.person.getFullName() + " رخ داده است"
                        });
                    });
            }
        };

        function initialize() {
            positionsService.query().$promise
                .then(function (data) {
                    self.view.positions = data;
                }, function (err) {
                    toaster.pop({
                        type: "error",
                        title: "خطا",
                        body: "خطایی در هنگام دریافت اطلاعات سمت ها رخ داده است."
                    });
                });
            self.view.person = new PersonVm();
        }

        initialize();
    };

    controller.$inject = ["$scope", "personnelService", "positionsService", "toaster"];

    angular.module("personnelManagement")
        .controller("personInsertDialogController", controller);
})();
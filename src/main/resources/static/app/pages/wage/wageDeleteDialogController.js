/**
 * Created by Hassan on 12/14/2016.
 */
(function(){
    "use strict";

    var controller = function ($scope, selectedItem, isFirstItem, positionItem, wagesService, toaster) {
        var DatePickerConfig = AngularUtility.DatePickerConfig;
        var self = this;

        self.view={
            /** @type {WageVm}*/
            wage: null,
            /** @type {PositionVm} */
            position: null,
            /** @type {boolean|null}*/
            isFirstItemInPosition: null
        };

        self.event={
            close: function () {
                $scope.closeThisDialog();
            },
            confirmDelete: function() {
                wagesService.remove({id: self.view.wage.id}).$promise
                    .then(function (data) {
                        toaster.pop({
                            type: "success",
                            title: "توضیحات",
                            body: "دستمزد " + self.view.wage.persianStartDate + " با موفقیت حذف گشت"
                        });
                        $scope.confirm(self.view.wage);
                    }, function (err) {
                        if (err.status === 404) {
                            toaster.pop({
                                type: "warning",
                                title: "اخطار",
                                body: "دستمزد " + self.view.wage.persianStartDate + " پیدا نشد"
                            });
                        } else if (err.status === 409) {
                            toaster.pop({
                                type: "warning",
                                title: "اخطار",
                                body: "دستمزد " + self.view.wage.persianStartDate + " توسط اجزای دیگر برنامه در حال استفاده می باشد"
                            });
                        } else {
                            toaster.pop({
                                type: "error",
                                title: "خطا",
                                body: "یک خطای ناشناس در هنگام حذف دستمزد " + self.view.wage.persianStartDate + " رخ داده است"
                            });
                        }

                    });
            }
        };

        function initialize() {

            self.view.isFirstItemInPosition = isFirstItem;
            self.view.wage = selectedItem;
            self.view.position = positionItem;
        }

        initialize();
    };

    controller.$inject = ["$scope", "selectedItem", "isFirstItem", "positionItem", "wagesService", "toaster"];

    angular.module("personnelManagement")
        .controller("wageDeleteDialogController", controller);
})();
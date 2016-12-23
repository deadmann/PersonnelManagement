/**
 * Created by Hassan on 12/14/2016.
 */
(function(){
    "use strict";

    var controller = function ($scope, selectedItem, isFirstItem, positionItem, wagesService, toaster) {
        var DatePickerConfig = AngularUtility.DatePickerConfig;
        var self = this;
        var logger = ErrorHandler.getInstance();

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
                        logger.pop( toaster, new ToasterData(
                            "success",
                            "توضیحات",
                            "دستمزد " + self.view.wage.persianStartDate + " با موفقیت حذف گشت"
                        ));
                        $scope.confirm(self.view.wage);
                    }, function (err) {
                        if (err.status === 404) {
                            logger.pop( toaster, new ToasterData(
                                "warning",
                                "اخطار",
                                "دستمزد " + self.view.wage.persianStartDate + " پیدا نشد"
                            ));
                        } else if (err.status === 409) {
                            logger.pop( toaster, new ToasterData(
                                "warning",
                                "اخطار",
                                "دستمزد " + self.view.wage.persianStartDate + " توسط اجزای دیگر برنامه در حال استفاده می باشد"
                            ));
                        } else {
                            logger.pop( toaster, new ToasterData(
                                "error",
                                "خطا",
                                "یک خطای ناشناس در هنگام حذف دستمزد " + self.view.wage.persianStartDate + " رخ داده است"
                            ));
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
/**
 * Created by Hassan on 12/13/2016.
 */
(function(){
    "use strict";

    var controller = function ($scope, selectedItem, personnelService, positionsService, toaster) {
        var self = this;
        var logger = ErrorHandler.getInstance();

        self.view={
            /** @type {PersonVm}*/
            person: null,
            /** @type {Array<PositionVm>} */
            positions: null
        };

        self.event= {
            close: function () {
                $scope.closeThisDialog();
            },
            save: function () {
                personnelService.update({id:self.view.person.id}, self.view.person).$promise
                    .then(function (data) {
                        logger.pop( toaster, new ToasterData(
                            "success",
                            "توضیحات",
                            "شخص " + self.view.person.getFullName() + " با موفقیت ویرایش شد"
                        ));
                        $scope.confirm(data);
                    }, function (err) {
                        if (err.status === 404) {
                            logger.pop( toaster, new ToasterData(
                                "warning",
                                "اخطار",
                                "شخص " + selectedItem.getFullName() + " پیدا نشد"
                            ));
                        } else {
                            logger.pop( toaster, new ToasterData(
                                "error",
                                "خطا",
                                "یک خطای ناشناس در هنگام ذخیره اطلاعات شخص " + self.view.person.getFullName() + " رخ داده است"
                            ));
                        }
                    });
            }
        };


        function initialize() {

            var afterInitializeCounter = 2;
            function afterInitialize() {
                afterInitializeCounter --;
                // ???
            }

            positionsService.query().$promise
                .then(function (data) {
                    self.view.positions = data;
                    afterInitialize();
                }, function (err) {
                    logger.pop( toaster, new ToasterData(
                        "error",
                        "خطا",
                        "خطایی در هنگام دریافت اطلاعات سمت ها رخ داده است."
                    ));
                });

            //1. We do not want to edit original item
            //2. We want to fetch last version of data
            personnelService.get({id:selectedItem.id}).$promise
                .then(/** @param data {PersonVm}*/function(data){
                    self.view.person = data;
                    afterInitialize();
                }, function (err) {
                    if (err.status === 404) {
                        logger.pop( toaster, new ToasterData(
                            "warning",
                            "اخطار",
                            "شخص " + selectedItem.getFullName() + " پیدا نشد"
                        ));
                    } else {
                        logger.pop( toaster, new ToasterData(
                            "error",
                            "خطا",
                            "یک خطای ناشناس در هنگام دریافت آخرین اطلاعات شخص " + selectedItem.getFullName() + " رخ داده است"
                        ));
                    }
                });
        }

        initialize();
    };

    controller.$inject = ["$scope", "selectedItem", "personnelService", "positionsService", "toaster"];

    angular.module("personnelManagement")
        .controller("personUpdateDialogController", controller);
})();
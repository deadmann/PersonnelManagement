/**
 * Created by Hassan on 12/13/2016.
 */
(function(){
    "use strict";

    var controller = function ($scope, positionsService, toaster) {
        var self = this;

        self.view={
            /** @type {PositionInsertDto}*/
            positionInsert: null
        };

        self.event={
            close: function () {
                $scope.closeThisDialog();
            },
            save: function() {
                positionsService.save({}, self.view.positionInsert).$promise
                    .then(function (data) {
                        toaster.pop({
                            type: "success",
                            title: "توضیحات",
                            body: "سمت " + self.view.positionInsert.title + " با موفقیت افزوده شد"
                        });
                        $scope.confirm(data);
                    }, function (err) {
                        toaster.pop({
                            type: "error",
                            title: "خطا",
                            body: "یک خطای ناشناس در هنگام افزودن سمت " + self.view.positionInsert.title + " رخ داده است"
                        });
                    });
            }
        };

        function initialize() {
            self.view.positionInsert = new PositionInsertDto();
        }

        initialize();
    };

    controller.$inject = ["$scope", "positionsService", "toaster"];

    angular.module("personnelManagement")
        .controller("positionInsertDialogController", controller);
})();
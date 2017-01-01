/**
 * Created by Hassan on 12/14/2016.
 */
/**
 * Created by Hassan on 12/13/2016.
 */
(function(){
    "use strict";

    var controller = function ($scope, ngDialog, selectedItem, positionsService, wagesService, toaster) {
        var self = this;
        var logger = ErrorHandler.getInstance();

        self.view={
            /** @type {PositionVm}*/
            position: null,
            /** @type {Array<WageVm>} */
            wages: null
        };

        self.method = {
            /**
             * @returns {WageVm}
             */
            getFirstWage:function(){
                return Enumerable.from(self.view.wages)
                    .orderBy("x=>x.startDate")
                    .first();
            },
            reOrderItemsByStartDate:function(){
                self.view.wages = Enumerable.from(self.view.wages).orderBy("x=>x.startDate").toArray();
            }
        };
        
        self.event={
            close: function () {
                $scope.closeThisDialog();
            },
            save: function() {
                positionsService.update({id:self.view.position.id}, self.view.position).$promise
                    .then(function (data) {
                        logger.pop( toaster, new ToasterData(
                            "success",
                            "توضیحات",
                            "سمت " + self.view.position.title + " با موفقیت ویرایش شد"
                        ));
                        $scope.confirm(data);
                    }, function (err) {
                        if (err.status === 404) {
                            logger.pop( toaster, new ToasterData(
                                "warning",
                                "اخطار",
                                "سمت " + selectedItem.title + " پیدا نشد"
                            ));
                        } else {
                            logger.pop( toaster, new ToasterData(
                                "error",
                                "خطا",
                                "یک خطای ناشناس در هنگام ذخیره اطلاعات سمت " + self.view.position.title + " رخ داده است"
                            ));
                        }
                    });
            },
            showWageInsertDialog: function () {
                var promise = ngDialog.openConfirm({
                    template: '/app/pages/wage/wageInsertDialog.html',
                    controller: 'wageInsertDialogController',
                    controllerAs: 'wageInsCtrl',
                    resolve: {
                        positionItem: function () {
                            return self.view.position;
                        }
                    },
                    //plain: true, -- Mean use of plain String as HTML
                    showClose: true,
                    closeByDocument: true,
                    closeByEscape: true
                });
                promise.then(/** @param data {WageVm} */function (data) {
                    self.view.wages.push(data);
                    self.method.reOrderItemsByStartDate();
                }, function (err) {
                    //ignore
                });
            },
            showWageRemoveDialog: function(id) {
                var promise = ngDialog.openConfirm({
                    template: '/app/pages/wage/wageDeleteDialog.html',
                    controller: 'wageDeleteDialogController',
                    controllerAs: 'wageDltCtrl',
                    resolve: {
                        positionItem: function () {
                            return self.view.position;
                        },
                        selectedItem: function () {
                            return Enumerable.from(self.view.wages).first(function (f) {
                                return f.id == id;
                            });
                        },
                        isFirstItem: function () {
                            return self.method.getFirstWage().id === id;
                        }
                    },
                    //plain: true, -- Mean use of plain String as HTML
                    showClose: true,
                    closeByDocument: true,
                    closeByEscape: true
                });
                promise.then(/** @param data {WageVm} */function (data) {
                    self.view.wages.remove(null, function (item, empty) {
                        return item.id == data.id;
                    }, 'all');
                }, function (err) {
                    //ignore
                });
            },
            showWageUpdateDialog: function (id) {
                var promise = ngDialog.openConfirm({
                    template: '/app/pages/wage/wageUpdateDialog.html',
                    controller: 'wageUpdateDialogController',
                    controllerAs: 'wageUpdCtrl',
                    resolve: {
                        positionItem: function () {
                            return self.view.position;
                        },
                        selectedItem: function () {
                            return Enumerable.from(self.view.wages).first(function (f) {
                                return f.id == id;
                            });
                        },
                        isFirstItem: function () {
                            return self.method.getFirstWage().id === id;
                        }
                    },
                    //plain: true, -- Mean use of plain String as HTML
                    showClose: true,
                    closeByDocument: true,
                    closeByEscape: true
                });
                promise.then(/** @param data {WageVm} */function (data) {
                    self.view.wages.replace(null, data, function (item, empty) {
                        return item.id == data.id;
                    },undefined,'all');
                    self.method.reOrderItemsByStartDate();
                }, function (err) {
                    //ignore
                });
            }
        };

        function initialize() {

            var afterInitializeCounter = 2;
            function afterInitialize() {
                afterInitializeCounter --;
                // ???
            }

            //1. We do not want to edit original item
            //2. We want to fetch last version of data
            positionsService.get({id:selectedItem.id}).$promise
                .then(/** @param data {PositionVm}*/function(data){
                    self.view.position = data;
                    afterInitialize();
                }, function (err) {
                    if (err.status === 404) {
                        logger.pop( toaster, new ToasterData(
                            "warning",
                            "اخطار",
                            "سمت " + selectedItem.getFullName() + " پیدا نشد"
                        ));
                    } else {
                        logger.pop( toaster, new ToasterData(
                            "error",
                            "خطا",
                            "یک خطای ناشناس در هنگام دریافت آخرین اطلاعات سمت " + selectedItem.getFullName() + " رخ داده است"
                        ));
                    }
                });

            wagesService.queryByPositionId({param2:selectedItem.id}).$promise
                .then(/** @param data {Array<WageVm>}*/function (data) {
                    self.view.wages = data;
                    self.method.reOrderItemsByStartDate();
                    afterInitialize();
                }, function (err) {
                    if(err.status==404) {
                        logger.pop( toaster, new ToasterData(
                            "warning",
                            "اخطار",
                            "دستمزدهای مربوط به سمت " + selectedItem.getFullName() + " پیدا نشد"
                        ));
                    } else{
                        logger.pop( toaster, new ToasterData(
                            "error",
                            "خطا",
                            "یک خطای ناشناس در هنگام دریافت آخرین اطلاعات دستمزدهای مربوط به سمت " + selectedItem.getFullName() + " رخ داده است"
                        ));
                    }
                })
        }

        initialize();
    };

    controller.$inject = ["$scope", "ngDialog", "selectedItem", "positionsService", "wagesService", "toaster"];

    angular.module("personnelManagement")
        .controller("positionUpdateDialogController", controller);
})();
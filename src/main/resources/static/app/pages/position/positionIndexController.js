/**
 * Created by Hassan on 11/18/2016.
 */
(function () {

    var controller = function ($location, ngDialog, positionsService, wagesService, sharedService, toaster) {
        var self = this;
        var logger = ErrorHandler.getInstance();

        var privateData={
            /** @type {SharedModel} */
            sharedData:null
        };

        self.view={
            positions: []
        };

        self.event={
            showInsertDialog: function () {
                var promise = ngDialog.openConfirm({
                    template: '/app/pages/position/positionInsertDialog.html',
                    controller: 'positionInsertDialogController',
                    controllerAs: 'insCtrl',
                    //plain: true, -- Mean use of plain String as HTML
                    showClose: true,
                    closeByDocument: true,
                    closeByEscape: true
                });
                promise.then(/** @param data {PositionVm} */function (data) {
                    self.view.positions.push(data);
                }, function (err) {
                    //ignore
                });
            },
            /*insert: function () {
                $location.path("/position/insert")
            },*/
            showRemoveDialog: function(id) {
                var promise = ngDialog.openConfirm({
                    template: '/app/pages/position/positionDeleteDialog.html',
                    controller: 'positionDeleteDialogController',
                    controllerAs: 'dltCtrl',
                    resolve: {
                        selectedItem: function () {
                            return Enumerable.from(self.view.positions).first(function (f) {
                                return f.id == id;
                            });
                        }
                    },
                    //plain: true, -- Mean use of plain String as HTML
                    showClose: true,
                    closeByDocument: true,
                    closeByEscape: true
                });
                promise.then(/** @param data {PositionVm} */function (data) {
                    self.view.positions.remove(null, function (item, empty) {
                        return item.id == data.id;
                    }, 'all');
                }, function (err) {
                    //ignore
                });
            },
            /*remove:function (id) {
                //var removeItem = Enumerable.From(buildings).FirstOrDefault(null,w=>w.id ==id);
                //buildings.splice()
                positionsService.remove({id:id}).$promise
                    .then(function (data) {
                        self.view.positions.remove(null, function (item, empty) {
                            return item.id == data.id;
                        }, 'all');
                    }, function (err) {
                        if(err.status===404){
                            alert("آیتم مورد نظر ‍یدا نشد");
                        }else if(err.status===409){
                            alert("آیتم انتخابی توسط آیتم های دیگری مورد استفاده است");
                        } else {
                            alert("یک خطای ناشناس در هنگام حذف آتم رخ داده است");
                        }
                    });
            }*/
            showUpdateDialog: function (id) {
                var promise = ngDialog.openConfirm({
                    template: '/app/pages/position/positionUpdateDialog.html',
                    controller: 'positionUpdateDialogController',
                    controllerAs: 'updCtrl',
                    resolve: {
                        selectedItem: function () {
                            return Enumerable.from(self.view.positions).first(function (f) {
                                return f.id == id;
                            });
                        }
                    },
                    //plain: true, -- Mean use of plain String as HTML
                    showClose: true,
                    closeByDocument: true,
                    closeByEscape: true,
                    width: "700px"
                });
                promise.then(/** @param data {PositionVm} */function (data) {
                    self.view.positions.replace(null, data, function (item, empty) {
                        return item.id == data.id;
                    }, 'all');
                }, function (err) {
                    //ignore
                });
            }
        };

        function initialize() {
            privateData.sharedData = sharedService.getSharedData();
            privateData.sharedData.title = "مدیریت سمت ها";

            positionsService.query().$promise
                .then(function (data) {
                    /**@type {Array<PositionVm>}*/
                    var joinedPositions = [];
                    wagesService.query().$promise
                        .then(function (dataW) {
                            var dataEnum = Enumerable.from(data);
                            var res = dataEnum.join(dataW, /**@param outer {PositionVm}*/ function (outer) {
                                return outer.id
                            }, /**@param inner {WageVm}*/function (inner) {
                                return inner.position.id
                            }, function (x, y) {
                                var foundPosition = Enumerable.from(joinedPositions)
                                    .firstOrDefault(
                                        function (w) {
                                            return w.id == x.id;
                                        }, null);
                                if (foundPosition == null) {
                                    foundPosition = new PositionVm(x.id, x.title, [], []);
                                    joinedPositions.push(foundPosition);
                                }
                                foundPosition.wages.push(y);
                                return {position: x, wage: y};
                            }).toArray(); //I do this, since i need to force other function to perform, while i don't use the result.

                            self.view.positions = joinedPositions;
                        }, function (err) {
                            logger.pop(toaster, new ToasterData(
                                "error",
                                "خطا",
                                "در هنگام دریافت اطلاعات دستمزد ها یک خطا رخ داده است"
                            ));
                        });
                }, function (err) {
                    logger.pop(toaster, new ToasterData(
                        "error",
                        "خطا",
                        "در هنگام دریافت اطلاعات سمت ها یک خطا رخ داده است"
                    ));
                });
        }

        initialize();
    };

    controller.$inject = ["$location", "ngDialog", "positionsService", "wagesService", "sharedService", "toaster"];

    angular.module("personnelManagement")
        .controller("positionIndexController", controller);

})();
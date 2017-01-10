/**
 * Created by Hassan on 11/20/2016.
 */
(function () {

    var controller = function ($location, ngDialog, personnelService, sharedService, toaster) {
        var self = this;
        var logger = ErrorHandler.getInstance();

        var privateData={
            /** @type {SharedModel} */
            sharedData:null
        };

        self.view={
            personnel: []
        };

        self.event={
            showInsertDialog: function () {
                var promise = ngDialog.openConfirm({
                    template: '/app/pages/person/personInsertDialog.html',
                    controller: 'personInsertDialogController',
                    controllerAs: 'insCtrl',
                    //plain: true, -- Mean use of plain String as HTML
                    showClose: true,
                    closeByDocument: true,
                    closeByEscape: true
                });
                promise.then(/** @param data {PersonVm} */function (data) {
                    self.view.personnel.push(data);
                }, function (err) {
                    //ignore
                });
            },
            /*insert: function () {
                $location.path("/person/insert")
            },*/
            showRemoveDialog: function(id) {
                var promise = ngDialog.openConfirm({
                    template: '/app/pages/person/personDeleteDialog.html',
                    controller: 'personDeleteDialogController',
                    controllerAs: 'dltCtrl',
                    resolve: {
                        selectedItem: function () {
                            return Enumerable.from(self.view.personnel).first(function (f) {
                                return f.id == id;
                            });
                        }
                    },
                    //plain: true, -- Mean use of plain String as HTML
                    showClose: true,
                    closeByDocument: true,
                    closeByEscape: true
                });
                promise.then(/** @param data {PersonVm} */function (data) {
                    self.view.personnel.remove(null, function (item, empty) {
                        return item.id == data.id;
                    }, 'all');
                }, function (err) {
                    //ignore
                });
            },
            /*remove:function (id) {
                //var removeItem = Enumerable.From(buildings).FirstOrDefault(null,w=>w.id ==id);
                //buildings.splice()
                personnelService.remove({id:id}).$promise
                    .then(function (data) {
                        self.view.personnel.remove(null, function (item, empty) {
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
            },*/
            showUpdateDialog: function (id) {
                var promise = ngDialog.openConfirm({
                    template: '/app/pages/person/personUpdateDialog.html',
                    controller: 'personUpdateDialogController',
                    controllerAs: 'updCtrl',
                    resolve: {
                        selectedItem: function () {
                            return Enumerable.from(self.view.personnel).first(function (f) {
                                return f.id == id;
                            });
                        }
                    },
                    //plain: true, -- Mean use of plain String as HTML
                    showClose: true,
                    closeByDocument: true,
                    closeByEscape: true
                });
                promise.then(/** @param data {BuildingVm} */function (data) {
                    self.view.personnel.replace(null, data, function (item, empty) {
                        return item.id == data.id;
                    },undefined,'all');
                }, function (err) {
                    //ignore
                });
            }
        };

        function initialize() {
            privateData.sharedData = sharedService.getSharedData();
            privateData.sharedData.title = "مدیریت اشخاص";

            personnelService.query().$promise
                .then(function (data) {
                    self.view.personnel = data;
                }, function (err) {
                    logger.pop(toaster, new ToasterData(
                        "error",
                        "خطا",
                        "در هنگام دریافت اطلاعات پرسنل یک خطا رخ داده است"
                    ));
                });
        }

        initialize();
    };

    controller.$inject = ["$location", "ngDialog", "personnelService", "sharedService", "toaster"];

    angular.module("personnelManagement")
        .controller("personIndexController", controller);

})();
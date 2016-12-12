/**
 * Created by Hassan on 11/18/2016.
 */

(function(){
    "use strict";

    var controller = function ($location, ngDialog, buildingsService) {
        var self = this;

        self.view={
            buildings: []
        };

        self.event={
            showInsertDialog: function () {
                var promise = ngDialog.openConfirm({
                    template: '/app/pages/building/buildingInsertDialog.html',
                    controller: 'buildingInsertDialogController',
                    controllerAs: 'insCtrl',
                    //plain: true, -- Mean use of plain String as HTML
                    showClose: true,
                    closeByDocument: true,
                    closeByEscape: true
                });
                promise.then(/** @param data {BuildingVm} */function (data) {
                    self.view.buildings.push(data);
                }, function (err) {
                    //ignore
                });
            },
            /*insert: function () {
                $location.path("/building/insert")
            },*/
            showRemoveDialog: function(id) {
                var promise = ngDialog.openConfirm({
                    template: '/app/pages/building/buildingDeleteDialog.html',
                    controller: 'buildingDeleteDialogController',
                    controllerAs: 'dltCtrl',
                    resolve: {
                        selectedItem: function () {
                            return Enumerable.from(self.view.buildings).first(function (f) {
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
                    self.view.buildings.remove(null, function (item, empty) {
                        return item.id == data.id;
                    }, 'all');
                }, function (err) {
                    //ignore
                });
            },
            /*remove:function (id) {
                //var removeItem = Enumerable.From(buildings).FirstOrDefault(null,w=>w.id ==id);
                //buildings.splice()
                buildingsService.remove({id:id}).$promise
                    .then(function (data) { //-->Returned Item From Server
                        self.view.buildings.remove(null, function (item, empty) {
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
                    template: '/app/pages/building/buildingUpdateDialog.html',
                    controller: 'buildingUpdateDialogController',
                    controllerAs: 'updCtrl',
                    resolve: {
                        selectedItem: function () {
                            return Enumerable.from(self.view.buildings).first(function (f) {
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
                    self.view.buildings.replace(null, data, function (item, empty) {
                        return item.id == data.id;
                    },undefined,'all');
                }, function (err) {
                    //ignore
                });
            }
        };

        function initialize() {
            buildingsService.query().$promise
                .then(function (data) {
                    self.view.buildings = data;
                }, function (err) {
                    alert("An Error Has Occur");
                });
        }

        initialize();
    };

    controller.$inject = ["$location", "ngDialog", "buildingsService"];

    angular.module("personnelManagement")
        .controller("buildingIndexController", controller);
})();
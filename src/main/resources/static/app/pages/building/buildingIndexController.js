/**
 * Created by Hassan on 11/18/2016.
 */

(function(){
    "use strict";

    var controller = function ($location, buildingsService) {
        var self = this;

        self.view={
            buildings: []
        };

        self.event={
            insert: function () {
                $location.path("/building/insert")
            },
            remove:function (id) {
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

    controller.$inject = ["$location", "buildingsService"];

    angular.module("personnelManagement")
        .controller("buildingIndexController", controller);
})();
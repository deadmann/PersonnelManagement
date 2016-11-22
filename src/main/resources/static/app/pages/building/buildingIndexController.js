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
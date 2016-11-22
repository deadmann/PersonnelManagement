/**
 * Created by Hassan on 11/18/2016.
 */
(function(){
    "use strict";

    var controller = function ($location, buildingsService) {
        var self = this;

        self.view={
            /** @type {BuildingVm}*/
            building: null
        };

        self.event={
            save: function() {
                buildingsService.save({}, self.view.building).$promise
                    .then(function (data) {
                        //self.view.buildings = data;
                        $location.path("/building");
                    }, function (err) {
                        alert("An Error Has Occur");
                    });
            },
            cancel: function(){
                $location.path("/building");
            }
        };

        function initialize() {
            self.view.building = new BuildingVm();
        }

        initialize();
    };

    controller.$inject = ["$location", "buildingsService"];

    angular.module("personnelManagement")
        .controller("buildingInsertController", controller);
})();
/**
 * Created by Hassan on 11/18/2016.
 */
(function(){

    var controller = function ($location, positionsService) {
        var self = this;

        self.view={
            /** @type {PositionInsertDto}*/
            positionInsert: null
        };

        self.event={
            save: function() {
                positionsService.save({}, self.view.positionInsert).$promise
                    .then(function (data) {
                        //self.view.buildings = data;
                        $location.path("/position");
                    }, function (err) {
                        alert("An Error Has Occur");
                    });
            },
            cancel: function(){
                $location.path("/position");
            }
        };

        function initialize() {
            self.view.positionInsert = new PositionInsertDto();
        }

        initialize();
    };

    controller.$inject = ["$location", "positionsService"];

    angular.module("personnelManagement")
        .controller("positionInsertController", controller);

})();
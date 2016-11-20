/**
 * Created by Hassan on 11/20/2016.
 */
(function(){

    var controller = function ($location, personService, positionService) {
        var self = this;

        self.view={
            /** @type {PersonVm}*/
            personInsert: null,
            /** @type {Array<PositionVm>} */
            positions: null
        };

        self.event={
            save: function() {
                personService.save({}, self.view.personInsert).$promise
                    .then(function (data) {
                        //self.view.buildings = data;
                        $location.path("/person");
                    }, function (err) {
                        alert("An Error Has Occur");
                    });
            },
            cancel: function(){
                $location.path("/person");
            }
        };

        function initialize() {
            positionService.query().$promise
                .then(function (data) {
                    self.view.positions = data;
                }, function (err) {
                    alert("An Error Has Occur While Loading Positions Data.");
                });
            self.view.personInsert = new PersonVm();
        }

        initialize();
    };

    controller.$inject = ["$location", "personService", "positionService"];

    angular.module("personnelManagement")
        .controller("personInsertController", controller);

})();
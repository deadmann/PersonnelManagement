/**
 * Created by Hassan on 11/18/2016.
 */
(function(){

    var controller = function ($location, wageService) {
        var self = this;

        self.view={
            /** @type {WageVm}*/
            wage: null
        };

        self.event={
            save: function() {
                wageService.save({}, self.view.wage).$promise
                    .then(function (data) {
                        //self.view.buildings = data;
                        $location.path("/wage");
                    }, function (err) {
                        alert("An Error Has Occur");
                    });
            },
            cancel: function(){
                $location.path("/wage");
            }
        };

        function initialize() {
            self.view.wage = new WageVm();
        }

        initialize();
    };

    controller.$inject = ["$location", "wageService"];

    angular.module("personnelManagement")
        .controller("wageInsertController", controller);

    })();
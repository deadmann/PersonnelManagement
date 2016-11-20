/**
 * Created by Hassan on 11/20/2016.
 */
(function () {

    var controller = function ($location, personService) {
        var self = this;

        self.view={
            persons: []
        };

        self.event={
            insert: function () {
                $location.path("/person/insert")
            },
            remove:function (id) {
                //var removeItem = Enumerable.From(buildings).FirstOrDefault(null,w=>w.id ==id);
                //buildings.splice()
            }
        };

        function initialize() {
            personService.query().$promise
                .then(function (data) {
                    self.view.persons = data;
                }, function (err) {
                    alert("An Error Has Occur");
                });
        }

        initialize();
    };

    controller.$inject = ["$location", "personService"];

    angular.module("personnelManagement")
        .controller("personIndexController", controller);

})();
/**
 * Created by Hassan on 11/20/2016.
 */
(function () {

    var controller = function ($location, personnelService) {
        var self = this;

        self.view={
            personnel: []
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
            personnelService.query().$promise
                .then(function (data) {
                    self.view.personnel = data;
                }, function (err) {
                    alert("An Error Has Occur");
                });
        }

        initialize();
    };

    controller.$inject = ["$location", "personnelService"];

    angular.module("personnelManagement")
        .controller("personIndexController", controller);

})();
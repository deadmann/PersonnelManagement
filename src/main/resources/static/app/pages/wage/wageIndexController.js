/**
 * Created by Hassan on 11/18/2016.
 */
(function () {

    var controller = function ($location, wageService) {
        var self = this;

        self.view={
            wages: []
        };

        self.event={
            insert: function () {
                $location.path("/wage/insert")
            },
            remove:function (id) {
                //var removeItem = Enumerable.From(buildings).FirstOrDefault(null,w=>w.id ==id);
                //buildings.splice()
            }
        };

        function initialize() {
            wageService.query().$promise
                .then(function (data) {
                    self.view.wages = data;
                }, function (err) {
                    alert("An Error Has Occur");
                });
        }

        initialize();
    };

    controller.$inject = ["$location", "wageService"];

    angular.module("personnelManagement")
        .controller("wageIndexController", controller);

})();
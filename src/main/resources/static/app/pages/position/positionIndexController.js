/**
 * Created by Hassan on 11/18/2016.
 */
(function () {

    var controller = function ($location, positionsService) {
        var self = this;

        self.view={
            positions: []
        };

        self.event={
            insert: function () {
                $location.path("/position/insert")
            },
            remove:function (id) {
                //var removeItem = Enumerable.From(buildings).FirstOrDefault(null,w=>w.id ==id);
                //buildings.splice()
            }
        };

        function initialize() {
            positionsService.query().$promise
                .then(function (data) {
                    //TODO: INCLUDE WAGES, OR ADD IT ON CLIENT SIDE
                    wageService.query().$promise
                        .then(function (dataW) {
                            var res = Enumerable.From(data).Join(dataW, "","", function (x, y) {
                                if(x.wages==undefined ||  x.wages==null){
                                    x.wages = [];
                                }
                                x.wages.push(y);
                                return x;
                            });
                        });
                    //self.view.positions = data;
                }, function (err) {
                    alert("An Error Has Occur");
                });
        }

        initialize();
    };

    controller.$inject = ["$location", "positionsService"];

    angular.module("personnelManagement")
        .controller("positionIndexController", controller);

})();
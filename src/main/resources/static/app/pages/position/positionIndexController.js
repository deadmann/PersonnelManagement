/**
 * Created by Hassan on 11/18/2016.
 */
(function () {

    var controller = function ($location, positionsService, wagesService) {
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
                positionsService.remove({id:id}).$promise
                    .then(function (data) {
                        self.view.positions.remove(null, function (item, empty) {
                            return item == id;
                        }, 'all');
                    }, function (err) {
                        alert("An error has occur while removing data");
                    });
            }
        };

        function initialize() {
            positionsService.query().$promise
                .then(function (data) {
                    /**@type {Array<PositionVm>}*/
                    var joinedPositions = [];
                    wagesService.query().$promise
                        .then(function (dataW) {
                            var dataEnum = Enumerable.from(data);
                            var res = dataEnum.join(dataW, /**@param outer {PositionVm}*/ function (outer) {
                                return outer.id
                            }, /**@param inner {WageVm}*/function (inner) {
                                return inner.position.id
                            }, function (x, y) {
                                var foundPosition = Enumerable.from(joinedPositions)
                                    .firstOrDefault(
                                        function (w) {
                                            return w.id == x.id;
                                        }, null);
                                if (foundPosition == null) {
                                    foundPosition = new PositionVm(x.id, x.title, [], []);
                                    joinedPositions.push(foundPosition);
                                }
                                foundPosition.wages.push(y);
                                return {position: x, wage: y};
                            }).toArray(); //I do this, since i need to force other function to perform, while i don't use the result.

                            self.view.positions = joinedPositions;
                        }, function (err) {
                            alert("An Error Has Occur While Fetching Wages");
                        });
                }, function (err) {
                    alert("An Error Has Occur While Fetching Positions");
                });
        }

        initialize();
    };

    controller.$inject = ["$location", "positionsService", "wagesService"];

    angular.module("personnelManagement")
        .controller("positionIndexController", controller);

})();
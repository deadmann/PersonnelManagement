/**
 * Created by Hassan on 11/18/2016.
 */
(function () {

    var controller = function ($location, wagesService, toaster) {
        var self = this;
        var logger = ErrorHandler.getInstance();

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
            wagesService.query().$promise
                .then(function (data) {
                    self.view.wages = data;
                }, function (err) {
                    logger.pop(toaster, new ToasterData(
                        "error",
                        "خطا",
                        "در هنگام دریافت اطلاعات دستمزد ها یک خطا رخ داده است"
                    ));
                });
        }

        initialize();
    };

    controller.$inject = ["$location", "wagesService", "toaster"];

    angular.module("personnelManagement")
        .controller("wageIndexController", controller);

})();
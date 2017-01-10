/**
 * Created by Hassan on 11/18/2016.
 */
(function () {

    var controller = function ($location, wagesService, sharedService, toaster) {
        var self = this;
        var logger = ErrorHandler.getInstance();

        var privateData={
            /** @type {SharedModel} */
            sharedData:null
        };

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
            privateData.sharedData = sharedService.getSharedData();
            privateData.sharedData.title = "مدیریت دستمزد ها";

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

    controller.$inject = ["$location", "wagesService", "sharedService", "toaster"];

    angular.module("personnelManagement")
        .controller("wageIndexController", controller);

})();
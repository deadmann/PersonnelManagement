/**
 * Created by Hassan on 11/20/2016.
 */
(function(){

    var controller = function ($location, personnelService, positionsService, toaster) {
        var self = this;
        var logger = ErrorHandler.getInstance();

        self.view={
            /** @type {PersonVm}*/
            personInsert: null,
            /** @type {Array<PositionVm>} */
            positions: null
        };

        self.event={
            save: function() {
                personnelService.save({}, self.view.personInsert).$promise
                    .then(function (data) {
                        //self.view.buildings = data;
                        $location.path("/person");
                    }, function (err) {
                        logger.pop(toaster, new ToasterData(
                            "error",
                            "خطا",
                            "در هنگام ذخیره اطلاعات شخص یک خطا رخ داده است"
                        ));
                    });
            },
            cancel: function(){
                $location.path("/person");
            }
        };

        function initialize() {
            positionsService.query().$promise
                .then(function (data) {
                    self.view.positions = data;
                }, function (err) {
                    logger.pop(toaster, new ToasterData(
                        "error",
                        "خطا",
                        "در هنگام دریافت اطلاعات سمت ها یک خطا رخ داده است"
                    ));
                });
            self.view.personInsert = new PersonVm();
        }

        initialize();
    };

    controller.$inject = ["$location", "personnelService", "positionsService", "toaster"];

    angular.module("personnelManagement")
        .controller("personInsertController", controller);

})();
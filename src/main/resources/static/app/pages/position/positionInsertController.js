/**
 * Created by Hassan on 11/18/2016.
 */
(function(){

    var controller = function ($location, positionsService, toaster) {
        var self = this;
        var logger = ErrorHandler.getInstance();

        self.view={
            /** @type {PositionInsertDto}*/
            positionInsert: null
        };

        self.event={
            save: function() {
                positionsService.save({}, self.view.positionInsert).$promise
                    .then(function (data) {
                        //self.view.buildings = data;
                        $location.path("/position");
                    }, function (err) {
                        logger.pop(toaster, new ToasterData(
                            "error",
                            "خطا",
                            "در هنگام ذخیره اطلاعات سمت یک خطا رخ داده است"
                        ));
                    });
            },
            cancel: function(){
                $location.path("/position");
            }
        };

        function initialize() {
            self.view.positionInsert = new PositionInsertDto();
        }

        initialize();
    };

    controller.$inject = ["$location", "positionsService", "toaster"];

    angular.module("personnelManagement")
        .controller("positionInsertController", controller);

})();
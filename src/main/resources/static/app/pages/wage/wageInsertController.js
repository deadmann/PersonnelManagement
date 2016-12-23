/**
 * Created by Hassan on 11/18/2016.
 */
(function(){

    var controller = function ($location, wagesService, toaster) {
        var self = this;
        var logger = ErrorHandler.getInstance();

        self.view={
            /** @type {WageVm}*/
            wage: null
        };

        self.event={
            save: function() {
                wagesService.save({}, self.view.wage).$promise
                    .then(function (data) {
                        //self.view.buildings = data;
                        $location.path("/wage");
                    }, function (err) {
                        logger.pop(toaster, new ToasterData(
                            "error",
                            "خطا",
                            "در هنگام ذخیره اطلاعات دستمزد یک خطا رخ داده است"
                        ));
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

    controller.$inject = ["$location", "wagesService", "toaster"];

    angular.module("personnelManagement")
        .controller("wageInsertController", controller);

    })();
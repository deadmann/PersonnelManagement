/**
 * Created by Hassan on 12/14/2016.
 */
(function(){
    "use strict";

    var controller = function ($scope, positionItem, wagesService, toaster) {
        var DatePickerConfig = AngularUtility.DatePickerConfig;
        var self = this;
        var logger = ErrorHandler.getInstance();
        
        self.view={
            /** @type {WageVm}*/
            wage: null,
            /** @type {string|null} */
            persianDate: null,
            /** @type {DatePickerConfig} */
            startDateConfig:  null
        };

        self.method= {
            isValidPersianDate: function (date) {
                try {
                    if (!moment(date).isValid())
                        return false;
                    //test on persian
                    moment(date, 'jYYYY/jM/jD').format('jYYYY/jM/jD');
                    return true;
                } catch (err) {
                    return false;
                }
            }
        };

        self.event={
            close: function () {
                $scope.closeThisDialog();
            },
            save: function() {

                if(!self.method.isValidPersianDate(self.view.persianDate)) {
                    logger.pop( toaster, new ToasterData(
                        "error",
                        "خطا",
                        "تاریخ ورودی یا مقدار آن نا معتبر می باشد"
                    ));
                    return;
                }
                self.view.wage.startDate = moment(self.view.persianDate, 'jYYYY/jM/jD').format("YYYY-MM-DD");

                //!IMPORTANT
                self.view.wage.position = positionItem;

                wagesService.save({}, self.view.wage).$promise
                    .then(function (data) {
                        logger.pop( toaster, new ToasterData(
                            "success",
                            "توضیحات",
                            "دستمزد " + self.view.wage.persianStartDate + " با موفقیت افزوده شد"
                        ));
                        $scope.confirm(data);
                    }, function (err) {
                        logger.pop( toaster, new ToasterData(
                            "error",
                            "خطا",
                            "یک خطای ناشناس در هنگام افزودن دستمزد " + self.view.wage.persianStartDate + " رخ داده است"
                        ));
                    });
            }
        };

        function initialize() {

            function getDefaultDatePickerConfig() {
                var startConfig = new DatePickerConfig();
                startConfig.dateFormat = "yy/mm/dd";
                startConfig.numberOfMonths = 1;
                startConfig.showButtonPanel = true;
                startConfig.changeMonth = true;
                startConfig.changeYear = true;
                return startConfig;
            }

            self.view.startDateConfig = getDefaultDatePickerConfig();

            self.view.wage = new WageVm();
            self.view.persianDate = null;
        }

        initialize();
    };

    controller.$inject = ["$scope", "positionItem", "wagesService", "toaster"];

    angular.module("personnelManagement")
        .controller("wageInsertDialogController", controller);
})();
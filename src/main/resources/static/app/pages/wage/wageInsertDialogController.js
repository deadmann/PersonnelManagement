/**
 * Created by Hassan on 12/14/2016.
 */
(function(){
    "use strict";

    var controller = function ($scope, positionItem, wagesService, toaster) {
        var DatePickerConfig = AngularUtility.DatePickerConfig;
        var self = this;
        
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
                    toaster.pop({
                        type: "error",
                        title: "خطا",
                        body: "تاریخ ورودی یا مقدار آن نا معتبر می باشد"
                    });
                    return;
                }
                self.view.wage.startDate = (new Date(moment(self.view.persianDate, 'jYYYY/jM/jD').format("YYYY-MM-DD")));

                //!IMPORTANT
                self.view.wage.position = positionItem;

                wagesService.save({}, self.view.wage).$promise
                    .then(function (data) {
                        toaster.pop({
                            type: "success",
                            title: "توضیحات",
                            body: "دستمزد " + self.view.wage.persianStartDate + " با موفقیت افزوده شد"
                        });
                        $scope.confirm(data);
                    }, function (err) {
                        toaster.pop({
                            type: "error",
                            title: "خطا",
                            body: "یک خطای ناشناس در هنگام افزودن دستمزد " + self.view.wage.persianStartDate + " رخ داده است"
                        });
                    });
            }
        };

        function initialize() {

            function getDefaultDatePickerConfig() {
                var startConfig = new DatePickerConfig();
                startConfig.dateFormat = "yy/mm/dd";
                startConfig.numberOfMonths = 1;
                startConfig.showButtonPanel = true;
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
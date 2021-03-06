/**
 * Created by Hassan on 12/14/2016.
 */
(function(){
    "use strict";

    var controller = function ($scope, selectedItem, isFirstItem, positionItem, wagesService, toaster) {
        var DatePickerConfig = AngularUtility.DatePickerConfig;
        var self = this;
        var logger = ErrorHandler.getInstance();

        self.view={
            /** @type {WageVm}*/
            wage: null,
            /** @type {string|null} */
            persianDate: null,
            /** @type {DatePickerConfig} */
            startDateConfig:  null,
            /** @type {boolean|null}*/
            isFirstItemInPosition: null
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

                //First item date is invalid by moment-jalaali
                //And we don't let user to fill it, so we don't need this validation
                if (!self.view.isFirstItemInPosition){
                    if(!self.method.isValidPersianDate(self.view.persianDate)) {
                        logger.pop( toaster, new ToasterData(
                            "error",
                            "خطا",
                            "تاریخ ورودی یا مقدار آن نا معتبر می باشد"
                        ));
                        return;
                    }
                    self.view.wage.startDate = moment(self.view.persianDate, 'jYYYY/jM/jD').format("YYYY-MM-DD");
                }else{
                    //Set a value equal to what we receive/we have on server...
                    // self.view.wage.startDate - Stay Unchanged
                }

                //!IMPORTANT
                self.view.wage.position = positionItem;

                wagesService.update({id:self.view.wage.id}, self.view.wage).$promise
                    .then(function (data) {
                        logger.pop( toaster, new ToasterData(
                            "success",
                            "توضیحات",
                            "دستمزد "
                            + (self.view.isFirstItemInPosition
                                ?"اول"
                                :self.view.wage.persianStartDate)
                            + " با موفقیت ویرایش شد"
                        ));
                        $scope.confirm(data);
                    }, function (err) {
                        if (err.status === 404) {
                            logger.pop( toaster, new ToasterData(
                                "warning",
                                "اخطار",
                                "دستمزد "
                                + (self.view.isFirstItemInPosition
                                    ?"اول"
                                    :selectedItem.persianStartDate)
                                + " پیدا نشد"
                            ));
                        } else {
                            logger.pop( toaster, new ToasterData(
                                "error",
                                "خطا",
                                "یک خطای ناشناس در هنگام ذخیره اطلاعات دستمزد "
                                + (self.view.isFirstItemInPosition
                                    ?"اول"
                                    :self.view.wage.persianStartDate)
                                + " رخ داده است"
                            ));
                        }

                    });
            }
        };

        function initialize() {

            self.view.isFirstItemInPosition = isFirstItem;

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

            //1. We do not want to edit original item
            //2. We want to fetch last version of data
            wagesService.get({id:selectedItem.id}).$promise
                .then(/** @param data {WageVm}*/function(data){
                    self.view.wage = data;
                    self.view.persianDate = self.view.wage.persianStartDate;

                }, function (err) {
                    if (err.status === 404) {
                        logger.pop( toaster, new ToasterData(
                            "warning",
                            "اخطار",
                            "دستمزد "
                            + (self.view.isFirstItemInPosition
                                ?"اول"
                                :selectedItem.persianStartDate)
                            + " پیدا نشد"
                        ));
                    } else {
                        logger.pop( toaster, new ToasterData(
                            "error",
                            "خطا",
                            "یک خطای ناشناس در هنگام دریافت آخرین اطلاعات دستمزد "
                            + (self.view.isFirstItemInPosition
                                ?"اول"
                                :selectedItem.persianStartDate)
                            + " رخ داده است"
                        ));
                    }
                });
        }

        initialize();
    };

    controller.$inject = ["$scope", "selectedItem", "isFirstItem", "positionItem", "wagesService", "toaster"];

    angular.module("personnelManagement")
        .controller("wageUpdateDialogController", controller);
})();
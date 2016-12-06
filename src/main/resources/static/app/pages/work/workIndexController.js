/**
 * Created by Hassan on 11/20/2016.
 */
(function () {
    var controller = function (baseDataService, buildingsService, personnelService, worksService) {
        var self = this;

        var privateData = {
            /** @type {number|null} */
            startYear:null,
            /** @type {number|null}*/
            currentYear: null,
            ///** @type {number|null} */
            //daysInMonth: null,
            /** @type {Array<string>} */
            monthsNames:[
                "فروردین",
                "اردیبهشت",
                "خرداد",
                "تیر",
                "مرداد",
                "شهریور",
                "مهر",
                "آبان",
                "آذر",
                "دی",
                "بهمن",
                "اسفند"
            ],
            ///** @type {Array<WorkPerDayDto>} */
            //workPerDays: []
        };

        self.type = {
            PageMode: PageMode,
            ReportType: ReportType
        };

        self.view = {
            /** @type {PageMode} */
            mode: PageMode.SELECT,
            /** @type {boolean} - if all required data are received from server */
            isHeaderLoaded: false,
            /** @type {{year:number, month:KeyValue<number, string>, person: PersonVm}} */
            headerSelections:{
                /** @type {number|null} */
                startDate: null,
                /** @type {KeyValue<number, string>} */
                endDate: null,
                /** @type {PersonVm} */
                person: null
            },
            /** @type {Array<number>} */
            years: null,
            /** @type {Array<PersonVm>} */
            personnel: null,
            /** @type {Array<BuildingVm>} */
            buildings: null
            ,
        };

        self.event = {
            view: function () {

            }
        };

        function initialize() {
            //Keep Track Of Running Async Service, And Provide Ability To Run A Method After All Async Finished.
            var afterInitializeAsyncRunnerCounter = 4;

            function afterInitializeCallBack(){

                afterInitializeAsyncRunnerCounter --;

                if (afterInitializeAsyncRunnerCounter == 0){
                    self.view.years = [];
                    for(var i = privateData.startYear; i < privateData.currentYear + 5; i++)
                        self.view.years.push(i);
                    self.view.headerSelections.year = privateData.currentYear;

                    self.view.isHeaderLoaded = true;
                }
            }

            //System Start Year
            baseDataService.getStartYear().$promise
                .then(function (data) {
                    privateData.startYear = data;
                    afterInitializeCallBack();
                }, function (err) {
                    alert("An Error Occur While Loading System Base Data From Server");
                });

            //Current Year
            baseDataService.getCurrentYear().$promise
                .then(function (data) {
                    privateData.currentYear = data;
                    afterInitializeCallBack();
                }, function (err) {
                    alert("An Error Occur While Loading System Base Data From Server");
                });

            //Month Lists
            var monthDictionary = new Dictionary();
            for (var i = 0; i < 12 ; i++) {
                monthDictionary.add(i + 1, privateData.monthsNames[i]);
            }
            self.view.months = monthDictionary;

            //Personnel
            personnelService.query().$promise.then(function (data) {
                self.view.personnel = data;
                afterInitializeCallBack();
            }, function (err) {
                alert("An Error Has Occur While Fetching Personnel Data." + err);
            });

            //Buildings
            buildingsService.query().$promise.then(function (data) {
                self.view.buildings = data;
                afterInitializeCallBack();
            },function (err) {
                alert("An Error Has Occur While Fetching Buildings Data." + err);
            });
        }

        initialize();
    };

    controller.$inject = ["baseDataService", "buildingsService", "personnelService", "worksService"];

    angular.module("personnelManagement")
        .controller("workIndexController", controller);
})();
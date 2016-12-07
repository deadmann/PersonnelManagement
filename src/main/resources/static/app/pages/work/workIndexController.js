/**
 * Created by Hassan on 11/20/2016.
 */
(function () {
    var controller = function ($scope, baseDataService, buildingsService, personnelService, positionsService, worksService) {
        //Basic Definition
        var self = this;
        var DatePickerConfig = AngularUtility.DatePickerConfig;


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
            headerSelections:{
                /** @type {number|null} */
                startDate: null,
                /** @type {KeyValue<number, string>} */
                endDate: null,
                /** @type {ReportType} */
                reportType: ReportType.NONE,
                /** @type {PersonVm} */
                person: null,
                /** @type {BuildingVm} */
                building: null,
                /** @type {PositionVm} */
                position:null
            },
            /** @type {Array<number>} */
            years: null,
            /** @type {Dictionary<ReportType, string>} */
            reportTypes: null,
            /** @type {Array<PersonVm>} */
            personnel: null,
            /** @type {Array<BuildingVm>} */
            buildings: null,
            /** @type {Array<PositionVm>} */
            positions: null,
            /** @type {DatePickerConfig} */
            startDateConfig: null,
            /** @type {DatePickerConfig} */
            endDateConfig:null
            ,
            works: null,
            /** @type {Array<{key:number, building:BuildingVm, works: Array<WorkVm>, sum: number}> | null} */
            workBuildingsByPerson: null,
            /** @type {Array<{key:number, building:PersonVm, works: Array<WorkVm>, sum: number}> | null} */
            workPersonsByBuilding: null,
            //workPersonBuildingsByPosition:null
        };

        self.method = {
            toView:function(){
                self.view.mode = PageMode.VIEW;
            },
            toSelect:function(){
                self.view.mode = PageMode.SELECT;
            },
            viewByPerson:function (){
                self.view.workBuildingsByPerson = Enumerable.from(self.view.works)
                    .groupBy(
                        /** @param work {WorkVm} */
                        function (work) {
                            return work.building.id;
                        },
                        null,// function(work){return work;},
                        /**
                         * @param key {BuildingVm}
                         * @param group {Grouping}*/  //Enumerable
                        function (key, group) {
                            /** @type {Array<WorkVm>} */
                            var groupWorks = group.toArray();
                            var buildingSample =
                                new BuildingVm(
                                    groupWorks[0].building.id,
                                    groupWorks[0].building.name,
                                    groupWorks //Work that the building refer too
                                );
                            return {
                                key: key,
                                building: buildingSample,
                                works: groupWorks,
                                sum: group.sum("s=>s.workPerDay")
                            };
                        })
                    .select("x=>x").toArray();
            },
            viewByBuilding:function () {
                self.view.workPersonsByBuilding = Enumerable.from(self.view.works)
                    .groupBy(
                        /** @param work {WorkVm} */
                        function (work) {
                            return work.person.id;
                        },
                        null,// function(work){return work;},
                        /**
                         * @param key {PersonVm}
                         * @param group {Grouping}*/  //Enumerable
                        function (key, group) {
                            /** @type {Array<WorkVm>} */
                            var groupWorks = group.toArray();
                            var personSample =
                                new PersonVm(
                                    groupWorks[0].person.id,
                                    groupWorks[0].person.firstname,
                                    groupWorks[0].person.lastname,
                                    new PositionVm(
                                        groupWorks[0].person.position.id,
                                        groupWorks[0].person.position.title,
                                        null,
                                        Enumerable.from(groupWorks).select("s=>s.person").toArray()
                                    ),
                                    groupWorks //Work that the person refer too
                                );
                            return {
                                key: key,
                                person: personSample,
                                works: groupWorks,
                                sum: group.sum("s=>s.workPerDay")
                            };
                        })
                    .select("x=>x").toArray();
            },
            viewByPosition:function () {

            }
        };

        self.event = {
            toSelect: function () {
                self.method.toSelect();
            },
            toViewWorks: function () {
                var startDate = self.view.headerSelections.startDate.replaceAll("/", "-");
                var endDate = self.view.headerSelections.endDate.replaceAll("/", "-");
                switch (self.view.headerSelections.reportType) {
                    case ReportType.BY_PERSON:
                        var personId = self.view.headerSelections.person.id;
                        worksService.getWorksByPersonAndDateBetween({
                            param2: personId,
                            param3: startDate,
                            param4: endDate
                        }).$promise
                            .then(function (data) {
                                self.view.works = data;
                                self.method.viewByPerson();
                                self.method.toView();
                            }, function (err) {
                                alert("An Error Occur While Fetching Work Data");
                            });
                        break;
                    case ReportType.BY_BUILDING:
                        var buildingId = self.view.headerSelections.building.id;
                        worksService.getWorksByBuildingAndDateBetween({
                            param2: buildingId,
                            param3: startDate,
                            param4: endDate
                        }).$promise
                            .then(function (data) {
                                self.view.works = data;
                                self.method.viewByBuilding();
                                self.method.toView();
                            }, function (err) {
                                alert("An Error Occur While Fetching Work Data");
                            });
                        break;
                    case ReportType.BY_POSITION:
                        var positionId = self.view.headerSelections.position.id;
                        worksService.getWorksByPositionAndDateBetween({
                            param2: positionId,
                            param3: startDate,
                            param4: endDate
                        }).$promise
                            .then(function (data) {
                                self.view.works = data;
                                self.method.viewByPosition();
                                self.method.toView();
                            }, function (err) {
                                alert("An Error Occur While Fetching Work Data");
                            });
                        break;
                }
            }
        };

        $scope.$watch(
            "ctrl.view.headerSelections.startDate"
            , function(newVal, oldVal){
                if(Util.Utility.isNullOrUndefined(newVal)){
                    self.view.endDateConfig.minDate = undefined;
                }else{
                    if(moment(newVal, 'jYYYY-jM-jD').isValid()){
                        //var minDate = new Date(newVal);
                        self.view.endDateConfig.minDate = newVal;
                    }
                }
            }
        );

        $scope.$watch(
            "ctrl.view.headerSelections.endDate"
            , function(newVal, oldVal) {
                if (Util.Utility.isNullOrUndefined(newVal)) {
                    self.view.startDateConfig.maxDate = undefined;
                } else {
                    if (moment(newVal, 'jYYYY-jM-jD').isValid()) {
                        //var maxDate = new Date(m);
                        self.view.startDateConfig.maxDate = newVal;
                    }
                }
            }
        );

        function initialize() {
            //Keep Track Of Running Async Service, And Provide Ability To Run A Method After All Async Finished.
            var afterInitializeAsyncRunnerCounter = 5;

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

            function getDefaultDatePickerConfig() {
                var startConfig = new DatePickerConfig();
                startConfig.dateFormat = "yy/mm/dd";
                startConfig.numberOfMonths = 1;
                startConfig.showButtonPanel = true;
                return startConfig;
            }

            self.view.startDateConfig = getDefaultDatePickerConfig();
            self.view.endDateConfig =  getDefaultDatePickerConfig();

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

            //Report Type List
            var reportDictionary = new Dictionary();
            reportDictionary.add(ReportType.BY_PERSON, "بر اساس شخص");
            reportDictionary.add(ReportType.BY_BUILDING, "بر اساس ساختمان");
            //reportDictionary.add(ReportType.BY_POSITION, "بر اساس سمت");
            self.view.reportTypes = reportDictionary;

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

            //Positions
            positionsService.query().$promise.then(function (data) {
                self.view.positions = data;
                afterInitializeCallBack();
            },function (err) {
                alert("An Error Has Occur While Fetching Positions Data." + err);
            });
        }

        initialize();
    };

    controller.$inject = ["$scope", "baseDataService", "buildingsService", "personnelService", "positionsService", "worksService"];

    angular.module("personnelManagement")
        .controller("workIndexController", controller);
})();
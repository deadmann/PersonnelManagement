/**
 * Created by Hassan on 11/20/2016.
 */
(function () {
    var controller = function ($scope, baseDataService, buildingsService, personnelService, positionsService, worksService, toaster) {
        //Basic Definition
        var self = this;
        var logger = ErrorHandler.getInstance();
        var DatePickerConfig = AngularUtility.DatePickerConfig;


        var privateData = {
            /** @type {number|null} */
            startYear:null,
            /** @type {number|null}*/
            currentYear: null,
            /** @type {PositionVm} */
            positionsWithWages: null,

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
            ]
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
            /** UnProcessed Works
             * @type {Array<WorkVm>}*/
            works: null,
            /** Feed Total Sums
             * @type {number|null}*/
            totalSum: null,
            /** Feed Total Calculated Price
             * @type {number|null}*/
            totalSumMoney: null,

            //Processed for By_PERSON
            /** @type {Array<{key:number, building:BuildingVm, works: Array<WorkVm>, sum: number, sumMoney:number}> | null} */
            workBuildingsByPerson: null,

            //Processed for BY_BUILDING
            /** @type {Array<{key:number, building:PersonVm, works: Array<WorkVm>, sum: number, sumMoney:number}> | null} */
            workPersonsByBuilding: null,

            //Processed for BY_POSITION
            /**
             * Feed Page Titles (Buildings Information)
             * @type {Array<BuildingVm>}*/
            buildingsForWorksByPosition: null,
            /**
             * Feed Main Data of the Table
             * @type {Array<{keyPerson:number, person:PersonVm, buildingSubGroupWorks: Array<{keyBuilding:number, building:BuildingVm, works: Array<WorkVm>, sum: number, sumMoney:number}>, sum: number, sumMoney:number}> | null} */
            workPersonBuildingsByPosition:null,
            /**
             * Feed Footers (Building Sums)
             * Does not contain sub grouping for Persons, we already have enough data in 'workPersonBuildingsByPosition'
             * @type {Array<{key:number, building:BuildingVm, sum:number, sumMoney:number}>} */
            buildingSimpleGrouping: null
        };

        self.method = {
            toView:function(){
                self.view.mode = PageMode.VIEW;
            },
            toSelect:function(){
                self.view.mode = PageMode.SELECT;
            },
            viewByPerson:function (){

                //Feed Total Sums
                self.view.totalSum = Enumerable.from(self.view.works)
                    .sum(/**@param s {WorkVm}*/function (s) {
                        return s.workPerDay
                    });

                //Feed Total Price
                self.view.totalSumMoney = Enumerable.from(self.view.works)
                    .sum(/**@param s {WorkVm}*/function(s){
                        return self.method.getPriceForWork(s);
                    });

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
                                sum: group.sum("s=>s.workPerDay"),
                                sumMoney: group.sum(/**@param s {WorkVm}*/function(s){return self.method.getPriceForWork(s)})
                            };
                        })
                    .select("x=>x").toArray();
            },
            viewByBuilding:function () {

                //Feed Total Sums
                self.view.totalSum = Enumerable.from(self.view.works)
                    .sum(/**@param s {WorkVm}*/function (s) {
                        return s.workPerDay
                    });

                //Feed Total Price
                self.view.totalSumMoney = Enumerable.from(self.view.works)
                    .sum(/**@param s {WorkVm}*/function(s){
                        return self.method.getPriceForWork(s);
                    });

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
                                sum: group.sum("s=>s.workPerDay"),
                                sumMoney: group.sum(/**@param s {WorkVm}*/function(s){return self.method.getPriceForWork(s)})
                            };
                        })
                    .select("x=>x").toArray();
            },
            viewByPosition:function () {

                //Feed Page Titles (Buildings Information)
                self.view.buildingsForWorksByPosition = Enumerable.from(self.view.buildings)
                    .where(/** @param w {BuildingVm} */function (w) {
                        return Enumerable.from(self.view.works)
                            .any(/** @param aw {WorkVm}*/function(aw){
                            return aw.building.id == w.id;
                        });
                    })
                    .distinct(/**@param d {BuildingVm}*/function (d) {return d.id})
                    .toArray();

                //Feed Footers (Building Sums)
                self.view.buildingSimpleGrouping = Enumerable.from(self.view.works)
                    .groupBy(
                        /** @param work {WorkVm} */
                        function(work){
                            return work.building.id
                        },
                        null,
                        /**
                         * @param key {BuildingVm}
                         * @param group {Grouping|Enumerable} */
                        function (key, group) {
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
                                sum: group.sum("s=>s.workPerDay"),
                                sumMoney: group.sum(/**@param s {WorkVm}*/function(s){return self.method.getPriceForWork(s)})
                            };
                        }
                    ).select("x=>x").toArray();

                //Feed Total Sums
                self.view.totalSum = Enumerable.from(self.view.works)
                    .sum(/**@param s {WorkVm}*/function (s) {
                        return s.workPerDay
                    });

                //Feed Total Price
                self.view.totalSumMoney = Enumerable.from(self.view.works)
                    .sum(/**@param s {WorkVm}*/function(s){
                        return self.method.getPriceForWork(s);
                    });

                //Feed Main Data of the Table
                self.view.workPersonBuildingsByPosition = Enumerable.from(self.view.works)
                    .groupBy(
                        /** @param work {WorkVm} */
                        function(work){
                            return work.person.id
                        },
                        null,
                        /**
                         * @param key {PersonVm}
                         * @param group {Grouping|Enumerable} */
                        function (key, group) {

                            /** type {Array<WorkVm>} */
                            var groupWorks = group.toArray();

                            /** @type {Array<{key:number, building:BuildingVm, works: Array<WorkVm>, sum: number, sumMoney:number}> | null} */
                            var buildingSubGroupWorks = group
                                .groupBy(
                                    /** @param work2 {WorkVm} */
                                    function (work2) {
                                        return work2.building.id;
                                    },
                                    null,// function(work){return work;},
                                    /**
                                     * @param key2 {BuildingVm}
                                     * @param group2 {Grouping|Enumerable} */  //Enumerable
                                    function (key2, group2) {
                                        /** @type {Array<WorkVm>} */
                                        var groupWorks2 = group2.toArray();
                                        var buildingSample =
                                            new BuildingVm(
                                                groupWorks2[0].building.id,
                                                groupWorks2[0].building.name,
                                                groupWorks2 //Work that the building refer too
                                            );
                                        return {
                                            keyBuilding: key2,
                                            building: buildingSample,
                                            works: groupWorks2,
                                            sum: group2.sum("s=>s.workPerDay"),
                                            sumMoney: group2.sum(/**@param s {WorkVm}*/function(s){return self.method.getPriceForWork(s)})
                                        };
                                    })
                                .select("x=>x").toArray();

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
                                keyPerson: key,
                                person: personSample,
                                buildingSubGroupWorks: buildingSubGroupWorks,
                                sum: group.sum("s=>s.workPerDay"),
                                sumMoney: group.sum(/**@param s {WorkVm}*/function(s){return self.method.getPriceForWork(s)})
                            }
                        }
                    ).select("x=>x").toArray();
            },
            /**
             * This Method Used Inside Table for BY_POSITION
             * @param person {PersonVm}
             * @param building {BuildingVm}
             * @return {{keyBuilding:number, building:PersonVm, works: Array<WorkVm>, sum: number, sumMoney: number}|null}
             */
            getGroupingByPersonAndBuilding: function (person, building) {
                /** @type {{keyPerson:number, person:BuildingVm, buildingSubGroupWorks: Array<{keyBuilding:number, building:PersonVm, works: Array<WorkVm>, sum: number, sumMoney:number}>, sum: number, sumMoney:number} | null}*/
                var groupItem = Enumerable.from(self.view.workPersonBuildingsByPosition)
                    .firstOrDefault(
                        /** @param w {{keyPerson:number, person:BuildingVm, buildingSubGroupWorks: Array<{keyBuilding:number, building:PersonVm, works: Array<WorkVm>, sum: number, sumMoney:number}>, sum: number, sumMoney:number}}*/
                        function (w) {
                            return w.person.id == person.id;
                    },null);

                if(groupItem != null){
                    return Enumerable.from(groupItem.buildingSubGroupWorks)
                        .firstOrDefault(
                            /** @param w {{keyBuilding:number, building:PersonVm, works: Array<WorkVm>, sum: number, sumMoney:number}} */
                            function (w) {
                                return w.building.id == building.id;
                            }, null);
                }
                return null;
            },
            /**
             * This Method Used Inside Table for BY_POSITION
             * @param building {BuildingVm}
             * @return {{key:number, building:BuildingVm, sum:number, sumMoney:number}|null}
             */
            getGroupingByBuilding: function (building) {
                return Enumerable.from(self.view.buildingSimpleGrouping)
                    .firstOrDefault(
                        /** @param w {{key:number, building:BuildingVm, sum:number, sumMoney:number}} */
                        function (w) {
                            return w.building.id == building.id;
                        }, null);
            },
            /**
             * find correct wage using 'privateData.positionsWithWages', calculate price of work
             * @param work {WorkVm} */
            getPriceForWork: function (work) {
                /** @type {PositionVm} */
                var position = Enumerable.from(privateData.positionsWithWages).first(/**@param w {PositionVm}*/function(w){return work.person.position.id == w.id;});
                /** @type {Enumerable} */
                var LesserWageEnumerable = Enumerable.from(position.wages).where(/**@param w {WageVm}*/function(w){
                    return Util.Utility.compareString(work.date, w.startDate)>=0;
                });
                /** @type {WageVm} */
                var equivalentWage = LesserWageEnumerable.orderByDescending("o=>o.startDate").first();
                return (work.workPerDay/8) * equivalentWage.price;
            }
        };

        self.event = {
            toSelect: function () {
                self.method.toSelect();
            },
            toViewWorks: function () {
                //get last position data + wages
                positionsService.queryFetchWages().$promise
                    .then(function (data) {
                        privateData.positionsWithWages = data;

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
                                        logger.pop(toaster, new ToasterData(
                                            "error",
                                            "خطا",
                                            "در هنگام دریافت اطلاعات کارکرد یک خطا رخ داده است"
                                        ));
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
                                        logger.pop(toaster, new ToasterData(
                                            "error",
                                            "خطا",
                                            "در هنگام دریافت اطلاعات کارکرد یک خطا رخ داده است"
                                        ));
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
                                        logger.pop(toaster, new ToasterData(
                                            "error",
                                            "خطا",
                                            "در هنگام دریافت اطلاعات کارکرد یک خطا رخ داده است"
                                        ));
                                    });
                                break;
                        }
                    }, function (err) {
                        logger.pop( toaster, new ToasterData(
                            'error',
                            'خطا',
                            'در هنگام دریافت اطلاعات خطایی رخ داده است.' + err
                        ));
                    });
            }
        };

        $scope.$watch(
            "ctrl.view.headerSelections.startDate",
            /**
             * @param newVal {string|null|undefined}
             * @param oldVal {string|null|undefined}*/
            function(newVal, oldVal){
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
            "ctrl.view.headerSelections.endDate",
            /**
             * @param newVal {string|null|undefined}
             * @param oldVal {string|null|undefined}*/
            function(newVal, oldVal) {
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
                startConfig.changeMonth = true;
                startConfig.changeYear = true;
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
                    logger.pop(toaster, new ToasterData(
                        "error",
                        "خطا",
                        "در هنگام دریافت اطلاعات پایه سیستم یک خطا رخ داده است"
                    ));
                });

            //Current Year
            baseDataService.getCurrentYear().$promise
                .then(function (data) {
                    privateData.currentYear = data;
                    afterInitializeCallBack();
                }, function (err) {
                    logger.pop(toaster, new ToasterData(
                        "error",
                        "خطا",
                        "در هنگام دریافت اطلاعات پایه سیستم یک خطا رخ داده است"
                    ));
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
            reportDictionary.add(ReportType.BY_BUILDING, "بر اساس پروژه");
            reportDictionary.add(ReportType.BY_POSITION, "بر اساس سمت");
            self.view.reportTypes = reportDictionary;

            //Personnel
            personnelService.query().$promise.then(function (data) {
                self.view.personnel = data;
                afterInitializeCallBack();
            }, function (err) {
                logger.pop(toaster, new ToasterData(
                    "error",
                    "خطا",
                    "در هنگام دریافت اطلاعات پرسنل یک خطا رخ داده است" + err
                ));
            });

            //Buildings
            buildingsService.query().$promise.then(function (data) {
                self.view.buildings = data;
                afterInitializeCallBack();
            },function (err) {
                logger.pop(toaster, new ToasterData(
                    "error",
                    "خطا",
                    "در هنگام دریافت اطلاعات ساختمان ها یک خطا رخ داده است" + err
                ));
            });

            //Positions
            positionsService.query().$promise.then(function (data) {
                self.view.positions = data;
                afterInitializeCallBack();
            },function (err) {
                logger.pop(toaster, new ToasterData(
                    "error",
                    "خطا",
                    "در هنگام دریافت اطلاعات سمت ها یک خطا رخ داده است" + err
                ));
            });
        }

        initialize();
    };

    controller.$inject = ["$scope", "baseDataService", "buildingsService", "personnelService", "positionsService", "worksService", "toaster"];

    angular.module("personnelManagement")
        .controller("workIndexController", controller);
})();
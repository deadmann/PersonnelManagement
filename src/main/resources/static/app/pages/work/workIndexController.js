/**
 * Created by Hassan on 11/20/2016.
 */
(function () {
    var controller = function ($scope, baseDataService, buildingsService, personnelService, positionsService, worksService, sharedService, toaster) {
        //Basic Definition
        var self = this;
        var logger = ErrorHandler.getInstance();
        var DatePickerConfig = AngularUtility.DatePickerConfig;

        var privateData = {
            /** @type {SharedModel} */
            sharedData:null,
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
                position: null,
                /**
                 * @type {PersonVm}
                 * Inline Cause InfDig Error (Object Created On Each Digest)
                 */
                personAllOption: null,
                /**
                 * @type {BuildingVm}
                 * Inline Cause InfDig Error (Object Created On Each Digest)
                 */
                buildingAllOption: null,
                /**
                 * @type {PositionVm}
                 * Inline Cause InfDig Error (Object Created On Each Digest)
                 */
                positionAllOption: null
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
                    .orderBy("x=>x.person.position.title")
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
            },
            /**
             * postfix for a file
             * @returns {string}
             */
            getFileNamePostfix: function(){
                var dt = new Date();
                var day = dt.getDate();
                var month = dt.getMonth() + 1;
                var year = dt.getFullYear();
                var hour = dt.getHours();
                var minutes = dt.getMinutes();
                return day + "." + month + "." + year + "_" + hour + "." + minutes;
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
            },
            toExcel: function ($event) {
                var postfix = self.method.getFileNamePostfix();

                var uri = 'data:application/vnd.ms-excel;base64,'
                    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta charset="utf-8" /><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body style="text-align:center;direction:rtl"><table>{table}</table></body></html>'
                    , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
                    , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }

                var name = "Report";
                var table = angular.element(".report-table")[0]; //document.getElementById(table)
                var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };
                window.location.href = uri + base64(format(template, ctx));


                /*//creating a temporary HTML link element (they support setting file names)
                var a = document.createElement('a');
                //getting data from our div that contains the HTML table
                var data_type = 'data:application/vnd.ms-excel';
                var table_div = angular.element(".report-table")[0];
                var table_html = table_div.outerHTML.replace(/ /g, '%20');
                a.href = data_type + ', ' + table_html;
                //setting the file name
                a.download = 'exported_table_' + postfix + '.xls';
                //triggering the function
                a.click();*/


                //just in case, prevent default behaviour
                $event.preventDefault();
            },
            toPrint: function($event){
                angular.element(".report-content").print();
            },
            /**
             * @file jspdf.debug.js
             * @see https://github.com/MrRio/jsPDF
             * @see http://stackoverflow.com/questions/17293135/download-a-div-in-a-html-page-as-pdf-using-javascript
             * @param $event
             */
            toPdf: function($event){
                var doc = new jsPDF();

                // We'll make our own renderer to skip this editor
                var specialElementHandlers = {
                    '#editor': function(element, renderer){
                        return true;
                    }
                };

                // All units are in the set measurement for the document
                // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
                doc.fromHTML(angular.element('.report-content').get(0), 15, 15, {
                    'width': 170,
                    'elementHandlers': specialElementHandlers
                });
                doc.save("report_"+self.method.getFileNamePostfix()+".pdf");
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
            privateData.sharedData = sharedService.getSharedData();
            privateData.sharedData.title = "گزارش کارکرد پرسنل";

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

            self.view.headerSelections.personAllOption=new PersonVm(-1, "همه", null, null, null);
            self.view.headerSelections.buildingAllOption=new BuildingVm(-1, "همه", null);
            self.view.headerSelections.positionAllOption=new PositionVm(-1, "همه", null, null);

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

    controller.$inject = ["$scope", "baseDataService", "buildingsService", "personnelService", "positionsService", "worksService", "sharedService", "toaster"];

    angular.module("personnelManagement")
        .controller("workIndexController", controller);
})();
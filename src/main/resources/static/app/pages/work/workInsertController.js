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
            /** @type {number|null} */
            daysInMonth: null,
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
            /** @type {Array<WorkPerDayDto>} */
            workPerDays: []
        };

        self.type = {
            PageMode: PageMode
        };

        self.view = {
            /** @type {PageMode} */
            mode: PageMode.SELECT,
            /** @type {boolean} - if all required data are received from server */
            isHeaderLoaded: false,
            /** @type {{year:number, month:KeyValue<number, string>, person: PersonVm}} */
            headerSelections:{
                /** @type {number|null} */
                year: null,
                /** @type {KeyValue<number, string>} */
                month: null,
                /** @type {PersonVm} */
                person: null
            },
            /** @type {Array<number>} */
            years: null,
            /** @type {Dictionary<number, string>} */
            months: null,
            /** @type {Array<PersonVm>} */
            personnel: null
            ,
            tableSelections: {
                /** @type {Array<BuildingVm>}*/
                selectedBuildings: [],
                /** @type {BuildingVm} */
                building: null
            },
            /** @type {Array<BuildingVm>}*/
            buildings: [],
            /** @type {Array<Array<number|null|undefined>>} - [Building][Day]*/
            buildingDayWorks: [],
            /** @type {Array<number>} */
            days: null
        };

        self.method = {
            //Data that should rest or list that should be empty when month/year/person changes
            resetDataForms: function () {
                privateData.workPerDays = []; //--> TODO: Should check server again and re-map (for Enable Update/Edit)
                self.view.buildingDayWorks = []; //--> TODO: Refill From Previous Item (for Enable Update/Edit)
                self.view.tableSelections.selectedBuildings = [];
            },
            /** Map WorkPerDayDto to BuildingDayWorks Object */
            mapWpdToBdw: function () {
                Enumerable.from(privateData.workPerDays)
                    .forEach(/**@param wpd {WorkPerDayDto}*/function (wpd) {
                        if (!Enumerable.from(self.view.tableSelections.selectedBuildings)
                                .any(/** @param w {BuildingVm} */function (w) {
                                    return w.id == wpd.buildingId;
                                })) {
                            var building = Enumerable.from(self.view.buildings)
                                .first(/** @param w {BuildingVm} */function (w) {
                                    return w.id == wpd.buildingId;
                                });
                            self.view.tableSelections.selectedBuildings.push(building);
                        }

                        if(Util.Utility.isNullOrUndefined(self.view.buildingDayWorks)) self.view.buildingDayWorks = [];
                        if(Util.Utility.isNullOrUndefined(self.view.buildingDayWorks[wpd.buildingId])) self.view.buildingDayWorks[wpd.buildingId] = [];
                        self.view.buildingDayWorks[wpd.buildingId][wpd.day] = wpd.workingHours;
                    });
            },
            /** Map BuildingDayWorks to WorkPerDayDto Object */
            mapBdwToWpd: function () {
                var wpdEnumerable = Enumerable.from(privateData.workPerDays);

                //Iterate in Selected Buildings
                Enumerable.from(self.view.tableSelections.selectedBuildings).forEach(/** @param building {BuildingVm} */function(building){
                    //Iterate in Available Days
                    Enumerable.from(self.view.days).forEach(/** @param dayOfMonth {number} */function(dayOfMonth) {
                        //Check if TextBox Data is not Null (Improve Performance, Both Calculate Less and Sending Less Data To Server)
                        if(! Util.Utility.isNullOrUndefined(self.view.buildingDayWorks[building.id])
                            && ! Util.Utility.isNullOrUndefined(self.view.buildingDayWorks[building.id][dayOfMonth])) {
                            //Index of match in workPerDays
                            var indexInWpd = privateData.workPerDays.indexOfMatch(null,/** @param w {WorkPerDayDto} */function (w) {
                                    return w.day == dayOfMonth && w.buildingId == building.id;
                                });
                            if(indexInWpd != -1){
                                privateData.workPerDays[indexInWpd].workingHours = self.view.buildingDayWorks[building.id][dayOfMonth];
                            }
                            else{
                                privateData.workPerDays.push(new WorkPerDayDto(
                                    null,
                                    self.view.headerSelections.person.id,
                                    self.view.headerSelections.year,
                                    self.view.headerSelections.month.key,
                                    dayOfMonth,
                                    building.id,
                                    self.view.buildingDayWorks[building.id][dayOfMonth]
                                ))
                            }
                        }else{
                            //remove item from wpd list
                            privateData.workPerDays.remove(null, /** @param w {WorkPerDayDto} */ function (w) {
                                return w.day == dayOfMonth && w.buildingId == building.id
                            },'all');
                        }
                    });
                });
            },
            /** @param day {number} */
            getSumDays: function (day) {
                var total = 0;
                for (var i = 0; i< self.view.tableSelections.selectedBuildings.length; i++){
                    //Since it's two dimensional Array, we need to check each dimension separately
                    if(! Util.Utility.isNullOrUndefined(self.view.buildingDayWorks[self.view.tableSelections.selectedBuildings[i].id])
                        && !Util.Utility.isNullOrUndefined(self.view.buildingDayWorks[self.view.tableSelections.selectedBuildings[i].id][day]))
                        total += self.view.buildingDayWorks[self.view.tableSelections.selectedBuildings[i].id][day];
                }
                return total;
            },
            /** @param building {BuildingVm}*/
            getSumBuildings: function(building){
                var total = 0;
                for (var i = 0; i< self.view.days.length; i++){
                    if(!Util.Utility.isNullOrUndefined(self.view.buildingDayWorks[building.id])
                        && !Util.Utility.isNullOrUndefined(self.view.buildingDayWorks[building.id][self.view.days[i]]))
                        total += self.view.buildingDayWorks[building.id][self.view.days[i]];
                }
                return total;
            },
            getSumTotal: function () {
                var total = 0;
                for(var i = 0; i<self.view.tableSelections.selectedBuildings.length;i++) {
                    for (var j = 0; j < self.view.days.length; j++) {
                        if (!Util.Utility.isNullOrUndefined(self.view.buildingDayWorks[self.view.tableSelections.selectedBuildings[i].id])
                            && !Util.Utility.isNullOrUndefined(self.view.buildingDayWorks[self.view.tableSelections.selectedBuildings[i].id][self.view.days[j]]))
                            total += self.view.buildingDayWorks[self.view.tableSelections.selectedBuildings[i].id][self.view.days[j]];
                    }
                }
                return total;
            }
        };

        self.event = {
            toEditWorks: function () {
                //Keep Track Of Running Async Service, And Provide Ability To Run A Method After All Async Finished.
                var afterToEditWorksAsyncRunnerCounter = 2;

                function afterToEditWorkCallBack(){
                    if (afterToEditWorksAsyncRunnerCounter == 0){
                        self.view.mode = PageMode.EDIT;
                        self.method.mapWpdToBdw();
                    }
                }

                baseDataService.getDaysInMonth({
                    param2: self.view.headerSelections.year,
                    param3: self.view.headerSelections.month.key
                }).$promise
                    .then(function (data) {
                        privateData.daysInMonth = data;
                        self.view.days = Util.Utility.generateRange(1, data, true);
                        afterToEditWorksAsyncRunnerCounter --;
                        if(afterToEditWorksAsyncRunnerCounter === 0) afterToEditWorkCallBack();
                    }, function (err) {
                        alert("An Error Occur While Loading Calendar Information");
                    });

                worksService.getWorkPerDaysByPersonAndMonth({
                    param2: self.view.headerSelections.person.id,
                    param3: self.view.headerSelections.year,
                    param4: self.view.headerSelections.month.key
                }).$promise
                    .then(function (data) {
                        privateData.workPerDays = data;
                        afterToEditWorksAsyncRunnerCounter --;
                        if(afterToEditWorksAsyncRunnerCounter === 0) afterToEditWorkCallBack();
                    }, function (err) {
                        alert("Cannot Fetch Works Data From Server" + err);
                    });
            },
            toSelectMode: function () {
                self.view.mode = PageMode.SELECT;
                self.method.resetDataForms();
                privateData.daysInMonth = null;
                self.view.days = null;
            },
            selectBuilding:function () {
                var eBuildings = Enumerable.from(self.view.tableSelections.selectedBuildings);
                var isExists = eBuildings.any( /** @param {BuildingVm} w */ function (w) {
                    return w == self.view.tableSelections.building;
                });

                if(!isExists){
                    self.view.tableSelections.selectedBuildings.push(self.view.tableSelections.building);
                } else {
                    alert("This Building Already Exists.");
                }
                self.view.tableSelections.building = null; //Reset To Null
            },
            clearData: function(){
                self.method.resetDataForms();
            },
            save: function () {
                self.method.mapBdwToWpd();
                worksService.saveWorkPerDaysClearPersonMonth({
                    param2:self.view.headerSelections.person.id,
                    param3:self.view.headerSelections.year,
                    param4:self.view.headerSelections.month.key
                }, privateData.workPerDays).$promise
                    .then(function (data) {
                        alert("success");
                    }, function (err) {
                        alert("An error occur while saving data");
                    })
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
        .controller("workInsertController", controller);
})();
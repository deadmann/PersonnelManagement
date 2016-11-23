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
            ]
        };

        self.type = {
            PageMode: PageMode
        };

        self.view = {
            /** @type {PageMode} */
            mode: PageMode.SELECT,
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
            /** @type {Array<number>} */
            days: null
        };

        self.event = {
            toEditWorks: function () {
                //Keep Track Of Running Async Service, And Provide Ability To Run A Method After All Async Finished.
                var afterToEditWorksAsyncRunnerCounter = 2;

                function afterToEditWorkCallBack(){
                    if (afterToEditWorksAsyncRunnerCounter == 0){
                        self.view.mode = PageMode.EDIT;
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

                worksService.getAllWorksByPersonAndMonth({
                    param2: self.view.headerSelections.person.id,
                    param3: self.view.headerSelections.year,
                    param4: self.view.headerSelections.month.key
                }).$promise
                    .then(function (data) {
                        afterToEditWorksAsyncRunnerCounter --;
                        if(afterToEditWorksAsyncRunnerCounter === 0) afterToEditWorkCallBack();
                    }, function (err) {
                        alert("Cannot Fetch Works Data From Server" + err);
                    });
            },
            toSelectMode: function () {
                self.view.mode = PageMode.SELECT;
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
            }
        };

        function initialize() {
            //Keep Track Of Running Async Service, And Provide Ability To Run A Method After All Async Finished.
            var afterInitializeAsyncRunnerCounter = 2;

            function afterInitializeCallBack(){
                if (afterInitializeAsyncRunnerCounter == 0){
                    self.view.years = [];
                    for(var i = privateData.startYear; i < privateData.currentYear + 5; i++)
                        self.view.years.push(i);
                    self.view.headerSelections.year = privateData.currentYear
                }
            }

            baseDataService.getStartYear().$promise
                .then(function (data) {
                    privateData.startYear = data;
                    afterInitializeAsyncRunnerCounter --;
                    afterInitializeCallBack();
                }, function (err) {
                    alert("An Error Occur While Loading System Base Data From Server");
                });

            baseDataService.getCurrentYear().$promise
                .then(function (data) {
                    privateData.currentYear = data;
                    afterInitializeAsyncRunnerCounter --;
                    afterInitializeCallBack();
                }, function (err) {
                    alert("An Error Occur While Loading System Base Data From Server");
                });

            var monthDictionary = new Dictionary();

            for (var i = 0; i < 12 ; i++) {
                monthDictionary.add(i + 1, privateData.monthsNames[i]);
            }

            self.view.months = monthDictionary;

            personnelService.query().$promise.then(function (data) {
                self.view.personnel = data;
            }, function (err) {
                alert("An Error Has Occur While Fetching Personnel Data." + err);
            });

            buildingsService.query().$promise.then(function (data) {
                self.view.buildings = data;
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
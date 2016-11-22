/**
 * Created by Hassan on 11/20/2016.
 */
(function () {
    var controller = function (baseDataService, buildingsService, personnelService, worksService) {
        var self = this;

        var private = {
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
            /** @type {{year:number, month:number, person: PersonVm}} */
            headerSelections:{
                /** @type {number|null} */
                year: null,
                /** @type {number|null} */
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
            buildings: []
        };

        self.event = {
            toEditWorks: function () {

                baseDataService.getDaysInMonth({
                    year: self.view.headerSelections.year,
                    month: self.view.headerSelections.month
                }).$promise
                    .then(function (data) {
                        private.daysInMonth = data;
                    }, function (err) {
                        alert("An Error Occur While Loading Calendar Information");
                    });

                worksService.getAllWorksByPersonAndMonth().$promise
                    .then(function (data) {
                        self.view.mode = PageMode.EDIT;
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
                    for(var i = private.startYear; i < private.currentYear + 5; i++)
                        self.view.years.push(i);
                    self.view.headerSelections.year = private.currentYear
                }
            }

            baseDataService.getStartYear().$promise
                .then(function (data) {
                    private.startYear = data;
                    afterInitializeAsyncRunnerCounter --;
                    afterInitializeCallBack();
                }, function (err) {
                    alert("An Error Occur While Loading System Base Data From Server");
                });

            baseDataService.getCurrentYear().$promise
                .then(function (data) {
                    private.currentYear = data;
                    afterInitializeAsyncRunnerCounter --;
                    afterInitializeCallBack();
                }, function (err) {
                    alert("An Error Occur While Loading System Base Data From Server");
                });

            var monthDictionary = new Dictionary();

            for (var i = 0; i < 12 ; i++) {
                monthDictionary.add(i + 1, private.monthsNames[i]);
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
/**
 * Created by Hassan on 11/20/2016.
 */
(function () {
    var controller = function (personService) {
        var self = this;

        var private = {
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

        /** @type{{year:Array<number>, months:Dictionary<number, string>,  persons:Array<Person>}} */
        self.view = {
            selections:{
                year: null,
                month: null,
                person: null
            },
            years: null,
            months: null,
            personnel: null
        };

        self.event = {};

        function initialize() {
            baseDataService.getCurrentYear().$promise
                .then(function (data) {


                }, function (err) {

                });

            var monthDictionary = new Dictionary();

            for (var i = 0; i < 12 ; i++) {
                monthDictionary.add(i + 1, private.monthsNames[i]);
            }

            self.view.months = monthDictionary;

            personService.query().$promise.then(function (data) {
                self.view.personnel = data;
            }, function (err) {
                alert(err);
            })


        }

        initialize();
    };

    controller.$inject = ["personService"];

    angular.module("personnelManagement")
        .controller("workInsertController", controller);
})();
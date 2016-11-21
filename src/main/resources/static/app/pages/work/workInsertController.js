/**
 * Created by Hassan on 11/20/2016.
 */
(function () {
    var controller = function () {
        var self = this;

        /** @type{{year:Array<number>, months:Array<number>,  persons:Array<Person>}} */
        self.view = {
            years: null,
            months: null,
            persons: null
        };

        self.event = {};

        function initialize() {
            self.view.years = [];

            var monthDictionary = new Dictionary();
            for (var i = 1; i <= 12 ; i++){

                monthDictionary.add(i, "Farvardin")
            }

            self.view.months = [111111,222222,33333,44444];
            self.view.persons = data;
        }

        initialize();
    };

    controller.$inject = [];

    angular.module("personnelManagement")
        .controller("workInsertController", controller);
})();
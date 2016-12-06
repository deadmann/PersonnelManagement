/**
 * Created by Hassan on 12/6/2016.
 */
var AngularUtility;
(function (AngularUtility) {
    "use strict";
    var JqDatePickerDirective = (function () {
        function JqDatePickerDirective() {
            this.restrict = 'A';
            this.require = 'ngModel';
            this.link = function (scope, element, attrs, ngModel) {
                element.datepicker({
                    minDate: 'D',
                    dateFormat: 'yy-mm-dd',
                    numberOfMonths: 2,
                    showButtonPanel: true,
                    onSelect: function (date) {
                        ngModel.$setViewValue(date);
                        ngModel.$render();
                        scope.$apply();
                    }
                });
            };
        }
        JqDatePickerDirective.instance = function () {
            return new JqDatePickerDirective();
        };
        return JqDatePickerDirective;
    }());
    angular.module("angularUtility")
        .directive("jqDatePicker", JqDatePickerDirective.instance);
})(AngularUtility || (AngularUtility = {}));

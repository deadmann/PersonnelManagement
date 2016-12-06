/**
 * Created by Hassan on 12/6/2016.
 */
module AngularUtility {
    "use strict";
    import IScope = angular.IScope;
    import INgModelController = angular.INgModelController;
    import IAugmentedJQuery = angular.IAugmentedJQuery;

    // export interface IDatePickerAttributes extends ng.IAttributes {
    //     datepicker: string;
    // }

    export interface IDatePickerElement extends /*Element,*/ IAugmentedJQuery{
        datepicker:Function
    }

    class JqDatePickerDirective implements ng.IDirective {
        link: angular.IDirectiveLinkFn|angular.IDirectivePrePost;
        require: string|string[]|{[controller:string]:string};
        restrict: string;

        constructor() {
            this.restrict = 'A';
            this.require = 'ngModel';
            this.link = function (scope: ng.IScope, element: IDatePickerElement, attrs: ng.IAttributes, ngModel: INgModelController) {
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
            }
        }

        static instance(): ng.IDirective {
            return new JqDatePickerDirective();
        }
    }

    angular.module("angularUtility")
        .directive("jqDatePicker", JqDatePickerDirective.instance);
}
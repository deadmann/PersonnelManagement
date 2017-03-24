///<reference path="../outerReferences.ts"/>
/**
 * Created by Hassan on 1/1/2017.
 */
var AngularUtility;
(function (AngularUtility) {
    "use strict";
    // export interface IDatePickerScope extends ng.IScope {
    //     datePickerConfig: DatePickerConfig;
    // }
    // export interface IDatePickerElement extends /*Element,*/ IAugmentedJQuery{
    //     datepicker:Function
    // }
    var OnEnterDirective = (function () {
        function OnEnterDirective() {
            this.restrict = 'A';
            // this.require = 'ngModel';
            // this.scope = {
            //     onEsc: '&?',
            //     dataOnEsc: '&?',
            //     onEscape: '&?',
            //     dataOnEscape: '&?'
            // };
            this.link = function (scope, element, attrs) {
                element.on("keydown keypress", function (event) {
                    if (event.which === 27 && !event.altKey && !event.ctrlKey && !event.shiftKey) {
                        scope.$apply(function () {
                            var req = attrs.onEsc || attrs.onEscape || attrs.dataOnEsc || attrs.dataOnEscape;
                            scope.$eval(req);
                        });
                        event.preventDefault();
                    }
                });
            };
        }
        OnEnterDirective.instance = function () {
            return new OnEnterDirective();
            // var directive: ng.IDirectiveFactory = ($timeout:ng.ITimeoutService)=>new OnRepeaterFinishRender($timeout);
            // directive.$inject=["$timeout"];
            // return directive;
        };
        return OnEnterDirective;
    }());
    angular.module("angularUtility")
        .directive("onEsc", OnEnterDirective.instance)
        .directive("dataOnEsc", OnEnterDirective.instance)
        .directive("onEscape", OnEnterDirective.instance)
        .directive("dataOnEscape", OnEnterDirective.instance);
})(AngularUtility || (AngularUtility = {}));
//# sourceMappingURL=onEsc.js.map
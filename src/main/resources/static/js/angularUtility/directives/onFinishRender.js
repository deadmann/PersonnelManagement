///<reference path="../innerReferences.ts"/>
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
    var OnRepeaterFinishRender = (function () {
        function OnRepeaterFinishRender($timeout) {
            this.$timeout = $timeout;
            this.restrict = 'A';
            // this.require = 'ngModel';
            // this.scope = {
            //     datePickerConfig: '=?'
            // };
            this.link = function (scope, element, attrs) {
                if (scope.$last === true) {
                    $timeout(function () {
                        var commandName = attrs.commandName;
                        var modelObject = scope.$eval(attrs.modelObject);
                        var repeatFinishedArgs = new RepeaterFinishedArguments(commandName, modelObject, element[0], attrs);
                        scope.$emit('ngRepeatFinished', repeatFinishedArgs);
                    });
                }
            };
        }
        OnRepeaterFinishRender.instance = function () {
            //return new OnRepeaterFinishRender();
            var directive = function ($timeout) { return new OnRepeaterFinishRender($timeout); };
            directive.$inject = ["$timeout"];
            return directive;
        };
        return OnRepeaterFinishRender;
    }());
    angular.module("angularUtility")
        .directive("onRepeaterFinishRender", OnRepeaterFinishRender.instance)
        .directive("dataOnRepeaterFinishRender", OnRepeaterFinishRender.instance);
})(AngularUtility || (AngularUtility = {}));

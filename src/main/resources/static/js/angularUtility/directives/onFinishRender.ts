///<reference path="../innerReferences.ts"/>
///<reference path="../outerReferences.ts"/>

/**
 * Created by Hassan on 1/1/2017.
 */
module AngularUtility {
    "use strict";
    import IScope = angular.IScope;
    import INgModelController = angular.INgModelController;
    import IAugmentedJQuery = angular.IAugmentedJQuery;
    import IRepeatScope = angular.IRepeatScope;
    import ITimeoutService = angular.ITimeoutService;

    export interface IFinishRenderAttributes extends ng.IAttributes {
        commandName: string;
        modelObject: any;
    }

    // export interface IDatePickerScope extends ng.IScope {
    //     datePickerConfig: DatePickerConfig;
    // }

    // export interface IDatePickerElement extends /*Element,*/ IAugmentedJQuery{
    //     datepicker:Function
    // }

    class OnRepeaterFinishRender implements ng.IDirective {
        link: angular.IDirectiveLinkFn|angular.IDirectivePrePost;
        require: string|string[]|{[controller:string]:string};
        restrict: string;
        scope: boolean|{[boundProperty:string]:string};

        constructor(private $timeout:ng.ITimeoutService) {
            this.restrict = 'A';
            // this.require = 'ngModel';
            // this.scope = {
            //     datePickerConfig: '=?'
            // };

            this.link = function (scope: IRepeatScope, element: IAugmentedJQuery, attrs: IFinishRenderAttributes) {
                if (scope.$last === true) {
                    $timeout(function () {
                        var commandName = attrs.commandName;
                        var modelObject = scope.$eval(attrs.modelObject);

                        var repeatFinishedArgs = new RepeaterFinishedArguments(commandName, modelObject, element[0], attrs);

                        scope.$emit('ngRepeatFinished', repeatFinishedArgs);
                    });
                }
            }
        }

        static instance(): ng.IDirective {
            //return new OnRepeaterFinishRender();
            var directive: ng.IDirectiveFactory = ($timeout:ng.ITimeoutService)=>new OnRepeaterFinishRender($timeout);
            directive.$inject=["$timeout"];
            return directive;
        }
    }

    angular.module("angularUtility")
        .directive("onRepeaterFinishRender", OnRepeaterFinishRender.instance)
        .directive("dataOnRepeaterFinishRender", OnRepeaterFinishRender.instance);
}
///<reference path="../outerReferences.ts"/>
/**
 * Created by Hassan on 3/4/2017.
 */
var AngularUtility;
(function (AngularUtility) {
    var TabIndexedContainer = (function () {
        function TabIndexedContainer() {
            this.restrict = 'AE';
            this.require = "?^^tabIndexedContainer"; //? optional ctrl/null   ^ parent   ^^ parents   [nothing] locate on current element
            // this.require = 'ngModel';
            this.scope = {
                element: '='
            };
            this.controller = ["$scope", function ($scope, $element) {
                    this.getElement = function () {
                        return $scope.element;
                    };
                }];
            this.link = function (scope, element, attrs) {
                scope.element = element;
            };
        }
        TabIndexedContainer.instance = function () {
            return new TabIndexedContainer();
            // var directive: ng.IDirectiveFactory = ($timeout:ng.ITimeoutService)=>new OnRepeaterFinishRender($timeout);
            // directive.$inject=["$timeout"];
            // return directive;
        };
        return TabIndexedContainer;
    }());
    var EnterToJumpDirective = (function () {
        function EnterToJumpDirective() {
            this.restrict = 'A';
            this.require = "?^^tabIndexedContainer"; //? optional ctrl/null   ^ parent   ^^ parents   [nothing] locate on current element
            // this.require = 'ngModel';
            // this.scope = {
            //     onEsc: '&?',
            //     dataOnEsc: '&?',
            //     onEscape: '&?',
            //     dataOnEscape: '&?'
            // };
            this.link = function (scope, element, attrs, tabIndexContainerCtrl) {
                element.bind("keydown keypress", function (event) {
                    //Limit Focus Jump To A Container
                    var container = (tabIndexContainerCtrl != null) ? tabIndexContainerCtrl.getElement() : null;
                    if (event.which === 13) {
                        event.preventDefault();
                        var currentTab = element[0].tabIndex;
                        //Filter Only those element that explicitly defines tabindex attribute
                        var tabbedFormElements;
                        if (container == null) {
                            tabbedFormElements = angular.element("[tabindex]"); //as long as it doesn't contain '-' it's all lower case
                        }
                        else {
                            tabbedFormElements = container.find("[tabindex]");
                        }
                        var tabs = [];
                        Util.Utility.forEach(tabbedFormElements, function (e) {
                            tabs.push(e.tabIndex);
                        });
                        tabs.sort(function (a, b) {
                            return a - b;
                        });
                        while (Util.Utility.hasDuplicates(tabs)) {
                            console.warn("found duplicated tab indexes, Shift all tab indexes");
                            var shift = false;
                            for (var i = 0; i < tabbedFormElements.length; i++) {
                                var formElement = Util.Utility.find(tabbedFormElements, tabs[i], function (a, b) {
                                    return a.tabIndex === b;
                                });
                                if (!shift && tabs[i + 1] != undefined) {
                                    var nextFormElement = Util.Utility.find(tabbedFormElements, tabs[i + 1], function (a, b) {
                                        return a.tabIndex === b;
                                    });
                                    if (nextFormElement.tabIndex === formElement.tabIndex) {
                                        shift = true;
                                    }
                                }
                                else if (shift) {
                                    tabs[i]++;
                                    formElement.tabIndex++;
                                }
                            }
                        }
                        var nextTab = NaN;
                        var nextTabIndex = tabs.indexOf(currentTab) + 1; //Never Can Be -1 (unless there is an error)
                        if (tabs[nextTabIndex] != undefined) {
                            nextTab = tabs[nextTabIndex];
                        }
                        else {
                            nextTab = NaN;
                        }
                        if (!isNaN(nextTab)) {
                            var elementToFocus = tabbedFormElements.filter('[tabindex=' + nextTab + ']')[0];
                            if (angular.isDefined(elementToFocus))
                                elementToFocus.focus();
                        }
                    }
                });
            };
        }
        EnterToJumpDirective.instance = function () {
            return new EnterToJumpDirective();
            // var directive: ng.IDirectiveFactory = ($timeout:ng.ITimeoutService)=>new OnRepeaterFinishRender($timeout);
            // directive.$inject=["$timeout"];
            // return directive;
        };
        return EnterToJumpDirective;
    }());
    angular.module("angularUtility")
        .directive("tabIndexedContainer", TabIndexedContainer.instance)
        .directive("enterToJump", EnterToJumpDirective.instance)
        .directive("enterAsTab", EnterToJumpDirective.instance);
})(AngularUtility || (AngularUtility = {}));
//# sourceMappingURL=enterToJump.js.map
/**
 * Created by Hassan Faghihi on 7/22/2015.
 */

app.directive("HsTabIndexedContainer", function () {
    return {
        restrict: "AE",
        scope:{
            element: "="
        },
        controller: ["$scope", function($scope, $element){
            this.getElement=function(){
                return $scope.element;
            }
        }],
        link: function(scope, element, attrs){
            scope.element = element;
        }
    }
});

app.directive("hsEnterAsTab", function () {
    return {
        require: "?^^hsTabIndexedContainer", //? optional ctrl/null   ^ parent   ^^ parents   [nothing] locate on current element
        restrict: "A",
        link: function (scope, element, attrs, tabIndexContainerCtrl) {
            element.bind("keydown keypress", function (event) {

                //Limit Focus Jump To A Container
                var container = (tabIndexContainerCtrl!=null)? tabIndexContainerCtrl.getElement():null;

                if (event.which === 13) {
                    event.preventDefault();
                    var currentTab = element[0].tabIndex;

                    //Filter Only those element that explicitly defines tabindex attribute
                    var tabbedFormElements;
                    if (container == null) {
                        tabbedFormElements = angular.element("[tabindex]");//as long as it doesn't contain '-' it's all lower case
                    } else {
                        tabbedFormElements = container.find("[tabindex]");
                    }

                    var tabs = [];
                    Utility.forEach(tabbedFormElements, function (e) {
                        tabs.push(e.tabIndex);
                    });

                    tabs.sort(function (a, b) {
                        return a - b;
                    });

                    while (Utility.hasDuplicates(tabs)) {
                        console.warn("found duplicated tab indexes, Shift all tab indexes");
                        var shift = false;
                        for (var i = 0; i < tabbedFormElements.length; i++) {
                            var formElement = Utility.find(tabbedFormElements, tabs[i], function (a, b) {
                                return a.tabIndex === b;
                            });
                            if (!shift && tabs[i + 1] != undefined) {
                                var nextFormElement = Utility.find(tabbedFormElements, tabs[i + 1], function (a, b) {
                                    return a.tabIndex === b;
                                });
                                if (nextFormElement.tabIndex === formElement.tabIndex) {
                                    shift = true;
                                }
                            } else if (shift) { //Why else if => So shifting start at next element
                                tabs[i]++;
                                formElement.tabIndex++;
                            }
                        }
                    }

                    var nextTab = NaN;
                    var nextTabIndex = tabs.indexOf(currentTab) + 1; //Never Can Be -1 (unless there is an error)
                    if (tabs[nextTabIndex] != undefined) {
                        nextTab = tabs[nextTabIndex];
                    } else {
                        nextTab = NaN;
                    }

                    if (!isNaN(nextTab)) {
                        var elementToFocus = tabbedFormElements.filter('[tabindex=' + nextTab + ']')[0];
                        if (angular.isDefined(elementToFocus))
                            elementToFocus.focus();
                    }
                }
            });
        }
    };
});
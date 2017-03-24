///<reference path="../innerReferences.ts"/>
///<reference path="../outerReferences.ts"/>
/**
 * Created by Hassan on 3/24/2017.
 */
var AngularUtility;
(function (AngularUtility) {
    "use strict";
    //Add All Option to ng-options of desired select list
    function addSelectOptionFilter() {
        /**
         * @param {*} data - Object that required by desired select
         */
        return function (input, data) {
            var newArray = input.slice(0); //clone the array, or you'll end up with a new "None" option added to your "values" array on every digest cycle.
            //newArray.unshift({ name: "None" });
            newArray.unshift(data);
            return newArray;
        };
    }
    AngularUtility.addSelectOptionFilter = addSelectOptionFilter;
    addSelectOptionFilter.$inject = [];
    angular.module("angularUtility")
        .filter("addSelectOption", addSelectOptionFilter);
})(AngularUtility || (AngularUtility = {}));
//# sourceMappingURL=addSelectOption.js.map
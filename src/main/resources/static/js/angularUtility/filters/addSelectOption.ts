///<reference path="../innerReferences.ts"/>
///<reference path="../outerReferences.ts"/>

/**
 * Created by Hassan on 3/24/2017.
 */
module AngularUtility {
    "use strict";
    import Utility = Util.Utility;

    //Add All Option to ng-options of desired select list
    export function addSelectOptionFilter() {
        /**
         * @param {*} data - Object that required by desired select
         */
        return function(input:Array<any>, data:any) {
            var newArray = input.slice(0); //clone the array, or you'll end up with a new "None" option added to your "values" array on every digest cycle.
            //newArray.unshift({ name: "None" });
            newArray.unshift(data);
            return newArray;
        };
    }

    addSelectOptionFilter.$inject = [];

    angular.module("angularUtility")
        .filter("addSelectOption", addSelectOptionFilter);
}
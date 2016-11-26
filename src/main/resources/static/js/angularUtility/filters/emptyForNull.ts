/**
 * Created by Hassan on 11/21/2016.
 */
module AngularUtility {
    "use strict";


    export function filter() {
        return (text: string) => {
            return Util.Utility.isNullOrUndefined(text) ? "" : text;
        };
    }

    filter.$inject = [];

    angular.module("angularUtility")
        .filter("emptyForNull", filter);
}
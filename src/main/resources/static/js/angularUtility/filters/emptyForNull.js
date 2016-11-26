/**
 * Created by Hassan on 11/21/2016.
 */
var AngularUtility;
(function (AngularUtility) {
    "use strict";
    function filter() {
        return function (text) {
            return Util.Utility.isNullOrUndefined(text) ? "" : text;
        };
    }
    AngularUtility.filter = filter;
    filter.$inject = [];
    angular.module("angularUtility")
        .filter("emptyForNull", filter);
})(AngularUtility || (AngularUtility = {}));

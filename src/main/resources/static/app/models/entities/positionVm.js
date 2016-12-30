///<reference path="wageVm.ts"/>
///<reference path="personVm.ts"/>
/**
 * Created by Hassan on 11/18/2016.
 */
var PositionVm = (function () {
    function PositionVm(id, title, wages, personnel) {
        this.setup();
        if (id != undefined)
            this.id = id;
        if (title != undefined)
            this.title = title;
        if (wages != undefined)
            this.wages = wages;
        if (personnel != undefined)
            this.personnel = personnel;
    }
    PositionVm.prototype.setup = function () {
        this.id = 0;
        this.title = null;
        this.wages = [];
        this.personnel = [];
    };
    PositionVm.prototype.isCurrentTheFirstWage = function () {
        if (Util.Utility.isNullOrUndefined(this.wages)) {
            throw new Error("Wage within position is null or undefined");
        }
        var min = Enumerable.from(this.wages)
            .minBy(function (m) { return m.startDate; });
        var current = this.getCurrentWage();
        return min == current;
    };
    PositionVm.getCurrentDateString = function () {
        var today = new Date();
        //get Day Returns day of week, Date returns day of month
        return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    };
    PositionVm.prototype.getCurrentWage = function () {
        if (Util.Utility.isNullOrUndefined(this.wages)) {
            throw new Error("Wage within position is null or undefined");
        }
        return Enumerable.from(this.wages)
            .where(function (w) { return Util.Utility.compareString(w.startDate, PositionVm.getCurrentDateString()) == -1; }) //Get All Previous Dates Wages
            .maxBy(function (m) { return m.startDate; }); //Show The Biggest Date Wage
    };
    PositionVm.prototype.getNextWage = function () {
        if (Util.Utility.isNullOrUndefined(this.wages)) {
            throw new Error("Wage within position is null or undefined");
        }
        var current = this.getCurrentWage();
        var afterCurrentEnum = Enumerable.from(this.wages)
            .where(function (w) { return Util.Utility.compareString(w.startDate, current.startDate) == 1; });
        if (!afterCurrentEnum.any()) {
            return null;
        }
        return afterCurrentEnum.minBy(function (m) { return m.startDate; });
    };
    return PositionVm;
}());

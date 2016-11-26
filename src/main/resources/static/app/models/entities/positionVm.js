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
    PositionVm.prototype.getCurrentWage = function () {
        if (Util.Utility.isNullOrUndefined(this.wages)) {
            throw new Error("Wage within position is null or undefined");
        }
        return Enumerable.from(this.wages)
            .where(function (w) { return w.startDate.getTime() < new Date().getTime(); }) //Get All Previous Dates Wages
            .maxBy(function (m) { return m.startDate.getTime(); }); //Show The Biggest Date Wage
    };
    PositionVm.prototype.getNextWage = function () {
        if (Util.Utility.isNullOrUndefined(this.wages)) {
            throw new Error("Wage within position is null or undefined");
        }
        var current = this.getCurrentWage();
        var afterCurrentEnum = Enumerable.from(this.wages)
            .where(function (w) { return w.startDate.getTime() > current.startDate.getTime(); });
        if (!afterCurrentEnum.any()) {
            return null;
        }
        return afterCurrentEnum.minBy(function (m) { return m.startDate.getTime(); });
    };
    return PositionVm;
}());

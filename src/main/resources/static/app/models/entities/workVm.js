///<reference path="personVm.ts"/>
///<reference path="buildingVm.ts"/>
/**
 * Created by Hassan on 11/18/2016.
 */
var WorkVm = (function () {
    function WorkVm(id, workPerDay, date, person, building) {
        this.setup();
        if (id != undefined)
            this.id = id;
        if (workPerDay != undefined)
            this.workPerDay = workPerDay;
        if (date != undefined)
            this.date = date;
        if (person != undefined)
            this.person = person;
        if (building != undefined)
            this.building = building;
    }
    WorkVm.prototype.setup = function () {
        this.id = 0;
        this.workPerDay = 0;
        this.date = null;
        this.person = null;
        this.building = null;
    };
    WorkVm.prototype.getPersianDate = function () {
        try {
            return moment(this.date).format('jYYYY/jM/jD');
        }
        catch (err) {
            return "";
        }
    };
    Object.defineProperty(WorkVm.prototype, "persianDate", {
        get: function () {
            return this.getPersianDate();
        },
        enumerable: true,
        configurable: true
    });
    return WorkVm;
}());
//# sourceMappingURL=workVm.js.map
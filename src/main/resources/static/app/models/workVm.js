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
        if (date != undefined) {
            if (typeof date == "number") {
                this.date = new Date(date);
            }
            else if (typeof date == "string") {
                this.date = new Date(date);
            }
            else if (typeof date == "Date") {
                this.date = date;
            }
            else {
                throw new Error("Cannot Cast '" + (typeof date).toString() + "' to 'Date'");
            }
        }
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
    return WorkVm;
}());
//# sourceMappingURL=workVm.js.map
/**
 * Created by Hassan on 11/24/2016.
 */
var WorkPerDayDto = (function () {
    function WorkPerDayDto(id, personId, year, month, day, buildingId, workingHours) {
        this.setup();
        if (id != undefined)
            this.id = id;
        if (personId != undefined)
            this.personId = personId;
        if (year != undefined)
            this.year = year;
        if (month != undefined)
            this.month = month;
        if (day != undefined)
            this.day = day;
        if (buildingId != undefined)
            this.buildingId = buildingId;
        if (workingHours != undefined)
            this.workingHours = workingHours;
    }
    WorkPerDayDto.prototype.setup = function () {
        this.id = null;
        this.personId = null;
        this.year = null;
        this.month = null;
        this.day = null;
        this.buildingId = null;
        this.workingHours = null;
    };
    return WorkPerDayDto;
}());
//# sourceMappingURL=workPerDayDto.js.map
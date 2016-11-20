///<reference path="positionVm.ts"/>
/**
 * Created by Hassan on 11/18/2016.
 */
var WageVm = (function () {
    function WageVm(id, startDate, price, position) {
        this.setup();
        if (id != undefined)
            this.id = id;
        if (startDate != undefined) {
            if (typeof startDate == "number") {
                this.startDate = new Date(startDate);
            }
            else if (typeof startDate == "string") {
                this.startDate = new Date(startDate);
            }
            else if (typeof startDate == "Date") {
                this.startDate = startDate;
            }
            else {
                throw new Error("Cannot Cast '" + (typeof startDate).toString() + "' to 'Date'");
            }
        }
        if (price != undefined)
            this.price = price;
        if (position != undefined)
            this.position = position;
    }
    WageVm.prototype.setup = function () {
        this.id = 0;
        this.startDate = null;
        this.price = 0;
        this.position = null;
    };
    return WageVm;
}());
//# sourceMappingURL=wageVm.js.map
///<reference path="positionVm.ts"/>
///<reference path="../../../typings/index.d.ts"/>
/**
 * Created by Hassan on 11/18/2016.
 */
var WageVm = (function () {
    function WageVm(id, startDate, price, position) {
        this.setup();
        if (id != undefined)
            this.id = id;
        if (startDate != undefined)
            this.startDate = startDate;
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
    //??? is used at all? :-/
    WageVm.prototype.isValidPersianDate = function () {
        try {
            if (!moment(this.startDate).isValid())
                return false;
            //test on persian
            moment(this.startDate).format('jYYYY/jM/jD');
            return true;
        }
        catch (err) {
            return false;
        }
    };
    WageVm.prototype.getPersianStartDate = function () {
        try {
            return moment(this.startDate).format('jYYYY/jM/jD');
        }
        catch (err) {
            return "";
        }
    };
    Object.defineProperty(WageVm.prototype, "persianStartDate", {
        get: function () {
            return this.getPersianStartDate();
        },
        enumerable: true,
        configurable: true
    });
    return WageVm;
}());

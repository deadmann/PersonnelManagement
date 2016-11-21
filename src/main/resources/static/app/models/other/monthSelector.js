/**
 * Created by Hassan on 11/20/2016.
 */
var MonthSelector = (function () {
    function MonthSelector(year, month) {
        this.setup();
        if (year != undefined)
            this.year = year;
        if (month != undefined)
            this.month = month;
    }
    MonthSelector.prototype.setup = function () {
        this.year = 0;
        this.month = 0;
    };
    return MonthSelector;
}());

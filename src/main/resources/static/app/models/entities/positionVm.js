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
    return PositionVm;
}());

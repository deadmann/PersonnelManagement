///<reference path="workVm.ts"/>
/**
 * Created by Hassan on 11/18/2016.
 */
var BuildingVm = (function () {
    function BuildingVm(id, name, works) {
        this.setup();
        if (id != undefined)
            this.id = id;
        if (name != undefined)
            this.name = name;
        if (works != undefined)
            this.works = works;
    }
    BuildingVm.prototype.setup = function () {
        this.id = 0;
        this.name = null;
        this.works = [];
    };
    return BuildingVm;
}());

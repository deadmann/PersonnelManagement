///<reference path="workVm.ts"/>
///<reference path="positionVm.ts"/>
/**
 * Created by Hassan on 11/18/2016.
 */
var PersonVm = (function () {
    function PersonVm(id, firstname, lastname, position, works) {
        this.setup();
        if (id != undefined)
            this.id = id;
        if (firstname != undefined)
            this.firstname = firstname;
        if (lastname != undefined)
            this.lastname = lastname;
        if (position != undefined)
            this.position = position;
        if (works != undefined)
            this.works = works;
    }
    PersonVm.prototype.setup = function () {
        this.id = 0;
        this.firstname = null;
        this.lastname = null;
        this.position = null;
        this.works = [];
    };
    return PersonVm;
}());
//# sourceMappingURL=personVm.js.map
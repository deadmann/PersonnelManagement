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
    /** this function won't bind in angular */
    PersonVm.prototype.getFullName = function () {
        return this.firstname
            + (Util.Utility.isNullOrUndefinedOrEmpty(this.lastname)
                ? ""
                : " " + this.lastname);
    };
    Object.defineProperty(PersonVm.prototype, "fullName", {
        get: function () {
            return this.getFullName();
        },
        enumerable: true,
        configurable: true
    });
    PersonVm.prototype.setup = function () {
        this.id = 0;
        this.firstname = null;
        this.lastname = null;
        this.position = null;
        this.works = [];
    };
    return PersonVm;
}());

///<reference path="workVm.ts"/>
///<reference path="positionVm.ts"/>
/**
 * Created by Hassan on 11/18/2016.
 */
class PersonVm {
    public id: number;
    public firstname: string;
    public lastname: string;
    public position: PositionVm;
    public works: Array<WorkVm>;


    constructor(id: number, firstname: string, lastname: string, position: PositionVm, works: Array<WorkVm>) {
        this.setup();
        if (id != undefined)this.id = id;
        if (firstname != undefined)this.firstname = firstname;
        if (lastname != undefined)this.lastname = lastname;
        if (position != undefined)this.position = position;
        if (works != undefined)this.works = works;
    }

    /** this function won't bind in angular */
    public getFullName() {
        return this.firstname
        + (Util.Utility.isNullOrUndefinedOrEmpty(this.lastname)
            ? ""
            : " " + this.lastname);
    }

    public get fullName():string{
        return this.getFullName();
    }

    private setup() {
        this.id = 0;
        this.firstname = null;
        this.lastname = null;
        this.position = null;
        this.works = [];
    }
}
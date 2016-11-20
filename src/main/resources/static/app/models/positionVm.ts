///<reference path="wageVm.ts"/>
///<reference path="personVm.ts"/>
/**
 * Created by Hassan on 11/18/2016.
 */
class PositionVm {
    public id: number;
    public title: string;
    public wages: Array<WageVm>;
    public personnel: Array<PersonVm>;


    constructor(id: number, title: string, wages: Array<WageVm>, personnel: Array<PersonVm>) {
        this.setup();
        if (id != undefined)this.id = id;
        if (title != undefined)this.title = title;
        if (wages != undefined)this.wages = wages;
        if (personnel != undefined)this.personnel = personnel;
    }

    private setup() {
        this.id = 0;
        this.title = null;
        this.wages = [];
        this.personnel = [];
    }
}
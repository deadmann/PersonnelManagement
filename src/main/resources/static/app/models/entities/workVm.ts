///<reference path="personVm.ts"/>
///<reference path="buildingVm.ts"/>
/**
 * Created by Hassan on 11/18/2016.
 */
class WorkVm {
    public id: number;
    public workPerDay: number;
    public date: Date;
    public person: PersonVm;
    public building: BuildingVm;


    constructor(id: number, workPerDay: number, date: Date|string|number, person: PersonVm, building: BuildingVm) {
        this.setup();
        if(id!=undefined)this.id = id;
        if(workPerDay!=undefined)this.workPerDay = workPerDay;
        if(date!=undefined){
            if (typeof date == "number") {
                this.date = new Date(<number>date);
            }else if(typeof date == "string"){
                this.date = new Date(<string>date);
            }else if (typeof date == "Date") {
                this.date = <Date>date;
            }else{
                throw new Error("Cannot Cast '"+ (typeof date).toString() + "' to 'Date'");
            }
        }
        if(person!=undefined)this.person = person;
        if(building!=undefined)this.building = building;
    }

    private setup() {
        this.id = 0;
        this.workPerDay = 0;
        this.date = null;
        this.person = null;
        this.building = null;
    }
}
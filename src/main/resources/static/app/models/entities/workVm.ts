///<reference path="personVm.ts"/>
///<reference path="buildingVm.ts"/>
/**
 * Created by Hassan on 11/18/2016.
 */
class WorkVm {
    public id: number;
    public workPerDay: number;
    public date: string;
    public person: PersonVm;
    public building: BuildingVm;


    constructor(id: number, workPerDay: number, date: string, person: PersonVm, building: BuildingVm) {
        this.setup();
        if(id!=undefined)this.id = id;
        if(workPerDay!=undefined)this.workPerDay = workPerDay;
        if(date!=undefined)this.date = date;
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

    public getPersianDate():string{
        try{
            return moment(this.date).format('jYYYY/jM/jD');
        }catch (err){
            return "";
        }
    }

    get persianDate(): string {
        return this.getPersianDate();
    }
}